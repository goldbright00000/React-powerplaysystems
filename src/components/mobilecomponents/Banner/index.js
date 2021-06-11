import React from "react";

import { Container, Row, Col } from "reactstrap";
import "./mobile_banner.scss";

const Banner = () => {
  return (
    <div className="mobile__banner">
      <Container fluid={true}>
        <Row>
          <Col className="text-center">
            <h1>
              MLB 2021 <span className="color">PowerdFS</span>{" "}
            </h1>
            <h2>
              Entries <span className="ten">10,000 </span>{" "}
              <span className="tens">/ 100,000</span>
            </h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
