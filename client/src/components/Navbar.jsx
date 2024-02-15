import { Box, Divider, Tooltip } from "@mui/material";
import { Users, ChatCircleDots, Gear } from "@phosphor-icons/react";
import React, { useState } from "react";
import lion from "../assets/images/lion.png";
import bird from "../assets/images/001-bird.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { NavAvatar } from "./common";

const Navbar = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const [selected, setSelected] = useState(location.pathname.split("/")[1]);

  const onClickNav = (path) => {
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
            alignItems: "center",
            mt: "1rem",
            gap: "2.3rem",
          }}
        >
          <Tooltip title="You are Great!.">
            <Box
              sx={{
                bgcolor: "var(--navbarImageBackgroundColor)",
                // bgcolor: "gray",
                p: "0.5rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img src={bird} style={{ height: "2rem" }} />
            </Box>
          </Tooltip>

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
            <ChatCircleDots
              size={26}
              onClick={() => onClickNav("")}
              style={{ cursor: "pointer" }}
            />
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
            <Users
              size={26}
              onClick={() => onClickNav("groups")}
              style={{ cursor: "pointer" }}
            />
          )}

          <Divider sx={{ width: "100%", color: "#B4B4B4" }} />
          {/* {selected === "setting" ? (
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
          )} */}
          <Tooltip title="See our Social Media Site." placement="right">
            {/* <Box
              sx={{
                bgcolor: "var(--navbarImageBackgroundColor)",
                p: "0.5rem",
                borderRadius: "1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            > */}
            <Link to="https://social-media01.netlify.app/" target="_blank">
              <img
                src={lion}
                style={{ height: "2rem", cursor: "pointer" }}
                // onClick={() =>
                //   (window.location = "https://social-media01.netlify.app/")
                // }
              />
            </Link>
            {/* </Box> */}
          </Tooltip>
        </Box>
      </Box>

      {/* profile */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mb: "1.5rem",
          cursor: "pointer",
        }}
        onClick={() => onClickNav("profile")}
      >
        <NavAvatar />
      </Box>
    </Box>
  );
};

export default Navbar;
