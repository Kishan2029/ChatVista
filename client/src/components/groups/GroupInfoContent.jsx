import React, { useContext, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import { SignOut, UserPlus, XCircle } from "@phosphor-icons/react";
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
import { socket } from "../../socket";
import EditGroupInfo from "./EditGroupInfo";
const GroupInfoContent = () => {
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
    // console.log("click on info");
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
        // console.log("newData", newData);
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

    const socketData = {
      groupId: contactId,
      userId: auth.userId,
    };
    socket.emit("userLeaveGroup", socketData);
  };

  useEffect(() => {
    // console.log("inside useFfect");
    socket.on("receiveGroupMemberAdded", (data) => {
      console.log("receiveGroupMemberAdded:", data);

      // add members in groupInfo
      if (data.groupId === contactId)
        queryClient.setQueriesData(["groupInfo", contactId], (oldData) => {
          const members = data.members.map((item) => {
            return {
              id: item._id,
              name: item.firstName + " " + item.lastName,
              admin: false,
              avatar: item.profileUrl,
            };
          });
          const newData = {
            ...oldData,
            members: oldData.members.concat(members),
            newMembers: oldData.newMembers.filter(
              (item) =>
                !data.members.map((item1) => item1._id).includes(item._id)
            ),
          };
          // console.log("newData", newData);
          return newData;
        });
    });
    socket.on("receiveGroupMemberRemoved", (data) => {
      console.log("receiveGroupMemberRemoved:", data);

      // add members in groupInfo
      if (data.groupId === contactId)
        queryClient.setQueriesData(["groupInfo", contactId], (oldData) => {
          // const members = data.members.map((item) => {
          //   return {
          //     id: item._id,
          //     name: item.firstName + " " + item.lastName,
          //     admin: false,
          //     avatar: item.profileUrl,
          //   };
          // });
          const newData = {
            ...oldData,
            members: oldData.members.filter((item) => item.id !== data.userId),
            // newMembers: oldData.newMembers.filter(
            //   (item) =>
            //     !data.members.map((item1) => item1._id).includes(item._id)
            // ),
          };
          // console.log("newData", newData);
          return newData;
        });
      queryClient.invalidateQueries(["groupInfo", contactId]);
    });
  }, [socket]);

  if (isLoading) {
    return <LocalLoader />;
  }
  const groupInfo = data;
  const count = groupInfo.members.length;

  return (
    <Box sx={{ height: "90%" }}>
      {/* title */}
      {/* <Box
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
      </Box> */}
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
        <EditGroupInfo
          groupInfo={groupInfo}
          userId={auth.userId}
          groupId={contactId}
        />
        <Divider />
        {/* Members */}
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
              {groupInfo.admin && (
                <UserPlus
                  onClick={() => setModal(!modal)}
                  size={26}
                  color="var(--userInfoFontColor)"
                  style={{
                    color: "var(--userInfoFontColor)",
                    cursor: "pointer",
                  }}
                />
              )}
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
                      src={item?.profileUrl ? item.profileUrl : ""}
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

export default GroupInfoContent;
