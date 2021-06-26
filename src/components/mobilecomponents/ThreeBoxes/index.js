import React from "react";
import { Container, Row } from "reactstrap";
import SingleBox from "./singleBox/SingleBox";
import GameCountDown from "./GameCountDown";
import "./style.scss";
const ThreeBoxes = ({ state, showTime, priceModal, setModal }) => {
  return (
    <div
      className="box__wrapper"
      style={
        showTime
          ? { backgroundColor: "#17181a", marginTop: "-1px" }
          : { backgroundColor: "transparent", marginTop: "30px" }
      }
    >
      <Container fluid={true}>
        <Row>
          <SingleBox
            link={true}
            customClass="first"
            image="/images/live-standing.svg"
            heading="Standings"
            subHeading="Live"
            setModal={setModal}
            showTime={showTime}
          />
          <SingleBox
            customClass=""
            image="/images/price-grid.svg"
            heading="Grid"
            subHeading="Price"
            priceModal={priceModal}
            showTime={showTime}
          />
          <SingleBox
            customClass="third"
            image="/images/gaming.svg"
            heading="Center"
            subHeading="My Game"
            showTime={showTime}
          />
          {showTime === true && <GameCountDown state={state} />}
        </Row>
      </Container>
    </div>
  );
};

export default ThreeBoxes;
