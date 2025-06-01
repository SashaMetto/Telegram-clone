import React from "react";
import { Badge } from "@chakra-ui/react";
import { IoMdClose } from "react-icons/io";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      backgroundColor="#8774E1"
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      <IoMdClose />
    </Badge>
  );
};

export default UserBadgeItem;
