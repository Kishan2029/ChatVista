import React from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import birdImage from "../assets/images/bird.avif";
import { blue } from "@mui/material/colors";
import { GithubLogo, GoogleLogo, TwitterLogo } from "@phosphor-icons/react";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        mt: "8%",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "30%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <img src={birdImage} style={{ height: "5rem" }} />
        </Box>
        <Typography sx={{ fontSize: "1.6rem", mb: "0.4rem", mt: "0.4rem" }}>
          Login to ChatVista
        </Typography>
        <Typography sx={{ mb: "0.4rem" }}>
          New User ? <span style={{ color: blue[800] }}>Create an account</span>
        </Typography>
        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          sx={{ mt: "0.7rem", mb: "0.7rem" }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ color: blue[800], textDecoration: "underline" }}>
            Forgot Password ?
          </Typography>
        </Box>
        <Button
          variant="contained"
          sx={{ textTransform: "none", mb: "1rem", mt: "0.6rem" }}
          fullWidth
        >
          Login
        </Button>
        <Divider sx={{ mb: "1rem" }}>Or</Divider>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "4rem" }}>
          <GoogleLogo size={32} color="#e60000" />
          <GithubLogo size={32} color="#666666" />
          <TwitterLogo size={32} color="#1a8cff" />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
