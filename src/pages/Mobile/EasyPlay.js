import React from "react";
import "./mainStyle.scss";
import Header from "../../components/mobilecomponents/Header";
import LetsPlayBanner from "../../components/mobilecomponents/EasyPlay/LetsPlayBanner";
import StepOne from "../../assets/images/stepOne.png";
import StepTwo from "../../assets/images/stepTwo.png";
import StepThree from "../../assets/images/stepThree.png";
import StepFour from "../../assets/images/stepFour.png";
import StepFive from "../../assets/images/stepFive.png";
import Star from "../../assets/images/gradientStar.svg";
import EasyPlayFooter from "../../components/mobilecomponents/EasyPlay/EasyPlayFooter";
const EasyPlay = () => {
  return (
    <section className="main easyplay">
      <Header />
      <div className="play__heading">
        <h2>It's Easy to play!</h2>
      </div>
      <LetsPlayBanner
        image={StepOne}
        width="100%"
        height="100%"
        description={`Go to the <span class="color">Power Center</span> and browse available games, click ‘Enter’.`}
        number={1}
      />
      <LetsPlayBanner
        image={StepTwo}
        width="180px"
        height="100%"
        description={`Select your team. You will pick eight (8) players and you can have a maximum of three (3) <span class="gradient-text"><img src=${Star} />STAR POWER </span> Players.
        Flip cards for more player stats. When done, click Submit`}
        number={2}
      />
      <LetsPlayBanner
        width="300px"
        height="100%"
        image={StepThree}
        description={`From <span class="color">My Game Center</span> you can see when games are due to start or are in progress.
        Click <span class="color">Team Manager</span> to launch the live Team Manager page.`}
        number={3}
      />
      <LetsPlayBanner
        width="300px"
        height="100%"
        image={StepFour}
        description={`<span class="color">Team Manager</span> page overview – this is where you can see your entire team in one view, see you current standings, and see how many powers you have remaining.`}
        number={4}
      />

      <LetsPlayBanner
        background={StepFive}
        description={`<span class="color">Individual player card overview</span> – this card shows the current stats related to each individual player on your team.`}
        number={5}
      />
      <EasyPlayFooter />
    </section>
  );
};

export default EasyPlay;
