import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Explore = () => {
  const explore = [
    {
      id: "1",
      name: "Kevin",
    },
    {
      id: "2",
      name: "Virat",
    },
    {
      id: "3",
      name: "Rohit",
    },
    {
      id: "4",
      name: "Anushka",
    },
    {
      id: "5",
      name: "Kevin",
    },
    {
      id: "6",
      name: "Virat",
    },
    {
      id: "7",
      name: "Rohit",
    },
    {
      id: "8",
      name: "Anushka",
    },
  ];
  return (
    <Box>
      <Stack spacing={2}>
        {explore.map((item) => {
          return (
            <Box id={item.id}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
                >
                  <Avatar />
                  <Typography>{item.name}</Typography>
                </Box>
                <Typography sx={{ color: "var(--chatMessageBlue)" }}>
                  Send Request
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Explore;
