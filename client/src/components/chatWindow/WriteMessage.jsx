import { Box, TextField } from "@mui/material";
import { TelegramLogo } from "@phosphor-icons/react";
import React, { useState } from "react";
import { writeGroupMessage, writeMessage } from "../../reactQuery/mutation";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "react-query";
import { socket } from "../../socket/index";

const WriteMessage = ({ setScrollView }) => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const isGroup = chatData.userInfo.group;
  const chatUserId = chatData.userInfo.id;

  const queryClient = useQueryClient();

  const [sendMessage, setSendMessage] = useState("");

  const writeMessageMutation = useMutation({
    mutationFn: (body) => {
      if (isGroup) {
        return writeGroupMessage(body);
      } else {
        return writeMessage(body);
      }
    },
    onMutate: async (body) => {
      // add message into user chat
      queryClient.setQueriesData(["userChats", chatUserId], (oldData) => {
        let update = false;
        let newData = oldData.map((item) => {
          if (item.date.toLowerCase() === "today") {
            update = true;
            item.messages.push({
              time: "now",
              content: body.content,
              id: Math.floor(Math.random() * 90000) + 10000,
              createdBy: auth.userId,
              createdByUser: auth.firstName + " " + auth.lastName,
            });
          }
          return item;
        });
        if (update === false) {
          newData = [
            ...oldData,
            {
              date: "Today",
              messages: [
                {
                  time: "now",
                  content: body.content,
                  id: Math.floor(Math.random() * 90000) + 10000,
                  createdBy: auth.userId,
                  createdByUser: auth.firstName + " " + auth.lastName,
                },
              ],
            },
          ];
        }
        return newData;
      });
      setScrollView(Math.floor(Math.random() * 90000) + 10000);

      // update last message in card
      if (isGroup) {
        queryClient.setQueriesData(["allGroups"], (oldData) => {
          const newData = oldData.map((item) => {
            if (item._id === body.groupId) {
              item.lastMessage = auth.firstName + ": " + body.content;
              // item.senderUser = auth.firstName;
            }
            return item;
          });
          return newData;
        });
      } else {
        queryClient.setQueriesData(["allChats"], (oldData) => {
          const newData = oldData.map((item) => {
            if (item.friendId === body.userB) {
              item.lastMessage = body.content;
            }
            return item;
          });

          return newData;
        });
      }
    },
    onSuccess: async (queryKey, body) => {
      // set data
      // console.log("message created successfully");
    },
  });

  const onSendMessage = () => {
    if (isGroup) {
      const socketData = {
        groupId: chatUserId,
        userId: auth.userId,
        content: sendMessage,
        socketId: socket.id,
      };

      socket.emit("sendGroupMessage", socketData);

      socket.emit("sendGroupNotification", socketData);

      writeMessageMutation.mutate({
        userId: auth.userId,
        groupId: chatUserId,
        status: "sent",
        content: sendMessage,
      });
    } else {
      const socketData = {
        userA: auth.userId,
        userB: chatUserId,
        content: sendMessage,
      };
      socket.emit("sendMessage", socketData);

      socket.emit("sendNotification", socketData);

      writeMessageMutation.mutate({
        userA: auth.userId,
        userB: chatUserId,
        status: "sent",
        content: sendMessage,
      });
    }

    setSendMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        bgcolor: "var(--chatEnterMessageButtonMarginColor)",
        p: "1rem",
        borderLeft: "1.5px solid #B4B4B4",
      }}
    >
      <Box sx={{ width: "90%" }}>
        <TextField
          id="enter-message"
          placeholder="Write a message..."
          value={sendMessage}
          onChange={(e) => setSendMessage(e.target.value)}
          sx={{
            borderColor: "green",
            input: {
              color: "var(--chatEnterMessageButtonFontColor)",
              bgcolor: "var(--chatEnterMessageButtonBackgroundColor)",
              height: "1.2rem",
              outline: "none",
            },
          }}
          variant="outlined"
          fullWidth
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              if (sendMessage !== "") {
                onSendMessage();
              }
            } else {
              const socketData = {
                userA: auth.userId,
                userB: chatUserId,
              };
              socket.emit("userTyping", socketData);
            }
          }}
        />
      </Box>
      <Box sx={{ width: "10%", ml: "2rem" }}>
        <Box
          sx={{
            p: "0.9rem",
            bgcolor: "var(--chatMessageBlue)",
            height: "1.7rem",
            width: "1.7rem",
            borderRadius: "1rem",
          }}
        >
          <TelegramLogo
            size={28}
            color="#fff"
            onClick={() => {
              if (sendMessage !== "") {
                onSendMessage();
              }
            }}
            style={{ cursor: "pointer" }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default WriteMessage;
