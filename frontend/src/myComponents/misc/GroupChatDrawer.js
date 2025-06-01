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
import { Toaster, toaster } from "../../components/ui/toaster";
import { useState, useEffect } from "react";
import searchIcon from "../../assets/searchIcon.png";
import menuIcon from "../../assets/hammenu.png";
import backIcon from "../../assets/arrowback.png";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItemGroup from "../UserAvatar/UserListItemGroup";

const GroupChatDrawer = ({ children }) => {
  const [userSearch, setUserSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");

  const { user, chats, setChats, selectedGroupUsers, setSelectedGroupUsers } =
    ChatState();

  const handleUserSearch = async (query) => {
    setUserSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${userSearch}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toaster.create({
        description: `Не удалось загрузить результаты поиска`,
        type: "error",
      });
    }
  };

  const handleGroup = (userToAdd) => {
    console.log(userToAdd);
    console.log(selectedGroupUsers);
    if (
      selectedGroupUsers.includes(userToAdd) ||
      selectedGroupUsers.find((element) => element.name == userToAdd.name)
    ) {
      const indexo = selectedGroupUsers.indexOf(
        selectedGroupUsers.find((element) => element.name == userToAdd.name)
      );
      selectedGroupUsers.splice(indexo, 1);
      const copy = [...selectedGroupUsers];
      setSelectedGroupUsers(copy);
    } else {
      setSelectedGroupUsers([...selectedGroupUsers, userToAdd]);
    }
  };

  const handleDelete = () => {};

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
                  value={groupChatName}
                  onChange={(e) => setGroupChatName(e.target.value)}
                />
                <Input
                  placeholder="Добавить людей..."
                  variant="outline"
                  backgroundSize={"20px"}
                  border="none"
                  color="gray"
                  fontSize="15px"
                  value={userSearch}
                  onChange={(e) => handleUserSearch(e.target.value)}
                />
              </Stack>
              <div d={"flex"} flexDirection={"row"} width={"100%"}>
                {selectedGroupUsers.map((u, i) => (
                  <UserBadgeItem
                    key={i}
                    user={u}
                    handleFunction={() => handleDelete(u)}
                  />
                ))}
              </div>
            </Drawer.Header>

            <Drawer.Body background="#212121">
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user, i) => (
                  <UserListItemGroup
                    key={i}
                    user={user}
                    handleFunction={() => handleGroup(user)}
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
