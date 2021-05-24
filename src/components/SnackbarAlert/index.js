import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeShownAlert } from "../../actions/notificationActions";
import classes from "./index.module.scss";
import CloseIconWhite from "../../assets/close-white-icon.png";
// import Icon from "../Icon";
// import successIcon from "../icons/success.svg";
// import errorIcon from "../icons/error.svg";
// import closeIcon from "../icons/close.svg";
// import { Wrapper, Content, Message } from "./Wrappers";

const Alert = () => {
  const dispatch = useDispatch();
  const { alerts } = useSelector((state) => state.notifications);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (alerts?.length > 0) {
      setAlert(alerts[alerts.length - 1]);
      setShow(true);
      setTimeout(() => {
        setShow(false);
        let a = alerts.filter((item, index) => index !== alerts.length - 1);
        dispatch(removeShownAlert(a));
      }, 5000);
    }
  }, [alerts]);

  const onClose = () => {
    setShow(false);
  };

  // const color = alert.type === "success" ? "teal" : "darkred";
  // const iconUrl = alert.type === "success" ? successIcon : errorIcon;
  return show ? (
    <div className={`${classes.__wrapper} ${classes[alert.type]}`}>
      <div className={classes.content_div}>
        {/* <Icon icon={iconUrl} color={color} size="20px" /> */}
        <div className={classes.message}>{alert.message || ""}</div>
      </div>
      {/* <Icon
        icon={closeIcon}
        color={color}
        size="24px"
        onClick={onClose}
        style={{ cursor: "pointer" }}
      /> */}
      <img
        src={CloseIconWhite}
        width="20px"
        height="20px"
        style={{ cursor: "pointer" }}
        onClick={onClose}
      />
    </div>
  ) : null;
};

export default Alert;
