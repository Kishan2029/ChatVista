import { Box, Card, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import OnlineAvatar from "../common/OnlineAvatar";
import { truncateString } from "../../util/helper";
import { setChatValue, setSelectedTrue } from "../../store/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket/index";
import { useQueryClient } from "react-query";

const ChatMessageCard = ({
  name,
  time,
  message,
  id,
  count,
  showOnline = true,
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
          group: false,
          profileUrl,
        },
      })
    );

    // make notification count 0
    queryClient.setQueriesData(["allChats"], (oldData) => {
      const newData = oldData.map((item) => {
        if (item.friendId === id) {
          item.notificationCount = 0;
        }
        return item;
      });
      return newData;
    });

    const socketData = {
      userB: auth.userId,
      userA: id,
    };
    socket.emit("makeNotificationCountZero", socketData);
  };

  const selectedUser = useSelector((state) => state.chat.userInfo);

  const [online, setOnline] = useState(false);
  const [userTyping, setUserTyping] = useState(false);

  useEffect(() => {
    // console.log("userTyping", userTyping);
  }, [userTyping]);

  useEffect(() => {
    socket.on("fetchUserTyping", (data) => {
      // console.log("fetchUserTyping", userTyping);
      let time;
      let i = 0;
      if (data.senderUser === id) {
        if (userTyping === true) {
          // console.log("true");
          // console.log("clear", i);
          clearTimeout(time);
        } else {
          i = 0;
          // console.log("false");
          setUserTyping(true);
        }
        i++;

        time = setTimeout(() => {
          // console.log("User stopped typing.");
          setUserTyping(false);
        }, 3 * 1000);
      }
    });
  }, [socket]);

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
        {showOnline && (
          <OnlineAvatar
            name={name}
            id={id}
            online={online}
            setOnline={setOnline}
            profileUrl={profileUrl}
          />
        )}

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
            {userTyping ? `Typing...` : truncateString(message, 23)}
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

export default ChatMessageCard;
