import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/AllUsers/AllUsers";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        
      ]
    },
    {
      path: 'dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        
        // admin routes
        {
          path: 'users',
          element: <AllUsers></AllUsers>
        }

      ]
    }
  ]);