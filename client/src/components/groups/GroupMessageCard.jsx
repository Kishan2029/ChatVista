import { Avatar, Box, Card, Typography } from "@mui/material";
import React, { useState } from "react";
import { truncateString } from "../../util/helper";
import { setChatValue, setSelectedTrue } from "../../store/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket/index";
import { useQueryClient } from "react-query";

const GroupMessageCard = ({
  name,
  time,
  message,
  id,
  count = 0,

  members,
  memberCount,
  profileUrl,
}) => {
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const chatSelected = () => {
    dispatch(setSelectedTrue({ selected: true }));
    dispatch(
      setChatValue({
        userInfo: {
          name,
          id,
          group: true,
          members,
          memberCount,
          profileUrl,
        },
      })
    );

    // make notification count 0
    queryClient.setQueriesData(["allGroups"], (oldData) => {
      const newData = oldData.map((item) => {
        if (item._id === id) {
          item.notificationCount = 0;
        }
        return item;
      });
      return newData;
    });

    const socketData = {
      userId: auth.userId,
      groupId: id,
      isGroup: true,
    };
    socket.emit("makeNotificationCountZero", socketData);
  };

  const selectedUser = useSelector((state) => state.chat.userInfo);

  const [userTyping] = useState(false);

  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "1rem",
        px: "1rem",
        py: "1rem",
        flexShrink: 0,
        gap: "0.2rem",
        bgcolor: selectedUser?.id === id ? "var(--blueNotification)" : "white",
        cursor: selectedUser?.id !== id && "pointer",
      }}
      onClick={() => chatSelected()}
    >
      {/* avatar and message */}
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Avatar
          sx={{
            height: "2.8rem",
            width: "2.8rem",
            fontSize: "1.5rem",
            // backgroundColor: stringToColor(name),
          }}
          src={profileUrl ? profileUrl : ""}
        >
          {name[0]}
        </Avatar>
        <Box>
          <Typography
            sx={{
              color: selectedUser?.id === id ? "#FFFFFF" : "#030303",
              fontWeight: 600,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color:
                selectedUser?.id === id ? "#FFFFFF" : "var(--grayFontColor2)",
            }}
          >
            {userTyping
              ? `Typing...`
              : message
              ? truncateString(message, 23)
              : ""}
          </Typography>
        </Box>
      </Box>

      {/* Time and notification */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          //   justifyContent: "center",
          alignItems: "flex-end",
          gap: "0.2rem",
          mr: "0.3rem",
        }}
      >
        <Typography
          sx={{
            color: selectedUser?.id === id ? "#FFFFFF" : "var(--grayTimeColor)",
          }}
        >
          {time}
        </Typography>
        {selectedUser?.id !== id && count > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "1rem",
              width: "1rem",
              bgcolor: "var(--blueNotification)",
              borderRadius: "2rem",
              padding: "0.2rem",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "0.8rem",
                alignItems: "flex-end",
              }}
            >
              {count}
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default GroupMessageCard;
