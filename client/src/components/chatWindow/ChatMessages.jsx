import { Box, Card, Divider, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { fetchGroupMessages, fetchUserMessages } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import { socket } from "../../socket";

const ChatMessages = ({ scrollView, setScrollView }) => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData.userInfo.id;

  const isGroup = chatData.userInfo.group;

  const scroll1 = useRef(null);

  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["userChats", chatUserId],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId && chatUserId) {
        if (chatData.userInfo.group) {
          return fetchGroupMessages({
            userId: auth.userId,
            groupId: chatUserId,
          });
        } else
          return fetchUserMessages({ userA: auth.userId, userB: chatUserId });
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId && !!chatUserId,
  });

  const messages = data;

  useEffect(() => {
    if (scroll1.current)
      scroll1.current.scrollIntoView({
        // behavior: "smooth",
        block: "end",
      });
  }, [scrollView, data]);

  useEffect(() => {
    if (isGroup) {
      socket.on("receiveGroupMessage", (data) => {
        // console.log("receiveGroupMessage data:", data);

        if (chatUserId === data.groupId) {
          // add message into user chat
          queryClient.setQueriesData(["userChats", chatUserId], (oldData) => {
            let update = false;
            let newData = oldData.map((item) => {
              if (item.date.toLowerCase() === "today") {
                update = true;
                item.messages.push({
                  time: "now",
                  content: data.content,
                  id: Math.floor(Math.random() * 90000) + 10000,
                  createdBy: data.createdBy,
                  createdByUser: data.createdByUser,
                });
              }
              return item;
            });
            if (!update) {
              newData = [
                ...oldData,
                {
                  date: "Today",
                  messages: [
                    {
                      time: "now",
                      content: data.content,
                      id: Math.floor(Math.random() * 90000) + 10000,
                      createdBy: data.createdBy,
                      createdByUser: data.createdByUser,
                    },
                  ],
                },
              ];
            }
            return newData;
          });
          setScrollView(Math.floor(Math.random() * 90000) + 10000);

          // update last message in group chat card
          queryClient.setQueriesData(["allGroups"], (oldData) => {
            const newData = oldData.map((item) => {
              if (item._id === data.groupId) {
                item.lastMessage =
                  data.createdByUser.split(" ")[0] + ": " + data.content;
                // item.senderUser = auth.firstName;
              }
              return item;
            });
            return newData;
          });
        }
      });
    } else {
      socket.on("receiveMessage", (data) => {
        if (auth.userId === data.receiverUser) {
          // add message into user chat
          queryClient.setQueriesData(
            ["userChats", data.createdBy],
            (oldData) => {
              let update = false;
              let newData = oldData.map((item) => {
                if (item.date.toLowerCase() === "today") {
                  item.messages.push({
                    time: "now",
                    content: data.content,
                    id: Math.floor(Math.random() * 90000) + 10000,
                    createdBy: data.createdBy,
                  });
                  update = true;
                }
                return item;
              });
              if (!update) {
                newData = [
                  ...oldData,
                  {
                    date: "Today",
                    messages: [
                      {
                        time: "now",
                        content: data.content,
                        id: Math.floor(Math.random() * 90000) + 10000,
                        createdBy: data.createdBy,
                      },
                    ],
                  },
                ];
              }
              return newData;
            }
          );

          // update last message in the user chat card
          queryClient.setQueriesData(["allChats"], (oldData) => {
            const newData = oldData.map((item) => {
              if (item.friendId === data.createdBy) {
                item.lastMessage = data.content;
              }
              return item;
            });
            // console.log("new Data", newData);
            return newData;
          });

          setScrollView(Math.floor(Math.random() * 90000) + 10000);
        }
      });
    }
  }, [socket]);

  if (isLoading) {
    return <LocalLoader />;
  }

  return (
    <Box
      sx={{
        height: "82%",
        p: "1rem",
        overflow: "scroll",

        // bgcolor: "green",
      }}
    >
      {messages.map((item, index) => {
        return (
          <Box sx={{ width: "100%" }} key={index}>
            <Divider textAlign="center" sx={{ mx: "1rem" }}>
              <Typography sx={{ mb: "1rem", mt: "1rem" }}>
                {item.date}
              </Typography>
            </Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {item.messages.map((individualMessage, index) => {
                return (
                  <Box
                    key={index}
                    sx={{
                      alignSelf:
                        individualMessage.createdBy !== auth.userId
                          ? "flex-start"
                          : "flex-end",
                      maxWidth: "65%",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          alignSelf:
                            individualMessage.createdBy !== auth.userId
                              ? "flex-start"
                              : "flex-end",
                          fontSize: "0.9rem",
                          m:
                            individualMessage.createdBy !== auth.userId
                              ? "0 0 0 0.6rem "
                              : "0 0.6rem 0 0 ",
                        }}
                      >
                        <b> {isGroup ? individualMessage.createdByUser : ""}</b>{" "}
                        {individualMessage.time}
                      </Typography>
                      <Card
                        elevation={0}
                        sx={{
                          //   width: "50%",
                          bgcolor:
                            individualMessage.createdBy !== auth.userId
                              ? "var(--chatLeft)"
                              : "var(--chatRight)",
                          px: "1rem",
                          py: "1rem",
                          borderRadius: "1.3rem",
                          color:
                            individualMessage.createdBy !== auth.userId
                              ? "black"
                              : "white",
                        }}
                      >
                        <Typography> {individualMessage.content}</Typography>
                      </Card>
                    </Box>
                  </Box>
                );
              })}
            </Box>
          </Box>
        );
      })}
      <Box ref={scroll1}></Box>
    </Box>
  );
};

export default ChatMessages;
