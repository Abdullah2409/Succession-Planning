import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AuthRequired() {
  const loggedIn = false;

  return (
    <>
      {loggedIn ? (
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
