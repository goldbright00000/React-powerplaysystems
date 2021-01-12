import React, { useState, useEffect } from "react";
import _ from "lodash";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProgressBar from "../../components/Progress";
import "./Elite8draw.scss";
import PageHeaderCard from "../../components/PageHeaderCard";

//constants
const TOTAL_NUMBERS_TO_DRAW = 8;
const MY_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
const ROUND_TIME = 12;
const TOTAL_NUMBERS_DRAWN = 0;
const ACTIVE_NUMBER = 0;

function Elte8Game(props) {
  const [drawnNumbers, setdrawnNumbers] = useState([]);
  const [myNumbers, setmyNumbers] = useState(MY_NUMBERS);
  const [counter, setCounter] = useState(12);
  const [activeNumber, setactiveNumber] = useState(0);
  useEffect(() => {
    let timeOut = null;
    if (drawnNumbers.length < TOTAL_NUMBERS_TO_DRAW) {
      let time = counter;
      timeOut = setInterval(() => {
        if (time !== 0) {
          time--;
          setCounter(time);
        } else {
          getNewNumber();
        }
      }, 1000);
    } else {
      clearInterval(timeOut);
    }

    return () => clearInterval(timeOut);
  }, [activeNumber]);

  function getNewNumber() {
    //adding a random number
  }
  function resetCounter() {
    //set counter value back to ROUND_TIME
  }

  return (
    <>
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
                  Win <span className="__text-color-primary "> {"$2000"} </span>{" "}
                  CAD
                </div>
                <div className="__btn-rules __uppercase __flex __flex-center">
                  SEE CONTEST RULES
                </div>
              </div>
              <div className="__in_play __flex __column __flex-start">
                <div className="__title __flex __column __flex-start">
                  <div className="text">In Play</div>
                  <div className="underline"></div>
                </div>
                <div className="__draw_box __flex __column __flex-center">
                  <div className="counter_text">
                    Number <span>1</span> of 8
                  </div>
                  <div className="t2">Next number drawn in</div>
                  <ProgressBar
                    style="flex=unset;height=65px"
                    progress={counter}
                    maxProgress={12}
                    size={62}
                    strokeWidth={4}
                    circleOneStroke="grey"
                    circleTwoStroke="#fff"
                  />
                  <div className="__background __drawn_number __flex __flex-center">
                    3
                  </div>
                </div>
              </div>
            </div>
            {/* gamebox left ends here*/}
            <div className="__game-box-right">
              <PageHeaderCard />
              <div className="__winning_numbers">
                <div className="__title __flex __column __flex-start">
                  <div className="text">Winning Numbers</div>
                  <div className="underline"></div>
                </div>
                <div className="__numbers_row __flex __flex-center">
                  {_.times(TOTAL_NUMBERS_TO_DRAW, () => (
                    <div className="__number_ball __flex __flex-center __background">
                      ?
                    </div>
                  ))}
                </div>
              </div>
              <div className="__my_numbers">
                <div className="__title __flex __column __flex-start">
                  <div className="text">My Numbers</div>
                  <div className="underline"></div>
                </div>
                <div className="t2">
                  Click a number to edit using your powerplays
                </div>
                <div className="__numbers_row __flex __flex-center">
                  {_.times(TOTAL_NUMBERS_TO_DRAW, (index) => (
                    <div className="__my_number_ball __flex __flex-center">
                      {myNumbers[index]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
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
              <div className="__powerplay_item">
                <div className="__powerplay_amount">1 left</div>
                <div className="__powerplay_img img_replace_all __background"></div>
                <div className="__powerplay_name">Replace All</div>
              </div>
              <div className="__powerplay_item">
                <div className="__powerplay_amount">1 left</div>
                <div className="__powerplay_img img_power __background"></div>
                <div className="__powerplay_name">Power Match</div>
              </div>
              <div className="__powerplay_item">
                <div className="__powerplay_amount">1 left</div>
                <div className="__powerplay_img img_increase __background"></div>
                <div className="__powerplay_name">Increase</div>
              </div>
              <div className="__powerplay_item">
                <div className="__powerplay_amount">1 left</div>
                <div className="__powerplay_img img_decrease __background"></div>
                <div className="__powerplay_name">Decrease</div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

export default Elte8Game;
