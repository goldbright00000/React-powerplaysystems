import React from "react";
import "./boxBooster.scss";
const Box = () => {
  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      <div className="boxBooster">
        <img src="/images/oneX.svg" alt="boost" />
      </div>
      <div className="boxBooster">
        <img src="/images/2xBoost.svg" alt="boost" />
      </div>
      <div className="boxBooster">
        <img src="/images/3xSpeed.svg" alt="boost" />
      </div>
    </div>
  );
};

export default Box;
