import React, { useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Dialog, Tab } from "@mui/material";
import Explore from "./Explore";
import Requests from "./Requests";
import Friends from "./Friends";

const AddFriendModal = ({ open, handleClose }) => {
  const [value, setValue] = useState("explore");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      sx={{ borderRadius: "2rem" }}
      fullWidth
    >
      <Box sx={{ p: "2rem" }}>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "white",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TabList onChange={handleChange} sx={{ textTransform: "none" }}>
              <Tab
                label="Explore"
                sx={{ textTransform: "none", fontSize: "1rem" }}
                value="explore"
              />
              <Tab
                label="Friends"
                sx={{ textTransform: "none", fontSize: "1rem" }}
                value="friends"
              />
              <Tab
                label="Requests"
                sx={{ textTransform: "none", fontSize: "1rem" }}
                value="requests"
              />
            </TabList>
          </Box>
          <TabPanel value="explore">
            <Explore />
          </TabPanel>
          <TabPanel value="friends">
            <Friends />
          </TabPanel>
          <TabPanel value="requests">
            <Requests />
          </TabPanel>
        </TabContext>
      </Box>
    </Dialog>
  );
};

export default AddFriendModal;
