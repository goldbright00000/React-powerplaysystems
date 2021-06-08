import React from "react";
import { Modal } from "reactstrap";
import Player from "./Player";
import { SwapWrapper, SearchFields } from "./style";
//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN APP.CSS FILE.
//********************************************************************************
//********************************************************************************

const SwapStarter = ({ swap, swapModal }) => {
  return (
    <Modal isOpen={swap} toggle={swapModal} className="popUpModal swapModal ">
      <SwapWrapper>
        <div className="heading">
          <h2>Swap Your Starter</h2>
          <p>Choose QB player to replace</p>
          <h1>Brandon Allen</h1>
        </div>
        <SearchFields>
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
        </SearchFields>
        <Player />
        <Player />

        <Player />

        <Player />

        <Player />
        <div className="close__box" onClick={() => swapModal(false)}>
          X
        </div>
      </SwapWrapper>
    </Modal>
  );
};

export default SwapStarter;
