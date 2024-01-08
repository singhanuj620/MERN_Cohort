import {
    createBrowserRouter
  } from "react-router-dom";
import App from "./App"
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
import Homepage from "./Components/Homepage/Homepage";
import Profile from "./Components/Profile/Profile";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "short",
          element: <Homepage />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);

export default router