import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import searchIcon from "../../assets/searchIcon.png";
import menuIcon from "../../assets/hammenu.png";
import backIcon from "../../assets/arrowback.png";
import axios from "axios";
import { Toaster, toaster } from "../../components/ui/toaster";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";
import ChatLoading from "../ChatLoading";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [userSearch, setUserSearch] = useState();
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  let navigate = useNavigate();
  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    setSelectedUser,
  } = ChatState();

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

  const accessChat = async (userId, res) => {
    console.log(res);
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      setSelectedUser(res);
    } catch (error) {
      toaster.create({
        title: "Ошибка",
        description: error.message,
        type: "error",
      });
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  useEffect(() => {
    handleUserSearch();
  }, [userSearch]);

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        background="#212121"
        width="100%"
      >
        <Menu.Root>
          <Menu.Trigger asChild>
            <Button variant="ghost" marginTop="5px">
              <img src={menuIcon} width="20px" height="20px" />
            </Button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Box
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
                  <Avatar.Root marginRight="20px" marginLeft="10px">
                    <Avatar.Fallback name={user.name} />
                    <Avatar.Image src={user.pic} />
                  </Avatar.Root>
                  <Box marginRight="20px">
                    <Text>{user.name}</Text>
                  </Box>
                </Box>
                <Menu.Item value="new-txt-b">Добавить аккаунт</Menu.Item>
                <Menu.Item value="new-txt-c">Избранное</Menu.Item>
                <Menu.Item value="new-txt-d">Архив</Menu.Item>
                <Menu.Item value="new-txt-e">Мои истории</Menu.Item>
                <Drawer.Root placement="start" size="xs">
                  <Drawer.Trigger asChild>
                    <Menu.Item value="new-txt-f" cursor={"pointer"}>
                      Контакты
                    </Menu.Item>
                  </Drawer.Trigger>
                  <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                      <Drawer.Content>
                        <Drawer.Header display="flex" background="#212121">
                          <Drawer.Trigger asChild>
                            <Button variant="ghost">
                              <img src={backIcon} width="20px" height="20px" />
                            </Button>
                          </Drawer.Trigger>
                          <Input
                            placeholder="Поиск"
                            variant="outline"
                            background={`url(${searchIcon}) no-repeat 15px 10px`}
                            backgroundSize={"20px"}
                            border="1px solid #2E2E2E"
                            backgroundColor="#181818"
                            borderRadius="30px"
                            color="gray"
                            fontSize="15px"
                            padding="12px 20px 12px 50px"
                            value={userSearch}
                            onChange={(e) => setUserSearch(e.target.value)}
                          />
                        </Drawer.Header>
                        <Drawer.Body background="#212121">
                          {loading ? (
                            <ChatLoading />
                          ) : (
                            searchResult?.map((user) => (
                              <UserListItem
                                key={user._id}
                                user={user}
                                handleFunction={() =>
                                  accessChat(user._id, user.name)
                                }
                              />
                            ))
                          )}
                        </Drawer.Body>
                      </Drawer.Content>
                    </Drawer.Positioner>
                  </Portal>
                </Drawer.Root>
                <Menu.Item value="new-txt-g">Настройки</Menu.Item>
                <Menu.Item
                  value="new-txt-h"
                  onClick={logoutHandler}
                  cursor={"pointer"}
                >
                  Выйти
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
        <Input
          placeholder="Поиск"
          variant="outline"
          background={`url(${searchIcon}) no-repeat 15px 10px`}
          backgroundSize={"20px"}
          border="1px solid #2E2E2E"
          backgroundColor="#181818"
          borderRadius="30px"
          color="gray"
          fontSize="15px"
          padding="12px 20px 12px 50px"
          value={userSearch}
          onChange={(e) => setUserSearch(e.target.value)}
          width="90%"
          marginRight="20px"
          marginTop="5px"
        />
      </Box>
    </>
  );
};

export default SideDrawer;
