import { Box, Card, Divider, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchUserMessages } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";

const ChatMessages = () => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData.userInfo.id;

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
  if (isLoading) {
    return <LocalLoader />;
  }
  const messages = data;

  const messages1 = [
    {
      date: "Oct 11,2023",
      messages: [
        {
          time: "6:38",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kishan",
        },
        {
          time: "9:39",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kishan",
        },
        {
          time: "10:00",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kishan",
        },
        {
          time: "10:01",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kevin",
        },
        {
          time: "10:28",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kevin",
        },
        {
          time: "11:38",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kevin",
        },
      ],
    },
    {
      date: "today",
      messages: [
        {
          time: "6:38",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kevin",
        },
        {
          time: "9:39",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kevin",
        },
        {
          time: "10:00",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kishan",
        },
        {
          time: "10:01",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kevin",
        },
        {
          time: "10:28",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kishan",
        },
        {
          time: "11:38",
          message:
            "In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the",
          createdBy: "Kishan",
        },
      ],
    },
  ];
  return (
    <Box
      sx={{
        height: "100%",
        p: "1rem",
        overflow: "scroll",
        // bgcolor: "green",
      }}
    >
      {messages.map((item) => {
        return (
          <Box sx={{ width: "100%" }}>
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
    </Box>
  );
};

export default ChatMessages;
