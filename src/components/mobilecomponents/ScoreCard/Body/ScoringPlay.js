import React from "react";
import { Row, Col } from "reactstrap";
import { ScorePlay } from "../style";
const ScoringPlay = ({ heading, title, plays, points, bg }) => {
  return (
    <ScorePlay bg={bg}>
      <Row>
        <Col xs={12}>
          <h2>{title}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={6} style={{ paddingRight: 0 }}>
          <p>{heading}</p>

          <span className="colorFul">{plays}</span>
        </Col>
        <Col xs={6} style={{ padding: 0 }}>
          <p>Pts</p>
          <span>{points}</span>
        </Col>
      </Row>
    </ScorePlay>
  );
};

export default ScoringPlay;
