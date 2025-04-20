import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { Box, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <>
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
        <Avatar.Root marginRight="20px">
          <Avatar.Fallback name={user.name} />
          <Avatar.Image src={user.pic} />
        </Avatar.Root>
        <Box>
          <Text>{user.name}</Text>
          <Text color="#a0a0a0">был(а) недавно</Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
