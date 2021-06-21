import React from "react";
import "./easyplay.scss";
// import Header from "../../components/Header/Header";
import LetsPlayBanner from "../../components/mobilecomponents/EasyPlay/LetsPlayBanner";
import StepOne from "../../assets/images/stepOne.png";
import StepTwo from "../../assets/images/stepTwo.png";
import StepThree from "../../assets/images/stepThree.png";
import StepFour from "../../assets/images/stepFour.png";
import StepFive from "../../assets/images/stepFive.png";
import Star from "../../assets/images/gradientStar.svg";
// import EasyPlayFooter from "../../components/mobilecomponents/EasyPlay/EasyPlayFooter";
// import Footer from "../../components/Footer/Footer";
import { Container, Row, Col } from "reactstrap";
const EasyPlay = () => {
  return (
    <section className="easyplay">
      <div className="play__heading">
        <h2>It's Easy to play!</h2>
      </div>
      <Container>
        <Row>
          <Col xs={12}>
            <LetsPlayBanner
              rowReverse="flex-md-row"
              width="100%"
              height="100%"
              float="none"
              valueAlign={-25}
              offset={[-42, 0]}
              image={StepOne}
              description={`Go to the <span class="color">Power Center</span>
              <br /> and browse<br class="d-block d-md-none" /> available
              <br /> games, click ‘Enter’.`}
              number={1}
            />
          </Col>
          <Col xs={12}>
            <LetsPlayBanner
              newClass="float"
              rowReverse="flex-row  flex-lg-row-reverse"
              width="180px"
              float="right"
              height="100%"
              valueAlign={-41}
              offset={[-55, 0]}
              image={StepTwo}
              description={`Select your team. You will pick eight (8)<br  class="d-block d-md-none"/> players and you can have a maximum of <br  class="d-none d-sm-block d-md-none"/>three (3) <span class="gradient-text"><img src=${Star} />STAR POWER </span> Players.<br  class="d-none d-sm-block d-md-none"/>
              Flip cards for more player stats. When<br  class="d-none d-sm-block d-md-none"/> done, click Submit.`}
              number={2}
            />
          </Col>
          <Col xs={12}>
            <LetsPlayBanner
              newClass="float"
              rowReverse="flex-md-row"
              width="300px"
              float="right"
              height="100%"
              valueAlign={-47}
              offset={[-60, 0]}
              image={StepThree}
              description={`From <span class="color">My Game Center</span> you can see when <br  class="d-none d-sm-block d-md-none"/>  games are due to start or are in progress.<br  class="d-none d-sm-block d-md-none"/>
              Click <span class="color">Team Manager</span> to launch the live Team<br  class="d-none d-sm-block d-md-none"/> Manager page.`}
              number={3}
            />
          </Col>
          <Col xs={12}>
            <LetsPlayBanner
              rowReverse="flex-md-row-reverse"
              width="350px"
              float="right"
              height="100%"
              valueAlign={-51}
              offset={[-65, 0]}
              image={StepFour}
              description={`<span class="color">Team Manager</span> page overview – this is where <br  class="d-none d-sm-block d-md-none"/> you can see your entire team in one view, see<br  class="d-none d-sm-block d-md-none"/> you current standings, and see how many<br class="d-none d-sm-block d-md-none"/> powers you have remaining.`}
              number={4}
            />
          </Col>

          <Col xs={12}>
            <LetsPlayBanner
              space="imageSpace"
              rowReverse="flex-md-row-reverse"
              width="100%"
              float="left"
              height="100%"
              valueAlign={-120}
              offset={[-130, 0]}
              image={StepFive}
              description={`<span class="color">Individual player card overview</span> – this card <br  class="d-none d-sm-block d-md-none"/>shows the current stats related to each<br  class="d-none d-sm-block d-md-none"/> individual player on your team.`}
              number={5}
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default EasyPlay;
