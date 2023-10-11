import "./App.css";
import Login from "./pages/login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";

function App() {
  const router = createBrowserRouter([
    {
      path: "/login",
      index: true,
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/",
      element: <div>Hello</div>,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
