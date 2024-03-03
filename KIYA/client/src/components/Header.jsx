import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link className="site-logo" to="/">
        #KIYA
      </Link>
      <p>Contact Us</p>
    </header>
  );
}
