import "./App.css";
import Login from "./pages/login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Register from "./pages/register";
import Verify from "./pages/verify";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { Outlet } from "react-router-dom";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Chats, Setting, UserProfile } from "./components";
import { Groups } from "./components/groups";
import { useEffect, useState } from "react";
import { AuthContext } from "./context/authContext";
import {
  axiosRequestInterceptor,
  axiosResponseInterceptor,
} from "./api/axiosInterceptor";

import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slices/authSlice";
import { isUserLoggedIn } from "./util/helper";
import { socket } from "./socket";
import { fetchProfile } from "./reactQuery/query";

axiosRequestInterceptor();
axiosResponseInterceptor();

function App() {
  // const auth = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //loading
  const [globalLoader, setGlobalLoader] = useState(false);

  // useEffect
  useEffect(() => {
    if (isUserLoggedIn()) {
      dispatch(setUser({ userId: localStorage.getItem("userId") }));
    }
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isUserLoggedIn() ? (
        <>
          <AuthContext.Provider
            value={{
              globalLoader,
              setGlobalLoader,
            }}
          >
            <Box sx={{ display: "flex" }}>
              <Navbar />
              <Outlet />
            </Box>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={globalLoader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </AuthContext.Provider>
        </>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        {
          index: true,
          // path: "/",
          element: (
            <Home>
              <Chats />
            </Home>
          ),
        },
        {
          path: "/groups",
          element: (
            <Home>
              <Groups />
            </Home>
          ),
        },
        {
          path: "/setting",
          element: (
            <Home>
              <Setting />
            </Home>
          ),
        },
        {
          path: "/profile",
          element: (
            <Home>
              <UserProfile />
            </Home>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: isUserLoggedIn() ? (
        <Navigate to="/" />
      ) : (
        <div>
          <AuthContext.Provider
            value={{
              globalLoader,
              setGlobalLoader,
            }}
          >
            <Login />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={globalLoader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </AuthContext.Provider>
        </div>
      ),
    },
    {
      path: "/register",
      element: isUserLoggedIn() ? (
        <Navigate to="/" />
      ) : (
        <>
          <AuthContext.Provider
            value={{
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
            }}
          >
            <Register />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={globalLoader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </AuthContext.Provider>
        </>
      ),
    },
    {
      path: "/verify",

      element: isUserLoggedIn() ? (
        <Navigate to="/" />
      ) : (
        <>
          <AuthContext.Provider
            value={{
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
            }}
          >
            <Verify />
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={globalLoader}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          </AuthContext.Provider>
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
