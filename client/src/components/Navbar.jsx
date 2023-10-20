import { Avatar, Box, Divider } from "@mui/material";
import { Users, ChatCircleDots, Gear } from "@phosphor-icons/react";
import React, { useState } from "react";
import birdImage from "../assets/images/bird.avif";
import budgie from "../assets/images/Budgie.png";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const selected = "chats";

  const [selected, setSelected] = useState("");

  const onClickNav = (path) => {
    console.log("path", path);
    navigate("/" + path);
    setSelected(path);
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "5%",
        bgcolor: "var(--backgroundColor1)",
        borderRight: "1.5px solid #B4B4B4;",
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
            gap: "2.3rem",
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

          {selected === "" ? (
            <Box
              sx={{
                bgcolor: "var(--blueNotification)",
                px: "0.7rem",
                py: "0.6rem",
                borderRadius: "1rem",
              }}
            >
              <ChatCircleDots
                color="white"
                size={26}
                onClick={() => onClickNav("")}
              />
            </Box>
          ) : (
            <ChatCircleDots size={26} onClick={() => onClickNav("")} />
          )}

          {selected === "groups" ? (
            <Box
              sx={{
                bgcolor: "var(--blueNotification)",
                px: "0.7rem",
                py: "0.6rem",
                borderRadius: "1rem",
              }}
            >
              <Users
                color="white"
                size={26}
                onClick={() => onClickNav("groups")}
              />
            </Box>
          ) : (
            <Users size={26} onClick={() => onClickNav("groups")} />
          )}

          <Divider sx={{ width: "100%", color: "#B4B4B4" }} />
          {selected === "setting" ? (
            <Box
              sx={{
                bgcolor: "var(--blueNotification)",
                px: "0.7rem",
                py: "0.6rem",
                borderRadius: "1rem",
              }}
            >
              <Gear
                color="white"
                size={26}
                onClick={() => onClickNav("setting")}
              />
            </Box>
          ) : (
            <Gear size={26} onClick={() => onClickNav("setting")} />
          )}
        </Box>
      </Box>

      {/* profile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "1.5rem",
        }}
        onClick={() => onClickNav("profile")}
      >
        <Avatar />
      </Box>
    </Box>
  );
};

export default Navbar;
