import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Main from "../Layout/Main";
import Dashboard from "../Layout/Dashboard";
import AllUsers from "../pages/AllUsers/AllUsers";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import CreateTemplate from "../pages/Templates/CreateTemplate";
import FillTemplateForm from "../pages/Templates/FillTemplateForm";
import TemplateGallery from "../pages/Templates/TemplateGallery";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path:'/',
          element:<TemplateGallery></TemplateGallery>
        },
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
      element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
      children: [
        
        // admin routes
        {
          path: 'users',
          element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
          path:'createTemplate',
          element:<CreateTemplate></CreateTemplate>
        },
        {
          path:'templates/:templateId',
          element:<FillTemplateForm></FillTemplateForm>,
         

        }

      ]
    }
  ]);