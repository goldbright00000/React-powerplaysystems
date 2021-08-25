import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./score_board.scss";
import { removeZeroBeforeDecimalPoint } from "../../../utility/shared";
import { isEmpty } from "lodash";
const Slider = ({
  icons,
  double,
  baseBall,
  featured,
  title,
  subTitle,
  points,
  fieldText,
  secondShow,
  hitter,
  pitcher,
  strikes,
  balls,
  footerText,
  fieldColor,
  imageTochanged,
  notShow,
  otherIcons,
  boostModal,
  swapModal,
}) => {
  const {
    active: isHitterActive = false,
    bat_hand: hBatHand = "",
    current_position: hCurrentPos = "",
    current_team: hCurrenTeam = 0,
    datafeed_id: hDataFeedId = "",
    height: hHeight = "",
    is_injured: isHInjured = true,
    jersey_number: jJersyNumber = 0,
    name: hitterName = "",
    player_id: hId = 0,
    primary_position: hPrimaryPos = "",
    throw_hand: hThrowHand = "",
    type: hitterType = "",
    mlb_player_stats: hitterStats = [],
    match_stats: hMatchStats = [],
  } = hitter || {};

  const {
    base_on_balls: hBOB = 0,
    batting_average: hbBA = 0,
    doubles: Hdoubles = 0,
    // earned_runs_average: hERA = 0,
    // hits: hHits = 0,
    home_runs: hHomeRuns = 0,
    innings_pitched: hIp = 0,
    losses: hLosses = 0,
    ops: HOPS = 0,
    player_id: hPlayerId = 0,
    // runs_batted_in: hRBI = 0,
    season_id: hSeasonId = 0,
    stats_id: hStatId = 0,
    stolen_bases: hStolenBases = 0,
    strike_outs: hStrikeOuts = 0,
    triples: hTriples = 0,
    type: hType = "",
    updated_at: hUpdateAt = "",
    walks_hits_per_innings_pitched: hWHPIP = 0,
    // wins: hWins = 0,
  } = hitterStats[0] || {};

  const {
    // batting_average: hbBA = 0,
    // created_at=  "2021-07-09T23:50:14.751Z",
    // data_id= 1164,
    earned_runs_average: hERA = 0,
    hits: hHits = 0,
    innings_pitched: hIP = null,
    // match_id= 6692,
    outs: hOuts = null,
    pitch_count: hPC = null,
    plate_appearances: hPA = 0,
    // player_id= 10801,
    runs: hRuns = 0,
    runs_batted_in: hRBI = 0,
    strike_outs: hSO = 0,
    // updated_at= "2021-07-09T23:50:14.751Z",
    walks: hWalks = 0,
  } = hMatchStats[0] || {};

  const {
    active: isPittcherActive = false,
    bat_hand: pBatHand = "",
    current_position: pCurrentPos = "",
    current_team: pCurrentTeam = 0,
    datafeed_id: pDataFeedId = "",
    height: pHeight = "",
    is_injured: isPInjured = false,
    jersey_number: pJersyNumber = 0,
    name: pitcherName = "",
    player_id: pId = 0,
    primary_position: pPrimaryPos = "",
    throw_hand: pThrowHand = "",
    type: pType = "",
    mlb_player_stats: pitcherStats = [],
  } = pitcher || {};

  const {
    base_on_balls: pBOB = 0,
    batting_average: pbBA = 0,
    doubles: pdoubles = 0,
    earned_runs_average: pERA = 0,
    hits: pHits = 0,
    home_runs: pHomeRuns = 0,
    innings_pitched: pIp = 0,
    losses: pLosses = 0,
    ops: pOPS = 0,
    player_id: pPlayerId = 0,
    runs_batted_in: pRBI = 0,
    season_id: pSeasonId = 0,
    stats_id: pStatId = 0,
    stolen_bases: pStolenBases = 0,
    strike_outs: pStrikeOuts = 0,
    triples: pTriples = 0,
    updated_at: pUpdateAt = "",
    walks_hits_per_innings_pitched: pWHPIP = 0,
    wins: pWins = 0,
  } = pitcherStats[0] || {};

  const formatName = (name) => {
    const n = `${name}`.split(" ");

    return `${n[0]?.substring(0, 1)}`?.toUpperCase() + ". " + `${n[1]}`;
  };

  return (
    <Row className="pb-3">
      <Col xs={10} className="pe-0">
        <div
          style={{ position: "relative" }}
          id="carouselExampleIndicators"
          className="carousel slide"
        >
          <div
            className="carousel-indicators board__wrapper__indicators"
            style={baseBall ? { bottom: "13px" } : { bottom: "9px" }}
          >
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div
                className="board__wrapper__content"
                style={
                  secondShow && baseBall
                    ? { height: "248px" }
                    : { height: "227px" }
                }
              >
                <div className="row">
                  <div className="col-9">
                    <h2 style={{ marginTop: "5px" }}>{title}</h2>
                    <p>{subTitle}</p>
                  </div>
                  <div className="col-3 point">
                    <p>Points {double && "2x"}</p>
                    <h3>{points}</h3>
                  </div>
                  <div className="col-12 ps-2 pe-2">
                    <div
                      className="board__wrapper__fieldsText"
                      style={{ color: fieldColor }}
                    >
                      <h4>{fieldText}</h4>
                    </div>
                  </div>
                  {secondShow && (
                    <>
                      <div className="col-4 pe-0">
                        <img
                          style={{ maxWidth: "68px" }}
                          src="/images/bating.svg"
                          alt=""
                        />
                      </div>

                      <div className="col-8 roger">
                        <div>
                          {!isEmpty(hitter) && (
                            <>
                              <p>
                                <img src="/images/bat.svg" alt="" />{" "}
                                <span>{formatName(hitterName)}</span>
                              </p>
                              <p>
                                {removeZeroBeforeDecimalPoint(hbBA)} | {hHits}/
                                {hPA} | B: {balls}| S: {strikes}
                              </p>
                              {notShow ? null : (
                                <h4 className="mt-1">SINGLE</h4>
                              )}
                            </>
                          )}
                          {!isEmpty(pitcher) && (
                            <>
                              <p>
                                <img src="/images/baseball.svg" alt="" />{" "}
                                <span>{formatName(pitcherName)}</span>
                              </p>
                              <p className="mb-3">ERA: {pERA}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            <div className="carousel-item">
              <div
                className="board__wrapper__content"
                style={
                  secondShow && baseBall
                    ? { height: "248px" }
                    : { height: "227px" }
                }
              >
                <div className="row">
                  <div className="col-9">
                    <h2 style={{ marginTop: 0 }}>{title}</h2>
                    <p
                      style={{
                        marginTop: 7,
                      }}
                    >
                      Points Summary
                    </p>
                  </div>
                  <div className="col-3 point" style={{ padding: 0 }}>
                    <p style={{ margin: 0, textAlign: "left" }}>
                      Total Points{" "}
                    </p>
                    <h3
                      style={{
                        width: "70px",
                        border: "none",
                        backgroundColor: "rgba(242, 242, 242, 0.1)",
                        marginRight: 6,
                      }}
                    >
                      {points}
                    </h3>
                  </div>
                  <div className="col-10 ps-2 ">
                    <table className="board__wrapper__content__table">
                      <thead>
                        <th>Inning</th>
                        <th>Type</th>
                        <th>Power</th>
                        <th>Pts</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Top 1st</td>
                          <td>Single</td>
                          <td>2x</td>
                          <td>4</td>
                        </tr>
                        <tr>
                          <td>Top 1st</td>
                          <td>RBI 1</td>
                          <td>-</td>
                          <td>2</td>
                        </tr>
                        <tr>
                          <td>Bot 4th</td>
                          <td>HR</td>
                          <td>3x</td>
                          <td>8</td>
                        </tr>
                        <tr>
                          <td>Bot 4th</td>
                          <td>RBI 4</td>
                          <td>3x</td>
                          <td>9</td>
                        </tr>
                        <tr>
                          <td>Bot 4th</td>
                          <td>RS 4</td>
                          <td>3x</td>
                          <td>3</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="carousel-item ">
              <div
                className="board__wrapper__content"
                style={
                  secondShow && baseBall
                    ? { height: "248px" }
                    : { height: "227px" }
                }
              >
                <div className="row">
                  <div className="col-12">
                    <h2 style={{ marginTop: "5px" }}>{title}</h2>
                    <div className="board__wrapper__content__imageHolder">
                      <img src="/images/fanatics.jpg" alt="files" />
                      <div>
                        <Link to="#">
                          <button>Shop Now!</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {featured && featured === true && (
            <div className="badge">
              <div>
                <span className="me-1 ">
                  <img src="/images/star.svg" alt="" />
                </span>

                <span className="star">STAR POWER</span>
              </div>
            </div>
          )}

          <div className="endTag">
            {" "}
            <p className="pt-1">{footerText}</p>
          </div>
        </div>
      </Col>
      <Col xs={2} className="ps-0">
        <div
          className="iconSides"
          style={
            icons
              ? { padding: "36.4px 0" }
              : !icons && baseBall
              ? { padding: "66.3px 0" }
              : { padding: "55.3px 0" }
          }
        >
          <img
            onClick={
              !otherIcons && !imageTochanged ? () => swapModal(true) : null
            }
            src={`${
              imageTochanged && otherIcons
                ? "/images/video.svg"
                : "images/shafal.svg"
            }`}
            alt=""
          />
          <img
            onClick={
              !otherIcons && !imageTochanged ? () => boostModal(true) : null
            }
            className={`${icons === true ? "pt-3" : "pt-4 mt-2"}`}
            src={`${
              imageTochanged && !otherIcons
                ? "/images/2x.svg"
                : otherIcons && imageTochanged
                ? "/images/sheild.svg"
                : "/images/xp.svg"
            }`}
            alt=""
          />
          {icons && (
            <>
              <img className="pt-3" src="/images/retro-boost.svg" alt="" />
              <h4>0:30</h4>
            </>
          )}
        </div>
      </Col>
    </Row>
  );
};

export default Slider;
