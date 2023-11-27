import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import ChatMessageCard from "./ChatMessageCard";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { fetchAllChats } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";

const AllChats = () => {
  const auth = useSelector((state) => state.auth.user);
  console.log("auth", auth);

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["allChats"],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId) {
        return fetchAllChats(auth.userId);
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId,
  });

  console.log("allChats", data);
  if (isLoading) {
    return <LocalLoader />;
  }
  const allChats = data;

  if (allChats)
    return (
      <Box sx={{ height: "90%" }}>
        <Typography
          sx={{
            color: "var(--grayFontColor)",
            fontSize: "1.1rem",
            fontWeight: 500,
            my: "1rem",
          }}
        >
          All Chats
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1.3rem",
            overflowY: "scroll",
            height: "83%",
          }}
        >
          {allChats.map((item, index) => {
            return (
              <ChatMessageCard
                key={index}
                name={item.firstName + " " + item.lastName}
                message={item.lastMessage}
                time={item.time}
                id={item.friendId}
              />
            );
          })}
        </Box>
      </Box>
    );
};

export default AllChats;
