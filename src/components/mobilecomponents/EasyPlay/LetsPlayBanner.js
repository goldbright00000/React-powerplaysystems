import React from "react";
import "./easy_play.scss";
const LetsPlayBanner = ({
  image,
  number,
  description,
  width,
  height,
  background,
}) => {
  return (
    <>
      {background && (
        <div style={{ marginTop: "85px" }}>
          <img src={background} alt="stepfive" width="100%" height="100%" />
        </div>
      )}
      <div
        className={`play`}
        style={background && { marginTop: "-104px", marginBottom: "136px" }}
      >
        <div className="image_holder">
          {image && (
            <img src={image} alt="LetsPlay" width={width} height={height} />
          )}
          <div className="numberbox">
            <span>{number}</span>
          </div>
        </div>
        <div className="description">
          <p
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          />
        </div>
      </div>
    </>
  );
};

export default LetsPlayBanner;
