import React from "react";
import { Autocomplete, Box, Typography } from "@mui/material";
import Title from "./Title";
import WriteMessage from "./WriteMessage";
import ChatMessages from "./ChatMessages";
import { useSelector } from "react-redux";
const ChatWindow = () => {
  const chatData = useSelector((state) => state.chat);
  const userInfo = chatData.userInfo;
  console.log("chatData", chatData);
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "var(--backgroundColor1)",
      }}
    >
      <Box sx={{ height: "10%" }}>
        <Title name={userInfo.name} />
      </Box>
      <Box sx={{ height: "90%", position: "relative" }}>
        {/* <Box sx={{ height: "80%" }}>Hello</Box> */}
        {/* <Box
          sx={{
            height: "20%",
            bgcolor: "pink",
            display: "flex",
            justifyContent: "flex-start",
            flexDirection: "column",
          }}
        > */}
        {/* <WriteMessage /> */}
        {/* </Box> */}

        <ChatMessages />
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <WriteMessage />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWindow;
