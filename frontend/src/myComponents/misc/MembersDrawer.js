import React from "react";
import {
  Box,
  Button,
  Input,
  Avatar,
  Drawer,
  Portal,
  Text,
  Stack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import backIcon from "../../assets/arrowback.png";
import group from "../../assets/group.png";
import ChatLoading from "../ChatLoading";
import { ChatState } from "../../Context/ChatProvider";
import UserListItem from "../UserAvatar/UserListItem";
import GroupChatAddUserModal from "./GroupChatAddUserModal";

const MemberDrawer = ({ fetchAgain, setFetchAgain }) => {
  const [userSearch, setUserSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user, selectedChat } = ChatState();

  const handleUserSearch = () => {
    const result = selectedChat.users.filter(
      (user) =>
        user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearch.toLowerCase())
    );
    setSearchResult(result);
  };

  useEffect(() => {
    handleUserSearch();
  }, [userSearch]);

  return (
    <Drawer.Root placement="end">
      <Drawer.Trigger asChild>
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
          marginTop={"20px"}
        >
          <Avatar.Root marginRight="20px" colorPalette="gray" marginTop="3px">
            <Avatar.Fallback name={user.name} />
            <Avatar.Image src={group} />
          </Avatar.Root>
          <Box>
            <Text>Участники</Text>
            <Text color="#a0a0a0">{selectedChat.users.length}</Text>
          </Box>
        </Box>
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
                  <Button backgroundColor={"#212121"}>
                    <img src={backIcon} width="20px" height="20px" />
                  </Button>
                </Drawer.Trigger>
                <Text
                  fontSize="20px"
                  marginBottom="5px"
                  marginLeft="15px"
                  fontWeight="bold"
                >
                  Участники
                </Text>
              </Stack>
              <Stack
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Input
                  placeholder="Поиск..."
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
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => {}}
                  />
                ))
              )}
              <GroupChatAddUserModal
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              ></GroupChatAddUserModal>
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  );
};

export default MemberDrawer;
