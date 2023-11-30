import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import OnlineAvatar from "../common/OnlineAvatar";
import { useSelector } from "react-redux";

const Title = ({ name, lastSeen }) => {
  const chatData = useSelector((state) => state.chat);
  const chatUserId = chatData.userInfo.id;

  const [online, setOnline] = useState(false);

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
            {online ? `Online` : `Offline`}
          </Typography>
        </Box>
      </Box>
      <MagnifyingGlass size={28} />
    </Box>
  );
};

export default Title;
