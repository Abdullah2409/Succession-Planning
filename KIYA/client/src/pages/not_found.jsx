import React from "react";
import notFoundImg from "../assets/not_found.svg";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen mx-auto">
      <div className="text-center font-bold">
        <h1>404 - Not Found</h1>
        <p>The page you're looking for does not exist.</p>
        <p>If you need assistance, please contact support.</p>
        <p>
          Alternatively, you can navigate back to the{" "}
          <Link to="/" className="text-[blue] underline hover:text-blue-700">
            homepage
          </Link>
          .
        </p>
      </div>
      <img
        src={notFoundImg}
        alt="Not Found"
        className="mt-5 h-auto max-w-full"
      />
    </div>
  );
};

export default NotFound;
