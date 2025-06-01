import React from "react";
import { ChatState } from "../../Context/ChatProvider";
import { useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import "../../App.css";

const UserListItemGroup = ({ user, handleFunction }) => {
  const [isChecked, setIsChecked] = useState();
  const { selectedGroupUsers } = ChatState();

  useEffect(() => {
    if (selectedGroupUsers.find((element) => element.name == user.name)) {
      setIsChecked(true);
    } else setIsChecked(false);
  });

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
        <input type="checkbox" id="checkboxGroup" checked={isChecked}></input>
        <Avatar.Root marginRight="18px">
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

export default UserListItemGroup;
