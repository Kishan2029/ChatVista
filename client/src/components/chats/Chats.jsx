import { Autocomplete, Box, Typography } from "@mui/material";
import React from "react";
import AllChats from "./AllChats";
import ChatMessageCard from "./ChatMessageCard";

const Chats = () => {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 550 }}>Chats</Typography>
      <Box sx={{ mt: "1rem", mb: "1rem" }}>Search Box</Box>
      <AllChats />
      <ChatMessageCard />
    </Box>
  );
};

export default Chats;
