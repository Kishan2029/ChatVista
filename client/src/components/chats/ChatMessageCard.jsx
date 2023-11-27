import { Avatar, Badge, Box, Card, Typography } from "@mui/material";
import React from "react";
import OnlineAvatar from "../common/OnlineAvatar";
import { truncateString } from "../../util/helper";
import { setChatValue, setSelectedTrue } from "../../store/slices/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const ChatMessageCard = ({ name, time, message, id }) => {
  const dispatch = useDispatch();

  const chatSelected = () => {
    dispatch(setSelectedTrue({ selected: true }));
    dispatch(
      setChatValue({
        userInfo: {
          name,
          id,
        },
      })
    );
  };

  const selectedUser = useSelector((state) => state.chat.userInfo);
  console.log("selectedUser", selectedUser);

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
        bgcolor: selectedUser.id === id ? "var(--blueNotification)" : "white",
      }}
      onClick={() => chatSelected()}
    >
      {/* avatar and message */}
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <OnlineAvatar />
        <Box>
          <Typography
            sx={{
              color: selectedUser.id === id ? "#FFFFFF" : "#030303",
              fontWeight: 600,
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              color:
                selectedUser.id === id ? "#FFFFFF" : "var(--grayFontColor2)",
            }}
          >
            {truncateString(message, 23)}
            {/* {message} */}
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
            color: selectedUser.id === id ? "#FFFFFF" : "var(--grayTimeColor)",
          }}
        >
          {time}
        </Typography>
        {selectedUser.id === id && (
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
              3
            </Typography>
          </Box>
        )}
      </Box>
    </Card>
  );
};

export default ChatMessageCard;
