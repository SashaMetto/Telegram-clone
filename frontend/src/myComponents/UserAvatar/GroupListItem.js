import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import {
  Box,
  Text,
  Drawer,
  Button,
  Input,
  Portal,
  Avatar,
  Field,
  defineStyle,
} from "@chakra-ui/react";
import backIcon from "../../assets/arrowback.png";
import groupPlaceholderImage from "../../assets/groupPlaceholder.png";
import submitTick from "../../assets/submitTick.png";
import MemberDrawer from "../misc/MembersDrawer";
import axios from "axios";
import { toaster } from "../../components/ui/toaster";

const GroupListItem = ({ user, handleFunction, fetchAgain, setFetchAgain }) => {
  const floatingStyles = defineStyle({
    pos: "absolute",
    bg: "bg",
    px: "0.5",
    top: "-3",
    insetStart: "2",
    fontWeight: "normal",
    pointerEvents: "none",
    transition: "position",
    color: "gray",
    backgroundColor: "#212121",
  });
  const { selectedChat, setSelectedChat, user: userBearer } = ChatState();
  const [groupChatName, setGroupChatName] = useState(selectedChat.chatName);
  const memberCountText = () => {
    if (
      (selectedChat.users.length % 10 === 1 &&
        selectedChat.users.length > 20) ||
      selectedChat.users.length === 1
    ) {
      return `${selectedChat.users.length} участник`;
    } else if (
      selectedChat.users.length % 10 === 0 ||
      (selectedChat.users.length > 10 && selectedChat.users.length < 20) ||
      selectedChat.users.length % 10 > 4
    ) {
      return `${selectedChat.users.length} участников`;
    } else if (
      selectedChat.users.length % 10 < 5 ||
      selectedChat.users.length % 10 > 1
    ) {
      return `${selectedChat.users.length} участника`;
    }
  };

  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userBearer.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      console.log(data._id);
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toaster.create({
        description: `Ошибка`,
        type: "error",
      });
    }
    setGroupChatName("");
  };

  return (
    <>
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Box
            onClick={handleFunction}
            cursor="pointer"
            bg="#E8E8E8"
            _hover={{
              background: "#2f2f2f",
              color: "white",
            }}
            w="100%"
            display="flex"
            alignItems="center"
            color="white"
            py={2}
            borderRadius="lg"
            background="#212121"
          >
            <Avatar.Root marginRight="20px" colorPalette="gray">
              <Avatar.Fallback name={user.name} />
              <Avatar.Image src={groupPlaceholderImage} />
            </Avatar.Root>
            <Box>
              <Text>{selectedChat.chatName}</Text>
              <Text color="#a0a0a0">{memberCountText()}</Text>
            </Box>
          </Box>
        </Drawer.Trigger>
        <Portal>
          <Drawer.Backdrop />
          <Drawer.Positioner>
            <Drawer.Content>
              <Drawer.Header display="flex" background="#212121">
                <Drawer.Trigger asChild>
                  <Button background="#212121" marginTop={"-8px"}>
                    <img src={backIcon} width="20px" height="20px"></img>
                  </Button>
                </Drawer.Trigger>
                <Text fontSize="20px" marginLeft="15px" fontWeight="bold">
                  Изменить
                </Text>
              </Drawer.Header>
              <Drawer.Body background="#212121">
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  flexDirection={"column"}
                >
                  <Avatar.Root
                    marginTop="20px"
                    width={"100px"}
                    height={"100px"}
                  >
                    <Avatar.Fallback name={user.name} />
                    <Avatar.Image src={groupPlaceholderImage} />
                  </Avatar.Root>
                  <Field.Root marginTop="40px">
                    <Box pos="relative" w="full">
                      <Input
                        className="peer"
                        value={groupChatName}
                        onChange={(e) => setGroupChatName(e.target.value)}
                      />
                      <Field.Label css={floatingStyles}>
                        Название группы
                      </Field.Label>
                    </Box>
                  </Field.Root>
                  <MemberDrawer
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  ></MemberDrawer>
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
                    left="240px"
                    padding="0px"
                    onClick={() => handleRename()}
                  >
                    <img src={submitTick} width="30px" height="30px" />
                  </Button>
                </Box>
              </Drawer.Body>
            </Drawer.Content>
          </Drawer.Positioner>
        </Portal>
      </Drawer.Root>
    </>
  );
};

export default GroupListItem;
