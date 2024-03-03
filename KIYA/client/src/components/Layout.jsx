import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

// This component represents the layout of the application,
// including the header and the main content area
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
