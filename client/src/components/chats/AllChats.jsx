import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ChatMessageCard from "./ChatMessageCard";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { fetchAllChats } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import { socket } from "../../socket";

const AllChats = () => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData ? chatData?.userInfo?.id : null;
  console.log("chatUserId", chatUserId);

  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["allChats"],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId) {
        return fetchAllChats(auth.userId);
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId,
  });
  console.log("allChats", data);
  useEffect(() => {
    const handleReceiveNotification = (data) => {
      console.log("receiveNotification", data);
      if (auth.userId === data.receiverUser) {
        queryClient.setQueriesData(["allChats"], (oldData) => {
          const newData = oldData.map((item) => {
            if (item.friendId === data.createdBy) {
              console.log("step1", item.friendId, chatData?.userInfo?.id);
              if (chatUserId === item.friendId) {
                console.log("step2");
                item.notificationCount = 0;
                const socketData = {
                  userB: auth.userId,
                  userA: chatUserId,
                };
                socket.emit("makeNotificationCountZero", socketData);
              } else item.notificationCount = data.count;
            }
            return item;
          });
          return newData;
        });
      }
    };

    if (auth && socket.connected) {
      socket.on("receiveNotification", handleReceiveNotification);
    }

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      if (auth && socket.connected) {
        socket.off("receiveNotification", handleReceiveNotification);
      }
    };
  }, [auth, socket.connected, queryClient]);
  if (isLoading) {
    return <LocalLoader />;
  }
  const allChats = data;

  if (allChats)
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
                name={item.firstName + " " + item.lastName}
                message={item.lastMessage}
                time={item.time}
                id={item.friendId}
                online={item.online}
                count={item.notificationCount}
              />
            );
          })}
        </Box>
      </Box>
    );
};

export default AllChats;
