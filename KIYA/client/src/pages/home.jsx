import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authcontext";
import bussinessPlanSVG from "../images/Business Plan.svg";

// This is the home page of the application. It will display the information about the application and the links to the sign in and sign up pages.
export default function Home() {
  const { isAuthenticated } = useContext(AuthContext); // The auth context has the information about the user authentication. If the user is authenticated, it will have the user information.

  return (
    <div className="flex flex-col items-center md:flex-row">
      <img
        src={bussinessPlanSVG}
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl "
        alt="Business Plan"
      />
      <div>
        <h1 className="font-bold text-[35px] md:text-[40px] lg:text-[50px] mb-3">
          Succession <br></br> Planning With KIYA
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
          dignissimos, nobis reprehenderit doloribus distinctio ipsam non.
          Voluptatum porro libero quibusdam reiciendis quae magnam ex tempora
          quia repudiandae facere, iure dicta.
        </p>
        {isAuthenticated ? (
          <Link to="/dashboard">Dashboard</Link>
        ) : (
          <>
            <Link to="/signin">Sign In</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
}
