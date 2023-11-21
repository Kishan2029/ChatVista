import {
  Avatar,
  Box,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchExploreUsers } from "../../../reactQuery/query";
import { LocalLoader } from "../../index";
import { sendRequest } from "../../../reactQuery/mutation";

const Explore = () => {
  const auth = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchExploreUsers(auth.userId),
    queryKey: ["exploreUsers"],
  });

  const sendRequestMutation = useMutation({
    mutationFn: (body) => sendRequest(body),
    onMutate: async (body) => {
      queryClient.setQueriesData(["exploreUsers"], (oldData) => {
        const newData = oldData.map((item) => {
          console.log("item", item);
          if (String(body.userB) === String(item._id)) {
            item.sent = true;
          }
          return item;
        });
        console.log("newData", newData);
        return newData;
      });
    },
    onSuccess: async (queryKey, body) => {
      // set data
      console.log("request sent successfully");
    },
  });

  console.log("data", data);
  if (isLoading) {
    return <LocalLoader />;
  }
  const explore = data;

  return (
    <Box>
      <Stack spacing={2}>
        {explore.map((item) => {
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
                {item.sent ? (
                  <Typography sx={{ color: "var(--grayFontColor)" }}>
                    Sent
                  </Typography>
                ) : (
                  <Typography
                    sx={{ color: "var(--chatMessageBlue)", cursor: "pointer" }}
                    onClick={() => {
                      sendRequestMutation.mutate({
                        userA: auth.userId,
                        userB: item._id,
                        status: "sent",
                      });
                    }}
                  >
                    Send Request
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Explore;
