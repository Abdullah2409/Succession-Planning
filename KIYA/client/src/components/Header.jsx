import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="w-full px-md md:px-sd bg-primary flex justify-between items-center p-lg">
      <Link
        className="site-log font-bold text-xl md:text-3xl font-alerta flex items-center gap-2"
        to="/"
      >
        <img src={logo} alt="KIYA" className="w-6 h-6 md:w-12 md:h-12" />
        KIYA
      </Link>
      <div className="font-roboto">
        <p className="font-bold text-base md:text-[20px]">Contact Us</p>
        <p className="text-sm md:text-base">info@devsinc.io</p>
      </div>
    </header>
  );
}
