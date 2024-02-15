import React from "react";
import { Box, Dialog, List, ListItem, Typography } from "@mui/material";
import { XCircle } from "@phosphor-icons/react";
import install from "../../assets/images/Install.png";

const MemberAddModal = ({ open, handleClose }) => {
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
            Exciting News
          </Typography>
          <XCircle size={32} color="#432828" onClick={handleClose} />
        </Box>
        <List sx={{ listStyleType: "disc", ml: "1rem" }}>
          <ListItem sx={{ display: "list-item" }}>
            <Typography sx={{ fontSize: "1rem" }}>
              Our Web App is now available!
            </Typography>
          </ListItem>
          <ListItem sx={{ display: "list-item" }}>
            <Typography sx={{ fontSize: "1rem" }}>
              You can install it from icon present above in the URL bar.
            </Typography>
          </ListItem>
          <Box sx={{ mt: "2rem" }}>
            <img src={install} style={{ height: "20rem", width: "31rem" }} />
          </Box>
          <ListItem sx={{ display: "list-item" }}>
            <Typography sx={{ fontSize: "1rem" }}>
              <b> What's next?</b> Stay tuned for exciting new features coming
              soon!
            </Typography>
          </ListItem>
        </List>
      </Box>
    </Dialog>
  );
};

export default MemberAddModal;
