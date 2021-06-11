import React from "react";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./score_board.scss";
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
  fieldColor,
  imageTochanged,
  notShow,
  otherIcons,
}) => {
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
                          <p>
                            <img src="/images/bat.svg" alt="" />{" "}
                            <span>J. Rogers</span>
                          </p>
                          <p>IP: 3.1 | PC:34 | K:4 | W:3</p>
                          {notShow ? null : <h4 className="mt-1">SINGLE</h4>}
                          {baseBall && (
                            <>
                              <p>
                                <img src="/images/baseball.svg" alt="" />{" "}
                                <span>J. Rogers</span>
                              </p>
                              <p className="mb-3">ERA: 3.23</p>
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
            <p className="pt-1">Bot 1st | 2 Out</p>
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
            src={`${
              imageTochanged && otherIcons
                ? "/images/video.svg"
                : "images/shafal.svg"
            }`}
            alt=""
          />
          <img
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
