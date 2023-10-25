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

const CreateGroupModal = ({ open, handleClose }) => {
  const userList = [
    { id: 1, name: "name 1" },
    { id: 2, name: "name 2" },
    { id: 3, name: "name 3" },
    { id: 4, name: "name 4" },
    { id: 5, name: "name 5" },
  ];
  const [members, setMembers] = useState([]);

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
          label="Name"
          variant="outlined"
          fullWidth
          sx={{ mt: "2rem", mb: "1.5rem" }}
        />

        <Autocomplete
          multiple
          value={members}
          options={userList.map((option) => option.name)}
          onChange={(event, newValue) => {
            setMembers(newValue);
          }}
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
              <Box sx={{ display: "flex" }}>
                <Chip
                  avatar={<Avatar sx={{}}>K</Avatar>}
                  variant="filled"
                  label={option}
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
          >
            Create
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
};

export default CreateGroupModal;
