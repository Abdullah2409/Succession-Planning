import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AuthContext from "../context/authcontext";

export default function AuthRequired() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}
