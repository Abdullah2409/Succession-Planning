import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
// Importing React Library, Outlet component and header component

// Defining the Layout component
export default function Layout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
