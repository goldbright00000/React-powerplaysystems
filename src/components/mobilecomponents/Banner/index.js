import React from "react";
import { BannerWrapper } from "./style";
import { Container, Row, Col } from "reactstrap";
const Banner = () => {
  return (
    <BannerWrapper>
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
    </BannerWrapper>
  );
};

export default Banner;
