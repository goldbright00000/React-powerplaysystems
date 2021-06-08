import React from "react";
import { Wrapper } from "./style";
import { Container, Row, Col } from "reactstrap";
import Logo from "./Logo";
import Menu from "./Menu";

const Header = () => {
  return (
    <Wrapper>
      <Container fluid={true}>
        <Row>
          <Col>
            <Logo />
          </Col>
          <Col className="text-end">
            <Menu />
          </Col>
        </Row>
      </Container>
    </Wrapper>
  );
};

export default Header;
