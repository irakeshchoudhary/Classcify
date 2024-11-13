const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

const users = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

let onlineUsers = new Map();

app.use(express.json());

app.get("/users/:id", (req, res) => {
  const user = users.find((user) => user.id === req.params.id);
  res.json(user || {});
});

app.get("/currentUser", (req, res) => {
  res.json({ id: "1", name: "Alice", username: "alice123" });
});

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  onlineUsers.set(userId, socket.id);
  io.emit("user_online", userId);

  socket.on("disconnect", () => {
    onlineUsers.delete(userId);
    io.emit("user_offline", userId);
  });

  socket.on("send_message", (msg) => {
    io.emit("receive_message", msg);
  });

  socket.on("typing", (receiver) => {
    io.to(receiver).emit("typing");
  });

  socket.on("stop_typing", (receiver) => {
    io.to(receiver).emit("stop_typing");
  });
});

server.listen(3001, () => console.log("Server listening on port 3001"));
