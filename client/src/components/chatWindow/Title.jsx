import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import OnlineAvatar from "../common/OnlineAvatar";
import { useSelector } from "react-redux";

const Title = ({ name, lastSeen }) => {
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData.userInfo.id;
  const isGroup = chatData.userInfo.group;
  const members = chatData.userInfo.members;
  const memberCount = chatData.userInfo.memberCount;
  const [online, setOnline] = useState(false);

  let groupComponent = "";
  if (isGroup) {
    groupComponent = (
      <div>
        {members.map((item, index) => (
          <span key={index}>
            {item}
            {index !== members.length - 1 && ", "}
          </span>
        ))}
        {members.length > 3 && (
          <span>{" & " + (memberCount - 3) + "other"} </span>
        )}
      </div>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "var(--backgroundColor2)",
        justifyContent: "space-between",
        px: "1rem",
        py: "0.8rem",
        borderLeft: "1.5px solid #B4B4B4",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: "1.4rem" }}>
        <OnlineAvatar
          name={name}
          id={chatUserId}
          online={online}
          setOnline={setOnline}
        />
        <Box>
          <Typography sx={{ color: "#030303", fontWeight: 600 }}>
            {name}
          </Typography>
          <Typography sx={{ color: "var(--grayFontColor2)" }}>
            {isGroup ? "groupComponent" : online ? `Online` : `Offline`}
          </Typography>
        </Box>
      </Box>
      <MagnifyingGlass size={28} />
    </Box>
  );
};

export default Title;
