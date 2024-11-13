import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import axios from "axios";

const socket = io("http://localhost:3001"); // Replace with your backend server URL

// Define a Message type to type-check messages array
interface Message {
  sender: string;
  receiver: string; // New field to track the receiver
  message: string;
  type: "text" | "file";
  timestamp: Date;
  status: "sent" | "seen";
  file?: File;
}

// Define a User type for the user details
interface User {
  id: string;
  name: string;
  handle: string;
  online: boolean;
}

const Chats: React.FC = () => {
  const { userId } = useParams(); // Get the user ID from the URL parameters
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  const [activeChat, setActiveChat] = useState<User | null>(null); // Store the user object here
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch user details based on userId and set active chat
  useEffect(() => {
    if (userId) {
      const fetchUserDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/users/${userId}`);
          const user: User = response.data;
          setActiveChat(user); // Set the entire user object
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    }
  }, [userId]);

  useEffect(() => {
    // Listen for incoming messages
    socket.on("receive_message", (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
      console.log(`Message received from ${msg.sender}: ${msg.message}`); // Log message received
    });

    // Typing indicator
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop_typing", () => setIsTyping(false));

    return () => {
      socket.off("receive_message");
      socket.off("typing");
      socket.off("stop_typing");
    };
  }, []);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        sender: "You",
        receiver: activeChat?.id || "Unknown", // Set the receiver using userId
        message: inputMessage,
        type: "text",
        timestamp: new Date(),
        status: "sent",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");

      socket.emit("send_message", newMessage);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        sender: "You",
        receiver: activeChat?.id || "Unknown", // Set the receiver using userId
        message: file.name,
        type: "file",
        timestamp: new Date(),
        status: "sent",
        file,
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      socket.emit("send_file", newMessage);
    }
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    setIsTyping(e.target.value.length > 0);
    socket.emit("typing", activeChat?.id); // Emit using the correct user ID
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
      socket.emit("stop_typing", activeChat?.id); // Stop typing when Enter is pressed
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="flex h-screen w-full bg-black text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-black pt-10 pl-10 overflow-y-auto scrollbar-none">
        <h2 className="text-xl font-semibold mb-4">All Chats</h2>
        <ul className="space-y-2">
          {[{ name: "Rakesh Choudhary", handle: "@rakeshchoudhary", online: true }].map((chat, index) => (
            <li
              key={index}
              className="flex items-center space-x-4 cursor-pointer hover:bg-gray-700 p-3 rounded-md"
              onClick={() => setActiveChat({ id: "1234", name: chat.name, handle: chat.handle, online: chat.online })}
            >
              <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold">
                {chat.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="font-medium">{chat.name}</p>
                <p className="text-gray-400 text-xs">{chat.handle}</p>
              </div>
              {chat.online && <span className="w-3 h-3 bg-green-500 rounded-full"></span>}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-dark-3 m-10 rounded-2xl pl-4 pr-4">
        {activeChat ? (
          <div className="flex items-center space-x-4 p-4 border-b border-dark-4">
            <button onClick={() => setActiveChat(null)} className="mr-4">
              <img src="/assets/icons/back.svg" alt="Back" width={24} height={24} />
            </button>
            <div className="w-12 h-12 rounded-full bg-gray-600 flex items-center justify-center text-sm font-semibold">
              {activeChat.name.charAt(0)}
            </div>
            <div className="flex-1">
              <p className="font-medium">{activeChat.name}</p>
              <p className="text-green-500 text-xs">Online</p>
              {isTyping && <p className="text-gray-400 text-xs">User is typing...</p>}
            </div>
            <div className="flex space-x-6 text-gray-400">
              <button>
                <img src="/assets/icons/voicechat.svg" alt="Voice Chat" width={24} height={24} />
              </button>
              <button>
                <img src="/assets/icons/videochat.svg" alt="Video Chat" width={24} height={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <img src="/assets/icons/conversationicon.svg" alt="Start New Conversation" className="w-44 h-44" />
            <p className="text-gray-400">Start new conversation</p>
          </div>
        )}

        {activeChat && (
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
            {messages.map((msg, index) => (
              <div key={index}>
                <div className="text-center text-gray-500 text-xs mb-2">
                  {new Date(msg.timestamp).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </div>
                <div className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}>
                  <div className={`p-2 rounded-lg ${msg.sender === "You" ? "bg-dark-4" : "bg-gray-600"}`}>
                    {msg.type === "file" ? (
                      <a href={msg.file ? URL.createObjectURL(msg.file) : undefined} download={msg.file?.name} className="text-white">
                        📎 {msg.message}
                      </a>
                    ) : (
                      <span>{msg.message}</span>
                    )}
                    <div className="text-xs text-right text-gray-400">
                      {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      <span className={`ml-2 ${msg.status === "seen" ? "text-green-500" : "text-red-500"}`}>●</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {activeChat && (
          <div className="flex items-center p-4 border-t border-dark-4">
            <div className="relative flex items-center w-full">
              <label htmlFor="file-upload" className="absolute left-3 cursor-pointer">
                <img src="/assets/icons/fileicon.svg" alt="Upload" width={20} height={20} />
              </label>
              <input type="file" id="file-upload" style={{ display: "none" }} onChange={handleFileUpload} />
              <input
                type="text"
                value={inputMessage}
                onChange={handleTyping}
                placeholder="Write your message here..."
                className="w-full bg-dark-4 text-white pl-10 pr-10 py-4 rounded-full outline-none placeholder-gray-500"
                onKeyDown={handleKeyDown}
              />
              <button className="absolute right-3">
                <img src="/assets/icons/micicon.svg" alt="Mic" width={20} height={20} />
              </button>
            </div>
            <button onClick={handleSendMessage} className="ml-3 p-3 rounded-xl bg-yellow-500 text-black hover:text-yellow-600">
              <img src="/assets/icons/send.svg" alt="Send message" width={30} height={30} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chats;
