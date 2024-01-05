import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Chip,
  Dialog,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { XCircle } from "@phosphor-icons/react";
import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useSelector } from "react-redux";
import { fetchFriends } from "../../reactQuery/query";
import LocalLoader from "../LocalLoader";
import { createGroupFunction } from "../../reactQuery/mutation";
import { notify } from "../../util/notify";

const CreateGroupModal = ({ open, handleClose }) => {
  const auth = useSelector((state) => state.auth.user);
  const { data, error, isError, isLoading } = useQuery({
    queryFn: () => {
      if (auth && auth.userId) return fetchFriends(auth.userId);
    },
    queryKey: ["friends"],
    enabled: !!auth && !!auth.userId,
  });

  const friends = data;
  console.log("friends", friends);

  const [members, setMembers] = useState([]);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");

  const createGroupMutation = useMutation({
    mutationFn: (body) => createGroupFunction(body),
    onMutate: async (body) => {
      notify("success", "Group is created.");
    },
    onSuccess: async (queryKey, body) => {
      // set data
      console.log("Group is created successfully.");
    },
  });

  const createGroup = () => {
    if (name === "") {
      setNameError("Group name is required.");
      return;
    }
    const data = {
      admin: auth.userId,
      name,
      members: members.map((item) => item.friendId),
    };
    createGroupMutation.mutate(data);
  };

  if (isLoading) {
    return <LocalLoader />;
  }
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      sx={{ borderRadius: "1rem" }}
    >
      <Box sx={{ p: "2rem" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontSize: "1.5rem", fontWeight: 550 }}>
            Create New Group
          </Typography>
          <XCircle size={32} color="#432828" onClick={handleClose} />
        </Box>

        <TextField
          error={nameError.length === 0 ? false : true}
          helperText={nameError}
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ mt: "2rem", mb: "1.5rem" }}
          value={name}
          required
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <Autocomplete
          multiple
          value={members}
          options={friends.map((option) => {
            return option;
          })}
          onChange={(event, newValue) => {
            console.log("newValue", newValue);
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
            console.log("value", value);

            return value.map((option, index) => (
              <Box sx={{ display: "flex" }} key={option.friendId}>
                <Chip
                  avatar={<Avatar sx={{}}>{option.firstName[0]}</Avatar>}
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
            onClick={createGroup}
          >
            Create
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateGroupModal;
