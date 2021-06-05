import React from "react";
import { BoxWrapper } from "./style";
import { Container, Row } from "reactstrap";
import SingleBox from "./singleBox/SingleBox";
import GameCountDown from "./GameCountDown";

const ThreeBoxes = ({ state, showTime, priceModal, setModal }) => {
  return (
    <BoxWrapper showTime={showTime}>
      <Container fluid={true}>
        <Row>
          <SingleBox
            link={true}
            customClass="first"
            image="/images/live-standing.svg"
            heading="Standing"
            subHeading="Live"
            setModal={setModal}
          />
          <SingleBox
            customClass=""
            image="/images/price-grid.svg"
            heading="Grid"
            subHeading="Price"
            priceModal={priceModal}
          />
          <SingleBox
            customClass="third"
            image="/images/gaming.svg"
            heading="Center"
            subHeading="My Game"
          />
          {showTime === true && <GameCountDown state={state} />}
        </Row>
      </Container>
    </BoxWrapper>
  );
};

export default ThreeBoxes;
