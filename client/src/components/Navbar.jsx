import { Avatar, Box, Divider } from "@mui/material";
import { Users, ChatCircleDots, Gear } from "@phosphor-icons/react";
import React from "react";
import birdImage from "../assets/images/bird.avif";
import budgie from "../assets/images/Budgie.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  console.log("Navbar");
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        width: "5%",
        bgcolor: "var(--backgroundColor1)",
        borderRight: "1px solid #B4B4B4;",
        px: "0.8rem",
        py: "0rem",
        m: 0,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          mt: "1rem",
        }}
      >
        {/* icons */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
            mt: "1rem",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--navbarImageBackgroundColor)",
              p: "0.5rem",
              borderRadius: "1rem",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={budgie} style={{ height: "2rem" }} />
          </Box>
          <ChatCircleDots size={26} onClick={() => navigate("/")} />
          <Users size={26} onClick={() => navigate("/groups")} />
          {/* <Divider /> */}
          <Divider sx={{ width: "100%" }} />
          <Gear size={26} onClick={() => navigate("/setting")} />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "1.5rem",
        }}
        onClick={() => navigate("/profile")}
      >
        <Avatar />
      </Box>
    </Box>
  );
};

export default Navbar;
