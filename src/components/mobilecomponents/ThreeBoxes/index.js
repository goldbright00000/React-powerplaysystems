import React from "react";
import { Container, Row } from "reactstrap";
import SingleBox from "./singleBox/SingleBox";
import GameCountDown from "./GameCountDown";
import PrizeModal from "../../PrizeModal";
import { CONSTANTS } from "../../../utility/constants";
import * as CryptoJS from "crypto-js";
import { getLocalStorage, printLog, redirectTo } from "../../../utility/shared";
import "./style.scss";
const ThreeBoxes = ({ state, showTime, priceModal, setModal, data }) => {
  function getTeamFromLocalStorage() {
    const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME);
    const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
    const decSelectedTeamData = JSON.parse(
      byteData.toString(CryptoJS.enc.Utf8)
    );

    return decSelectedTeamData;
  }
  const selectedTema = getTeamFromLocalStorage();
  console.log("selectedTeam", selectedTema);
  console.log("data",data);
  const [showPrizeModal, setPrizeModalState] = React.useState(false);
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
            linkURL={'/live-standing'}
          />
          <SingleBox
            customClass=""
            image="/images/price-grid.svg"
            heading="Grid"
            subHeading="Price"
            priceModal={priceModal}
            showTime={showTime}
            onButtonClick={() => {
              setPrizeModalState(true)
            }}
          />
          <SingleBox
            customClass="third"
            image="/images/gaming.svg"
            heading="Center"
            subHeading="My Game"
            showTime={showTime}
            link={true}
            linkURL={'/my-game-center'}
          />
          {showTime === true && <GameCountDown state={state} />}
        </Row>
      </Container>
      <PrizeModal
        visible={showPrizeModal}
        sportsName="MLB"
        data={selectedTema?.game?.PrizePayouts}
        onClose={() => setPrizeModalState(false)}
      />
    </div>
  );
};

export default ThreeBoxes;
