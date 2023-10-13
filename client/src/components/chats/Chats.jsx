import { Autocomplete, Box, Typography } from "@mui/material";
import React from "react";
import AllChats from "./AllChats";
import ChatMessageCard from "./ChatMessageCard";

const Chats = () => {
  return (
    <Box sx={{ padding: "1rem", height: "100%" }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 550 }}>Chats</Typography>
      <Box sx={{ mt: "1rem", mb: "1rem" }}>Search Box</Box>
      {/* <Box sx={{ height: "100%" }}> */}
      <AllChats />
      {/* </Box> */}
    </Box>
  );
};

export default Chats;
