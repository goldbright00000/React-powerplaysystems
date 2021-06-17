import React, { useState } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import Slider from "../../components/Slider";
import Battery from "../../icons/Battery";
import ShowBatteries from "./ShowBatteries";

function SliderModal(props) {
  const [slider, setSlider] = useState(1.5);

  const {
    min = 1.5,
    max = 5,
    axis = "y",
    visible = false,
    player = {},
    onChange = (value) => {},
    onClose = () => {},
  } = props || {};

  if (!visible) return <></>;

  return (
    <div className={classes.sliderWrapper}>
      <button className={classes.slider_close_btn} onClick={onClose}>
        &#x2715;
      </button>
      <h3>
        <span>Point booster</span> level
      </h3>
      <div className={classes.slider_container}>
        <div className={classes.slider_left}>
          <ShowBatteries value={slider} />
          <span>
            Points for {player?.playerName} will be boosted for this plate
            appearance by the amount you choose
          </span>
        </div>
        <div className={classes.slider_right}>
          <Slider
            visible={true}
            value={slider}
            min={min}
            max={max}
            axis={axis}
            onChange={(e) => {
              setSlider(e.target.value);
              onChange(e.target.value);
            }}
          />
          <div className={classes.cell_steps}>
            <span>
              <div className={classes.cell_short_line} /> 5x
            </span>
            <span>
              <div className={classes.cell_long_line} /> 4.5x
            </span>
            <span>
              <div className={classes.cell_short_line} /> 4x
            </span>
            <span>
              <div className={classes.cell_long_line} /> 3.5x
            </span>
            <span>
              <div className={classes.cell_short_line} /> 3x
            </span>
            <span>
              <div className={classes.cell_long_line} /> 2.5x
            </span>
            <span>
              <i className={classes.cell_short_line}></i> 2x
            </span>
            <span>
              <i className={classes.cell_long_line}></i> 1.5x
            </span>
          </div>
        </div>
      </div>
      <div className={classes.slider_footer}>
        <button>Cancel</button>
        <button className={classes.fill}>Save</button>
      </div>
    </div>
  );
}

SliderModal.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  axis: PropTypes.string,
  onChange: PropTypes.func,
  visible: PropTypes.bool,
  onClose: PropTypes.func,
  player: PropTypes.object,
};

export default SliderModal;
