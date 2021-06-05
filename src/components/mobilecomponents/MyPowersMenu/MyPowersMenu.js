import React from "react";
import { Modal } from "reactstrap";
import ThreeBoxes from "../ThreeBoxes";
import SingleBooster from "./SingleBooster";
import { ModalHeader, ModalFooter, Boosters } from "./style";

//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN APP.CSS FILE.
//********************************************************************************
//********************************************************************************
const MyPowersMenu = ({
  modal,
  toggle,
  boostModal,
  priceModal,
  swapModal,
  setModal,
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} className="popUpModal">
      <ModalHeader>
        <div>
          <p>Powers</p>
          <h2>15,000</h2>
        </div>
        <span>|</span>
        <div>
          <p>Cash</p>
          <h2>$36</h2>
        </div>
        <span>|</span>
        <div>
          <h2>DEPOSIT</h2>
        </div>
      </ModalHeader>

      <ModalFooter>
        <div className="heading">
          <h1>
            <span>MY</span> POWERS
          </h1>
        </div>

        <Boosters>
          <SingleBooster
            unlock={false}
            src="xpLocked.svg"
            heading="Point Booster"
            popUp={boostModal}
          />
          <SingleBooster
            unlock={true}
            src="repeat.svg"
            heading="Swap player"
            number="1"
            popUp={swapModal}
          />
          <SingleBooster
            unlock={true}
            src="undo.svg"
            heading="Undo"
            number="2"
          />
        </Boosters>
        <Boosters>
          <SingleBooster src="sheilds.svg" heading="D-Wall" unlock={false} />{" "}
          <SingleBooster
            unlock={true}
            src="challenge-power.svg"
            heading="Challenge"
            number="2"
          />
          <SingleBooster
            unlock={true}
            src="retro-boostBig.svg"
            heading="Retro Boost"
            number="2"
          />
        </Boosters>
        <ThreeBoxes
          showTime={false}
          priceModal={priceModal}
          setModal={setModal}
        />
        <div className="close__box" onClick={toggle}>
          x
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default MyPowersMenu;
