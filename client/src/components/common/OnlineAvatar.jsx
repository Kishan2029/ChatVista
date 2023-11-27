import { Avatar, Badge } from "@mui/material";
import React from "react";
import { stringToColor } from "../../util/helper";

const OnlineAvatar = ({ name }) => {
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
            sx={{
              height: "2.8rem",
              width: "2.8rem",
              fontSize: "1.5rem",
              // backgroundColor: stringToColor(name),
            }}
            src="/broken-image.jpg"
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
        >
          {name[0]}
        </Avatar>
      )}
    </>
  );
};

export default OnlineAvatar;
