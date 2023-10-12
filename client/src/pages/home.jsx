import { Box } from "@mui/material";
import React from "react";

const Home = ({ children }) => {
  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ width: "30%", bgcolor: "var(--backgroundColor2)" }}>
        {children}
      </Box>
      <Box sx={{ width: "70%" }}>Hello</Box>
    </Box>
  );
};

export default Home;
