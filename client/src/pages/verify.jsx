import React, { useContext, useRef, useState } from "react";
import birdImage from "../assets/images/bird.avif";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import { SubmitButton } from "../components";
import { AuthContext } from "../context/authContext";
import { verifyUser } from "../reactQuery/mutation";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { notify } from "../util/notify";

const Verify = () => {
  const navigate = useNavigate();
  // const email = "kishan@gmail.com";
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const email = localStorage.getItem("email");
  const { setGlobalLoader } = useContext(AuthContext);

  // verify mutation
  const verifyUserMutation = useMutation({
    mutationFn: (body) => verifyUser(body),
    onMutate: async (body) => {
      setGlobalLoader(true);
    },
    onSuccess: async (queryKey, body, data) => {
      localStorage.removeItem("email");
      setGlobalLoader(false);
      navigate("/");
      navigate(0);
    },
    onError: () => {
      setGlobalLoader(false);
    },
  });

  const isEmptyDigits = () => {
    return digits.some((digit) => digit === "");
  };

  const inputRefs = Array.from({ length: 6 }, () => useRef(null));

  const onDigitChange = (index, value) => {
    setDigits((prevDigits) => {
      const newDigits = [...prevDigits];
      newDigits[index] = value;

      // Move focus to the next input
      if (value !== "" && index < 5) {
        inputRefs[index + 1].current.focus();
      }

      return newDigits;
    });
  };

  const onVerify = async () => {
    const otp = digits.join("");
    try {
      await verifyUserMutation.mutateAsync({
        email,
        otp,
      });
    } catch (error) {
      notify("error", error.notificationMessage);
    }
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
          {digits.map((digit, index) => (
            <TextField
              key={index}
              id={`digit${index + 1}`}
              placeholder="-"
              variant="outlined"
              sx={{ width: "4rem" }}
              inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
              value={digit}
              onChange={(e) => onDigitChange(index, e.target.value)}
              inputRef={inputRefs[index]}
            />
          ))}
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
