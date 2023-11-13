import React, { useContext, useState } from "react";
import birdImage from "../assets/images/bird.avif";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { SubmitButton } from "../components";
import { AuthContext } from "../context/authContext";
import { verifyUser } from "../reactQuery/mutation";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

const Verify = () => {
  const navigate = useNavigate();
  // const email = "kishan@gmail.com";
  const [digit1, setDigit1] = useState("");
  const [digit2, setDigit2] = useState("");
  const [digit3, setDigit3] = useState("");
  const [digit4, setDigit4] = useState("");
  const [digit5, setDigit5] = useState("");
  const [digit6, setDigit6] = useState("");

  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    globalLoader,
    setGlobalLoader,
  } = useContext(AuthContext);

  // verify mutation
  const verifyUserMutation = useMutation({
    mutationFn: (body) => verifyUser(body),
    onMutate: async (body) => {
      setGlobalLoader(true);
    },
    onSuccess: async (queryKey, body, data) => {
      setGlobalLoader(false);
      console.log("data", data);
      navigate("/");
    },
    onError: () => {
      setGlobalLoader(false);
    },
  });

  const isEmptyDigits = () => {
    if (
      digit1 === "" ||
      digit2 === "" ||
      digit3 === "" ||
      digit4 === "" ||
      digit5 === "" ||
      digit6 === ""
    ) {
      return true;
    }
    return false;
  };

  const onVerify = () => {
    const otp = digit1 + digit2 + digit3 + digit4 + digit5 + digit6;
    console.log({
      firstName,
      lastName,
      email,
      password,
      otp,
    });
    verifyUserMutation.mutate({
      firstName,
      lastName,
      email,
      password,
      otp,
    });
    // navigate("/");
  };

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
              console.log("digit1", digit1);
            }}
            autoFocus={digit1 === "" ? true : false}
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
            autoFocus={digit1 !== "" ? true : false}
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

        <SubmitButton
          name={"Verify"}
          onClick={() => onVerify()}
          disabled={isEmptyDigits()}
        />
      </Box>
    </Box>
  );
};

export default Verify;
