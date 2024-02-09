import React, { useState } from "react";
import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  TextField,
  Typography,
} from "@mui/material";
import { XCircle } from "@phosphor-icons/react";
import { notify } from "../../util/notify";
import { addMemberInGroup } from "../../reactQuery/mutation";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "../../socket";
import { setChatValue } from "../../store/slices/chatSlice";

const MemberAddModal = ({ open, handleClose, newMembers }) => {
  const auth = useSelector((state) => state.auth.user);
  const chatData = useSelector((state) => state.chat);
  const userInfo = chatData?.userInfo;
  const chatUserId = chatData ? chatData?.userInfo?.id : null;
  const queryClient = useQueryClient();
  const [members, setMembers] = useState([]);
  const dispatch = useDispatch();

  const addMemberMutation = useMutation({
    mutationFn: (body) => addMemberInGroup(body),
    onMutate: async (body) => {
      notify("success", "Member is added.");
    },
    onSuccess: async (queryKey, body) => {
      // set data
      // console.log("new member added.");
      queryClient.setQueriesData(["groupInfo", chatUserId], (oldData) => {
        const members = body.members.map((item) => {
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
            (item) => !members.map((item1) => item1.id).includes(item._id)
          ),
        };

        return newData;
      });

      dispatch(
        setChatValue({
          userInfo: {
            ...userInfo,
            members: userInfo.members.concat(
              members.map((item) => item.firstName)
            ),
            memberCount: userInfo.memberCount + members.length,
          },
        })
      );
    },
  });

  const addMember = () => {
    if (members.length === 0) {
      notify("error", "Members cannot be empty.");
      return;
    }

    const data = {
      adminId: auth.userId,
      groupId: chatUserId,
      userId: members.map((item) => item._id),
      add: true,
      members,
    };

    addMemberMutation.mutate(data);

    const socketData = {
      groupId: chatUserId,
      addedBy: auth.userId,
      members,
      socketId: socket.id,
    };
    socket.emit("groupMemberAdded", socketData);
    handleClose();

    setMembers([]);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{ borderRadius: "1rem" }}
    >
      <Box sx={{ p: "2rem" }}>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", mb: "3rem" }}
        >
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 550 }}>
            Add New Member
          </Typography>
          <XCircle size={32} color="#432828" onClick={handleClose} />
        </Box>

        <Autocomplete
          multiple
          value={members}
          sx={{
            marginBottom: "0.3rem",
          }}
          options={newMembers.map((option) => {
            return option;
          })}
          onChange={(event, newValue) => {
            setMembers(newValue);
          }}
          getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
          renderOption={(props, option) => (
            <Box
              sx={{ display: "flex", justifyContent: "space-evenly" }}
              {...props}
            >
              <Avatar
                sx={{
                  mr: "1rem",
                  width: "2rem",
                  height: "2rem",
                  fontSize: "1rem",
                }}
                src={option?.profileUrl ? option?.profileUrl : ""}
              >
                {option.firstName[0]}
              </Avatar>
              {`${option.firstName} ${option.lastName}`}
            </Box>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Members"
              placeholder="Search"
            />
          )}
          renderTags={(value) => {
            return value.map((option, index) => (
              <Box sx={{ display: "flex" }} key={option._id}>
                <Chip
                  avatar={
                    <Avatar
                      sx={{}}
                      src={option?.profileUrl ? option?.profileUrl : ""}
                    >
                      {option.firstName[0]}
                    </Avatar>
                  }
                  variant="filled"
                  label={`${option.firstName} ${option.lastName}`}
                  onDelete={() =>
                    setMembers((array) =>
                      array.filter((item) => item !== option)
                    )
                  }
                  size="medium"
                />
              </Box>
            ));
          }}
        />
        {members.length === 0 && (
          <span
            style={{
              color: "#d3302f",
              marginLeft: "1rem",
              fontFamily: "sans-serif",
              fontSize: "0.84rem",
            }}
          >
            You must select atleast one member.
          </span>
        )}

        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: "5rem" }}>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "var(--buttonColor)",
              fontSize: "1rem",
              px: "2rem",
              py: "0.5rem",
            }}
            onClick={addMember}
          >
            Add
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default MemberAddModal;
