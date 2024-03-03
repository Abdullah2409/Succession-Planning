import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AuthContext from "../context/authcontext";
// importing React, useContext, Navigate, Outlet, Navbar and Authcontext component

export default function AuthRequired() {
  const { isAuthenticated } = useContext(AuthContext); // Using the useContext hook to access authentication state from the AuthContext

  return (
    <>
      {isAuthenticated ? ( // Checking to see if user is authenticated, if they are, then render the Navbar component and the outlet component routes
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        // if not authenticated, then redirect to sign in page.
        <Navigate to="/signin" />
      )}
    </>
  );
}
