import React from "react";
import { Col, Row } from "reactstrap";
import ScoringPlay from "./ScoringPlay";

import ScoringPoints from "./ScoringPoints";
import "./bodystyle.scss";
const Body = ({ show, totalPts, image, myScore, clr, bgClr }) => {
  return (
    <>
      {show === true ? (
        <>
          <Col xs={4}>
            <ScoringPlay
              bg={true}
              heading="Plays"
              title="Scoring Plays"
              plays="HR"
              points="6"
            />
          </Col>
          <Col xs={4}>
            <ScoringPlay heading="RBI" title="RBI" plays="1" points="6" />
          </Col>
          <Col xs={4}>
            <ScoringPlay heading="RS" title="Runs" plays="1" points="6" />
          </Col>
        </>
      ) : null}

      <div
        className="scorePoints"
        style={show === false ? { marginTop: 10 } : null}
      >
        <Row>
          <Col xs={4}>
            <ScoringPoints title="Total Pts" totalPts={totalPts} />
          </Col>
          <Col xs={4}>
            <ScoringPoints title="Powers" image={image} />
          </Col>
          <Col xs={4}>
            <ScoringPoints
              title="My Score"
              bgClr={bgClr}
              myScore={myScore}
              clr={clr}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Body;
