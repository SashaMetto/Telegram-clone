import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
import { Avatar } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "../App.css";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: `${
                m.sender._id === user._id ? "flex-end" : "flex-start"
              }`,
              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 15,
            }}
            key={m._id}
          >
            {isSameSender(messages, m, i, user._id) ||
            isLastMessage(messages, i, user._id) ? (
              <Avatar.Root marginRight="10px" marginLeft="10px">
                <Avatar.Fallback name={m.sender.name} />
                <Avatar.Image src={m.sender.pic} />
              </Avatar.Root>
            ) : (
              <></>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#4372A0" : "#212121"
                }`,
                marginLeft:
                  isSameSender(messages, m, i, user._id) ||
                  isLastMessage(messages, i, user._id)
                    ? "0"
                    : "60px",
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
