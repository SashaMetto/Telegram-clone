import React from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";
import Homepage from "./pages/Homepage";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
