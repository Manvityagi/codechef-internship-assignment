import React, { Component } from "react";
import classes from "./Login.module.css";
import Button from "@material-ui/core/Button";

export class Login extends Component {
  render() {
    return (
      <div className={classes.Login}>
        <Button variant="contained" color="primary">
          Login
        </Button>
      </div>
    );
  }
}

export default Login;
