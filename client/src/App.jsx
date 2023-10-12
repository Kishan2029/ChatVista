import "./App.css";
import Login from "./pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Verify from "./pages/verify";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Chats, Groups, Setting, UserProfile } from "./components";

function App() {
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
      element: <Register />,
    },
    {
      path: "/verify",
      element: <Verify />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
