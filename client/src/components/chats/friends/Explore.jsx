import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { fetchExploreUsers } from "../../../reactQuery/query";
import { LocalLoader } from "../../index";

const Explore = () => {
  const auth = useSelector((state) => state.auth.user);
  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchExploreUsers(auth.userId),
    queryKey: ["exploreUsers"],
  });
  console.log("data", data);
  if (isLoading) {
    return <LocalLoader />;
  }
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
