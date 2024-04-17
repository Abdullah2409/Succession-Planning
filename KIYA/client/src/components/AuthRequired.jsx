import React, { useContext, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import AuthContext from "../context/authcontext";
import { BsList } from "react-icons/bs";
import { Transition } from "@headlessui/react";

export default function AuthRequired() {
  const { isAuthenticated } = useContext(AuthContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <BsList
        className="text-3x cursor-pointer absolute left-4 z-50 sm:hidden"
        onClick={toggleSidebar}
      />
      <div className="relative flex h-screen sm:hidden">
        <Transition
          show={isSidebarOpen}
          enter="transition-all duration-300 ease-out"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition-all duration-300 ease-in"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
          className="absolute top-0 left-0 flex-shrink-0 w-64 text-white z-40"
        >
          <Navbar />
        </Transition>
      </div>
      <div className="hidden sm:block">
        <Navbar />
      </div>
      <div className="flex flex-col flex-1">
        <div className="w-full max-w-screen-xl">
          <Outlet />
        </div>
      </div>
      {!isAuthenticated && <Navigate to="/signin" />}
    </>
  );
}
