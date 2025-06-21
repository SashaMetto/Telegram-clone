import React, { useState, useEffect } from "react";
import { Button, Input, Menu, Drawer, Portal } from "@chakra-ui/react";
import backIcon from "../../assets/arrowback.png";
import searchIcon from "../../assets/searchIcon.png";
import singleChatIcon from "../../assets/singlechat.png";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import { toaster } from "../../components/ui/toaster";

const SingleChatDrawer = () => {
  const [userSearch, setUserSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    selectedChat,
    setSelectedChat,
    user,
    chats,
    setChats,
    setSelectedUser,
  } = ChatState();

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

  useEffect(() => {
    handleUserSearch();
  }, [userSearch]);

  return (
    <Drawer.Root placement="start" size="xs">
      <Drawer.Trigger asChild>
        <Menu.Item value="new-chat" cursor={"pointer"}>
          <img src={singleChatIcon} style={{ marginRight: "5px" }}></img>
          Начать личный чат
        </Menu.Item>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header display="flex" background="#212121">
              <Drawer.Trigger asChild>
                <Button backgroundColor={"#212121"} marginLeft={"-20px"}>
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
                    handleFunction={() => accessChat(user._id, user.name)}
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

export default SingleChatDrawer;
