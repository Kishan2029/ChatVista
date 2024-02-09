import React, { useState } from "react";
import { Autocomplete, Box, Typography } from "@mui/material";
import Title from "./Title";
import WriteMessage from "./WriteMessage";
import ChatMessages from "./ChatMessages";
import { useSelector } from "react-redux";
import { writeMessage } from "../../reactQuery/mutation";
import { useMutation } from "react-query";
const ChatWindow = () => {
  const chatData = useSelector((state) => state.chat);
  const userInfo = chatData.userInfo;
  const [scrollView, setScrollView] = useState("0");
  // console.log("userInfo", userInfo);
  return (
    <Box
      sx={{
        height: "100%",
        bgcolor: "var(--backgroundColor1)",
      }}
    >
      <Box sx={{ height: "10%" }}>
        <Title name={userInfo.name} id={userInfo.id} />
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

        <ChatMessages scrollView={scrollView} setScrollView={setScrollView} />
        <Box sx={{ position: "absolute", bottom: 0, width: "100%" }}>
          <WriteMessage scrollView={scrollView} setScrollView={setScrollView} />
        </Box>
      </Box>
    </Box>
  );
};

export default ChatWindow;
