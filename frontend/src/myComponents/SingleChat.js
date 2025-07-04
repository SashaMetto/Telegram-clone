import React, { useEffect, useState } from "react";
import axios from "axios";
import { ChatState } from "../Context/ChatProvider";
import { Box, Button, Input, Menu, Portal } from "@chakra-ui/react";
import { getSenderFull } from "../config/ChatLogic";
import UserListItem from "./UserAvatar/UserListItem";
import searchIcon from "../assets/chatSearchIcon.png";
import menuIcon from "../assets/chatMenuIcon.png";
import sendIcon from "../assets/sendIcon.png";
import backIcon from "../assets/arrowback.png";
import removeIcon from "../assets/removeIcon.png";
import { CiFaceSmile } from "react-icons/ci";
import { GoPaperclip } from "react-icons/go";
import { Toaster, toaster } from "../components/ui/toaster";
import ScrollableChat from "./ScrollableChat";
import "../App.css";
import io from "socket.io-client";
import GroupListItem from "./UserAvatar/GroupListItem";
import ScrollableGroupChat from "./ScrollableGroupChat";

const ENDPOINT = "http://localhost:5000";
var socket, selectedChatCompare;

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { selectedChat, setSelectedChat, user } = ChatState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);

  const handleRemove = async (user1) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
    } catch (error) {
      toaster.create({
        description: `Ошибка`,
        type: "error",
      });
    }
  };

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
      socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toaster.create({
        description: `Не удалось загрузить сообщения`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
  }, []);

  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      setMessages([...messages, newMessageRecieved]);
    });
  });

  const sendMessage = async () => {
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

        socket.emit("new message", data);
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
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              display="flex"
              background="#212121"
              width={"100%"}
              height="55px"
              padding={0}
              paddingLeft={"15px"}
            >
              <Button
                variant="ghost"
                marginTop="8px"
                marginRight={"10px"}
                display={{ base: "flex", md: "none" }}
                onClick={() => setSelectedChat("")}
              >
                <img src={backIcon} width="20px" height="20px" />
              </Button>
              {!selectedChat.isGroupChat ? (
                <UserListItem
                  key={user._id}
                  user={getSenderFull(user, selectedChat.users)}
                  handleFunction={() => {}}
                />
              ) : (
                <>
                  <GroupListItem
                    key={user._id}
                    user={getSenderFull(user, selectedChat.users)}
                    handleFunction={() => {}}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </>
              )}
              <Button variant="ghost" marginTop="8px">
                <img src={searchIcon} width="20px" height="20px" />
              </Button>
              <Menu.Root>
                <Menu.Trigger asChild>
                  <Button variant="ghost" marginTop="7px" marginRight="12px">
                    <img src={menuIcon} width="17px" height="17px" />
                  </Button>
                </Menu.Trigger>
                <Portal>
                  <Menu.Positioner>
                    <Menu.Content backgroundColor={"#212121"}>
                      <Menu.Item
                        value="new-txt"
                        color={"#FF5A5B"}
                        cursor={"pointer"}
                        onClick={() => handleRemove(user)}
                      >
                        <img
                          src={removeIcon}
                          width={"22px"}
                          height={"22px"}
                        ></img>
                        Покинуть чат
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Portal>
              </Menu.Root>
            </Box>
            <div
              className="chat-div"
              style={{
                height: "calc(100vh - (60px + 60px + 20px))",
                width: "95%",
                paddingBottom: "10px",
              }}
            >
              {selectedChat.isGroupChat ? (
                <ScrollableGroupChat messages={messages} />
              ) : (
                <ScrollableChat messages={messages} />
              )}
            </div>
            <Box
              display="flex"
              flexDir="row"
              alignItems={"center"}
              justifyContent="flex-end"
              width="95%"
              height="60px"
              marginBottom={"20px"}
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
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default SingleChat;
