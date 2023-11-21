import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ChatMessageCard from "./ChatMessageCard";

const AllChats = () => {
  const allChats1 = [
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
    {
      name: "Cute Turtle",
      message: "That's it goodbye.",
      time: "9:38",
    },
  ];
  return (
    <Box sx={{ height: "90%" }}>
      <Typography
        sx={{
          color: "var(--grayFontColor)",
          fontSize: "1.1rem",
          fontWeight: 500,
          my: "1rem",
        }}
      >
        All Chats
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1.3rem",
          overflowY: "scroll",
          height: "83%",
        }}
      >
        {allChats.map((item, index) => {
          return (
            <ChatMessageCard
              key={index}
              name={item.name}
              message={item.message}
              time={item.time}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default AllChats;
