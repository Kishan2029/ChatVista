import "./App.css";
import Login from "./pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Verify from "./pages/verify";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Box sx={{ display: "flex" }}>
          <Navbar />
          <Outlet />
        </Box>
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
      element: <Login />,
    },
    {
      path: "/register",
      element: (
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
      ),
    },
    {
      path: "/verify",
      element: (
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
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
