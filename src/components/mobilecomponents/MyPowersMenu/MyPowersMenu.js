import React from "react";
import { Modal } from "reactstrap";
import ThreeBoxes from "../ThreeBoxes";
import SingleBooster from "./SingleBooster";
import "./menu.scss";
//********************************************************************************
//********************************************************************************
// ** I HAVE TO OVERWRITE MODAL COMPONENT CSS AND IT CAN BE FOUND IN STYLE.SCSS FILE.
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
      <div className="modal_header">
        <div>
          <p>Powers</p>
          <h2>15,000</h2>
        </div>
        <span style={{ color: "#292a2e" }}>|</span>
        <div>
          <p>Cash</p>
          <h2>$36</h2>
        </div>
        <span style={{ color: "#292a2e" }}>|</span>
        <div>
          <h2>DEPOSIT</h2>
        </div>
      </div>

      <section className="modal_footer">
        <div className="heading">
          <h1>
            <span>MY</span> POWERS
          </h1>
        </div>

        <div className="modal_footer__booster">
          <SingleBooster
            unlock={false}
            src="xpLocked.svg"
            heading="Point Booster"
          />
          <SingleBooster
            unlock={true}
            src="repeat.svg"
            heading="Swap player"
            number="1"
          />
          <SingleBooster
            unlock={true}
            src="undo.svg"
            heading="Undo"
            number="2"
          />
        </div>
        <div className="modal_footer__booster">
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
        </div>
        <ThreeBoxes
          showTime={false}
          priceModal={priceModal}
          setModal={setModal}
        />
        <div className="close__box" onClick={toggle}>
          x
        </div>
      </section>
    </Modal>
  );
};

export default MyPowersMenu;
