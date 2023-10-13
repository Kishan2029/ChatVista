import { Box, Card, Divider, Typography } from "@mui/material";
import React from "react";

const ChatMessages = () => {
  const messages = [
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
                        individualMessage.createdBy === "Kishan"
                          ? "flex-start"
                          : "flex-end",
                      maxWidth: "65%",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography
                        sx={{
                          alignSelf:
                            individualMessage.createdBy === "Kishan"
                              ? "flex-start"
                              : "flex-end",
                          fontSize: "0.9rem",
                          m:
                            individualMessage.createdBy === "Kishan"
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
                            individualMessage.createdBy === "Kishan"
                              ? "var(--chatLeft)"
                              : "var(--chatRight)",
                          px: "1rem",
                          py: "1rem",
                          borderRadius: "1.3rem",
                        }}
                      >
                        <Typography> {individualMessage.message}</Typography>
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
