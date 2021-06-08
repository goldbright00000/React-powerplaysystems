import React from "react";
import { Container, Row, Col } from "reactstrap";
import { PoweredWrapper } from "./style";
const PoweredBy = () => {
  return (
    <PoweredWrapper>
      <Container fluid={true}>
        <Row>
          <Col>
            <img src="/images/bitmap.png" alt="" />
          </Col>
        </Row>
      </Container>
    </PoweredWrapper>
  );
};

export default PoweredBy;
