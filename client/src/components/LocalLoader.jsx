import { Box, CircularProgress } from "@mui/material";
import React from "react";

const LocalLoader = () => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: "2rem" }}>
      <CircularProgress color="success" />
    </Box>
  );
};

export default LocalLoader;
