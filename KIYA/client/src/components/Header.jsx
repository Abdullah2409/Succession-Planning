import React from "react";
import { Link } from "react-router-dom";
// Importing React library and Link component

// Header component
export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        {" "}
        {/* Making a link component for the site logo, when clicked redirects to the root URl "/" */}
        #KIYA
      </Link>
      <p>Contact Us</p>
    </header>
  );
}
