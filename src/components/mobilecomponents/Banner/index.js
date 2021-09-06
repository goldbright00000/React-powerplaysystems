import React from "react";

import { Container, Row, Col } from "reactstrap";
import "./mobile_banner.scss";
import { getLocalStorage } from "../../../utility/shared";
import { CONSTANTS } from "../../../utility/constants";
import * as CryptoJS from "crypto-js";

function getTeamFromLocalStorage() {
  const encData = getLocalStorage(CONSTANTS.LOCAL_STORAGE_KEYS.MLB_LIVE_GAME);
  const byteData = CryptoJS.AES.decrypt(encData, CONSTANTS.DATA_ENC_KEY);
  const decSelectedTeamData = JSON.parse(
    byteData.toString(CryptoJS.enc.Utf8)
  );
  return decSelectedTeamData;
}

const Banner = () => {
  const selectedTeam = getTeamFromLocalStorage();
  return (
    <div className="mobile__banner">
      <Container fluid={true}>
        <Row>
          <Col className="text-center">
            <h1>
              MLB 2021 <span className="color">PowerdFS</span>{" "}
            </h1>
            <h2>
              Entries <span className="ten">{selectedTeam.enrolled_users}</span>{" "}
              <span className="tens">/ {selectedTeam.game.target}</span>
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
