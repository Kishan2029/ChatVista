import React from "react";
import { Autocomplete, Box, Typography } from "@mui/material";
import Title from "./Title";
const ChatWindow = () => {
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "var(--backgroundColor1)",
      }}
    >
      <Title />
    </Box>
  );
};

export default ChatWindow;
