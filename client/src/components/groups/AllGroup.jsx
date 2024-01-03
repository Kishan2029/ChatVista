import React from "react";
import { Box, Typography } from "@mui/material";
import { useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { fetchAllGroups } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import ChatMessageCard from "../chats/ChatMessageCard";
import GroupMessageCard from "./GroupMessageCard";

const AllGroup = () => {
  const auth = useSelector((state) => state.auth.user);

  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["allGroups"],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId) {
        return fetchAllGroups(auth.userId);
      }

      // Return a default value or null if auth is not available
      return [];
    },
    enabled: !!auth && !!auth.userId,
  });
  if (isLoading) {
    return <LocalLoader />;
  }
  console.log("data", data);
  const allGroups = data;
  if (allGroups)
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
          {allGroups.map((item, index) => {
            return (
              <GroupMessageCard
                key={item._id}
                name={item.name}
                message={item.lastMessage}
                time={item.time}
                id={item._id}
                senderUser={item.senderUser}
                members={item.members}
                memberCount={item.memberCount}
                //   count={"item.notificationCount"}
              />
            );
            //   <ChatMessageCard
            //     key={index}
            //     name={item.name}
            //     message={"item.lastMessage"}
            //     time={item.time}
            //     id={item.groupId}
            //     showOnline={false}
            //     count={"item.notificationCount"}
            //   />
          })}
        </Box>
      </Box>
    );
};

export default AllGroup;
