import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import WinningCash from "./WinningCash";
import Chart from "./Chart";
import MyScore from "./MyScore";
import MyPowersMenu from "../MyPowersMenu/MyPowersMenu";
import BoosterPopUp from "../BoosterPopUp/BoosterPopUp";
import PrizeGrid from "../PrizeGrid/PrizeGrid";
import SwapStarter from "../SwapStarter/SwapStarter";
import "./live_match.scss";
const LiveMatch = () => {
  const [modal, setModal] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [priceGrid, setPriceGrid] = useState(false);
  const [swap, setSwap] = useState(false);
  const boostModal = value => {
    setModal(value);
    setSecondModal(!secondModal);
  };
  const toggle = () => setModal(!modal);
  const priceModal = value => {
    setModal(value);
    setPriceGrid(!priceGrid);
  };

  const swapModal = value => {
    setModal(value);
    setSwap(!swap);
  };

  return (
    <>
      <section className="matchWrapper">
        <div className="live">
          <Container>
            <Row>
              <Col xs={4}>
                <WinningCash />
              </Col>
              <Col xs={4}>
                <Chart />
              </Col>
              <Col xs={4}>
                <MyScore />
              </Col>
            </Row>
          </Container>
          <div className="matchWrapper__rank">
            <div className="box">
              <span className="cricle"></span>
              <p>
                Live Rank <span>|</span>
              </p>

              <h2>23</h2>
            </div>
            <div className="menuButton" onClick={toggle}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>

      <MyPowersMenu
        modal={modal}
        toggle={toggle}
        boostModal={boostModal}
        priceModal={priceModal}
        swapModal={swapModal}
        setModal={setModal}
      />
      <BoosterPopUp secondModal={secondModal} boostModal={boostModal} />
      <PrizeGrid priceGrid={priceGrid} priceModal={priceModal} />
      <SwapStarter swap={swap} swapModal={swapModal} />
    </>
  );
};

export default LiveMatch;
