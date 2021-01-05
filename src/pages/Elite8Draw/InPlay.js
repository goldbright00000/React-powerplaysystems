import * as Functions from "./../common/functions";
import React, { Component, useState, useEffect } from "react";
import * as Constants from "./../common/constants";
class InPlay extends Component {
  intervalIDSecs = null;
  intervalIDTimer = null;
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      steps: [],
      secondsTimer: 59,
      intervaler: null,
      drawTimer: null,
      isInPause: false,
      inLast10: false,
      ballPreState: "START",
      ballColor: "white"
    };
    this.shouldShowTickTok = this.shouldShowTickTok.bind(this);
    this.onStartClicked = this.onStartClicked.bind(this);
    this.confirmReplaceAll = this.confirmReplaceAll.bind(this);
  }
  componentDidMount() {
    this.checkIt();
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.gameData.status != this.props.gameData.status ||
      prevProps.updatedAt != this.props.updatedAt
    ) {
      this.checkIt();
    }
    if (this.props.replaceAllCheck) {
      console.log("Timer Id: " + this.intervalIDTimer);

      if (document.getElementById("m-timer")) {
        document.getElementById("m-timer").innerHTML = "-";
      }
    }
    if (this.props.gameData.status == "finished") {
      window.clearInterval(this.intervalIDSecs);
      window.clearInterval(this.intervalIDTimer);
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalIDSecs);
    this.intervalIDSecs = null;
    clearInterval(this.intervalIDTimer);
    this.intervalIDTimer = null;
  }
  checkIt() {
    console.log("checking")
    console.log(this.props.gameData.status)
    console.log(this.props.gameData.status)
    //if drawn numbers are 8 and the game is not finished
    if (
      this.props.drawRaw.length > 8 &&
      this.props.gameData.status != "finished"
    ) {
      this.props.updateDemoGameStatus("finished");
      return;
    }
    //if the game is unplayed
    if (this.props.gameData.status == "unplayed") {
      this.startTimer();
    }

    //if teh game is live
    else if (
      this.props.gameData.status == "live" ||
      this.props.gameData.status == "In Progress"
    ) {
      this.stopTimer();
      if (this.props.drawRaw.length == 0) {
        this.setState({
          secondsTimer: this.props.gameData.countdown_timer
        });
        if (this.props.isDemo) {
          this.props.getNumbersDraw();
        }
      } else {
        this.startDrawTimer();
      }
    } else if (this.props.gameData.status == "finished") {
      this.stopTimer();
      this.stopDrawTimer();
    }
  }
  confirmReplaceAll() {
    this.props.dialog(
      "This will replace all your numbers with a random new set. Are you sure?"
    );
  }
  //onCLickingStart
  onStartClicked() {
    var that = this;
    if (document.getElementById("begin-text")) {
      document.getElementById("begin-text").innerHTML = "Draw is Starting";
    }
    if (document.getElementById("ball-start")) {
      var element = document.getElementById("ball-start");
      element.classList.add("bg_black");
      element.classList.remove("animation_pulse");
    }

    that.setState({
      ballPreState: "READY",
      ballColor: "black"
    });

    setTimeout(function() {
      that.setState({
        ballPreState: "SET"
      });
    }, 1500);
    setTimeout(function() {
      that.setState({
        ballPreState: "GO"
     
      });
    }, 3000);
    setTimeout(function() {
      that.setState({
        ballColor: "white"
      });
      that.props.updateDemoGameStatus("live");
      //that.props.gotoNextStep();
      that.props.getData();
    }, 4500);
  }
  startTimer() {
    if (this.intervalIDSecs == null) {
      var that = this;
      this.intervalIDSecs = setInterval(function() {
        that.setState({
          secondsTimer: Functions.getSeconds(that.props.gameData.start_datetime)
        });
      }, 1000);
    }
  }
  stopTimer() {
    clearInterval(this.intervalIDSecs);
    this.intervalIDSecs = null;
  }
  startDrawTimer() {
    if (this.intervalIDTimer == null) {
      var that = this;
      var remains = that.getNextTime();
      console.log(remains);
      that.setState(
        {
          secondsTimer: remains
        },
        () => {
          this.intervalIDTimer = setInterval(function() {
            var remains = that.getNextTime();
            console.log(remains);
            that.setState({
              secondsTimer: remains
            });
          }, 1000);
        }
      );
    }
  }
  stopDrawTimer() {
    if (this.intervalIDTimer != null) {
      clearInterval(this.intervalIDTimer);
      this.intervalIDTimer = null;
    }
  }

  getNextTime() {
    if (this.props.drawRaw.length < 1) {
      return;
    }
    if (this.props.updatedAt == null) {
      var dt = new Date(
        this.props.drawRaw[this.props.drawRaw.length - 1].date_time
      );
    } else {
      var dt = new Date(this.props.updatedAt);
    }
    dt.setSeconds(dt.getSeconds() + this.props.gameData.countdown_timer);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;

    if (distance > 0) {
      this.state.isInPause = false;
      if (distance > this.props.gameData.countdown_timer * 1000) {
        return this.props.gameData.countdown_timer;
      }

      return parseInt(distance / 1000, 10);
    } else {
      this.state.isInPause = true;
      var that = this;
      this.props.updateBallSelected(null);
      console.log(this.props.drawRaw.length)
      if (this.props.drawRaw.length >= 8) {
        //if the numbers matched are less than 4
        if (this.props.getTotalMatched() < 4) {
          this.setState({
            inLast10: true
          });
          var newDraw = [...this.props.drawRaw];
          newDraw.sort(
            (a, b) =>
              parseFloat(a.daw_ball_number) - parseFloat(b.daw_ball_number)
          );
          this.props.updateDrawNumberRow(newDraw);
          clearInterval(this.intervalIDTimer);
          var currTime = new Date(Functions.getCurrentTimeEST());
          currTime.setSeconds(currTime.getSeconds() + 12);
          var countDownDate = new Date(currTime).getTime();
          this.intervalIDTimer = setInterval(function() {
            var remains = Functions.getTimeDifferenceEST(countDownDate);
            console.log(remains);
            if (that.props.replaceAllCheck) {
              that.setState({
                secondsTimer: "-"
              });
              window.clearInterval(this.intervalIDSecs);
              window.clearInterval(this.intervalIDTimer);
            } else {
              that.setState({
                secondsTimer: remains / 1000
              });
            }
          }, 1000);
          console.log("Timer Id: " + this.intervalIDTimer);
          setTimeout(function() {
            clearInterval(this.intervalIDTimer);
            clearInterval(this.intervalIDSecs);
            that.props.updateDemoGameStatus("finished");
            that.props.getData();
            return 0;
          }, 12000);
        } else {
          clearInterval(this.intervalIDSecs);
          that.props.updateDemoGameStatus("finished");
          this.props.getData();
          return 0;
        }
      } else {
        clearInterval(this.intervalIDSecs);
        setTimeout(function() {
          that.props.getNumbersDraw();
        }, this.props.gameData.delay * 1000);

        return this.props.gameData.countdown_timer;
      }
    }
  }

  shouldShowTickTok() {
    var dt = new Date(this.props.gameData.start_datetime);
    var countDownDate = new Date(dt).getTime();
    var usaTime = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York"
    });
    usaTime = new Date(usaTime);
    var now = usaTime.getTime();
    var distance = countDownDate - now;
    return distance > 59000 ? false : true;
  }
  render() {
    //if no number drawn
    if (this.props.drawRaw.length == 0) {
      //if game is unplayed
      if (this.props.gameData.status == "unplayed") {
        if (this.props.isDemo) {
          return (
            <div className="live_draw_in_play">
              <p>In Play</p>
              <div className="live_draw_in_play_timer">
                <>
                  <div className="live_draw_numbers_text">Number 1 of 8</div>
                  <div
                    id="ball-start"
                    className={
                      "live_draw_in_play_circle circle_active animation_pulse" +
                      (this.state.ballColor == "black" ? " bg_black" : "")
                    }
                    onClick={this.onStartClicked}
                  >
                    {this.state.ballPreState}
                  </div>
                  <div
                    className="live_draw_in_play_timer_bottom begin-text"
                    id="begin-text"
                  >
                    {/* Draw Begins In <span id="m-timer">-</span> sec. */}
                    Click Start to Begin
                  </div>
                </>
              </div>
            </div>
          );
        } else {
          return (
            <div className="live_draw_in_play">
              <p>In Play</p>
              <div className="live_draw_in_play_timer">
                {/* if time to start is greater than 60 seconds */}
                {!this.shouldShowTickTok() ? (
                  <>
                    {" "}
                    <div className="live_draw_in_play_circle">-</div>
                    <div
                      className="live_draw_in_play_timer_bottom text_only"
                      style={{ marginTop: "44px" }}
                    >
                      Next Number Drawn In -{" "}
                    </div>
                  </>
                ) : (
                  //if game is not live and last minute
                  <>
                    <div className="live_draw_numbers_text">Number 1 of 8</div>
                    <div
                      className={
                        this.state.secondsTimer < 1 &&
                        Functions.getMinuts(
                          this.props.gameData.start_datetime
                        ) < 1
                          ? "live_draw_in_play_circle circle_active"
                          : "live_draw_in_play_circle circle_active double_line"
                      }
                    >
                      {" "}
                      {this.state.secondsTimer < 1 &&
                      Functions.getMinuts(this.props.gameData.start_datetime) <
                        1 ? (
                        "GO!"
                      ) : (
                        <>
                          GET <br />
                          READY!
                        </>
                      )}
                    </div>
                    <div className="live_draw_in_play_timer_bottom">
                      Draw Begins In{" "}
                      <span id="m-timer">{this.state.secondsTimer}</span> sec.
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        }
      } //if game is live and no number is drawn
      else if (this.props.gameData.status == "live") {
        return (
          <div className="live_draw_in_play">
            <p>In Play</p>
            <div className="live_draw_in_play_timer">
              <div className="live_draw_numbers_text">Number 1 of 8</div>
              <div className="live_draw_in_play_circle circle_active with_gif"></div>

              <>
                <div className="live_draw_in_play_timer_bottom">
                  <>
                    Time remaining{" "}
                    <span id="m-timer">{this.state.secondsTimer}</span> sec.
                  </>
                </div>
              </>
            </div>
          </div>
        );
      } else {
        return <div className="live_draw_in_play" />;
      }
    }
    //if finished
    else if (this.props.gameData.status == "finished") {
      return (
        <div className="live_draw_in_play">
          <p>In Play</p>
          <div className="live_draw_in_play_timer">
            <div className="live_draw_numbers_text">
              {"Number " + this.props.drawRaw.length + " of 8"}
            </div>
            <div className="live_draw_in_play_circle">-</div>

            <>
              <div className="live_draw_in_play_timer_bottom text_only draw_finished">
                Draw Completed!
              </div>
            </>
          </div>
        </div>
      );
    }
    //if draw is in prgress with atlest one number drawn
    else if (this.props.gameData.status == "live") {
      //if draw is in the last 10 seconds
      if (this.state.inLast10) {
        return (
          <div className="live_draw_in_play">
            <p>In Play</p>
            <div className="live_draw_in_play_timer">
              <div className="live_draw_numbers_text">
                {this.state.inLast10
                  ? "Click to replace All your Numbers"
                  : "Number " + this.props.drawRaw.length + " of 8"}
              </div>
              <div
                className={"live_draw_in_play_circle with_replace"}
                onClick={this.confirmReplaceAll}
              ></div>

              <>
                <div className="live_draw_in_play_timer_bottom text_only">
                  <>
                    Time remaining{" "}
                    <span id="m-timer">{this.state.secondsTimer}</span> sec.
                  </>
                </div>
              </>
            </div>
          </div>
        );
      } else {
        return (
          <div className="live_draw_in_play">
            <p>In Play</p>
            <div className="live_draw_in_play_timer">
              <div className="live_draw_numbers_text">
                {"Number " + this.props.drawRaw.length + " of 8"}
              </div>
              <div
                className={
                  "live_draw_in_play_circle number_active" +
                  (this.state.isInPause ? " with_gif" : "")
                }
              >
                {this.state.isInPause
                  ? ""
                  : this.props.drawRaw[this.props.drawRaw.length - 1]
                      .daw_ball_number}
              </div>

              <>
                <div className="live_draw_in_play_timer_bottom text_only">
                  <>
                    Time remaining{" "}
                    <span id="m-timer">{this.state.secondsTimer}</span> sec.
                  </>
                </div>
              </>
            </div>
          </div>
        );
      }
    }
  }
}
export default InPlay;
