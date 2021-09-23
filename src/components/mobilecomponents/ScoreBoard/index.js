import React from "react";
import { Container } from "reactstrap";
import Slider from "./Slider";
import "./score_board.scss";
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
  hitter,
  pitcher,
  strikes,
  balls,
  fieldText,
  imageTochanged,
  fieldColor,
  notShow,
  otherIcons,
  footerText,
  setstate,
  boostModal,
  swapModal,
  type,
  index,
  ranks,
  counts,
  player,
  active_power_id
}) => {
  return (
    <section className="transparent board__wrapper">
      <Container fluid={true}>
        <TagLines
          title={tagLine}
          firstTeam={firstTeam}
          secondTeam={secondTeam}
        />
        <Slider
          swapModal={swapModal}
          boostModal={boostModal}
          double={double}
          featured={featured}
          icons={icons}
          baseBall={baseBall}
          title={title}
          subTitle={subTitle}
          fieldText={fieldText}
          fieldColor={fieldColor}
          points={points}
          hitter={hitter}
          pitcher={pitcher}
          strikes={strikes}
          footerText={footerText}
          balls={balls}
          secondShow={secondShow}
          imageTochanged={imageTochanged}
          otherIcons={otherIcons}
          notShow={notShow}
          type={tagLine}
          index={index}
          ranks={ranks}
          counts={counts}
          player={player}
          active_power_id={active_power_id}
        />
      </Container>
    </section>
  );
};

export default ScoreBoard;
