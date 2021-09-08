import React from "react";

const GameCountDown = ({ state, selectedTeam = {} }) => {
  console.log("selectedTeam GameCountDown", selectedTeam);
  return (
    <>
      <h4 className="pt-3 mt-1 mb-2">Live Game Starts in</h4>
      <h2
        className="color"
        style={state && state !== 1 ? { color: "#3f9946" } : null}
      >
        {state && state !== 1 && (
          <span
            className="box"
            style={{
              width: 12,
              height: 12,
              display: "inline-block",
              background: "#3f9946",
              borderRadius: "50%",
            }}
          ></span>
        )}{" "}
        {state && state === 1 ? "5d 4h 15min" : "IN PROGRESS"}
      </h2>
    </>
  );
};

export default GameCountDown;
