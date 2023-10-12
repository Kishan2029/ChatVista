import React, { useState } from "react";
import birdImage from "../assets/images/bird.avif";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { SubmitButton } from "../components";

const Verify = () => {
  const email = "kishan@gmail.com";
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const [digit5, setDigit5] = useState("");
  const [digit6, setDigit6] = useState("");

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: "5%",
        height: "100vh",
      }}
    >
      <Box sx={{ width: "30%" }}>
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <img src={birdImage} style={{ height: "5rem" }} />
        </Box>
        <Typography sx={{ fontSize: "1.6rem", mb: "0.4rem" }}>
          Please Verify OTP
        </Typography>
        <Typography sx={{ fontSize: "1rem", mb: "0.4rem" }}>
          Sent to email {email}
        </Typography>

        <Box sx={{ display: "flex", gap: "1rem", mt: "1rem" }}>
          <TextField
            id="digit1"
            placeholder="-"
            variant="outlined"
            sx={{ width: "4rem" }}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            // value={digit1}
            onChange={(e) => {
              setDigit1(e.target.value);
            }}
            autoFocus
          />
          <TextField
            id="digit2"
            placeholder="-"
            variant="outlined"
            sx={{ width: "4rem" }}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            // value={digit1}
            onChange={(e) => {
              setDigit2(e.target.value);
            }}
            // autoFocus={digit1 !== "" ? true : false}
          />
          <TextField
            id="digit3"
            placeholder="-"
            variant="outlined"
            sx={{ width: "4rem" }}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            // value={digit1}
            onChange={(e) => {
              setDigit3(e.target.value);
            }}
            // autoFocus={digit3 === "" ? true : false}
          />
          <TextField
            id="digit4"
            placeholder="-"
            variant="outlined"
            sx={{ width: "4rem" }}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            // value={digit1}
            onChange={(e) => {
              setDigit4(e.target.value);
            }}
            // autoFocus={digit4 === "" ? true : false}
          />
          <TextField
            id="digit5"
            placeholder="-"
            variant="outlined"
            sx={{ width: "4rem" }}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            // value={digit1}
            onChange={(e) => {
              setDigit5(e.target.value);
            }}
            // autoFocus={digit5 === "" ? true : false}
          />
          <TextField
            id="digit6"
            placeholder="-"
            variant="outlined"
            sx={{ width: "4rem" }}
            inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
            // value={digit1}
            onChange={(e) => {
              setDigit6(e.target.value);
            }}
            // autoFocus={digit6 === "" ? true : false}
          />
        </Box>

        <SubmitButton name={"Verify"} />
      </Box>
    </Box>
  );
};

export default Verify;
