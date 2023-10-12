import React from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import birdImage from "../assets/images/bird.avif";
import { blue, grey } from "@mui/material/colors";
import { GithubLogo, GoogleLogo, TwitterLogo } from "@phosphor-icons/react";
import { SubmitButton } from "../components";

const Register = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        mt: "5%",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "30%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <img src={birdImage} style={{ height: "5rem" }} />
        </Box>
        <Typography sx={{ fontSize: "1.6rem", mb: "0.4rem", mt: "0.4rem" }}>
          Get Started With ChatVista
        </Typography>
        <Typography sx={{ mb: "0.6rem" }}>
          Already have an account ?{" "}
          <span style={{ color: blue[800] }}>Sign In</span>
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem", mb: "0.7rem" }}>
          <TextField
            id="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            id="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
          />
        </Box>
        <TextField
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          sx={{ mb: "0.7rem" }}
        />
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          sx={{ mb: "0.7rem" }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ color: blue[800], textDecoration: "underline" }}>
            Forgot Password ?
          </Typography>
        </Box>
        <SubmitButton name={"Create Account"} />

        <Divider sx={{ mb: "0.6rem" }}>Or</Divider>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Typography sx={{ fontSize: "0.7rem", mb: "1rem", color: grey[700] }}>
            By signing up, I agree to{" "}
            <span style={{ textDecoration: "underline", fontWeight: 700 }}>
              {" "}
              Terms of service
            </span>{" "}
            and
            <span style={{ textDecoration: "underline", fontWeight: 700 }}>
              {" "}
              Privacy Policy
            </span>
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", gap: "4rem" }}>
          <GoogleLogo size={32} color="#e60000" />
          <GithubLogo size={32} color="#666666" />
          <TwitterLogo size={32} color="#1a8cff" />
        </Box>
      </Box>
    </Box>
  );
};

export default Register;
