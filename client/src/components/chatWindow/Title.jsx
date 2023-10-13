import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import OnlineAvatar from "../common/OnlineAvatar";

const Title = ({ name, lastSeen }) => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "var(--backgroundColor2)",
        justifyContent: "space-between",
        px: "1rem",
        py: "0.8rem",
        borderLeft: "1px solid #B4B4B4",
        alignItems: "center",
      }}
    >
      <Box sx={{ display: "flex", gap: "1.4rem" }}>
        <OnlineAvatar />
        <Box>
          <Typography sx={{ color: "#030303", fontWeight: 600 }}>
            Kevin Peterson
          </Typography>
          <Typography sx={{ color: "var(--grayFontColor2)" }}>
            Online
          </Typography>
        </Box>
      </Box>
      <MagnifyingGlass size={32} />
    </Box>
  );
};

export default Title;
