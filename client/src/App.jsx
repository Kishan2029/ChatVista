import "./App.css";
import Login from "./pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Verify from "./pages/verify";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { Outlet } from "react-router-dom";
import { Backdrop, Box, CircularProgress } from "@mui/material";
import { Chats, Setting, UserProfile } from "./components";
import { Groups } from "./components/groups";
import { useState } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  //loading
  const [globalLoader, setLoader] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
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
        </>
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
      element: (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={globalLoader}
          >
            <Login />
          </Backdrop>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={globalLoader}
          >
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
              }}
            >
              <Register />
            </AuthContext.Provider>
          </Backdrop>
        </>
      ),
    },
    {
      path: "/verify",
      element: (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={globalLoader}
          >
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
              }}
            >
              <Verify />
            </AuthContext.Provider>
          </Backdrop>
        </>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
