import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [loggedIn, setLoggedIn] = React.useState(false); // Will change the state to true when the user logs in through redux

  return (
    <div>
      <h1>Succession Planning With KIYA</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex dignissimos,
        nobis reprehenderit doloribus distinctio ipsam non. Voluptatum porro
        libero quibusdam reiciendis quae magnam ex tempora quia repudiandae
        facere, iure dicta.
      </p>

      {loggedIn ? (
        <Link to="/dashboard">Dashboard</Link>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </div>
  );
}
