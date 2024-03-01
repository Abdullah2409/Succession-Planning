import React, { useState } from "react";
import AuthContext from "./authcontext";

export default function AuthState(props) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
