import { Avatar, Box, Divider, Typography } from "@mui/material";
import React from "react";
import { fetchProfile } from "../../reactQuery/query";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import LocalLoader from "../LocalLoader";

const UserInfoContent = () => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const contactId = chatData.contactId;
  const dispatch = useDispatch();
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["contactInfo", contactId],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId && contactId) {
        return fetchProfile(contactId);
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId && !!contactId,
  });

  if (isLoading) {
    return <LocalLoader />;
  }
  const userInfo = data;
  return (
    <Box sx={{ height: "90%" }}>
      <Box sx={{ padding: "1rem", display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Avatar
            src={userInfo?.profileUrl ? userInfo.profileUrl : ""}
            sx={{
              height: "6rem",
              width: "6rem",
              mt: "3rem",
              mb: "2rem",
            }}
          />
          <Box sx={{ mt: "0.6rem" }}>
            <Typography
              sx={{ fontSize: "1.2rem", color: "var(--userInfoFontColor)" }}
            >
              {userInfo.firstName + " " + userInfo.lastName}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box sx={{ mt: "1.8rem", mb: "1.8rem" }}>
          <Typography sx={{ fontSize: "1rem" }}>About</Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 550, mt: "0.6rem" }}>
            {userInfo?.about
              ? userInfo.about
              : "Hey there, I am using ChatVista"}
          </Typography>
        </Box>
        <Divider />
      </Box>
    </Box>
  );
};

export default UserInfoContent;
