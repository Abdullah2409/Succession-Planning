import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/authcontext";
import Button from "../components/Button";
import bussinessPlanSVG from "../assets/Business Plan.svg";

// This is the home page of the application. It will display the information about the application and the links to the sign in and sign up pages.
export default function Home() {
  const { isAuthenticated } = useContext(AuthContext); // The auth context has the information about the user authentication. If the user is authenticated, it will have the user information.

  return (
    <div className="p-lg flex flex-col items-center md:flex-row">
      <img
        src={bussinessPlanSVG}
        className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl "
        alt="Business Plan"
      />
      <div>
        <h1 className="font-bold text-heading-mobile md:text-heading-desktop lg:text-[50px] mb-3">
          Succession <br></br> Planning With KEYA
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex
          dignissimos, nobis reprehenderit doloribus distinctio ipsam non.
          Voluptatum porro libero quibusdam reiciendis quae magnam ex tempora
          quia repudiandae facere, iure dicta.
        </p>

        <div className="mt-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button
                text="Go to Dashboard"
                bg_clr="bg-primary"
                text_clr="text-white"
              />
            </Link>
          ) : (
            <div className="flex gap-3">
              <Link to="/signin">
                <Button
                  text="Sign In"
                  bg_clr="bg-primary"
                  text_clr="text-white"
                />
              </Link>
              <Link to="/signup">
                <Button
                  text="Sign Up"
                  bg_clr="bg-primary"
                  text_clr="text-white"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
