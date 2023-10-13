import { Avatar, Badge } from "@mui/material";
import React from "react";

const OnlineAvatar = ({}) => {
  const online = true;
  return (
    <>
      {online ? (
        <Badge
          color="secondary"
          overlap="circular"
          variant="dot"
          badgeContent=" "
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          sx={{
            "& .MuiBadge-badge": {
              // color: "var(--dotColor)",
              backgroundColor: online ? "var(--dotColor)" : "",
            },
            height: "2.9rem",
            width: "2.7rem",
          }}
        >
          <Avatar
            sx={{ height: "2.8rem", width: "2.8rem", fontSize: "1.5rem" }}
          >
            K
          </Avatar>
        </Badge>
      ) : (
        <Avatar sx={{ height: "2.8rem", width: "2.8rem", fontSize: "1.5rem" }}>
          K
        </Avatar>
      )}
    </>
  );
};

export default OnlineAvatar;
