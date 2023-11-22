import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatWindow } from "../components/chatWindow";
import EmptyConversation from "../components/chatWindow/EmptyConversation";
import { useSelector } from "react-redux";

const Home = ({ children }) => {
  // const [selected, setSelected] = useState(false);
  const selected = useSelector((state) => state.chat.selected);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <Box
        sx={{
          width: "30%",
          bgcolor: "var(--backgroundColor2)",
          height: "100%",
          // borderRight: "1px solid #B4B4B4",
        }}
      >
        {children}
      </Box>
      <Box sx={{ width: "70%", height: "100vh" }}>
        {selected ? <ChatWindow /> : <EmptyConversation />}
      </Box>
    </Box>
  );
};

export default Home;
