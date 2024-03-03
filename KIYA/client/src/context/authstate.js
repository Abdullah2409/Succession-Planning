import React, { useState } from "react";
import AuthContext from "./authcontext";
// Improting React, useState (hook) and AuthContext component.

export default function AuthState(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Defining state for user information

  return (
    <AuthContext.Provider // For providing values to child components
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {props.children} {/* Render child components */}
    </AuthContext.Provider>
  );
}
