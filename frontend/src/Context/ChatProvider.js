import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext("");

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState(false);
  const [chats, setChats] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [selectedGroupUsers, setSelectedGroupUsers] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        selectedUser,
        setSelectedUser,
        selectedGroupUsers,
        setSelectedGroupUsers,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
