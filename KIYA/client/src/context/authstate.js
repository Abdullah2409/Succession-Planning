import React, { useState } from "react";
import AuthContext from "./authcontext";

/* This component is used to provide the state and context to the child components. 
It is used to manage the state of the user authentication and user information that is currectly logged in.
*/
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
