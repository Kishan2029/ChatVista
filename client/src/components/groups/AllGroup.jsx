import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllGroups } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import ChatMessageCard from "../chats/ChatMessageCard";
import GroupMessageCard from "./GroupMessageCard";
import { socket } from "../../socket";
import {
  filterQueryGroupData,
  getFormattedTime,
  playSound,
} from "../../util/helper";
import { setChatValue } from "../../store/slices/chatSlice";

const AllGroup = ({ search }) => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData ? chatData?.userInfo?.id : null;
  const [filteredData, setFilteredData] = useState([]);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

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
    if (!auth) {
      return;
    }

    socket.on("receiveGroupCreated", (data) => {
      console.log("inside receiveGroupCreated");

      queryClient.setQueriesData(["allGroups"], (oldData) => {
        const newData = [
          {
            _id: data._id,
            admin: data.admin,
            createdAt: new Date(),
            lastMessage:
              data.admin[0] === auth.userId
                ? `You created Group.`
                : `${data.createdBy} created Group.`,
            name: data.groupName,
            time: getFormattedTime(new Date()),
            members: data.members,
          },
          ...oldData,
        ];
        console.log("newData", newData);
        return newData;
      });
    });
    socket.on("receiveUpdateGroupInfo", (data) => {
      console.log("inside receiveUpdateGroupInfo");

      queryClient.setQueriesData(["allGroups"], (oldData) => {
        const newData = oldData.map((item) => {
          if (item._id === data.groupId) {
            item.name = data.name;
            item.profileUrl = data.profileUrl;
          }
          return item;
        });
        // console.log("newData", newData);
        return newData;
      });

      queryClient.invalidateQueries(["groupInfo", data.groupId]);

      if (chatUserId === data.groupId)
        dispatch(
          setChatValue({
            userInfo: {
              ...chatData.userInfo,
              profileUrl: data.profileUrl,
              name: data.name,
            },
          })
        );
    });
  }, [socket.connected, queryClient, chatUserId]);

  useEffect(() => {
    const handleReceiveNotification = (data) => {
      if (auth.userId === data.userId) {
        queryClient.setQueriesData(["allGroups"], (oldData) => {
          const newData = oldData.map((item) => {
            if (item._id === data.groupId) {
              // playSound();
              if (chatUserId === item._id) {
                item.notificationCount = 0;
                const socketData = {
                  userId: auth.userId,
                  groupId: chatUserId,
                  isGroup: true,
                };
                socket.emit("makeNotificationCountZero", socketData);
              } else {
                item.notificationCount = data.count;
                // console.log("item.notificationCount", item.notificationCount);
              }
              // console.log("item", item);
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

  useEffect(() => {
    if (data !== undefined) {
      const newData = data.filter((item) =>
        filterQueryGroupData(search, item.name)
      );
      setFilteredData(newData);
    }
  }, [search]);
  if (isLoading) {
    return <LocalLoader />;
  }
  // console.log("allGroup", data);
  const allGroups = search === "" ? data : filteredData;

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
                profileUrl={item.profileUrl}
              />
            );
          })}
        </Box>
      </Box>
    );
};

export default AllGroup;
