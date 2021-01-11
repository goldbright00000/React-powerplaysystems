// import * as Functions from "./../common/functions";
// import React, { Component, useState, useEffect } from "react";

// export const CountdownTimer = props => {
//   var ticker = null;
//   const [secondsTimer, setsecondsTimer] = useState("59");
//   function startTimer() {
//     ticker = setInterval(function() {
//       setsecondsTimer(Functions.getSeconds(props.gameData.start_datetime));
//     });
//   }
//   function stopTimer() {
//     if (ticker) {
//       clearInterval(ticker);
//       ticker = null;
//     }
//   }
//   startTimer();

//   return (
//     <div className="page747_live_draw_timer">
//       {props.isDemo ? (
//         <div style = {{"marginTop" : "20px", "fontSize" : "22px"}}>Click <span className = "color_orange">Start</span> to begin a live lottery simulation</div>
//       ) : (
//         <div className="prize-none" style={{ textAlign: "center" }}>
//           <p style={{ fontSize: "22.4px", marginTop: "-20px !important" }}>
//             Next draw starts in
//           </p>
//           <div className="row page747_main_draw_inner secs_draw">
//             <div>
//               <p> {Functions.getDays(props.gameData.start_datetime)}</p>
//               Days
//             </div>
//             <div>
//               <p> {Functions.getHours(props.gameData.start_datetime)}</p>
//               hours
//             </div>

//             <div>
//               <p> {Functions.getMinuts(props.gameData.start_datetime)}</p>
//               Mins
//             </div>
//             <div>
//               <p> {secondsTimer}</p>
//               Secs
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
