import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Text, Box, Button, Input } from "@chakra-ui/react";
import { getSenderFull } from "../config/ChatLogic";
import UserListItem from "./UserAvatar/UserListItem";
import searchIcon from "../assets/chatSearchIcon.png";
import menuIcon from "../assets/chatMenuIcon.png";
import sendIcon from "../assets/sendIcon.png";
import { CiFaceSmile } from "react-icons/ci";
import { IconContext } from "react-icons";
import { GoPaperclip } from "react-icons/go";
import { Toaster, toaster } from "../components/ui/toaster";
import ScrollableChat from "./ScrollableChat";
import "../App.css";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
    } catch (error) {
      toaster.create({
        description: `Не удалось загрузить сообщения`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [selectedChat]);

  const sendMessage = async (event) => {
    if (newMessage) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post(
          "/api/message",
          {
            content: newMessage,
            chatId: selectedChat,
          },
          config
        );
        setMessages([...messages, data]);
      } catch (error) {
        toaster.create({
          description: `Не удалось отправить сообщение`,
          type: "error",
        });
      }
    }
  };

  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  };

  return (
    <>
      {selectedChat ? (
        <>
          {" "}
          <Box
            display="flex"
            background="#212121"
            width={"100%"}
            height="55px"
            padding={0}
            paddingLeft={"15px"}
          >
            <UserListItem
              key={user._id}
              user={getSenderFull(user, selectedChat.users)}
              handleFunction={() => {}}
            />
            <Button variant="ghost" marginTop="8px">
              <img src={searchIcon} width="20px" height="20px" />
            </Button>
            <Button variant="ghost" marginTop="7px" marginRight="12px">
              <img src={menuIcon} width="17px" height="17px" />
            </Button>
          </Box>
          <div className="chat-div">
            <ScrollableChat messages={messages} />
          </div>
          <Box
            display="flex"
            flexDir="row"
            alignItems={"center"}
            justifyContent="flex-end"
            bottom="15px"
            width="50vw"
            height="60px"
          >
            <Button
              variant="ghost"
              backgroundColor={"rgb(33,33,33)"}
              height={"60px"}
              width={"50px"}
              padding={"0"}
              borderRadius={"20px 0 0 20px"}
            >
              <CiFaceSmile />
            </Button>
            <Input
              placeholder="Сообщение"
              variant="subtle"
              height={"60px"}
              backgroundColor={"rgb(33,33,33)"}
              borderRadius={"0"}
              onChange={typingHandler}
              value={newMessage}
            />
            <Button
              variant="ghost"
              backgroundColor={"rgb(33,33,33)"}
              height={"60px"}
              width={"50px"}
              padding={"0"}
              borderRadius={" 0 20px 20px 0 "}
            >
              <GoPaperclip color="#aaaaaa" />
            </Button>
            <Button
              variant="ghost"
              width="55px"
              height="55px"
              borderRadius="50%"
              bg="#cc73e1"
              marginRight="20px"
              marginBottom="5px"
              marginLeft="10px"
              padding="0px"
              onClick={sendMessage}
            >
              <img src={sendIcon} width="25px" height="25px" />
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleChat;
