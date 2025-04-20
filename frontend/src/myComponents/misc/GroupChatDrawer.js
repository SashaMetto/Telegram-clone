import React from "react";
import {
  Box,
  Button,
  Input,
  Avatar,
  Menu,
  Drawer,
  Portal,
  Circle,
  Float,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import searchIcon from "../../assets/searchIcon.png";
import menuIcon from "../../assets/hammenu.png";
import backIcon from "../../assets/arrowback.png";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

const GroupChatDrawer = ({ children }) => {
  const [userSearch, setUserSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);

  const { user, chats, setChats } = ChatState();
  return (
    <Drawer.Root placement="start">
      <Drawer.Trigger asChild>
        <Menu.Item value="new-txt-f">Создать группу</Menu.Item>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header
              display="flex"
              flexDirection="column"
              bg="#212121"
              //border="2px solid red"
              padding="5px"
              borderBottom="15px solid #181818"
            >
              <Stack
                display="flex"
                flexDirection="row"
                alignItems="center"
                //border="2px solid red"
              >
                <Drawer.Trigger asChild>
                  <Button variant="ghost">
                    <img src={backIcon} width="20px" height="20px" />
                  </Button>
                </Drawer.Trigger>
                <Text
                  fontSize="20px"
                  marginBottom="5px"
                  marginLeft="15px"
                  fontWeight="bold"
                >
                  Добавить участников
                </Text>
              </Stack>
              <Stack
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
                //border="2px solid red"
              >
                <Input
                  placeholder="Название группы"
                  variant="outline"
                  backgroundSize={"20px"}
                  border="none"
                  color="gray"
                  fontSize="15px"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
                <Input
                  placeholder="Добавить людей..."
                  variant="outline"
                  backgroundSize={"20px"}
                  border="none"
                  color="gray"
                  fontSize="15px"
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                />
              </Stack>
            </Drawer.Header>

            <Drawer.Body background="#212121">
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    //handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default GroupChatDrawer;
