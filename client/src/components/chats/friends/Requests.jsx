import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import LocalLoader from "../../LocalLoader";
import { fetchRequests } from "../../../reactQuery/query";

const Requests = () => {
  const auth = useSelector((state) => state.auth.user);
  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => fetchRequests(auth.userId),
    queryKey: ["requests"],
  });
  console.log("data", data);
  if (isLoading) {
    return <LocalLoader />;
  }
  const requests = data;

  // const requests = [
  //   {
  //     id: "1",
  //     name: "Kevin",
  //   },
  //   {
  //     id: "2",
  //     name: "Virat",
  //   },
  //   {
  //     id: "3",
  //     name: "Rohit",
  //   },
  //   {
  //     id: "4",
  //     name: "Anushka",
  //   },
  // ];
  return (
    <Box>
      <Stack spacing={2}>
        {requests.map((item) => {
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
                <Box sx={{ display: "flex", gap: "2rem" }}>
                  <Typography sx={{ color: "var(--chatMessageBlue)" }}>
                    Accept
                  </Typography>
                  <Typography sx={{ color: "#e60000" }}>Reject</Typography>
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
