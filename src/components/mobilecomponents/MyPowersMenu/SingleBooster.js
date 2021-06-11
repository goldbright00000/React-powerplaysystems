import React from "react";

import "./menu.scss";
const SingleBooster = ({ src, heading, unlock, number, popUp }) => {
  return (
    <section className="boostWrapper">
      <div className="imageHolder" onClick={popUp ? () => popUp(false) : null}>
        <img src={`/images/${src}`} alt="booster" />
        {unlock === false && (
          <img src={`/images/lock.svg`} alt="booster" className="lock" />
        )}
      </div>

      <p>{heading}</p>

      {unlock === false ? (
        <div className="socails">
          <p>
            Share to <br />
            unlock:
          </p>
          <img
            src="/images/facebook.svg"
            alt="facebook"
            style={{ marginRight: 4 }}
          />
          <img src="/images/twitter.svg" alt="twitter" />
        </div>
      ) : (
        <div className="numberBox">
          <p>{number} left</p>
        </div>
      )}
    </section>
  );
};

export default SingleBooster;
