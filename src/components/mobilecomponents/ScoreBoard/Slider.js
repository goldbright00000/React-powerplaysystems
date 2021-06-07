import React from "react";
import { Row, Col } from "reactstrap";
import {
  IconsSide,
  Badge,
  Indicators,
  EndTag,
  Data,
  FieldText,
  Table,
  ImageHolder,
} from "./style";
import { Link } from "react-router-dom";
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
          <Indicators className="carousel-indicators" baseBall={baseBall}>
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
          </Indicators>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <Data secondShow={secondShow} baseBall={baseBall}>
                <div className="row">
                  <div className="col-9">
                    <h2>{title}</h2>
                    <p>{subTitle}</p>
                  </div>
                  <div className="col-3 point">
                    <p>Points {double === true && "2x"}</p>
                    <h3>{points}</h3>
                  </div>
                  <div className="col-12 ps-2 pe-2">
                    <FieldText fieldColor={fieldColor}>
                      <h4>{fieldText}</h4>
                    </FieldText>
                  </div>
                  {secondShow && secondShow === true && (
                    <>
                      <div className="col-4 pe-0">
                        <img style={{maxWidth:'68px'}} src="/images/bating.svg" alt="" />
                      </div>

                      <div className="col-8 roger">
                        <div>
                          <p>
                            <img src="/images/bat.svg" alt="" />{" "}
                            <span>J. Rogers</span>
                          </p>
                          <p>IP: 3.1 | PC:34 | K:4 | W:3</p>
                          {notShow && notShow === true ? null : (
                            <h4 className="mt-1">SINGLE</h4>
                          )}
                          {baseBall && baseBall === true && (
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
              </Data>
            </div>

            <div className="carousel-item">
              <Data secondShow={secondShow} baseBall={baseBall} topSpace>
                <div className="row">
                  <div className="col-9">
                    <h2>{title}</h2>
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
                    <Table>
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
                    </Table>
                  </div>
                </div>
              </Data>
            </div>

            <div className="carousel-item ">
              <Data secondShow={secondShow} baseBall={baseBall}>
                <div className="row">
                  <div className="col-12">
                    <h2>{title}</h2>
                    <ImageHolder>
                      <img src="/images/fanatics.jpg" alt="files" />
                      <div>
                        <Link to="#">
                          <button>Shop Now!</button>
                        </Link>
                      </div>
                    </ImageHolder>
                  </div>
                </div>
              </Data>
            </div>
          </div>

          {featured && featured === true && (
            <Badge>
              <div>
                <span className="me-1 ">
                  <img src="/images/star.svg" alt="" />
                </span>

                <span className="star">STAR POWER</span>
              </div>
            </Badge>
          )}

          <EndTag baseBall={baseBall}>
            {" "}
            <p className="pt-1">Bot 1st | 2 Out</p>
          </EndTag>
        </div>
      </Col>
      <Col xs={2} className="ps-0">
        <IconsSide icons={icons} baseBall={baseBall}>
          <img
            src={`${
              imageTochanged &&
              imageTochanged === true &&
              otherIcons &&
              otherIcons === true
                ? "/images/video.svg"
                : "images/shafal.svg"
            }`}
            alt=""
          />
          <img
            className={`${icons === true ? "pt-3" : "pt-4 mt-2"}`}
            src={`${
              imageTochanged && imageTochanged === true && !otherIcons
                ? "/images/2x.svg"
                : otherIcons &&
                  otherIcons === true &&
                  imageTochanged &&
                  imageTochanged === true
                ? "/images/sheild.svg"
                : "/images/xp.svg"
            }`}
            alt=""
          />
          {icons && icons === true && (
            <>
              <img className="pt-3" src="/images/retro-boost.svg" alt="" />
              <h4>0:30</h4>
            </>
          )}
        </IconsSide>
      </Col>
    </Row>
  );
};

export default Slider;
