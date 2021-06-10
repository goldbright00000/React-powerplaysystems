import React from "react";
import { Modal } from "reactstrap";
import Player from "./Player";
import "./starter.scss";
//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN STYLE.SCSS FILE.
//********************************************************************************
//********************************************************************************

const SwapStarter = ({ swap, swapModal }) => {
  return (
    <Modal isOpen={swap} toggle={swapModal} className="popUpModal swapModal ">
      <d className="swap__wrapper">
        <div className="heading">
          <h2>Swap Your Starter</h2>
          <p>Choose QB player to replace</p>
          <h1>Brandon Allen</h1>
        </div>
        <div
          className="swap__wrapper__searchFileds"
          style={{ marginTop: "30px", paddingBottom: "0px" }}
        >
          <div className="input__search">
            <input type="text" placeholder="Search By Player Name" />
            <img src="/images/searchIcon.svg" alt="icon" />
          </div>
          <div className="select__feilds">
            <select>
              <option>All Teams</option>
              <option>All Teams</option>
              <option>All Teams</option>
              <option>All Teams</option>
            </select>
            <img src="/images/arrow-right.svg" alt="arrow" />
          </div>
        </div>
        <Player />
        <Player />

        <Player />

        <Player />

        <Player />
        <div className="close__box" onClick={() => swapModal(false)}>
          X
        </div>
      </d>
    </Modal>
  );
};

export default SwapStarter;
