import React from "react";

class Timer extends React.Component {
  state = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  };

  //if(this.props.currentTime < endDateTime) = Contest Ended

  countDownDate = new Date(this.props.endDate).getTime(); //Doubt - this is not converting

  render() {
    console.log(this.props.endDate, typeof(this.props.endDate));
    console.log(this.countDownDate);
    return (
      <>
        <h3>TIMER</h3>
      </>
    );
  }
}

export default Timer;
