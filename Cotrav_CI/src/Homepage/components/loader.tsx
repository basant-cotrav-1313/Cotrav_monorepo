import React from "react";
import logo from "../../assets/images/cotravloader.gif"

const Loader: React.FC = () => {
  return (
    <div className="page-center-loader flex items-center justify-center backdrop-blur-sm bg-white/30">
          <div className="big-loader flex items-center justify-center">
            <img
              className="loader-gif"
              src={logo}
              alt="Loader"
            />
            <p className="text-center ml-4 text-gray-600 text-lg">
              Retrieving flight details. Please wait a moment.
            </p>
          </div>
        </div>
  );
};

export default Loader;

