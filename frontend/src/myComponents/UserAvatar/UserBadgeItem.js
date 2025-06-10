import React from "react";
import { Badge, Avatar } from "@chakra-ui/react";
import { useState } from "react";
import crossImg from "../../assets/cancelIcon.png";

const UserBadgeItem = ({ user, handleFunction }) => {
  const [source, setSource] = useState(user.pic);
  const [background, setBackground] = useState("#2B2B2B");
  function highlight() {
    setSource(crossImg);
    setBackground("#322525");
  }
  function unhighlight() {
    setSource(user.pic);
    setBackground("#2B2B2B");
  }
  return (
    <Badge
      py={1}
      paddingRight={"15px"}
      borderRadius="40px"
      m={1}
      mb={2}
      variant="solid"
      fontSize={14}
      backgroundColor={background}
      cursor="pointer"
      onClick={handleFunction}
      onMouseOver={highlight}
      onMouseLeave={unhighlight}
      color={"white"}
      maxWidth={"130px"}
      height={"30px"}
      overflow={"hidden"}
    >
      <Avatar.Root
        width={"30px"}
        height={"30px"}
        marginLeft={"-5px"}
        marginRight={"5px"}
      >
        <Avatar.Fallback name={user.name} />
        <Avatar.Image src={source} />
      </Avatar.Root>
      {user.name}
    </Badge>
  );
};

export default UserBadgeItem;
