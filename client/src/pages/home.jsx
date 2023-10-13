import { Box } from "@mui/material";
import React from "react";
import { ChatWindow } from "../components/chatWindow";

const Home = ({ children }) => {
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <Box
        sx={{
          width: "30%",
          bgcolor: "var(--backgroundColor2)",
          height: "100%",
        }}
      >
        {children}
      </Box>
      <Box sx={{ width: "70%", height: "100vh" }}>
        <ChatWindow />
      </Box>
    </Box>
  );
};

export default Home;
