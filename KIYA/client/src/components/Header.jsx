import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";

export default function Header() {
  return (
    <header className="w-full px-md md:px-sd bg-primary flex justify-between items-center p-lg drop-shadow-md">
      <Link
        className="site-log font-bold text-[1.25rem] md:text-[2.5rem] font-alerta flex items-center gap-2 [text-shadow:_0_4px_4px_rgb(0_0_0_/_25%)]"
        to="/"
      >
        <img src={logo} alt="KEYA" className="w-6 h-6 md:w-12 md:h-12" />
        KEYA
      </Link>
      <div className="font-roboto">
        <p className="font-bold text-base md:text-[20px]">Contact Us</p>
        <p className="text-sm md:text-base">info@devsinc.io</p>
      </div>
    </header>
  );
}
