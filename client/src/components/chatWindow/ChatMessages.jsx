import { Box, Card, Divider, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchUserMessages } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import ScrollIntoView from "react-scroll-into-view";

const ChatMessages = ({ scrollView }) => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData.userInfo.id;

  const scroll1 = useRef(null);
  console.log("scrollView", scrollView);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["userChats", chatUserId],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId && chatUserId) {
        return fetchUserMessages({ userA: auth.userId, userB: chatUserId });
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId && !!chatUserId,
  });

  console.log("data", data);

  const messages = data;
  useEffect(() => {
    console.log("scroll useEffect");
    if (scroll1.current)
      scroll1.current.scrollIntoView({
        // behavior: "smooth",
        block: "end",
      });
  }, [scrollView, data]);

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
              {item.messages.map((individualMessage) => {
                return (
                  <Box
                    sx={{
                      alignSelf:
                        individualMessage.createdBy === auth.userId
                          ? "flex-start"
                          : "flex-end",
                      maxWidth: "65%",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          alignSelf:
                            individualMessage.createdBy === auth.userId
                              ? "flex-start"
                              : "flex-end",
                          fontSize: "0.9rem",
                          m:
                            individualMessage.createdBy === auth.userId
                              ? "0 0 0 0.6rem "
                              : "0 0.6rem 0 0 ",
                        }}
                      >
                        {individualMessage.time}
                      </Typography>
                      <Card
                        elevation={0}
                        sx={{
                          //   width: "50%",
                          bgcolor:
                            individualMessage.createdBy === auth.userId
                              ? "var(--chatLeft)"
                              : "var(--chatRight)",
                          px: "1rem",
                          py: "1rem",
                          borderRadius: "1.3rem",
                          color:
                            individualMessage.createdBy === auth.userId
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
