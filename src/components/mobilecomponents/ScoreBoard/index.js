import React from "react";
import { Container } from "reactstrap";
import Slider from "./Slider";
import { BoardWrapper } from "./style";

import TagLines from "./TagLines";
const ScoreBoard = ({
  tagLine,
  firstTeam,
  secondShow,
  secondTeam,
  double,
  featured,
  icons,
  baseBall,
  points,
  title,
  subTitle,
  fieldText,
  imageTochanged,
  fieldColor,
  notShow,
  otherIcons,
  setstate,
}) => {
  return (
    <BoardWrapper>
      <Container fluid={true}>
        <TagLines
          title={tagLine}
          firstTeam={firstTeam}
          secondTeam={secondTeam}
        />
        <Slider
          double={double}
          featured={featured}
          icons={icons}
          baseBall={baseBall}
          title={title}
          subTitle={subTitle}
          fieldText={fieldText}
          fieldColor={fieldColor}
          points={points}
          secondShow={secondShow}
          imageTochanged={imageTochanged}
          otherIcons={otherIcons}
          notShow={notShow}
        />
      </Container>
    </BoardWrapper>
  );
};

export default ScoreBoard;
