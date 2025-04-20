import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../myComponents/misc/SideDrawer";
import MyChats from "../myComponents/MyChats";
import ChatBox from "../myComponents/ChatBox";
const backgroundImage = require("../assets/background.jpg");
const ChatPage = () => {
  const { user } = ChatState();
  return (
    <div
      style={{
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        width="100%"
        height={"91.5vh"}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
