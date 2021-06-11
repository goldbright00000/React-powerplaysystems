import React from "react";
import { Col, Row } from "reactstrap";
const TagLines = ({ title, firstTeam, secondTeam }) => {
  return (
    <Row className="taglines">
      <Col xs={6}>
        <div className="border-line"></div>
        <h2>{title}</h2>
      </Col>
      <Col xs={6} className="text-end">
        <h4>
          {firstTeam}
          <br />
          vs <span>{secondTeam}</span>
        </h4>
      </Col>
    </Row>
  );
};

export default TagLines;
