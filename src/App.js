import Login from "./pages/login/login"
import Register from "./pages/register/register"
import Home from "./pages/home/home"
import Category from './pages/category/category'
import Profile from "./pages/profile/profile"
import { useEffect, useState } from 'react';
import Navbar from "./components/navbar/navbar"
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  Navigate
} from "react-router-dom";
import Leftbar from "./components/leftbar/leftbar";
import Rightbar from "./components/rightbar/rightbar";
import './style.scss'
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";

import { padding } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { AuthContext } from "./context/authContext";

import { QueryClient, QueryClientProvider } from 'react-query'

function App() {

  const {currentUser} = useContext(AuthContext);

  const { darkMode } = useContext(DarkModeContext);
  const queryClient = new QueryClient()

  const Layout = ()=>{
    return(

      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : "light"}`}>
        <Navbar/>
        <div style={{ display:"flex" }}>
          <Leftbar/>
          <div className="outlet">
          <Outlet/>
          </div>
         
        
        </div>
      </div>
      </QueryClientProvider>
    )

  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };


  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/profile/:id",
          element:<Profile/>
        },
        {
          path:"/category/car",
          element:<Category/>
        },
        {
          path:"/category/rac",
          element:<Category/>
        },
        {
          path:"/category/household",
          element:<Category/>
        },
        {
          path:"/category/electronic",
          element:<Category/>
        },
        {
          path:"/category/fan",
          element:<Category/>
        },
        {
          path:"/category/other",
          element:<Category/>
        }

      ]
    },
    {
      path: "/login",
      element: <Login/>,
    },
    {
      path: "/register",
      element: <Register/>,
    },
   
   
  ]);


  return (
   

    <div>
    <RouterProvider router={router} />
    </div>
  
  );
}

export default App;
