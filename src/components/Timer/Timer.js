import React from "react";

class Timer extends React.Component {
  state = {
    // days: 0,
    // hours: 0,
    // minutes: 0,
    // seconds: 0,
    // date: "",
    time: {}
  };

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds
    };
    return obj;
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    let seconds = Date.parse(this.props.endDate.toString()) - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds
    });

    // Check if we're at zero.
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.props.endDate);
    this.setState({ time: timeLeftVar });
    setInterval(this.countDown, 1000);
  }

  render() {
    console.log(this.props.endDate, typeof this.props.endDate);

    const date = Date.parse(this.props.endDate);

    console.log(date);
    console.log(this.state.time);
    // console.log(newDate(this.props.endDate));
    // console.log(this.props.endDate.getTime());
    return (
      <>
        <h3>TIMER</h3>
        m:{this.state.time.m} s:{this.state.time.s}
      </>
    );
  }
}

export default Timer;
