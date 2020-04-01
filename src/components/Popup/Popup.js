import React from "react";
import classes from "./Popup.module.css";

class Popup extends React.Component {
  render() {
    return (
      <div className={classes.popup}>
        <div className={classes.popup_inner}>
          <h1>{this.props.text}</h1>
          <button onClick={this.props.closePopup}>Close</button>
        </div>
      </div>
    );
  }
}

export default Popup;
