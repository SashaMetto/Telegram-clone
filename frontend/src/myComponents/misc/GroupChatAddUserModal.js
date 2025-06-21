import React, { useState, useEffect } from "react";
import { Button, Input, Drawer, Portal } from "@chakra-ui/react";
import backIcon from "../../assets/arrowback.png";
import searchIcon from "../../assets/searchIcon.png";
import addGroupUserIcon from "../../assets/addGroupUser.png";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import { toaster } from "../../components/ui/toaster";

const GroupChatAddUserModal = ({ fetchAgain, setFetchAgain }) => {
  const [userSearch, setUserSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { selectedChat, setSelectedChat, user } = ChatState();

  const addUserGroup = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toaster.create({
        description: `Пользователь уже в группе`,
        type: "error",
      });
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toaster.create({
        description: `Ошибка`,
        type: "error",
      });
      setLoading(false);
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
    <Drawer.Root placement="end" size="xs">
      <Drawer.Trigger asChild>
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
          onClick={() => {}}
        >
          <img src={addGroupUserIcon} width="30px" height="30px" />
        </Button>
      </Drawer.Trigger>
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header display="flex" background="#212121">
              <Drawer.Trigger asChild>
                <Button backgroundColor={"#212121"}>
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
                    handleFunction={() => addUserGroup(user)}
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

export default GroupChatAddUserModal;
