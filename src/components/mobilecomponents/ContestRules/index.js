import React from "react";
import "./contestRules.scss";
import ContestRulesPopUp from '../../ContestRulesPopUp/index'
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
const ContestRules = () => {
  return (
    <div className="rulesWrapper">
      <Container fluid={true}>
        <Row>
          <Col>
            <h1>Contest Rules</h1>
            <div className="border-line"></div>

            <div className="list">
              <Row className="pb-3">
                <Col xs={1}>
                  <img src="/images/correct.svg" alt="" />
                </Col>
                <Col xs={11}>
                  <h3>
                    <span> $100,000</span> Prize Pool
                  </h3>
                </Col>
              </Row>
              <Row className=" pb-3">
                <Col xs={1}>
                  <img src="/images/correct.svg" alt="" />
                </Col>
                <Col xs={11}>
                  <h3>
                    {" "}
                    Live-play <span>Powers</span> included with
                    <br /> entry fee
                  </h3>
                </Col>
              </Row>
              <Row className=" pb-3">
                <Col xs={1}>
                  <img src="/images/correct.svg" alt="" />
                </Col>
                <Col xs={11}>
                  <h3>
                    {" "}
                    Pick players from any teams
                    <br /> scheduled to play on <span>July 19, 2021</span>
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="full">
                    <ContestRulesPopUp
                        points={[]}
                        powers={[]}
                        component={({ showPopUp }) => (
                          <Link
                            onClick={showPopUp}
                            //className={classes.footer_full_rules}
                            href="#"
                          >
                            See Full Rules <img src="/images/left-arrow.svg" alt="" />
                          </Link>
                        )}
                      />
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContestRules;
