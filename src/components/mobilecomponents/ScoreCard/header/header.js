import React from "react";
import CardHeading from "./CardHeading";
import { CardHead } from "../style";
import CollapseButton from "./CollapseButton";
import Tag from "./Tag";
const header = ({
  show,
  toggle,
  sideTitle,
  title,
  subtitle,
  id,
  background,
}) => {
  return (
    <CardHead background={background}>
      <Tag sideTitle={sideTitle} />
      <CardHeading title={title} subtitle={subtitle} />
      <CollapseButton show={show} toggle={toggle} id={id} />
    </CardHead>
  );
};

export default header;
