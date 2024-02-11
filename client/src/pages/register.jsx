import React, { useContext, useState } from "react";
import { Box, TextField, Tooltip, Typography } from "@mui/material";
import birdImage from "../assets/images/bird.avif";
import { blue, grey } from "@mui/material/colors";
// import { GithubLogo, GoogleLogo, TwitterLogo } from "@phosphor-icons/react";
import { SubmitButton } from "../components";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { registerUser } from "../reactQuery/mutation";
import { notify } from "../util/notify";

const Register = () => {
  const navigate = useNavigate();
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

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const registerUserMutation = useMutation({
    mutationFn: (body) => registerUser(body),
    onMutate: async (body) => {
      setGlobalLoader(true);
    },
    onSuccess: async (queryKey, body) => {
      setGlobalLoader(false);
      navigate("/verify");
      navigate(0);
    },
    onError: async (error) => {
      setGlobalLoader(false);
      console.log("error", error);
      if (error?.message === 'Validation error: Not a email formate at "email"')
        notify("error", "Please enter valid email");
      // navigate("/login");
      // navigate(0);
    },
  });

  const checkError = () => {
    if (
      firstNameError !== "" ||
      lastNameError !== "" ||
      emailError !== "" ||
      passwordError !== "" ||
      confirmError !== ""
    ) {
      return true;
    }
    return false;
  };
  const setError = () => {
    let isError = false;
    if (firstName === "") {
      setFirstNameError("First name cannot be empty.");
      isError = true;
    } else {
      setFirstNameError("");
    }
    if (lastName === "") {
      setLastNameError("Last name cannot be empty.");
      isError = true;
    } else {
      setLastNameError("");
    }
    // email error
    if (email === "") {
      isError = true;
      setEmailError("Email cannot be empty.");
    } else {
      setEmailError("");
    }

    // password error
    if (password === "") {
      setPasswordError("Password cannot be empty.");
      isError = true;
    } else if (password.length < 6) {
      setPasswordError("Minimum password length should be 6.");
      isError = true;
    } else {
      setPasswordError("");
    }
    // confrim password error
    if (confirmPassword === "") {
      setConfirmError("Confirm password cannot be empty.");
      isError = true;
    } else if (confirmPassword !== password) {
      setConfirmError("Confirm password is not same as password.");
      isError = true;
    } else {
      setConfirmError("");
    }
    return isError;
  };

  const onRegister = async () => {
    const isError = setError();
    localStorage.setItem("email", email);
    if (!isError) {
      try {
        await registerUserMutation.mutateAsync({
          firstName,
          lastName,
          email,
          password,
        });
      } catch (error) {
        notify("error", error.notificationMessage);
      }
    }
  };

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
          <Tooltip title="I am Angry Bird!" placement="right">
            <img src={birdImage} style={{ height: "5rem" }} />
          </Tooltip>
        </Box>
        <Typography sx={{ fontSize: "1.6rem", mb: "0.4rem", mt: "0.4rem" }}>
          Get Started With ChatVista
        </Typography>
        <Typography sx={{ mb: "0.6rem" }}>
          Already have an account ?{" "}
          <span
            style={{ color: blue[800], cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem", mb: "0.7rem" }}>
          <TextField
            error={firstNameError.length === 0 ? false : true}
            helperText={firstNameError}
            id="firstName"
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            required
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            error={lastNameError.length === 0 ? false : true}
            helperText={lastNameError}
            id="lastName"
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </Box>
        <TextField
          sx={{ mb: "0.7rem" }}
          error={emailError.length === 0 ? false : true}
          helperText={emailError}
          id="email"
          label="Email Address"
          variant="outlined"
          fullWidth
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          sx={{ mb: "0.7rem" }}
          error={passwordError.length === 0 ? false : true}
          helperText={passwordError}
          id="password"
          label="Password"
          variant="outlined"
          fullWidth
          type="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          sx={{ mb: "0.7rem" }}
          error={confirmError.length === 0 ? false : true}
          helperText={confirmError}
          id="confirmPassword"
          label="Confirm Password"
          variant="outlined"
          type="password"
          fullWidth
          value={confirmPassword}
          required
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {/* <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ color: blue[800], textDecoration: "underline" }}>
            Forgot Password ?
          </Typography>
        </Box> */}
        <SubmitButton name={"Create Account"} onClick={() => onRegister()} />

        {/* <Divider sx={{ mb: "0.6rem" }}>Or</Divider> */}
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
        {/* <Box sx={{ display: "flex", justifyContent: "center", gap: "4rem" }}>
          <GoogleLogo size={32} color="#e60000" />
          <GithubLogo size={32} color="#666666" />
          <TwitterLogo size={32} color="#1a8cff" />
        </Box> */}
      </Box>
    </Box>
  );
};

export default Register;
