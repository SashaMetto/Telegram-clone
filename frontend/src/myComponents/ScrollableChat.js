import React from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogic";
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

              marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
              maxWidth: "100%",
            }}
            key={m._id}
          >
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#4372A0" : "#212121"
                }`,

                borderRadius: "20px",
                padding: "5px 15px",
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
