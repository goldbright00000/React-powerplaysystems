import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Joyride, { ACTIONS, EVENTS, STATUS } from "react-joyride";

import Header from "./../common/Header";
import Footer from "./../common/Footer";
import DrawTimer from "./../common/DrawTimer";
import "./index.css";

import * as Constants from "./../common/constants";
import * as Functions from "./../common/functions";
import Cookies from "universal-cookie";
import * as DrawComponents from "./DrawComponents";
import InPlay from "./InPlay";
//import Modal from 'react-modal'
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
var ALLOWED_TO_SELECT = 8;
var TOTAL_BALLS = 50;
//demo game variables
var DEMO_PICKS = [];
var DEMO_DRAW = [];
var DEMO_POWEPLAYS = [];
var DEMO_GAME_DATA = {
  id: 122,
  game_type: 1,
  start_datetime: "2020-12-30 12:59:00",
  prize_id: 44,
  prize: [
    { hits: 8, prize: 1000 },
    { hits: 7, prize: 1000 },
    { hits: 6, prize: 400 },
    { hits: 5, prize: 200 },
    { hits: 4, prize: 100 },
    { hits: 3, prize: 50 },
    { hits: 2, prize: 25 },
    { hits: 1, prize: 15 }
  ],
  countdown_timer: 30,
  delay: 1,
  game_text: "1",
  rules: "undefined",
  odds_text: "1 in 10,000",
  code: null,
  status: "unplayed",
  deadline: "2020-12-30 12:59:00",
  entry: 109
};
var lastCallToDraw = 0;
//Popup variables
var popupText = "Error";
var popupHader = "Sorry!";

var flagReplaceAll = false;
var bg = require("./../../assets/elite-8-live/circle.png");

var canSelectBall = true;
let mCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};
let mLockedCircleStyles = {
  backgroundImage: "url(" + bg + ")",
  backgroundSize: "cover",
  overflow: "hidden"
};
var mTotalMatchedLast = 0;
var isInDelay = false;

var ballSelected = null;

var countdown = null;
var ticker = null;
var mTotalMatched = 0;
var selectedNumbers = [];
var oldReplacedNumber = "x";
var newReplacedNumber = "y";
var lastUsedPowerplay = null;
var tourSteps = [
  {
    target: "#tourstep1",
    placement: "left",
    disableBeacon: true,
    content:
      "This is How many powerplays you have for the draw. Powerplays are used to edit your selected Numbers"
  },

  {
    target: "#tourstep2",
    content:
      "In-Play numbers are shown on this ball. Try to match it before the timer runs out!",
    placement: "left",
    disableBeacon: true
  },
  {
    target: "#tourstep3",
    content:
      "The timer will be displayed here. This is how much time you have to edit your numbers.",
    placement: "bottom-start",
    disableBeacon: true
  },
  {
    target: "#tourstep4",
    disableBeacon: true,
    content:
      "Clicking a number will open the edit window. Use your available powerplays to match the in-play numbers!"
  }
];
class Elite8Draw extends Component {
  constructor(props) {
    super(props);
    if (this.props.location.state.gameData == "demo") {
      this.state = {
        stepIndex: 0,
        isDemo: true,
        error: null,
        isLoaded: false,
        content: "",
        picks: [],
        gameData: DEMO_GAME_DATA,
        draw: [],
        drawRaw: [],
        result: [],
        clickedBall: null,
        secondsRemaining: 60,
        mtimer: 0,
        drawNumbersRow: [],
        showInfo: false,
        secondsTime: 0,
        prizes: [],
        nextGame: [],
        secondsTimer: 59,
        ticker: null,
        updatedAt: null,
        requestedDraw: false,
        show: false,
        confirmDialog: false,
        replaceAllCheck: false,
        powerplayRefresh: false,
        run: false,
        steps: tourSteps
      };
    } else {
      this.state = {
        isDemo: false,
        error: null,
        isLoaded: false,
        content: "",
        picks: [],
        gameData: this.props.location.state.gameData,
        draw: [],
        drawRaw: [],
        result: [],
        clickedBall: null,
        secondsRemaining: 60,
        mtimer: 0,
        drawNumbersRow: [],
        showInfo: false,
        secondsTime: 0,
        prizes: [],
        nextGame: [],
        secondsTimer: 59,
        ticker: null,
        updatedAt: null,
        requestedDraw: false,
        show: false,
        confirmDialog: false,
        replaceAllCheck: false,
        run: false,
        powerplayRefresh: false,
        steps: tourSteps
      };
    }

    mTotalMatchedLast = 0;
    this.updateBallSelected = this.updateBallSelected.bind(this);
    this.getJackpot = this.getJackpot.bind(this);
    this.isAMatch = this.isAMatch.bind(this);
    this.onPowerplayClicked = this.onPowerplayClicked.bind(this);
    this.getPowerplayAmount = this.getPowerplayAmount.bind(this);
    this.handleShowPrize = this.handleShowPrize.bind(this);
    this.onPickNumbersClicked = this.onPickNumbersClicked.bind(this);
    this.handleClosePrize = this.handleClosePrize.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.shouldShowTickTok = this.shouldShowTickTok.bind(this);
    this.hasWonPrize = this.hasWonPrize.bind(this);
    this.getDraws = this.getDraws.bind(this);
    this.getData = this.getData.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateDemoGameStatus = this.updateDemoGameStatus.bind(this);
    this.goToPicknumbersDemo = this.goToPicknumbersDemo.bind(this);
    this.getTotalMatched = this.getTotalMatched.bind(this);
    this.dialog = this.dialog.bind(this);
    this.yesCallback = this.yesCallback.bind(this);
    this.noCallback = this.noCallback.bind(this);
    this.updateDrawNumberRow = this.updateDrawNumberRow.bind(this);
    this.animate = this.animate.bind(this);
    this.gotoNextStep = this.gotoNextStep.bind(this);
  }

  // Ball seleted Udpate
  updateBallSelected(value) {
    ballSelected = value;
  }
  goToPicknumbersDemo() {
    this.props.history.push({
      pathname: "elite8",
      state: {
        gameData: "demo"
      }
    });
  }
  /* Prize Modal*/
  handleClose() {
    this.setState({
      show: false
    });
  }

  handleShow() {
    this.setState({
      show: true
    });
  }
  /* Checking if the element matches any draw number*/
  isAMatch(element) {
    let obj = this.state.draw.find(
      obj => obj.daw_ball_number == element.number
    );
    if (obj) {
      return true;
    } else {
      return false;
    }
  }
  /* geter for total matched numbers*/

  getTotalMatched() {
    return mTotalMatched;
  }

