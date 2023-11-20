import React, { useContext, useState } from "react";
import { Box, Button, Divider, TextField, Typography } from "@mui/material";
import birdImage from "../assets/images/bird.avif";
import { blue } from "@mui/material/colors";
import { GithubLogo, GoogleLogo, TwitterLogo } from "@phosphor-icons/react";
import { SubmitButton } from "../components/index";

import { useMutation } from "react-query";
import { loginUser } from "../reactQuery/mutation";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/slices/authSlice";
import { setUserLogin } from "../util/helper";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { globalLoader, setGlobalLoader } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // error
  // const [isError, setIsError] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const loginUserMutation = useMutation({
    mutationFn: (body) => loginUser(body),
    onMutate: async (body) => {
      setGlobalLoader(true);
    },
    onSuccess: async (data, body) => {
      setGlobalLoader(false);
      console.log("Login Success");

      const user = {
        userId: data.userId,
      };
      setUserLogin();
      dispatch(setUser(user));

      // navigate("/verify");
      // window.location.reload();
      // navigate(0);
    },
    onError: async (error) => {
      console.log("error", error);
      setGlobalLoader(false);
      setPasswordError("Password is not correct");
      // setIsError(true);
    },
  });

  const setError = (value) => {
    let isError = false;
    if (value !== undefined) return isError;
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

    return isError;
  };

  const onLogin = async () => {
    console.log("login Button Clicked");
    // const isError = setError();

    if (!setError()) {
      loginUserMutation.mutate({
        email,
        password,
      });
    }
    navigate("/");
  };

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
          sx={{ mt: "0.7rem", mb: "0.7rem" }}
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

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Typography sx={{ color: blue[800], textDecoration: "underline" }}>
            Forgot Password ?
          </Typography>
        </Box>
        <SubmitButton name={"Login"} onClick={() => onLogin()} />
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
