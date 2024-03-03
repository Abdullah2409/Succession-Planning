import React from "react";
import { useRouteError } from "react-router-dom";
// Importing the Error component and useRouteError hook

export default function Error() {
  const error = useRouteError();
  return (
    <>
      <h1>Error: {error.message}</h1> {/* For displaying the error message */}
      <pre>
        {error.status} - {error.statusText}{" "}
        {/* For error status and status text */}
      </pre>
    </>
  );
}
