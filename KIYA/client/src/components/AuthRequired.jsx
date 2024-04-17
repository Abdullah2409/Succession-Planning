import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AuthContext from "../context/authcontext";

/* This component is used to check if the user is authenticated or not. If the user is authenticated, 
it will render the Navbar and the child components. If the user is not authenticated, 
it will redirect the user to the signin page. 
*/
export default function AuthRequired() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      {isAuthenticated ? (
        <>
          <Navbar />
          <div className="w-full max-w-screen-xl">
            <Outlet />
          </div>
        </>
      ) : (
        <Navigate to="/signin" />
      )}
    </>
  );
}
