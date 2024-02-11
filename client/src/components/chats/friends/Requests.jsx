import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import LocalLoader from "../../LocalLoader";
import { fetchRequests } from "../../../reactQuery/query";
import { sendRequest } from "../../../reactQuery/mutation";
import { socket } from "../../../socket";

const Requests = () => {
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchRequests(auth.userId),
    queryKey: ["requests"],
  });

  const requestResponseMutation = useMutation({
    mutationFn: (body) => sendRequest(body),
    onMutate: async (body) => {
      queryClient.setQueriesData(["requests"], (oldData) => {
        const newData = oldData.filter(
          (item) => item.senderUser !== body.userB
        );
        return newData;
      });

      queryClient.setQueriesData(["friends"], (oldData) => {
        const newData = [
          {
            firstName: body.firstName,
            lastName: body.lastName,
            _id: Math.floor(Math.random() * 90000) + 10000,
          },
          ...oldData,
        ];
        return newData;
      });

      queryClient.setQueriesData(["exploreUsers"], (oldData) => {
        const newData = oldData.filter((item) => item.email !== body.email);
        return newData;
      });
    },
    onSuccess: async (queryKey, body) => {
      if (body.status === "accepted") {
        queryClient.invalidateQueries(["allChats"]);

        const socketData = {
          senderUser: body.userB,
          receiverUser: auth.userId,
          status: "accepted",
        };
        console.log("socketData", socketData);
        socket.emit("requestAccepted", socketData);
      }
    },
  });

  if (isLoading) {
    return <LocalLoader />;
  }
  const requests = data;

  return (
    <Box>
      <Stack spacing={2}>
        {requests.map((item) => {
          return (
            <Box id={item._id} key={item._id}>
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
                  <Avatar src={item?.profileUrl ? item.profileUrl : ""} />
                  <Typography>
                    {item.firstName + " " + item.lastName}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "2rem" }}>
                  <Typography
                    sx={{ color: "var(--chatMessageBlue)", cursor: "pointer" }}
                    onClick={() => {
                      requestResponseMutation.mutate({
                        userB: item.senderUser,
                        userA: auth.userId,
                        status: "accepted",
                        firstName: item.firstName,
                        lastName: item.lastName,
                        email: item.email,
                      });
                    }}
                  >
                    Accept
                  </Typography>
                  <Typography
                    sx={{ color: "#e60000", cursor: "pointer" }}
                    onClick={() => {
                      requestResponseMutation.mutate({
                        userB: item.senderUser,
                        userA: auth.userId,
                        status: "rejected",
                      });
                    }}
                  >
                    Reject
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Requests;
