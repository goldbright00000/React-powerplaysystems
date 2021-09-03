import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import classes from "./MyGameCenter.module.scss";
import Header from "../../components/Header/Header";
import "./MyGameCenter.scss";
import "./table.scss";
import Footer from "../../components/Footer/Footer";
import InteractiveContests from "./InteractiveContests";
import MyGameCenterTable from "./MyGameCenterTable";
import { getLocalStorage, printLog } from "../../utility/shared";
import { CONSTANTS } from "../../utility/constants";
import Balance from "../../components/Balance";
import MobileBalance from "../../components/MobileBalance";
import { showDepositForm } from "../../actions/uiActions";

const MyGameCenter = (props) => {
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });
  const { url } = props.match;
  const { auth: { user: { token = "" } } = {} } = useSelector((state) => state);
  const dispatch = useDispatch();

  const setShowDepositModal = () => dispatch(showDepositForm());

  return (
    <Fragment>
      <Header/>
      <div className="__my_game_center">
        <div className="__my_game_center_banner">
          <div className="__my_game_center_banner_left __container">
            <div className="__my_game_center_banner_left_title_main">
              My Game Center
            </div>
          </div>
        </div>
        {isMobile ? (
            <MobileBalance depositClicked={setShowDepositModal} />
        ) : (
            <Balance depositClicked={setShowDepositModal} />
        )}
        <div className={classes.container}>
          <Route exact path={url} component={InteractiveContests} />
          <Route path={`${url}/contests`} component={MyGameCenterTable} />
        </div>
      </div>
      <Footer isBlack={true} />
    </Fragment>
  );
};

export default MyGameCenter;
