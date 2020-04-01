import React, { Component } from "react";
import Login from "./Login/Login";
import classes from "./App.module.css";

export class App extends Component {
          
  render() {
    console.log("enter react")
    return (
      <div className={classes.App}>
        <Login />
      </div>
    );
  }
}

export default App;
