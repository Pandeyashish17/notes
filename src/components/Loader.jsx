import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = () => {
  return (
    <div className="min-h-[85vh] grid place-content-center">
      <PacmanLoader color="#1F2937" />
    </div>
  );
};

export default Loader;
