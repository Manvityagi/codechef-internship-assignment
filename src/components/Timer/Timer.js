import React from "react";

class Timer extends React.Component {
  state = {
      days:0,
      hours:0,
      minutes:0,
      seconds:0
  };

       countDownDate = new Date(this.props.endDate).getTime();


  render() {
      console.group(this.props.endDate);
      console.log(this.countDownDate);
    return (
      <>
        <h3>TIMER</h3>
      </>
    );
  }
}

export default Timer;
