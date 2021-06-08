import React, { useState } from "react";
import { Container, Row } from "reactstrap";
import { CardWrapper, CardBody, CardFooter } from "./style";
import Header from "./header/header";
import Body from "./Body/Body";
import Footer from "./Body/Footer";
const ScoreCard = ({
  sideTitle,
  title,
  subtitle,
  totalPts,
  image,
  myScore,
  clr,
  bgClr,
  collapseId,
  background,
  showFull,
  runnungTotal,
}) => {
  const [show, setShow] = useState(showFull);
  const [id, setId] = useState(collapseId);
  const toggle = (value, collId) => {
    if (collId === id) {
      setShow(value);
      setId(collId);
    }
  };
  return (
    <CardWrapper>
      <Container fluid={true}>
        <Header
          background={background}
          toggle={toggle}
          show={show}
          sideTitle={sideTitle}
          title={title}
          id={id}
          subtitle={subtitle}
        />

        <CardBody background={background}>
          <Row>
            <Body
              show={show}
              totalPts={totalPts}
              image={image}
              myScore={myScore}
              clr={clr}
              bgClr={bgClr}
            />
          </Row>
        </CardBody>

        <CardFooter background={background}>
          <Footer runnungTotal={runnungTotal} />
        </CardFooter>
      </Container>
    </CardWrapper>
  );
};

export default ScoreCard;
