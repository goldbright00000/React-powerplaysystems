import { Link } from "react-router-dom";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./Elite8draw.scss";
import powerplayicon from "../../assets/powerplay-icon.png";
import powerplayLargeicon from "../../assets/powerplay-large-icon.png";

const HomePage = (props) => (
  <div className="__Elite8Draw">
    <Header />
    <div className="__content __flex">
      <div className="__game-box __flex">
        {/* gamebox */}
        {/* gamebox left. Contains heading and in play */}
        <div className="__game-box-left">
          {/* elite 8 heading */}
          <div className="__description __flex __column __flex-center">
            <div className="__heading">Elite 8</div>
            <div className="__heading-description __flex">
              Win <span className="__text-color-primary "> {"$2000"} </span> CAD
            </div>
            <div className="__btn-rules __uppercase __flex __flex-center">
              SEE CONTEST RULES
            </div>
          </div>
          <div className="__in-play __flex __column __flex-center"></div>
        </div>
        {/* gamebox left ends here*/}
      </div>
      {/* gamebox ends here  */}
      <div className="__my-powerplays __flex __column __flex-center">
        <div className="powerplays-header">
          <div className="__heading-text">My Powerplays</div>
          <div className="__balance __flex">
            <div className="__my_balance">My Balance</div>
            <div className="__balance_dollars">$0.00</div>
          </div>
        </div>
        <div className="__powerplays-detail __flex __column __flex-center ">
          <div className="__powerplay_item">
            <div className="__powerplay_amount">1 left</div>
            <div className="__powerplay_img img_replace __background"></div>
            <div className="__powerplay_name">Replace</div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default HomePage;
