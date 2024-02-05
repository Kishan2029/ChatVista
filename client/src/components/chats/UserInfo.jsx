import { Avatar, Box, Card, Divider, Typography } from "@mui/material";
import { XCircle } from "@phosphor-icons/react";
import React from "react";
import { fetchProfile } from "../../reactQuery/query";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroupSelectedTrue,
  setUserSelectedTrue,
} from "../../store/slices/chatSlice";
import LocalLoader from "../LocalLoader";

const UserInfo = () => {
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
  console.log("data", data);

  const selectedInfo = () => {
    console.log("click on info");
    dispatch(setUserSelectedTrue({ userSelected: false }));
    dispatch(setGroupSelectedTrue({ groupSelected: false }));
  };
  if (isLoading) {
    return <LocalLoader />;
  }
  const userInfo = data;
  return (
    <Box sx={{ height: "90%" }}>
      <Box
        sx={{
          borderLeft: "1.5px solid #B4B4B4",
          backgroundColor: "var(--backgroundColor2)",
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          height: "4.6rem",
          // boxShadow: 1,
        }}
      >
        <XCircle
          size={24}
          color="var(--grayFontColor)"
          style={{ marginLeft: "2rem" }}
          onClick={() => selectedInfo()}
        />
        <Typography
          sx={{
            color: "var(--grayFontColor)",
            fontSize: "1.1rem",
            fontWeight: 500,
            my: "1rem",
          }}
        >
          Contact Info
        </Typography>
      </Box>
      {/* coverImage
              ? coverImage.name !== undefined
                ? URL.createObjectURL(coverImage)
                : coverImage
              : "/broken-image.jpg" */}
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
            {/* <Typography
              sx={{ fontSize: "1rem", color: "var(--userInfoFontColor)" }}
            >
              +91 33333 333333
            </Typography> */}
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

export default UserInfo;
