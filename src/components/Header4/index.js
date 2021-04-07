import React from "react";
import PropTypes from "prop-types";

import classes from "./index.module.scss";
import DocIcon from "../../icons/Doc";
import Trophy from "../../icons/Trophy";
import PowerBW from "../../assets/power_bw.png";
import { setNumberComma } from "../../utility/shared";
import Points from "../../icons/Points";
import ContestRulesPopUp from "../ContestRulesPopUp";
function Header3(props) {
  const {
    onClickContest = () => {},
    onClickPrize = () => {},
    titleMain1 = "",
    titleMain2 = "",
    subHeader1 = "",
    subHeader2 = "",
    contestBtnTitle = "",
    prizeBtnTitle = "",
    bgImageUri,
    compressedView = false,
    currentState = <></>,
  } = props || {};

  const FooterSection = ({ Icon, isSvg, title, footerText }) => (
    <div className={classes.footer_section}>
      {Icon && !isSvg ? <img src={Icon} /> : Icon && <Icon />}
      <div className={classes.footer_section_r}>
        <p className={footerText && classes.margin}>{title}</p>
        {footerText && <span>{footerText}</span>}
      </div>
    </div>
  );

  const RenderHeader = () => (
    <div
      className={`${classes.header_container} ${
        compressedView && classes.compressedView
      }`}
      style={{ backgroundImage: "url(" + bgImageUri + ")" }}
    >
      <div className={classes.header_top}>
        {titleMain1 && (
          <div className={classes.header_title}>
            <h2 className={compressedView && classes.compressedView}>
              {titleMain1} <span>{titleMain2}</span>
            </h2>
          </div>
        )}
        {!compressedView && subHeader1 && <p>{subHeader1}</p>}
        {!compressedView && subHeader2 && (
          <p className={classes.p2}>{subHeader2}</p>
        )}

        <div
          className={`${classes.header_buttons} ${
            compressedView && classes.compressedView
          }`}
        >
          {contestBtnTitle && (
            <ContestRulesPopUp
              component={({ showPopUp }) => (
                <button onClick={showPopUp}>
                  <DocIcon /> {contestBtnTitle}
                </button>
              )}
            />
          )}
          {prizeBtnTitle && (
            <button
              className={compressedView && classes.compressedView}
              onClick={onClickPrize}
            >
              <Trophy /> Prize Grid
            </button>
          )}
        </div>
      </div>

      <div className={classes.header_bottom}>
        <div className={classes.header_bottom_l}>
          <p>
            Entries {setNumberComma(10000)}
            <span> / {setNumberComma(100000)}</span>
          </p>
        </div>

        <div className={classes.header_bottom_r}>
          {currentState && currentState}
          <div className={classes.divider} />
          <FooterSection
            title="15,000"
            footerText="Power Balance"
            Icon={PowerBW}
          />
          <div className={classes.divider} />
          <FooterSection
            title="$36"
            footerText="Cash Balance"
            Icon={Points}
            isSvg
          />
          <div className={classes.divider} />
          <FooterSection title="Deposit" />
        </div>
      </div>
    </div>
  );

  return <RenderHeader />;
}

Header3.propTypes = {
  onClickContest: PropTypes.func,
  onClickPrize: PropTypes.func,
  titleMain1: PropTypes.string,
  titleMain2: PropTypes.string,
  subHeader1: PropTypes.string,
  subHeader2: PropTypes.any,
  contestBtnTitle: PropTypes.string,
  prizeBtnTitle: PropTypes.string,
  bgImageUri: PropTypes.string,
  compressedView: PropTypes.bool,
  currentState: PropTypes.element,
};

export default Header3;
