import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ChatMessageCard from "./ChatMessageCard";
import { useSelector } from "react-redux";
import { useQuery, useQueryClient } from "react-query";
import { fetchAllChats } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import { socket } from "../../socket";
import { filterQueryChatData, playSound } from "../../util/helper";

const AllChats = ({ search }) => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData ? chatData?.userInfo?.id : null;
  const [filteredData, setFilteredData] = useState([]);

  const queryClient = useQueryClient();

  let { data, error, isError, isLoading } = useQuery({
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

  useEffect(() => {
    const handleReceiveNotification = (data) => {
      if (auth.userId === data.receiverUser) {
        queryClient.setQueriesData(["allChats"], (oldData) => {
          const newData = oldData.map((item) => {
            if (item.friendId === data.createdBy) {
              playSound();
              if (chatUserId === item.friendId) {
                item.notificationCount = 0;
                const socketData = {
                  userB: auth.userId,
                  userA: chatUserId,
                };
                socket.emit("makeNotificationCountZero", socketData);
              } else {
                item.notificationCount = data.count;
              }
            }
            return item;
          });
          return newData;
        });
      }
    };

    const handleReceiveRequest = (data) => {
      if (data.senderUser === auth.userId) {
        queryClient.invalidateQueries(["allChats"]);
        queryClient.invalidateQueries(["requests"]);
        queryClient.invalidateQueries(["exploreUsers"]);
        queryClient.invalidateQueries(["friends"]);
      }
    };

    if (auth && socket.connected) {
      socket.on("receiveNotification", handleReceiveNotification);
      socket.on("receiveRequestAccepted", handleReceiveRequest);
    }

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      if (auth && socket.connected) {
        socket.off("receiveNotification", handleReceiveNotification);
        socket.on("receiveRequestAccepted", handleReceiveRequest);
      }
    };
  }, [auth, socket.connected, queryClient, chatUserId]);

  useEffect(() => {
    if (data !== undefined) {
      const newData = data.filter((item) =>
        filterQueryChatData(search, item.firstName, item.lastName)
      );
      setFilteredData(newData);
    }
  }, [search]);

  if (isLoading) {
    return <LocalLoader />;
  }
  const allChats = search === "" ? data : filteredData;
  // console.log("allChats", allChats);
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
                profileUrl={item.profileUrl}
              />
            );
          })}
        </Box>
      </Box>
    );
};

export default AllChats;
