import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  return (
    <div className="min-h-screen grid place-content-center">
      <PacmanLoader  />
    </div>
  );
};

export default Loader;
