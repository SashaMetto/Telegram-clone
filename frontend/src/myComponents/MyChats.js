import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { toaster } from "../components/ui/toaster";
import axios from "axios";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Avatar,
  Menu,
  Portal,
  Text,
  Stack,
} from "@chakra-ui/react";
import writeIcon from "../assets/write.png";
import channelIcon from "../assets/channel.png";
import groupChatIcon from "../assets/groupPlaceholder.png";
import ChatLoading from "./ChatLoading";
import { getSender, getSenderFull } from "../config/ChatLogic";
import GroupChatDrawer from "./misc/GroupChatDrawer";
import SingleChatDrawer from "./misc/SingleChatDrawer";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toaster.create({
        description: `Ошибка`,
        type: "error",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDirection="column"
      alignItems="flex-end"
      bg="#212121"
      w={{ base: "100vw", md: "40vw" }}
      maxWidth={{ base: "100%", md: "400px" }}
      height="calc(100vh - (45px))"
      borderWidth="1px"
      borderTop={"1px solid #212121"}
      overflowY={"scroll"}
    >
      <Box
        fontSize="15px"
        bg="#E8E8E8"
        w="100%"
        height="100%"
        display="flex"
        color="white"
        p={4}
        borderRadius="lg"
        background="#212121"
      >
        {chats ? (
          <Stack w="100%">
            {chats.map((chat) => (
              <Box
                onClick={(e) => {
                  setSelectedChat(chat);
                  e.currentTarget.style.background = "#8774e1";
                }}
                onMouseOver={(e) => {
                  if (selectedChat !== chat)
                    e.currentTarget.style.background = "grey";
                  else e.currentTarget.style.background = "";
                }}
                onMouseLeave={(e) => {
                  if (selectedChat !== chat)
                    e.currentTarget.style.background = "#212121";
                  else e.currentTarget.style.background = "";
                }}
                bg={selectedChat !== chat ? "#212121" : "#8774e1"}
                cursor="pointer"
                w="100%"
                display="flex"
                alignItems="center"
                color="white"
                py={2}
                px={1}
                borderRadius="lg"
                key={chat._id}
              >
                <Avatar.Root marginRight="20px">
                  <Avatar.Fallback name={user.name} />
                  <Avatar.Image
                    src={
                      !chat.isGroupChat
                        ? getSenderFull(loggedUser, chat.users).pic
                        : groupChatIcon
                    }
                  />
                </Avatar.Root>
                <Stack>
                  <Text>
                    {!chat.isGroupChat
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  {chat.latestMessage && (
                    <Text
                      fontSize="xs"
                      color={selectedChat !== chat ? "#A8AAAA" : "white"}
                    >
                      {chat.latestMessage.content.length > 50
                        ? chat.latestMessage.content.substring(0, 51) + "..."
                        : chat.latestMessage.content}
                    </Text>
                  )}
                </Stack>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
      <Menu.Root positioning={{ placement: "top-end" }}>
        <Menu.Trigger asChild>
          <Button
            position="absolute"
            bottom="15px"
            variant="ghost"
            width="55px"
            height="55px"
            borderRadius="50%"
            bg="#8774e1"
            marginRight="20px"
            marginBottom="10px"
            padding="0px"
          >
            <img src={writeIcon} width="30px" height="30px" />
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content backgroundColor={"#212121"}>
              <Menu.Item value="new-channel">
                <img src={channelIcon}></img>Создать канал
              </Menu.Item>
              <GroupChatDrawer></GroupChatDrawer>
              <SingleChatDrawer></SingleChatDrawer>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Box>
  );
};

export default MyChats;
