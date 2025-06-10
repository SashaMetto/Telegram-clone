import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../myComponents/misc/SideDrawer";
import MyChats from "../myComponents/MyChats";
import ChatBox from "../myComponents/ChatBox";
const backgroundImage = require("../assets/background.jpg");
const ChatPage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box display={"flex"} flexDirection={"column"}>
        {user && <SideDrawer />}
        {user && <MyChats fetchAgain={fetchAgain} />}
      </Box>
      <Box width="100%">
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
