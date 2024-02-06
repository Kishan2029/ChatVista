import React, { useContext, useState } from "react";
import { Avatar, Box, Button, Card, Divider, Typography } from "@mui/material";
import { SignOut, TrashSimple, UserPlus, XCircle } from "@phosphor-icons/react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  setGroupSelectedTrue,
  setSelectedTrue,
  setUserSelectedTrue,
} from "../../store/slices/chatSlice";
import { getGroupInfo } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import MemberAddModal from "./MemberAddModal";
import { addMemberInGroup, leftGroup } from "../../reactQuery/mutation";
import { notify } from "../../util/notify";
import { AuthContext } from "../../context/authContext";
const GroupInfo = () => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const contactId = chatData.contactId;
  const queryClient = useQueryClient();
  const { globalLoader, setGlobalLoader } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);

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

  const selectedCross = () => {
    console.log("click on info");
    dispatch(setUserSelectedTrue({ userSelected: false }));
    dispatch(setGroupSelectedTrue({ groupSelected: false }));
  };

  const leaveGroupMutation = useMutation({
    mutationFn: (body) => leftGroup(body),
    onMutate: async (body) => {
      notify("success", "You have left the group.");
      setGlobalLoader(true);
    },
    onSuccess: async (queryKey, body) => {
      // set data
      console.log("member left the group.");

      dispatch(setGroupSelectedTrue({ groupSelected: false }));
      dispatch(setSelectedTrue({ selected: false }));
      queryClient.setQueriesData(["allGroups"], (oldData) => {
        const newData = oldData.filter((item) => item._id !== body.groupId);
        console.log("newData", newData);
        return newData;
      });
      setGlobalLoader(false);
    },
  });

  const exitGroup = () => {
    leaveGroupMutation.mutate({
      groupId: contactId,
      userId: auth.userId,
    });
  };

  if (isLoading) {
    return <LocalLoader />;
  }
  const groupInfo = data;
  const count = groupInfo.members.length;
  // const repeat = (arr, n) => Array(n).fill(arr).flat();
  // groupInfo.members = repeat(groupInfo.members, 10);
  return (
    <Box sx={{ height: "90%" }}>
      {/* title */}
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
          onClick={() => selectedCross()}
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
      {/* avatar and members */}
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pr: "1rem",
            }}
          >
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
            <Box>
              <UserPlus
                onClick={() => setModal(!modal)}
                size={26}
                color="var(--userInfoFontColor)"
                style={{ color: "var(--userInfoFontColor)", cursor: "pointer" }}
              />
            </Box>
          </Box>

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
                <Box
                  key={item.id}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
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

                  {/* admin or not */}
                  <Box
                    sx={{
                      mr: "0.3rem",
                      alignItems: "flex-end",
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
                          pointerEvents: "none",
                          // height: "1.5rem",
                          // width: "1rem",
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
            onClick={() => exitGroup()}
          >
            Exit Group
          </Button>
        </Box>
      </Box>
      <MemberAddModal
        open={modal}
        handleClose={() => setModal(false)}
        newMembers={groupInfo.newMembers}
      />
    </Box>
  );
};

export default GroupInfo;
