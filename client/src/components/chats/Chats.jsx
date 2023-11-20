import { Autocomplete, Box, Typography } from "@mui/material";
import React, { useState } from "react";
import AllChats from "./AllChats";
import { UserPlus } from "@phosphor-icons/react";
import { AddFriendModal } from "./friends/index";
import { useSelector } from "react-redux";

const Chats = () => {
  const auth = useSelector((state) => state.auth.user);

  console.log("auth", auth);
  const [modal, setModal] = useState(false);

  return (
    <Box sx={{ padding: "1rem", height: "100%" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "2rem", fontWeight: 550 }}>
          Chats
        </Typography>
        <UserPlus
          size={29}
          style={{ marginRight: "1rem", cursor: "pointer" }}
          onClick={() => setModal(!modal)}
        />
      </Box>
      <Box sx={{ mt: "1rem", mb: "1rem" }}>Search Box</Box>
      <AllChats />

      {/* Add Friend modal */}
      {modal && (
        <AddFriendModal open={modal} handleClose={() => setModal(false)} />
      )}
    </Box>
  );
};

export default Chats;
