import React from "react";

const Spiner = () => {
  return (
    <div className="spin-container">
      <div className="spiner">
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
        <div aria-hidden="true"></div>
      </div>
    </div>
  );
};

export default Spiner;
