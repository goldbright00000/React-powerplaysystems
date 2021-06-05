import React from "react";
import { BoxBooster } from "./style";
const Box = () => {
  return (
    <div style={{ display: "flex", marginTop: "20px" }}>
      <BoxBooster>
        <img src="/images/oneX.svg" alt="boost" />
      </BoxBooster>
      <BoxBooster>
        <img src="/images/2xBoost.svg" alt="boost" />
      </BoxBooster>
      <BoxBooster margin={false}>
        <img src="/images/3xSpeed.svg" alt="boost" />
      </BoxBooster>
    </div>
  );
};

export default Box;
