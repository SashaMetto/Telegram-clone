import React from "react";
import {
  Button,
  Input,
  Menu,
  Drawer,
  Portal,
  Text,
  Stack,
} from "@chakra-ui/react";
import { Toaster, toaster } from "../../components/ui/toaster";
import { useState, useEffect } from "react";
import groupIcon from "../../assets/group.png";
import backIcon from "../../assets/arrowback.png";
import submitIcon from "../../assets/submitIcon.png";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import UserListItemGroup from "../UserAvatar/UserListItemGroup";

const GroupChatDrawer = () => {
  const [userSearch, setUserSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groupChatName, setGroupChatName] = useState("");

  const { user, chats, setChats, selectedGroupUsers, setSelectedGroupUsers } =
    ChatState();

  const handleUserSearch = async () => {
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

  useEffect(() => {
    handleUserSearch();
  }, [userSearch]);

  const handleDelete = (userToDelete) => {
    setSelectedGroupUsers(
      selectedGroupUsers.filter((element) => element.name !== userToDelete.name)
    );
  };

  const handleSubmit = async () => {
    if (!groupChatName || !selectedGroupUsers) {
      toaster.create({
        description: `Пожалуйста, заполните все поля`,
        type: "warning",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        `/api/chat/group`,
        {
          name: groupChatName,
          users: JSON.stringify(selectedGroupUsers.map((u) => u._id)),
        },
        config
      );
      setChats([data, ...chats]);
      toaster.create({
        description: `Успешно создан чат`,
        type: "success",
      });
    } catch (error) {
      toaster.create({
        description: `Ошибка`,
        type: "error",
      });
    }
  };

  return (
    <Drawer.Root placement="start">
      <Drawer.Trigger asChild>
        <Menu.Item value="new-txt-f" cursor={"pointer"}>
          <img src={groupIcon}></img>Создать группу
        </Menu.Item>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header
              display="flex"
              flexDirection="column"
              bg="#212121"
              padding="5px"
              borderBottom="15px solid #181818"
            >
              <Stack display="flex" flexDirection="row" alignItems="center">
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
                <div d={"flex"} flexDirection={"row"} width={"100%"}>
                  {selectedGroupUsers.map((u, i) => (
                    <UserBadgeItem
                      key={u._id}
                      user={u}
                      handleFunction={() => handleDelete(u)}
                    />
                  ))}
                </div>
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
                searchResult?.map((user, i) => (
                  <UserListItemGroup
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
              )}
              <Button
                position="absolute"
                bottom="40px"
                variant="ghost"
                width="55px"
                height="55px"
                borderRadius="50%"
                bg="#8774e1"
                marginRight="20px"
                marginBottom="10px"
                left="240px"
                padding="0px"
                onClick={() => handleSubmit()}
              >
                <img src={submitIcon} width="30px" height="30px" />
              </Button>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default GroupChatDrawer;
