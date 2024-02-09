import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { fetchFriends } from "../../../reactQuery/query";
import LocalLoader from "../../LocalLoader";
import { useQuery } from "react-query";

import { useDispatch, useSelector } from "react-redux";

import { useQueryClient } from "react-query";
import { setChatValue, setSelectedTrue } from "../../../store/slices/chatSlice";
import { socket } from "../../../socket";

const Friends = () => {
  const auth = useSelector((state) => state.auth.user);

  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchFriends(auth.userId),
    queryKey: ["friends"],
  });

  const chatSelected = (friend) => {
    dispatch(setSelectedTrue({ selected: true }));
    dispatch(
      setChatValue({
        userInfo: {
          name: friend.firstName + " " + friend.lastName,
          id: friend.friendId,
          group: false,
          profileUrl: friend.profileUrl,
        },
      })
    );

    // make notification count 0
    queryClient.setQueriesData(["allChats"], (oldData) => {
      const newData = oldData.map((item) => {
        if (item.friendId === friend.friendId) {
          item.notificationCount = 0;
        }
        return item;
      });
      return newData;
    });

    const socketData = {
      userB: auth.userId,
      userA: friend.friendId,
    };
    socket.emit("makeNotificationCountZero", socketData);
  };
  if (isLoading) {
    return <LocalLoader />;
  }
  const friends = data;

  return (
    <Box>
      <Stack spacing={2}>
        {friends.map((item) => {
          return (
            <Box id={item._id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <Avatar src={item?.profileUrl ? item.profileUrl : ""} />
                  <Typography>
                    {item.firstName + " " + item.lastName}
                  </Typography>
                </Box>
                <Typography
                  sx={{ color: "var(--chatMessageBlue)", cursor: "pointer" }}
                  onClick={() => chatSelected(item)}
                >
                  Go to Chat
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Friends;
