import React from "react";
import { ImageWrapper } from "./style";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
const SwingAway = () => {
  return (
    <ImageWrapper>
      <Container>
        <Link to="#">
          <img
            src="/images/swing.png"
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Link>
      </Container>
    </ImageWrapper>
  );
};

export default SwingAway;
