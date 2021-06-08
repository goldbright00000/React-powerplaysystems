import React from "react";

const ScoringPoints = ({ title, totalPts, image, bgClr, clr, myScore }) => {
  return (
    <div className="play">
      <h2>{title}</h2>

      {totalPts || myScore ? (
        <p style={bgClr ? { color: clr, backgroundColor: bgClr } : null}>
          {totalPts ? totalPts : myScore}
        </p>
      ) : null}

      {image && (
        <p>
          <img
            src={image}
            alt="file"
            style={{ width: "23px", height: "23px", objectFit: "cover" }}
          />
        </p>
      )}

      {image === false && <p></p>}
    </div>
  );
};

export default ScoringPoints;
