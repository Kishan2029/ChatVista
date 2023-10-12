import { Avatar, Badge, Box, Card, Typography } from "@mui/material";
import React from "react";

const ChatMessageCard = () => {
  return (
    <Card
      elevation={0}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        borderRadius: "1rem",
        px: "1rem",
        py: "1rem",
      }}
    >
      {/* avatar and message */}
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <Avatar sx={{ height: "2.8rem", width: "2.8rem", fontSize: "1.5rem" }}>
          K
        </Avatar>
        <Box>
          <Typography sx={{ color: "#030303" }}>Cute Turtle</Typography>
          <Typography sx={{ color: "var(--grayFontColor2)" }}>
            That's it goodbye.
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
        <Typography sx={{ color: "var(--grayTimeColor)" }}>9:36</Typography>
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
            sx={{ color: "white", fontSize: "0.8rem", alignItems: "flex-end" }}
          >
            3
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default ChatMessageCard;
