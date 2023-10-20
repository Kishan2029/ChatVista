import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import { ArrowLeft } from "@phosphor-icons/react";
import React, { useState } from "react";
import profileImage from "../assets/images/profile.jpeg";

const UserProfile = () => {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const saveProfile = () => {};
  return (
    <Box sx={{ padding: "1rem", height: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <ArrowLeft size={32} color="#4B4B4B" style={{ marginLeft: "1rem" }} />
        <Typography sx={{ fontSize: "2rem", fontWeight: 550 }}>
          Profile
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          px: "2rem",
        }}
      >
        <Avatar
          alt="Remy Sharp"
          src={profileImage}
          sx={{
            height: "7.3rem",
            width: "7.3rem",
            mt: "3rem",
            mb: "2rem",
          }}
        />
        <TextField label="Name" variant="outlined" sx={{ width: "100%" }} />
        <Typography
          sx={{ color: "var(--grayFontColor2)", alignSelf: "flex-start" }}
        >
          This name is visible to your contacts
        </Typography>
        <TextField
          label="About"
          variant="outlined"
          sx={{ width: "100%", mt: "1rem" }}
          rows={4}
          multiline
        />
        <Button
          variant="outlined"
          sx={{
            px: "2.2rem",
            py: "0.4rem",
            fontWeight: 500,
            alignSelf: "flex-end",
            textTransform: "none",
            mt: "1rem",
          }}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default UserProfile;
