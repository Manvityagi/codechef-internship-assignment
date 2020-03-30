import React from "react";

class Timer extends React.Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  //if(this.props.currentTime < endDateTime) = Contest Ended

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
      msg = "Contest ends in "   
    } else if (contestNotStarted) {
      distance = contestStartTime - now;
      msg = "Contest starts in "
    }
    let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60) );
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (contestRunning) {
      if(days === 0 && hours === 0 && minutes === 0){
        msg = `Contest ends in ${hours} hrs ${minutes} mins ${seconds} secs `;   
      }
      else if(days === 0) {
        msg = `Contest ends in ${hours} hrs ${minutes} mins`;
      } 
      else {
        msg = `Contest ends in ${days} days ${hours} hrs ${minutes} mins `   
      }
    } else if (contestNotStarted) {
      if(days === 0 && hours === 0 && minutes === 0){
        msg = `Contest starts in ${hours} hrs ${minutes} mins ${seconds} secs `;   
      }
      else if(days === 0) {
        msg = `Contest starts in ${hours} hrs ${minutes} mins`;
      } 
      else {
        msg = `Contest starts in ${days} days ${hours} hrs ${minutes} mins `   
      }
    }
    

    

    return (
    <div>
      <h1>Timer</h1>
      {!contestEnded ? (
        <p>{msg}</p> 
      ) : (
        <p>Contest has ended!</p>
      )}    
      </div>
      );
  }
}

export default Timer;
