import { Box, Divider, Typography } from "@mui/material";
import React, { useState } from "react";
import { Plus } from "@phosphor-icons/react";
import CreateGroupModal from "./CreateGroupModal";
import AllGroup from "./AllGroup";
import SearchBox from "../chats/SearchBox";

const Groups = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");
  return (
    <Box sx={{ padding: "1rem", height: "94%" }}>
      <Typography sx={{ fontSize: "2rem", fontWeight: 550 }}>Groups</Typography>
      <Box sx={{ mt: "1rem", mb: "1.5rem" }}>
        <SearchBox setSearch={setSearch} />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          color: "var(--blueNotification)",
          px: "0.3rem",
        }}
      >
        <Typography onClick={() => setModal(!modal)} sx={{ cursor: "pointer" }}>
          Create New Group
        </Typography>
        <Plus
          onClick={() => setModal(!modal)}
          size={26}
          style={{ cursor: "pointer" }}
        />
      </Box>
      <Divider sx={{ my: "1rem" }} />

      <AllGroup search={search} />

      <CreateGroupModal open={modal} handleClose={() => setModal(false)} />
    </Box>
  );
};

export default Groups;
