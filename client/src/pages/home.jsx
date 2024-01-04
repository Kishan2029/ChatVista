import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ChatWindow } from "../components/chatWindow";
import EmptyConversation from "../components/chatWindow/EmptyConversation";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../socket";
import { useQueryClient } from "react-query";
import { fetchProfile } from "../reactQuery/query";
import { setUser } from "../store/slices/authSlice";

const Home = ({ children }) => {
  const auth = useSelector((state) => state.auth.user);
  const selected = useSelector((state) => state.chat.selected);
  const dispatch = useDispatch();

  if (auth) {
    socket.emit("addUser", { userId: auth.userId });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProfile(auth.userId);
        return data;
      } catch (error) {
        // Handle error, e.g., log or show an error message
        console.error("Error fetching profile data:", error);
        throw error; // Re-throw the error to propagate it further
      }
    };

    const fetchAndDispatchData = async () => {
      if (!auth || auth.userId == null) {
        return; // Exit early if auth or userId is not available
      }

      try {
        console.log("inside", auth);
        const data = await fetchData();
        dispatch(
          setUser({
            userId: auth.userId,
            firstName: data.firstName,
            lastName: data.lastName,
          })
        );
      } catch (error) {
        // Handle error, e.g., log or show an error message
        console.error("Error fetching and dispatching profile data:", error);
      }
    };

    // Check if data has already been fetched before triggering fetch again
    if (auth && !auth.firstName) {
      fetchAndDispatchData();
    }
  }, [auth, dispatch]);

  const queryClient = useQueryClient();
  // useEffect(() => {
  //   console.log("hello");
  //   if (auth) {
  //     socket.on("receiveNotification", (data) => {
  //       console.log("receiveNotification", data);
  //       if (auth.userId === data.receiverUser) {
  //         queryClient.setQueriesData(["allChats"], (oldData) => {
  //           // console.log("oldData", oldData);
  //           const newData = oldData.map((item) => {
  //             if (item.friendId === data.createdBy) {
  //               item.notificationCount = data.count;
  //             }
  //             return item;
  //           });
  //           return newData;
  //         });
  //       }
  //     });
  //   }
  // }, [socket]);
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      <Box
        sx={{
          width: "30%",
          bgcolor: "var(--backgroundColor2)",
          height: "100%",
          // borderRight: "1px solid #B4B4B4",
        }}
      >
        {children}
      </Box>
      <Box sx={{ width: "70%", height: "100vh" }}>
        {selected ? <ChatWindow /> : <EmptyConversation />}
      </Box>
    </Box>
  );
};

export default Home;
