import React from "react";
import classes from "./Timer.module.css";

class Timer extends React.Component {
  state = {
    time: {}
  };

  render() {
    let contestEndTime = Date.parse(this.props.endDate.toString());
    let contestStartTime = Date.parse(this.props.startDate.toString());
    let now = new Date().getTime();
    let contestEnded = contestEndTime < now;
    let contestNotStarted = contestStartTime > now;
    let contestRunning = now >= contestStartTime && now < contestEndTime;
    let distance, msg;
    if (contestRunning) {
      distance = contestEndTime - now;
      msg = "Contest ends in ";
    } else if (contestNotStarted) {
      distance = contestStartTime - now;
      msg = "Contest starts in ";
    }
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (contestRunning) {
      let prefix = "Contest ends in";
      if (days === 0 && hours === 0 && minutes === 0) {
        msg = `${prefix} ${hours} hrs ${minutes} mins ${seconds} secs `;
      } else if (days === 0) {
        msg = `${prefix} ${hours} hrs ${minutes} mins`;
      } else {
        msg = `${prefix} ${days} days ${hours} hrs ${minutes} mins `;
      }
    } else if (contestNotStarted) {
      let prefix = "Contest starts in";
      if (days === 0 && hours === 0 && minutes === 0) {
        msg = `${prefix} ${hours} hrs ${minutes} mins ${seconds} secs `;
      } else if (days === 0) {
        msg = `${prefix} ${hours} hrs ${minutes} mins`;
      } else {
        msg = `${prefix} ${days} days ${hours} hrs ${minutes} mins `;
      }
    }

    return (
      <div className={classes.timerOfCurrentContest}>
        {!contestEnded ? <p>{msg}</p> : <p>Contest has ended!</p>}
      </div>
    );
  }
}

export default Timer;
