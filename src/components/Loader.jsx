import React from "react";
import { PacmanLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen grid place-content-center">
      <PacmanLoader color="#ooacee" />
    </div>
  );
};

export default Loader;
