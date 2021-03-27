import React, { useEffect } from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import CloseIcon from "../../icons/Close";

function Modal(props) {
  const {
    visible = false,
    style = {},
    titleStyle = {},
    iconStyle = {},
    title = "",
    closeIcon = null,
    onClose = () => {},
    bodyStyle = {},
  } = props || {};

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [visible]);

  return (
    visible && (
      <div className={classes.wrapper} style={style}>
        <div className={classes.back_drop} onClick={onClose} />
        <div className={classes.modal} style={bodyStyle}>
          <div className={classes.header}>
            {title && <p style={titleStyle}>{title}</p>}
            <div
              onClick={onClose}
              className={classes.close_icon}
              style={iconStyle}
            >
              {closeIcon ? <closeIcon /> : <CloseIcon />}
            </div>
          </div>
          {props?.children}
        </div>
      </div>
    )
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
  title: PropTypes.string,
  closeIcon: PropTypes.element,
  onClose: PropTypes.func,
  style: PropTypes.object,
  iconStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
};

export default Modal;