  // Confirm Dailog
  hideConfirmDialog() {
    this.setState({
      confirmDialog: false
    });
  }
  dialog() {
    this.setState({
      confirmDialog: true
    });
  }
  //calback when yes pressed for replace all
  yesCallback() {
    this.onPowerplayClicked(Constants.LOTETRY_POWERPLAY_REFRESH);
    this.setState({
      confirmDialog: false,
      replaceAllCheck: true
    });
  }
  //calback when no pressed for replace all
  noCallback() {
    this.setState({
      confirmDialog: false
    });
  }
  //animate the new set of numbers after replace all pressed
  animate() {
    flagReplaceAll = true;
    var newPicks = [];
    var oldPicks = [...this.state.picks];
    var x = 0;
    for (x = 0; x < 8; x++) {
      newPicks.push({
        id: x,
        number: "-"
      });
    }

    ballSelected = null;
    this.setState({
      picks: newPicks
    });
    var that = this;
    var x = 0;
    var intervalID = setInterval(function() {
      newPicks[x] = {
        id: x,
        number: selectedNumbers[x]
      };
      that.setTotalMatched();
      oldReplacedNumber = oldPicks[x];
      newReplacedNumber = newPicks[x];
      that.setState({
        picks: newPicks
      });

      if (++x === 8) {
        window.clearInterval(intervalID);
        that.updatePowerplaysInDatabase(Constants.LOTETRY_POWERPLAY_REFRESH);
        flagReplaceAll = false;
        if (that.state.isDemo) {
          that.updateDemoGameStatus("finished");
        }
        that.getData();
      }
    }, 1500);
  }
  startTimer() {
    var that = this;
    if (this.state.ticker == null) {
      if (that.state.gameData) {
        this.state.ticker = setInterval(function() {
          that.setState({
            secondsTimer: Functions.getSeconds(
              that.state.gameData.start_datetime
            )
          });
        });
      }
    }
  }
  stopTimer() {
    if (this.state.ticker) {
      clearInterval(ticker);
      ticker = null;
    }
  }
  /* Checking if its the last minute before the game starts, if so, show the tick tok*/
  shouldShowTickTok() {
    var dt = new Date(this.state.gameData.start_datetime);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;
    return distance > 59000 ? false : true;
  }
  // seting total matched numbers
  setTotalMatched() {
    mTotalMatched = 0;
    this.state.picks.forEach(element => {
      let obj = this.state.draw.find(
        obj => obj.daw_ball_number == element.number
      );
      if (obj) {
        mTotalMatched = mTotalMatched + 1;
      }
    });
    if (document.getElementById("total-matched")) {
      document.getElementById("total-matched").innerHTML = mTotalMatched;
    }
    if (lastUsedPowerplay == Constants.LOTETRY_POWERPLAY_CHANGE) {
      this.setState({
        powerplayRefresh: true
      });
      lastUsedPowerplay = null;
      var that = this;

      var set = setTimeout(function() {
        that.setState({
          powerplayRefresh: false
        });
        lastUsedPowerplay = null;
      }, 3000);
    }
    if (mTotalMatchedLast < mTotalMatched) {
      mTotalMatchedLast = mTotalMatched;
      canSelectBall = false;
      this.updateBallSelected();
      this.showInfo();
    }
  }

  showInfo() {
    this.setState({
      showInfo: true
    });
    var that = this;

    var set = setTimeout(function() {
      that.setState({
        showInfo: false
      });
    }, 3000);
  }

