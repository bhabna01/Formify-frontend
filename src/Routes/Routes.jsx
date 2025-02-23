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
// import TemplateGallery from "../pages/Templates/TemplateGallery";
import ReviewSubmissions from "../pages/Templates/ReviewSubmissions";
import ManageTemplate from "../pages/Templates/ManageTemplate";
import MainPage from "../pages/Templates/MainPage";
import TagSearch from "../pages/Templates/TagSearch";
import FormSubmissionView from "../pages/Templates/FormSubmissionView";
import ErrorPage from "../pages/ErrorPage/ErrorPage";



export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path:'/',
          // element:<TemplateGallery> </TemplateGallery>
          element:<MainPage></MainPage>
        },
        {
          path: 'login',
          element: <Login></Login>
        },
        {
          path: 'signup',
          element: <SignUp></SignUp>
        },
        {
          path:'search',
          element:<TagSearch></TagSearch>
        },
        {
          path:'template/:id',
          element:<FormSubmissionView></FormSubmissionView>
        }
        
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
        },
        {
          path:'reviewSubmissions',
          element:<ReviewSubmissions></ReviewSubmissions>
        },
        {
          path:'manageTemplates',
          element:<ManageTemplate></ManageTemplate>
        }

      ]
    },
    {
      path: '*',
      element: <ErrorPage></ErrorPage>
  }
  ]);