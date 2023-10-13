import { Box, Typography } from "@mui/material";
import React from "react";
import empty from "../../assets/images/empty.svg";

const EmptyConversation = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box>
        <img src={empty} sx={{ height: "10rem", width: "10rem" }} />
        <Typography>
          Select a conversation or start a{" "}
          <span
            style={{
              textDecoration: "underline",
              color: "var(--blueTextColor)",
            }}
          >
            new one
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default EmptyConversation;