  countdownTimer(lastDrawTime, timer, delay) {
    var that = this;
    if (countdown) {
      clearInterval(countdown);
      countdown = null;
    }
    if (this.state.isDemo) {
      return;
    }
    if (lastDrawTime == "check") {
      var tempTimeDiff = Functions.getTimeDifferenceEST(
        this.state.gameData.start_datetime
      );
      if (tempTimeDiff > 1000) {
        var myVar = setTimeout(function() {
          console.log("Calling Data");
          that.getData();
        }, tempTimeDiff - 1000);
      } else {
        var myVar = setTimeout(function() {
          that.getData();
        }, 1000);
      }
    } else if (lastDrawTime == null) {
      var myVar = setTimeout(function() {
        that.getData();
      }, 500);
    } else {
      isInDelay = false;
    }
  }
  getJackpot(prizeArray) {
    if (prizeArray) {
      return "$" + Functions.numberWithCommas(prizeArray[0].prize);
    } else {
      return "Coming soon";
    }
  }
  onBallClicked(text) {
    if (ballSelected == text) {
      ballSelected = null;
    } else {
      if (canSelectBall) {
        ballSelected = text;
      }
    }
    this.setState(this.state);
  }
  getRandomInt(min, max) {
    var newInt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (newInt < min) return min;
    if (newInt > max) return max;
    return newInt;
  }
  getRandomInts(num) {
    selectedNumbers = [];
    while (selectedNumbers.length < num) {
      var randNum = this.getRandomInt(1, TOTAL_BALLS);
      if (!selectedNumbers.indexOf(randNum) > -1) {
        selectedNumbers.push(randNum);
      }
    }
    return selectedNumbers;
  }
  onPowerplayClicked(powerplay) {
    selectedNumbers = [];

    //check if the game is live
    if (
      this.state.gameData.status != "live" &&
      this.state.gameData.status != "In Progress"
    ) {
      // popupHader = "Sorry!";
      // popupText = "Powerplays can only be used during the live draw";
      // this.handleShow();

      return;
    }
    //check if the any ball is selected
    if (powerplay != Constants.LOTETRY_POWERPLAY_REFRESH) {
      if (ballSelected == null) {
        popupHader = "Error!";
        popupText = "Please select a number";
        this.handleShow();

        return;
      }
    }
    if (isInDelay) {
      popupHader = "Error!";
      popupText = "Please wait for the next Number!";
      this.handleShow();

      return true;
    }
    //check if amount remaining is > 0
    if (this.getPowerplayAmount(powerplay) < 1) {
      popupHader = "Sorry!";
      popupText =
        "The PowerPlay you are trying to use does not have any remaining inventory";
      this.handleShow();

      return;
    }
    lastUsedPowerplay = powerplay;
    var newNumber;
    switch (powerplay) {
      case Constants.LOTETRY_POWERPLAY_CHANGE:
        while (true) {
          newNumber = Math.floor(Math.random() * TOTAL_BALLS);
          let obj = this.state.picks.find(obj => obj.number == newNumber);
          if (!obj) {
            oldReplacedNumber = {
              id: 0,
              number: ballSelected
            };
            newReplacedNumber = {
              id: 0,
              number: newNumber
            };

            break;
          }
        }

        break;
      case Constants.LOTETRY_POWERPLAY_REFRESH:
        this.getRandomInts(ALLOWED_TO_SELECT);
        break;
      case Constants.LOTETRY_POWERPLAY_INCREASE:
        newNumber = ballSelected + 1;
        break;
      case Constants.LOTETRY_POWERPLAY_DECREASE:
        newNumber = ballSelected - 1;
        break;
      case Constants.LOTETRY_POWERPLAY_FORCE_MATCH:
        newNumber = this.state.drawRaw[this.state.drawRaw.length - 1]
          .daw_ball_number;
        break;
      default:
        popupHader = "Error!";
        popupText = "Something Went Wrong With Powerplays!";
        this.handleShow();
    }

    if (powerplay == Constants.LOTETRY_POWERPLAY_REFRESH) {
    } else {
      if (this.state.picks == undefined) return 0;
      this.state.picks.forEach(element => {
        selectedNumbers.push(element.number);
      });
      if (selectedNumbers.indexOf(newNumber) > -1) {
        popupHader = "Sorry!";
        popupText = "Not Allowed To have duplicate numbers!";
        this.handleShow();

        return;
      }
      selectedNumbers = [];
      let obj = this.state.picks.find(obj => obj.number == ballSelected);
      if (obj) {
        obj.number = newNumber;
        this.state.picks.forEach(element => {
          selectedNumbers.push(element.number);
        });
      }
    }
    if (powerplay == Constants.LOTETRY_POWERPLAY_REFRESH) {
      this.animate();
      return;
    } else {
      ballSelected = newNumber;
      this.updatePowerplaysInDatabase(powerplay);
    }
  }
  getDraws() {
    console.log("Called Draw");
    var curTime = new Date().getTime();

    if (this.state.isDemo) {
      if (curTime - lastCallToDraw < 2000) {
        return;
      } else {
        lastCallToDraw = curTime;
      }
      var obk = {};
      if (DEMO_DRAW.length > 0) {
        while (true) {
          var newNumber = this.getRandomInt(1, TOTAL_BALLS);
          let obj = DEMO_DRAW.find(obj => obj.daw_ball_number == newNumber);

          if (obj) {
          } else {
            obk = {
              id: 1611,
              game_id: 150,
              daw_ball_number: newNumber,
              draw_number: DEMO_DRAW.length,
              date_time: "2019-09-30 16:05:02.26147"
            };
            break;
          }
        }
      } else {
        var newNumber = this.getRandomInt(1, TOTAL_BALLS);
        obk = {
          id: 1611,
          game_id: 150,
          daw_ball_number: newNumber,
          draw_number: DEMO_DRAW.length,
          date_time: "2019-09-30 16:05:02.26147"
        };
      }
      if (DEMO_DRAW.length <= ALLOWED_TO_SELECT) {
        if (this.state.updatedAt != null) {
          if (Functions.getTimeDifferenceEST(this.state.updatedAt) < -2000) {
            DEMO_DRAW.push(obk);
            canSelectBall = true;
          }
        } else {
          DEMO_DRAW.push(obk);
          canSelectBall = true;
        }
      }

      let myDraws = [...DEMO_DRAW];
      let myDrawnRow = [...DEMO_DRAW];
      if (myDraws.length > 0) {
        myDraws.sort(
          (a, b) =>
            parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
        );
      }
      //for the top row in live draw page
      if (myDrawnRow.length > 0) {
        if (
          this.state.gameData.status == "live" ||
          this.state.gameData.status == "In Progress"
        ) {
          myDrawnRow.pop();
        }

        myDrawnRow.sort(
          (a, b) =>
            parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
        );
      }
      if (this.state.updatedAt != null) {
        if (Functions.getTimeDifferenceEST(this.state.updatedAt) < -2000) {
          this.setState({
            updatedAt: Functions.getCurrentTimeEST(),
            drawRaw: DEMO_DRAW,
            draw: myDraws,
            drawNumbersRow: myDrawnRow,
            requestedDraw: false
          });
        }
      } else {
        // DEMO_DRAW = [];
        // canSelectBall = true;
        //DEMO_DRAW.push(obk);
        this.setState({
          updatedAt: Functions.getCurrentTimeEST(),
          drawRaw: DEMO_DRAW,
          draw: myDraws,
          drawNumbersRow: [],
          requestedDraw: false,
          showInfo: false
        });
      }
      this.setTotalMatched();
    } else {
      this.state.requestedDraw = true;
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      var that = this;
      fetch(
        "https://" +
          Constants.URL +
          "/public_api/live_draw/draws.php?jwt=" +
          jwt +
          "&game_id=" +
          that.state.gameData.id
      )
        .then(res => res.json())
        .then(result => {
          let myDraws = [...result.draw];
          let myDrawnRow = [...result.draw];
          //if there isn't new draw return without doing anything!
          if (this.state.draw.length == myDraws.length) {
            return;
          } else {
            canSelectBall = true;
            if (myDraws.length > 0) {
              myDraws.sort(
                (a, b) =>
                  parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
              );
            }
            //for the top row in live draw page
            if (myDrawnRow.length > 0) {
              if (
                this.state.gameData.status == "live" ||
                this.state.gameData.status == "In Progress"
              ) {
                myDrawnRow.pop();
              }

              myDrawnRow.sort(
                (a, b) =>
                  parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
              );
            }
            this.setState({
              updatedAt: Functions.getCurrentTimeEST(),
              drawRaw: result.draw,
              draw: myDraws,
              drawNumbersRow: myDrawnRow,
              requestedDraw: false
            });
          }
        });
    }
  }
  //update draw NUmbers Row
  updateDrawNumberRow(row) {
    this.setState({
      drawNumbersRow: row
    });
  }
  getData() {
    if (flagReplaceAll) {
      return;
    }
    if (this.state.isDemo) {
      var result = {
        picks: DEMO_PICKS,
        game: DEMO_GAME_DATA,
        draw: [...DEMO_DRAW],
        powerplays: DEMO_POWEPLAYS,
        result: []
      };
      let myDraws = [...result.draw];
      let myDrawnRow = [...result.draw];
      let myPicks = result.picks;
      if (result.game.status === "finished") {
        this.getLotteryGames();
      }
      if (myDraws.length > 0) {
        myDraws.sort(
          (a, b) =>
            parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
        );
      }

      if (myDrawnRow.length > 0) {
        if (
          result.game.status == "live" ||
          result.game.status == "In Progress"
        ) {
          if (result.game.status == "finished" || myDraws.length > 6) {
          } else {
            myDrawnRow.pop();
          }
        }

        myDrawnRow.sort(
          (a, b) =>
            parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
        );
      }
      if (myPicks.length > 0) {
        myPicks.sort((a, b) => parseFloat(a.number) - parseFloat(b.number));
      }
      if (this.state.draw.length == myDraws.length) {
        if (this.state.gameData.status == result.game.status) {
          this.setState({
            isLoaded: true,
            picks: myPicks,
            powerplays: result.powerplays,
            result: result.result,
            drawNumbersRow: myDrawnRow
          });
        } else {
          this.setState({
            isLoaded: true,
            picks: myPicks,
            gameData: result.game,
            powerplays: result.powerplays,
            result: result.result,
            drawNumbersRow: myDrawnRow
          });
        }
      } else {
        if (this.state.gameData.status == result.game.status) {
          this.setState({
            isLoaded: true,
            drawRaw: result.draw,
            draw: myDraws,
            drawNumbersRow: myDrawnRow,
            picks: myPicks,
            powerplays: result.powerplays,
            result: result.result,

            requestedDraw: false
          });
        } else {
          this.setState({
            isLoaded: true,
            drawRaw: result.draw,
            draw: myDraws,
            drawNumbersRow: myDrawnRow,
            picks: myPicks,
            gameData: result.game,
            powerplays: result.powerplays,

            result: result.result
          });
        }
      }

      this.setTotalMatched();
      //if started the draw and atlest one number drawn

      if (result.draw.length > 0) {
        this.countdownTimer(
          result.draw[result.draw.length - 1].date_time,
          this.state.gameData.countdown_timer,
          this.state.gameData.delay
        );
      } else if (
        //if started the draw and and no number drawn
        result.game.status == "live" ||
        result.game.status == "In Progress"
      ) {
        this.countdownTimer(null, null, result.game.delay);
      } else {
        //if draw not started
        this.countdownTimer("check", null, null);
      }
    } else {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      var that = this;
      fetch(
        "https://" +
          Constants.URL +
          "/public_api/live_draw/data.php?jwt=" +
          jwt +
          "&game_id=" +
          this.state.gameData.id
      )
        .then(res => res.json())
        .then(
          result => {
            let myDraws = [...result.draw];
            let myDrawnRow = [...result.draw];
            let myPicks = result.picks;
            if (result.game.status === "finished") {
              this.getLotteryGames();
            }
            if (myDraws.length > 0) {
              myDraws.sort(
                (a, b) =>
                  parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
              );
            }
            if (myDrawnRow.length > 0) {
              if (
                result.game.status == "live" ||
                result.game.status == "In Progress"
              ) {
                myDrawnRow.pop();
              }

              myDrawnRow.sort(
                (a, b) =>
                  parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
              );
            }
            if (myPicks.length > 0) {
              myPicks.sort(
                (a, b) => parseFloat(a.number) - parseFloat(b.number)
              );
            }
            if (this.state.draw.length == myDraws.length) {
              if (this.state.gameData.status == result.game.status) {
                this.setState({
                  isLoaded: true,
                  picks: myPicks,
                  powerplays: result.powerplays,
                  result: result.result
                });
              } else {
                this.setState({
                  isLoaded: true,
                  picks: myPicks,
                  gameData: result.game,
                  powerplays: result.powerplays,
                  result: result.result
                });
              }
            } else {
              if (this.state.gameData.status == result.game.status) {
                this.setState({
                  isLoaded: true,
                  drawRaw: result.draw,
                  draw: myDraws,
                  drawNumbersRow: myDrawnRow,
                  picks: myPicks,
                  powerplays: result.powerplays,
                  result: result.result,
                  updatedAt: Functions.getCurrentTimeEST(),
                  requestedDraw: false
                });
              } else {
                this.setState({
                  isLoaded: true,
                  drawRaw: result.draw,
                  draw: myDraws,
                  drawNumbersRow: myDrawnRow,
                  picks: myPicks,
                  gameData: result.game,
                  powerplays: result.powerplays,
                  result: result.result
                });
              }
            }

            that.setTotalMatched();
            //if started the draw and atlest one number drawn

            if (result.draw.length > 0) {
              that.countdownTimer(
                result.draw[result.draw.length - 1].date_time,
                this.state.gameData.countdown_timer,
                this.state.gameData.delay
              );
            } else if (
              //if started the draw and and no number drawn
              result.game.status == "live" ||
              result.game.status == "In Progress"
            ) {
              that.countdownTimer(null, null, result.game.delay);
            } else {
              //if draw not started
              that.countdownTimer("check", null, null);
            }
          },
          error => {
            this.setState({
              hasError: true,
              error: error
            });
          }
        );
    }
  }
  updateDemoGameStatus(status) {
    if (flagReplaceAll) {
      return;
    }
    //if mobile screens
    if (status == "live") {
      if (document.documentElement.clientWidth < 700) {
        window.scrollTo(0, 550);
        this.disableScroll();
      }
    }
    if (status == "finished") {
      if (document.documentElement.clientWidth < 700) {
        window.scrollTo(0, 550);
        this.enableScroll();
      }
    }

    DEMO_GAME_DATA.status = status;
  }
  disableScroll() {
    // Get the current page scroll position
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function() {
      window.scrollTo(0, 550);
    };
  }
  enableScroll() {
    window.onscroll = function() {};
  }
  getPowerplayAmount(id) {
    if (this.state.powerplays == undefined) return 0;
    let obj = this.state.powerplays.find(obj => obj.id == id);
    if (obj) {
      return obj.ramining_amount;
    } else {
      return 0;
    }
  }
  updatePowerplaysInDatabase(powerplay) {
    if (this.state.isDemo) {
      DEMO_PICKS = [
        { id: 2651, number: selectedNumbers[0] },
        { id: 2652, number: selectedNumbers[1] },
        { id: 2653, number: selectedNumbers[2] },
        { id: 2654, number: selectedNumbers[3] },
        { id: 2655, number: selectedNumbers[4] },
        { id: 2656, number: selectedNumbers[5] },
        { id: 2657, number: selectedNumbers[6] },
        { id: 2658, number: selectedNumbers[7] }
      ];

      DEMO_POWEPLAYS[powerplay - 1].ramining_amount =
        DEMO_POWEPLAYS[powerplay - 1].ramining_amount - 1;
      //ballSelected = null;

      this.getData();
    } else {
      const cookies = new Cookies();
      const jwt = cookies.get("jwt");
      var data =
        "balls=" +
        selectedNumbers +
        "&jwt=" +
        jwt +
        "&game=" +
        this.state.gameData.id +
        "&type=" +
        Constants.LOTTO_747_ID +
        "&powerplay=" +
        powerplay;

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var that = this;

      xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
          if (~this.responseText.indexOf("Updated")) {
            that.getData();
          } else {
            popupHader = "Error!";
            popupText = "Something went wrong!";
            this.handleShow();
          }
        }
      });
      xhr.open(
        "POST",
        " https://" + Constants.URL + "/public_api/live_draw/powerplay_use.php"
      );
      xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
      xhr.send(data);
    }
  }
  componentDidMount() {
    DEMO_PICKS = [
      { id: 2651, number: this.props.location.state.picks[0] },
      { id: 2652, number: this.props.location.state.picks[1] },
      { id: 2653, number: this.props.location.state.picks[2] },
      { id: 2654, number: this.props.location.state.picks[3] },
      { id: 2655, number: this.props.location.state.picks[4] },
      { id: 2656, number: this.props.location.state.picks[5] },
      { id: 2657, number: this.props.location.state.picks[6] },
      { id: 2658, number: this.props.location.state.picks[7] }
    ];
    DEMO_POWEPLAYS = [
      { id: 1, ramining_amount: 1 },
      { id: 2, ramining_amount: 1 },
      { id: 3, ramining_amount: 1 },
      { id: 4, ramining_amount: 5 },
      { id: 5, ramining_amount: 5 }
    ];
    DEMO_DRAW = [];
    DEMO_GAME_DATA = {
      id: 122,
      game_type: 1,
      start_datetime: "2019-12-30 12:59:00",
      prize_id: 44,
      prize: [
        { hits: 8, prize: 2000 },
        { hits: 7, prize: 1000 },
        { hits: 6, prize: 400 },
        { hits: 5, prize: 200 },
        { hits: 4, prize: 100 },
        { hits: 3, prize: 50 },
        { hits: 2, prize: 25 },
        { hits: 1, prize: 15 }
      ],
      countdown_timer: 12,
      delay: 2,
      game_text: "1",
      rules: "undefined",
      odds_text: "1 in 10,000",
      code: null,
      status: "unplayed",
      deadline: "2019-12-30 12:59:00",
      entry: 109
    };
    if (document.getElementById("scroller"))
      document.getElementById("scroller").scrollIntoView(true);
    this.props.location.state.gameData.status == "unplayed"
      ? this.startTimer()
      : this.stopTimer();

    this.getData();
    var that = this;
    setTimeout(function() {
      that.setState({
        run: true
      });
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(countdown);
    countdown = null;
    clearInterval(this.state.ticker);
    DEMO_GAME_DATA = {
      id: 122,
      game_type: 1,
      start_datetime: "2019-12-30 12:59:00",
      prize_id: 44,
      prize: [
        { hits: 8, prize: 2000 },
        { hits: 7, prize: 1000 },
        { hits: 6, prize: 400 },
        { hits: 5, prize: 200 },
        { hits: 4, prize: 100 },
        { hits: 3, prize: 50 },
        { hits: 2, prize: 25 },
        { hits: 1, prize: 15 }
      ],
      countdown_timer: 12,
      delay: 2,
      game_text: "1",
      rules: "undefined",
      odds_text: "1 in 10,000",
      code: null,
      status: "unplayed",
      deadline: "2019-12-30 12:59:00",
      entry: 109
    };
  }
  getLotteryGames() {
    const cookies = new Cookies();
    const jwt = cookies.get("jwt");
    var link =
      "https://" + Constants.URL + "/public_api/lottery_games/data.php";
    if (jwt) {
      link = link + "?jwt=" + jwt;
    }
    fetch(link)
      .then(res => res.json())
      .then(
        xx => {
          this.setState({
            nextGame: xx.records[0]
          });
        },
        error => {
          this.setState({
            error: error
          });
        }
      );
  }
  onPickNumbersClicked(path, game) {
    if (game.id == null) {
      alert("No Game Available!");
      return;
    }
    let action = "pick";
    action = this.state.nextGame.entry ? "game_center" : "pick";
    this.props.history.push({
      pathname: path,
      state: {
        gameData: game
      }
    });
  }
  handleClosePrize() {
    this.setState({
      showPrize: false
    });
  }

  handleShowPrize(game_type) {
    var prizesToShow = this.state.gameData.prize;
    prizesToShow.sort(function(a, b) {
      return parseFloat(b.prize) - parseFloat(a.prize);
    });

    this.setState({
      showPrize: true,
      prizes: prizesToShow
    });
  }

  hasWonPrize(matches) {
    let obj = this.state.gameData.prize.find(obj => obj.hits == matches);
    if (obj) {
      if (obj.prize > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  goToResults = () => {
    this.props.history.push({
      pathname: "/lotto-result",
      state: {
        gameData: this.state.gameData,
        draw: this.state.draw,
        result: this.state.result,
        picks: this.state.picks
      }
    });
  };
  componentMyNumbers() {
    return (
      <>
        <p>My Numbers</p>

        <div className="live_draw_my_numbers_edit">
          <p className="mleft_top_text">Cick a number to edit</p>
          <div className="row edit_numbers elite8">
            {this.state.picks.map((element, key) => {
              if (this.isAMatch(element)) {
                return (
                  <div
                    className={
                      element.number == ballSelected
                        ? " winning_box_circle_elite8_active pick_button_active_elite8"
                        : ballSelected == null
                        ? "winning_box_circle_elite8_active"
                        : "winning_box_circle_elite8_active circle_disabled"
                    }
                  >
                    <img
                      className="img-responsive img-checked"
                      src={require("./../../assets/elite-8-live/checked.png")}
                    />
                    <div
                      className="inner-div-select-elite8"
                      style={mLockedCircleStyles}
                      onClick={e => this.onBallClicked(element.number)}
                    >
                      {element.number}
                      <img
                        className="img-responsive lock"
                        src={require("./../../assets/elite-8-live/lock.png")}
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <>
                    <div
                      className={
                        element.number == ballSelected
                          ? "edit_numbers_circle_elite8 pick_button_active_elite8"
                          : ballSelected == null
                          ? "edit_numbers_circle_elite8"
                          : "edit_numbers_circle_elite8 circle_disabled"
                      }
                      style={mCircleStyles}
                      onClick={e => this.onBallClicked(element.number)}
                    >
                      {element.number}
                    </div>
                    {element.number == ballSelected ? (
                      <div className={"powerplay_box " + "box_" + key}>
                        <div className="powerplay_box_wrapper">
                          {this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_CHANGE
                          ) < 1 &&
                          this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                          ) < 1 &&
                          this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_DECREASE
                          ) < 1 &&
                          this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_INCREASE
                          ) < 1 ? (
                            <div className="powerplays_used_text">
                              All Powerplays Have been Used
                            </div>
                          ) : (
                            ""
                          )}
                          {this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_CHANGE
                          ) > 0 ? (
                            <img
                              onClick={e =>
                                this.onPowerplayClicked(
                                  Constants.LOTETRY_POWERPLAY_CHANGE
                                )
                              }
                              className="img-responsive"
                              src={require("./../../assets/elite-8-live/shuffle.png")}
                            />
                          ) : (
                            ""
                          )}
                          {this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                          ) > 0 ? (
                            <img
                              onClick={e =>
                                this.onPowerplayClicked(
                                  Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                                )
                              }
                              className="img-responsive"
                              src={require("./../../assets/elite-8-live/force.png")}
                            />
                          ) : (
                            ""
                          )}
                          {this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_DECREASE
                          ) > 0 ? (
                            <img
                              onClick={e =>
                                this.onPowerplayClicked(
                                  Constants.LOTETRY_POWERPLAY_DECREASE
                                )
                              }
                              className="img-responsive"
                              src={require("./../../assets/elite-8-live/decrease.png")}
                            />
                          ) : (
                            ""
                          )}

                          {this.getPowerplayAmount(
                            Constants.LOTETRY_POWERPLAY_INCREASE
                          ) > 0 ? (
                            <img
                              onClick={e =>
                                this.onPowerplayClicked(
                                  Constants.LOTETRY_POWERPLAY_INCREASE
                                )
                              }
                              className="img-responsive"
                              src={require("./../../assets/elite-8-live/increase.png")}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                );
              }
            })}
          </div>
          <div
            className={
              "live_draw_match_info " + (this.state.showInfo ? "show" : "hide")
            }
          >
            Congrats ! It’s a match !
          </div>
        </div>
      </>
    );
  }
  componentWinnigNUmbers() {
    return (
      <div className="live_draw_winning_box_content">
        <p>Winning Numbers</p>
        <div className="row winning_box_numbers elite8">
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[0] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[0].daw_ball_number}
          </div>
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[1] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[1].daw_ball_number}
          </div>
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[2] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[2].daw_ball_number}
          </div>
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[3] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[3].daw_ball_number}
          </div>
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[4] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[4].daw_ball_number}
          </div>
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[5] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[5].daw_ball_number}
          </div>
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[6] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[6].daw_ball_number}
          </div>
          <div className="winning_box_circle_elite8" style={mCircleStyles}>
            {typeof this.state.drawNumbersRow[7] === "undefined"
              ? "?"
              : this.state.drawNumbersRow[7].daw_ball_number}
          </div>
        </div>
      </div>
    );
  }
  componentPowerplays() {
    return (
      <div className="mright">
        <p className="mright_top_text">My Powerplays</p>
        <div className="mright_powerplays">
          <div className="mright_powerplays_item">
            <span class="tooltiptext">
              Use to replace all your numbers with a random new set. can only be
              used at the end of the draw if you have matched 3 or fewer numbers
            </span>
            <div className="item_img_wrapper">
              <img
                className="img-responsive"
                src={require("./../../assets/elite-8-live/refresh.png")}
              />
            </div>
            <div className="item_right">
              <p>Replace All&nbsp;</p>
            </div>
            <div className="lotto_live_powerplay_amount">
              {this.getPowerplayAmount(Constants.LOTETRY_POWERPLAY_REFRESH)}
            </div>
          </div>
          <div className="mright_powerplays_item">
            <span class="tooltiptext">
              Use to replace a single number with a random new number during the
              draw.
            </span>
            <div className="item_img_wrapper">
              <img
                // onClick={e =>
                //   this.onPowerplayClicked(Constants.LOTETRY_POWERPLAY_CHANGE)
                // }
                className="img-responsive"
                src={require("./../../assets/elite-8-live/shuffle.png")}
              />
            </div>
            <div className="item_right">
              <p>Replace</p>
            </div>
            <div className="lotto_live_powerplay_amount">
              {this.getPowerplayAmount(Constants.LOTETRY_POWERPLAY_CHANGE)}
            </div>
          </div>
          <div className="mright_powerplays_item">
            <span class="tooltiptext">
              Use to force match one of your numbers to the current in-play
              number.
            </span>
            <div className="item_img_wrapper">
              <img
                // onClick={e =>
                //   this.onPowerplayClicked(
                //     Constants.LOTETRY_POWERPLAY_FORCE_MATCH
                //   )
                // }
                className="img-responsive"
                src={require("./../../assets/elite-8-live/force.png")}
              />
            </div>
            <div className="item_right">
              <p>Power Match</p>
            </div>
            <div className="lotto_live_powerplay_amount">
              {this.getPowerplayAmount(Constants.LOTETRY_POWERPLAY_FORCE_MATCH)}
            </div>
          </div>
          <div className="mright_powerplays_item">
            <span class="tooltiptext">
              Use to change the value of a selection by +1.
            </span>
            <div className="item_img_wrapper">
              <img
                // onClick={e =>
                //   this.onPowerplayClicked(Constants.LOTETRY_POWERPLAY_INCREASE)
                // }
                className="img-responsive"
                src={require("./../../assets/elite-8-live/increase.png")}
              />
            </div>
            <div className="item_right">
              <p>Increase</p>
            </div>
            <div className="lotto_live_powerplay_amount">
              {this.getPowerplayAmount(Constants.LOTETRY_POWERPLAY_INCREASE)}
            </div>
          </div>
          <div className="mright_powerplays_item">
            <span class="tooltiptext">
              Use to change the value of a selection by -1.
            </span>
            <div className="item_img_wrapper">
              <img
                // onClick={e =>
                //   this.onPowerplayClicked(Constants.LOTETRY_POWERPLAY_DECREASE)
                // }
                className="img-responsive"
                src={require("./../../assets/elite-8-live/decrease.png")}
              />
            </div>
            <div className="item_right">
              <p>Decrease</p>
            </div>
            <div className="lotto_live_powerplay_amount">
              {this.getPowerplayAmount(Constants.LOTETRY_POWERPLAY_DECREASE)}
            </div>
          </div>
        </div>
      </div>
    );
  }
  handleJoyrideCallback = data => {
    const { action, index, status, type } = data;
    if (data.action === "close" && data.type === "step:after") {
      // if (index == 0) {
      //   this.setState({ run: false });
      // }
    }
    if ([EVENTS.STEP_AFTER, EVENTS.TARGET_NOT_FOUND].includes(type)) {
      if (index > 0) {
        if (index == 2) {
          ballSelected = this.state.picks[0].number;
        }
        this.setState(this.state);
        // this.setState({
        //   stepIndex: index + (action === ACTIONS.PREV ? -1 : 1)
        // });
      }
    } else if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      if (ballSelected == this.state.picks[0].number) ballSelected = null;
      this.setState({ run: false });
    }

    console.groupCollapsed(type);
    console.log(data); //eslint-disable-line no-console
    console.groupEnd();
  };
  gotoNextStep() {
    var that = this;
    setTimeout(function() {
      that.setState({
        run: true,
        stepIndex: 1
      });
    }, 1000);
  }
  render() {
    let t = {
      back: "Back",
      close: "Close",
      last: "Last",
      next: "Next",
      skip: "Don't Show me agian"
    };
    return (
      <div>
        <Joyride
          callback={this.handleJoyrideCallback}
          scrollToFirstStep={true}
          continuous={true}
          showProgress={true}
          showSkipButton={true}
          run={this.state.run}
          steps={this.state.steps}
          locale={t}
          // stepIndex={this.state.stepIndex}
          styles={{
            options: {
              arrowColor: "#fb6e00",
              backgroundColor: "rgba(26, 26, 26, 0.95)",

              primaryColor: "#fb6e00",
              textColor: "#fff"
            }
          }}
        />
        <Header />
        <DrawTimer/>
        <div className="container-fluid _faq_wrap">
          <div className="container-fluid">
            <div className="page747_live_rows">
              <div>
                <img
                  className="img-responsive header-live-draw"
                  src={require("./../../assets/elite8/elite8_header.png")}
                />
              </div>
              <div>
                <div className="live_draw_div_jackpot">
                  {/* <p className="live_draw_div_jackpot_header" id="scroller">
                    Jackpot
                  </p>
                  {this.state.isDemo ? (
                    <p className="live_draw_div_jackpot_amount small">
                      Can be fixed or progressive
                    </p>
                  ) : (
                    <p className="live_draw_div_jackpot_amount">
                      {this.getJackpot(this.state.gameData.prize)}
                    </p>
                  )} */}
                  {this.state.isDemo ? (
                    this.state.gameData.status == "finished" ? (
                      <>
                        <p
                          className="partner_button"
                          onClick={() => this.props.history.push("/partner")}
                        >
                          Partner With Us
                        </p>
                        OR
                        <p
                          className="partner_button"
                          onClick={this.goToPicknumbersDemo}
                        >
                          Play Again
                        </p>
                      </>
                    ) : (
                      ""
                    )
                  ) : (
                    <p className="live_draw_div_jackpot_odds">
                      {"Odds of Winning: " + this.state.gameData.odds_text}
                    </p>
                  )}
                </div>
              </div>
              <center>
                <div className="mobile_view">
                  <div> {this.componentWinnigNUmbers()}</div>
                  <InPlay
                    drawRaw={this.state.drawRaw}
                    gameData={this.state.gameData}
                    replaceAllCheck={this.state.replaceAllCheck}
                    getNumbersDraw={this.getDraws}
                    getData={this.getData}
                    updatedAt={this.state.updatedAt}
                    isDemo={this.state.isDemo}
                    updateDemoGameStatus={this.updateDemoGameStatus}
                    getTotalMatched={this.getTotalMatched}
                    onPowerplayClicked={this.onPowerplayClicked}
                    dialog={this.dialog}
                    updateDrawNumberRow={this.updateDrawNumberRow}
                    updateBallSelected={this.updateBallSelected}
                  />
                  <div className="live_draw_my_numbers mobile_view">
                    {this.componentMyNumbers()}
                  </div>

                  <div className="live_draw_prize_matches">
                    Matched <span id="total-matched">{mTotalMatched}</span> of 8
                    numbers
                    {flagReplaceAll || this.state.powerplayRefresh ? (
                      <div className="match_text">
                        <>
                          Your selection&nbsp;
                          <span> {oldReplacedNumber.number}</span> was replaced
                          with &nbsp;<span>{newReplacedNumber.number}</span>
                          {this.isAMatch(newReplacedNumber)
                            ? " and it was a match!"
                            : "and there was no match"}
                        </>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>{this.componentPowerplays()}</div>
                </div>

                <div className="live_draw_content desktop">
                  <div className="live_draw_content_left">
                    {this.componentWinnigNUmbers()}
                    <div className="live_draw_in_play">
                      <div id="tourstep3"></div>
                      <div id="tourstep2"></div>
                      <InPlay
                        drawRaw={this.state.drawRaw}
                        gameData={this.state.gameData}
                        replaceAllCheck={this.state.replaceAllCheck}
                        getNumbersDraw={this.getDraws}
                        getData={this.getData}
                        updatedAt={this.state.updatedAt}
                        isDemo={this.state.isDemo}
                        updateDemoGameStatus={this.updateDemoGameStatus}
                        getTotalMatched={this.getTotalMatched}
                        onPowerplayClicked={this.onPowerplayClicked}
                        dialog={this.dialog}
                        updateDrawNumberRow={this.updateDrawNumberRow}
                        updateBallSelected={this.updateBallSelected}
                        gotoNextStep={this.gotoNextStep}
                      />
                    </div>

                    <div className="live_draw_my_numbers" id="my-numbers">
                      <div id="tourstep4"></div>
                      {this.componentMyNumbers()}
                    </div>
                    <div className="live_draw_my_prize_wrapper">
                      {this.state.gameData.status == "unplayed" ? (
                        !this.shouldShowTickTok() ? (
                          <>
                            <div className="live_draw_my_prize">
                              <DrawComponents.CountdownTimer
                                gameData={this.state.gameData}
                                isDemo={this.state.isDemo}
                                flagReplaceAll={flagReplaceAll}
                                oldReplacedNumber={oldReplacedNumber}
                                newReplacedNumber={newReplacedNumber}
                              />
                              {this.state.isDemo ? (
                                ""
                              ) : (
                                <p className="live_draw_loser_note5">
                                  Draw Date: &nbsp;
                                  {Functions.getStringDate(
                                    this.state.gameData.start_datetime
                                  )}
                                  {" at "}
                                  {Functions.getStringTime(
                                    this.state.gameData.start_datetime
                                  )}{" "}
                                  EST
                                </p>
                              )}
                            </div>
                          </>
                        ) : (
                          //if game is live and last minute
                          <>
                            {" "}
                            <div className="live_draw_my_prize">
                              <p className="live_draw_my_numbers_matched">
                                Numbers Matched:{" "}
                                <span id="total-matched">{mTotalMatched}</span>
                                /8
                              </p>
                              <p className="live_draw_my_numbers_notes">
                                Click a number and use your powerplays to edit!
                              </p>
                            </div>
                            {flagReplaceAll ? (
                              <div className="match_text">
                                <>
                                  Your selection&nbsp;
                                  <span> {oldReplacedNumber.number}</span> was
                                  replaced with &nbsp;
                                  <span>{newReplacedNumber.number}</span>
                                  {this.isAMatch(newReplacedNumber)
                                    ? " and it was a match!"
                                    : ""}
                                </>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        )
                      ) : this.state.result.prize_won ? (
                        !this.hasWonPrize(mTotalMatched) ? (
                          <div className="live_draw_my_prize">
                            <div className="live_draw_result">
                              <div className="live_draw_result_top">
                                <p className="live_draw_prize_matches">
                                  Matched{" "}
                                  <span id="total-matched">
                                    {mTotalMatched}
                                  </span>{" "}
                                  of 8 numbers
                                </p>
                                <p className="live_draw_loser_note">
                                  Sorry You didn't win this time!
                                </p>
                                <button
                                  onClick={this.goToResults}
                                  className="live_draw_button_show_result"
                                >
                                  View Results
                                </button>
                                <p className="live_draw_loser_note4">
                                  Next Draw Date
                                </p>
                                <p className="live_draw_loser_note5">
                                  {Functions.getStringDate(
                                    this.state.nextGame.start_datetime
                                  )}
                                  {Functions.getStringTime(
                                    this.state.nextGame.start_datetime
                                  )}{" "}
                                  EST
                                </p>
                              </div>
                              <button
                                className="live_draw_loser_button"
                                onClick={e =>
                                  this.onPickNumbersClicked(
                                    "/747",
                                    this.state.nextGame
                                  )
                                }
                              >
                                Pick Numbers for Next Draw
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="live_draw_my_prize winner">
                            <div className="live_draw_winner_left">
                              <img
                                className="img-responsive"
                                src={require("./../../assets/elite-8-live/trophy.png")}
                              />
                            </div>
                            <div className="live_draw_winner_right">
                              <p className="live_draw_prize_matches">
                                Matched{" "}
                                <span id="total-matched">{mTotalMatched}</span>{" "}
                                of 8 numbers
                              </p>
                              <p className="live_draw_winner_note">
                                Congratulations! You are a winner
                              </p>
                              <p className="live_draw_winner_note2">
                                Individual prizes will be calculated & added to
                                your <span>account balance</span> within 24
                                hours
                              </p>
                              <div className="results_wrapper">
                                <p className="live_draw_winner_note3">
                                  * All prizes are divided equally among winners
                                </p>
                                <button
                                  onClick={this.goToResults}
                                  className="live_draw_button_show_result winner"
                                >
                                  View Results
                                </button>
                              </div>

                              <p className="live_draw_winner_note4">
                                Next Draw Date
                              </p>
                              <p className="live_draw_winner_note5">
                                {Functions.getStringDate(
                                  this.state.nextGame.start_datetime
                                )}
                                {Functions.getStringTime(
                                  this.state.nextGame.start_datetime
                                )}{" "}
                                EST
                              </p>
                            </div>

                            <button
                              className="button_pickNumbers"
                              onClick={e =>
                                this.onPickNumbersClicked(
                                  "/747",
                                  this.state.nextGame
                                )
                              }
                            >
                              Pick Numbers for Next Draw
                            </button>
                          </div>
                        )
                      ) : (
                        <>
                          {" "}
                          <div className="live_draw_my_prize">
                            <p className="live_draw_my_numbers_matched">
                              Numbers Matched:
                              <span id="total-matched">{mTotalMatched}</span>/8
                            </p>
                            {this.state.isDemo &&
                            this.state.gameData.status == "finished" ? (
                              <>
                                <p
                                  className="live_draw_my_numbers_notes clickable"
                                  onClick={this.goToPicknumbersDemo}
                                >
                                  Try Again
                                </p>
                                <button
                                  style={{ "margin-left": "0px" }}
                                  onClick={() =>
                                    this.props.history.push("/partner")
                                  }
                                  className="lotto-button-partner orange"
                                >
                                  Partner With Us
                                </button>
                              </>
                            ) : (
                              <>
                                <p className="live_draw_my_numbers_notes">
                                  Click a number and use your powerplays to
                                  edit!
                                </p>
                                {flagReplaceAll ||
                                this.state.powerplayRefresh ? (
                                  <div className="match_text">
                                    <>
                                      Your selection&nbsp;
                                      <span>
                                        {" "}
                                        {oldReplacedNumber.number}
                                      </span>{" "}
                                      was replaced with &nbsp;
                                      <span>{newReplacedNumber.number}</span>
                                      {this.isAMatch(newReplacedNumber)
                                        ? " and it was a match!"
                                        : "and there was no match"}
                                    </>
                                  </div>
                                ) : (
                                  ""
                                )}
                              </>
                            )}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="live_draw_content_right">
                    <div id="tourstep1"></div>
                    {this.componentPowerplays()}
                  </div>
                </div>
              </center>
              <div>
                {this.state.isDemo ? (
                  ""
                ) : (
                  <div className="page747_main_prize">
                    <div class="page747_prize_image-wraper">
                      <img
                        className="img-responsive"
                        src={require("./../../assets/747/747_prize.png")}
                      />
                    </div>

                    <div className="page747_prize_details">
                      <div className="page747_prize_content">
                        <div class="page747_prize_header row">
                          <div className="row">
                            <span>Top Prizes</span>
                            <div className="button_show_prize_wrapper">
                              <button
                                className="button_show_prize"
                                onClick={e => this.handleShowPrize("747")}
                              >
                                View All Prizes
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="page747-prize-box-wrapper">
                            <div className="page747-prize-box">
                              {this.state.gameData.prize[0].hits + "/8"} <br />
                              <span>
                                {"$" +
                                  Functions.numberWithCommas(
                                    this.state.gameData.prize[0].prize
                                  )}
                              </span>
                            </div>
                          </div>
                          <div className="page747-prize-box-wrapper">
                            <div className="page747-prize-box">
                              {this.state.gameData.prize[1].hits + "/8"}
                              <br />
                              <span>
                                {"$" +
                                  Functions.numberWithCommas(
                                    this.state.gameData.prize[1].prize
                                  )}
                              </span>
                            </div>
                          </div>
                          <div className="page747-prize-box-wrapper">
                            <div className="page747-prize-box">
                              {this.state.gameData.prize[2].hits + "/8"}
                              <br />
                              <span>
                                {"$" +
                                  Functions.numberWithCommas(
                                    this.state.gameData.prize[2].prize
                                  )}
                              </span>
                            </div>
                          </div>
                          <div className="page747-prize-box-wrapper">
                            <div className="page747-prize-box">
                              {this.state.gameData.prize[3].hits + "/8"}
                              <br />
                              <span>
                                {"$" +
                                  Functions.numberWithCommas(
                                    this.state.gameData.prize[3].prize
                                  )}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="page747_prize_note">
                          *All prizes will be divided equally among winners
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal show={this.state.showPrize} onHide={this.handleClosePrize}>
          <Modal.Header closeButton>
            <Modal.Title>Prizes</Modal.Title>
            <div className="prize-note">
              *Note: All Prizes Will be divided equally among Winners
            </div>
          </Modal.Header>
          <Modal.Body className="grid-body">
            {
              <table className="modal-prize-table">
                <thead>
                  <tr>
                    <th scope="col"> Matches </th>
                    <th scope="col"> Prize </th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.prizes.map((prize, key) => {
                    return (
                      <tr className="prize-row" key={key}>
                        <td>
                          <p> {prize.hits} </p>
                        </td>
                        <td>
                          <p>{"$" + Functions.numberWithCommas(prize.prize)}</p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            }
          </Modal.Body>
        </Modal>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> {popupHader} </Modal.Title>
          </Modal.Header>
          <Modal.Body> {popupText}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.confirmDialog} onHide={this.hideConfirmDialog}>
          <Modal.Header>
            <Modal.Title>Confirm </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            This will replace all your numbers with a random new set. Are you
            sure?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.noCallback}>
              Cancel
            </Button>
            <Button variant="secondary" onClick={this.yesCallback}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <Footer />
      </div>
    );
  }
}

export default withRouter(Elite8Draw);
