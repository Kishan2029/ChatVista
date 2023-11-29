import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { fetchFriends } from "../../../reactQuery/query";
import LocalLoader from "../../LocalLoader";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

const Friends = () => {
  const auth = useSelector((state) => state.auth.user);
  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchFriends(auth.userId),
    queryKey: ["friends"],
  });

  if (isLoading) {
    return <LocalLoader />;
  }
  const friends = data;

  return (
    <Box>
      <Stack spacing={2}>
        {friends.map((item) => {
          return (
            <Box id={item._id}>
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
                  <Typography>
                    {item.firstName + " " + item.lastName}
                  </Typography>
                </Box>
                <Typography sx={{ color: "var(--chatMessageBlue)" }}>
                  Go to Chat
                </Typography>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Friends;
