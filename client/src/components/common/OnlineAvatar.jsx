import { Avatar, Badge } from "@mui/material";
import React, { useEffect } from "react";
import { socket } from "../../socket/index";

const OnlineAvatar = ({ name, id, online, setOnline, profileUrl }) => {
  useEffect(() => {
    socket.on("fetchOnlineStatus", (data) => {
      if (data.includes(id)) {
        setOnline(true);
      } else {
        setOnline(false);
      }
    });
  }, []);

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
        </Badge>
      ) : (
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
      )}
    </>
  );
};

export default OnlineAvatar;
