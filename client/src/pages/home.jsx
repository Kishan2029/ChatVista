import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatWindow } from "../components/chatWindow";
import EmptyConversation from "../components/chatWindow/EmptyConversation";
import { useSelector } from "react-redux";
import { socket } from "../socket";
import { useQueryClient } from "react-query";

const Home = ({ children }) => {
  const auth = useSelector((state) => state.auth.user);
  const selected = useSelector((state) => state.chat.selected);

  if (auth) {
    socket.emit("addUser", { userId: auth.userId });
  }
  const queryClient = useQueryClient();
  // useEffect(() => {
  //   console.log("hello");
  //   if (auth) {
  //     socket.on("receiveNotification", (data) => {
  //       console.log("receiveNotification", data);
  //       if (auth.userId === data.receiverUser) {
  //         queryClient.setQueriesData(["allChats"], (oldData) => {
  //           // console.log("oldData", oldData);
  //           const newData = oldData.map((item) => {
  //             if (item.friendId === data.createdBy) {
  //               item.notificationCount = data.count;
  //             }
  //             return item;
  //           });
  //           return newData;
  //         });
  //       }
  //     });
  //   }
  // }, [socket]);
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
