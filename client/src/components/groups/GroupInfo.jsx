import React from "react";
import { Avatar, Box, Button, Card, Divider, Typography } from "@mui/material";
import { SignOut, TrashSimple, XCircle } from "@phosphor-icons/react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroupSelectedTrue,
  setUserSelectedTrue,
} from "../../store/slices/chatSlice";
import { getGroupInfo } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
const GroupInfo = () => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const contactId = chatData.contactId;
  const dispatch = useDispatch();
  console.log("contactId", contactId);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["groupInfo", contactId],
    queryFn: () => {
      // Check if auth is available before making the query
      if (auth && auth.userId && contactId) {
        return getGroupInfo({ userId: auth.userId, groupId: contactId });
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
  let groupInfo = data;
  const count = groupInfo.members.length;
  const repeat = (arr, n) => Array(n).fill(arr).flat();
  groupInfo.members = repeat(groupInfo.members, 10);
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
          Group Info
        </Typography>
      </Box>

      <Box
        sx={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          overflowY: "scroll",
          height: "97%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "2rem",
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <Avatar
            src={""}
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
              {groupInfo.name}
            </Typography>
            <Typography
              sx={{ fontSize: "1rem", color: "var(--userInfoFontColor)" }}
            >
              {`${count} Members`}
            </Typography>
          </Box>
        </Box>
        <Divider />
        <Box sx={{ mt: "1.8rem", mb: "1.8rem" }}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontSize: "1rem",
              color: "var(--userInfoFontColor)",
              mb: "1rem",
            }}
          >
            {`${count} Members`}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "1rem",
              flexDirection: "column",
            }}
          >
            {/* Member list */}
            {groupInfo.members.map((item) => {
              return (
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  {/* avatar and name*/}
                  <Box
                    sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
                  >
                    <Avatar
                      sx={{
                        height: "2.8rem",
                        width: "2.8rem",
                        fontSize: "1.5rem",
                      }}
                    >
                      {item.name[0]}
                    </Avatar>
                    <Box>
                      <Typography
                        sx={{
                          fontWeight: 550,
                        }}
                      >
                        {item.name}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Time and notification */}
                  <Box
                    sx={{
                      mr: "0.3rem",
                      alignItems: "center",
                    }}
                  >
                    {item.admin ? (
                      <Button
                        variant="outlined"
                        size="small"
                        color="success"
                        sx={{
                          textTransform: "none",
                          backgroundColor: "#AFE1AF",
                          color: "#097969	",
                        }}
                      >
                        Admin
                      </Button>
                    ) : (
                      ""
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ mt: "2rem", display: "flex", justifyContent: "center" }}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            startIcon={<SignOut size={24} />}
          >
            Exit Group
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GroupInfo;
