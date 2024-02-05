import React, { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { fetchAllGroups } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import ChatMessageCard from "../chats/ChatMessageCard";
import GroupMessageCard from "./GroupMessageCard";
import { socket } from "../../socket";
import { getFormattedTime, playSound } from "../../util/helper";

const AllGroup = () => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData ? chatData?.userInfo?.id : null;
  const queryClient = useQueryClient();
  console.log("auth", auth);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["allGroups"],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId) {
        return fetchAllGroups(auth.userId);
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId,
  });

  useEffect(() => {
    console.log("auth", auth);
    console.log("socketHit");
    if (!auth) {
      return;
    }

    socket.on("receiveGroupCreated", (data) => {
      console.log("inside receiveGroupCreated");

      queryClient.setQueriesData(["allGroups"], (oldData) => {
        const newData = [
          {
            _id: Math.floor(Math.random() * 90000) + 10000,
            admin: data.admin,
            createdAt: new Date(),
            lastMessage:
              data.admin[0] === auth.userId
                ? `You created Group.`
                : `${data.createdBy} created Group.`,
            name: data.groupName,
            time: getFormattedTime(new Date()),
          },
          ...oldData,
        ];
        console.log("newData", newData);
        return newData;
      });
    });
  }, [socket]);

  useEffect(() => {
    const handleReceiveNotification = (data) => {
      console.log("data", data);
      if (auth.userId === data.userId) {
        queryClient.setQueriesData(["allGroups"], (oldData) => {
          const newData = oldData.map((item) => {
            if (item._id === data.groupId) {
              // playSound();
              if (chatUserId === item._id) {
                console.log("inside coint");
                item.notificationCount = 0;
                const socketData = {
                  userId: auth.userId,
                  groupId: chatUserId,
                  isGroup: true,
                };
                socket.emit("makeNotificationCountZero", socketData);
              } else {
                item.notificationCount = data.count;
                console.log("item.notificationCount", item.notificationCount);
              }
              console.log("item", item);
            }
            return item;
          });
          return newData;
        });
      }
    };

    if (auth && socket.connected) {
      socket.on("receiveGroupNotification", handleReceiveNotification);
    }

    return () => {
      // Cleanup: Remove the event listener when the component unmounts
      if (auth && socket.connected) {
        socket.off("receiveGroupNotification", handleReceiveNotification);
      }
    };
  }, [auth, socket.connected, queryClient, chatUserId]);
  if (isLoading) {
    return <LocalLoader />;
  }
  console.log("allGroup", data);
  const allGroups = data;

  if (allGroups)
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
          {allGroups.map((item, index) => {
            return (
              <GroupMessageCard
                key={item._id}
                name={item.name}
                message={item.lastMessage}
                time={item.time}
                id={item._id}
                senderUser={item.senderUser}
                members={item.members}
                memberCount={item.memberCount}
                count={item.notificationCount}
              />
            );
          })}
        </Box>
      </Box>
    );
};

export default AllGroup;
