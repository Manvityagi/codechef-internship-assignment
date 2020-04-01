import React, { Component } from "react";
import classes from "./Login.module.css";
import Button from "@material-ui/core/Button";

export class Login extends Component {
  render() {
    return (
      <div className={classes.Login}>
        <img
          className={classes.himageee}
          src={require("../assets/finalLogo.jpeg")}
          alt="CodeChef"
        />
        <Button href="http://localhost:8000" className={classes.loginButton} variant="contained" color="primary">
          Login
        </Button>
      </div>
    );
  }
}

export default Login;
