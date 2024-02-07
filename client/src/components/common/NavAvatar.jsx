import React from "react";
import { Avatar, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import { fetchProfile } from "../../reactQuery/query";

const NavAvatar = () => {
  const auth = useSelector((state) => state.auth.user);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId) {
        return fetchProfile(auth.userId);
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId,
  });

  const profile = data;
  console.log("profile", profile);
  return (
    <Box>
      <Avatar src={profile?.profileUrl ? profile.profileUrl : ""} />
    </Box>
  );
};

export default NavAvatar;
