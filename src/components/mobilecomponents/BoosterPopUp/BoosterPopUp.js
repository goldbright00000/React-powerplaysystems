import React from "react";
import { Modal } from "reactstrap";
import Box from "./Box";
import { ModalWrapper } from "./style";
//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN APP.CSS FILE.
//********************************************************************************
//********************************************************************************

const BoosterPopUp = ({ secondModal, boostModal }) => {
  return (
    <Modal
      isOpen={secondModal}
      toggle={() => boostModal(false)}
      className="popUpModal secondPop"
    >
      <ModalWrapper>
        <h1>Select the level of</h1>
        <p>POINT BOOSTER</p>
        <Box />
        <div className="close__box" onClick={() => boostModal(false)}>
          X
        </div>
      </ModalWrapper>
    </Modal>
  );
};

export default BoosterPopUp;
