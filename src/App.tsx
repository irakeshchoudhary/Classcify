import { Routes, Route } from "react-router-dom";
import UserDetails from "@/_auth/forms/Userdetails"; // Import your UserDetails component
import {
  Home,
  CreatePost,
  Profile,
  EditPost,
  PostDetails,
  UpdateProfile,
  Settings,
  Notify,
  Contents,
  Chats,
  Events,
  Acedemic
} from "@/_root/pages";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
import SignupForm from "@/_auth/forms/SignupForm";
import SigninForm from "@/_auth/forms/SigninForm";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "./notFound"; // Ensure you have this component

import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Route for User Details after Signup */}
        <Route path="/user-details" element={<UserDetails />} />

        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notify" element={<Notify />} />
          <Route path="/Acedemic" element={<Acedemic />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/Chats" element={<Chats />} />
          {/* Add dynamic chat route here */}
          <Route path="/Chats/:userId" element={<Chats />} />
          <Route path="*" element={<NotFound />} /> {/* 404 Not Found */}
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
