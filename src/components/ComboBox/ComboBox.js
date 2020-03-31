import React from "react";
import classes from "./ComboBox.module.css";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";

class ComboBox extends React.Component {
  state = {
    contests: []
  };

  componentDidMount() {
    // let str;
    // try {
    //   console.log("hey");
    //   str = window.location.href.split("=")[1].split("&")[0];
    //   console.log(str);
    // } catch {
    //   console.log("Catch");
    //   window.location.href = "http://localhost:8000/";
    // }
    // fetch(`http://localhost:8000/index.php/?code=${str}`, {
    //   headers: {
    //     "Content-Type": "application/x-www-form-urlencoded",
    //     Accept: "application/json",
    //   },
    //   method: "GET",
    // })
    //   .then((res) => {
    //     return res.json();
    //   })
    //   .then((res) => {
    //     // console.log(res);
    //     var tk = res.access_token;
    //     var rtk = res.refresh_token;
    //     localStorage.setItem("aut_token", tk);
    //     localStorage.setItem("ref_token", rtk);
    //   })
    //   .catch((err) => {
    //     console.log(err.response);
    //   });

    // while (localStorage.getItem("aut_token") === null) {}



    axios({
      method: "get",
      url: `https://api.codechef.com/contests/?fields=&sortBy=&sortOrder=`,
      headers: {
        Accept: "application/json",
        // Authorization: `Bearer ${localStorage.getItem("aut_token")}`
        Authorization: `Bearer 2c6ef1834321a9c94ceeb957aa44675f8b1d37f5`
      }
    })
      .then(res => {
        res = res.data.result.data.content.contestList;
        this.setState({ contests: res });
      })
      .catch(err => {
        console.log("NOT DONE");
        console.log(err.response);
      });
  }

  render() {
    return (
      <div className={classes.ComboBoxPage}>
        <header>
          <div className={classes.header}>
            <img
              className={classes.himage}
              src={require("../assets/finalLogo.jpeg")}
              alt="CodeChef"
            />
          </div>
        </header>
        <img src={require("../assets/wp1828902.png")} alt="" />
        <p className={classes.heading}>COMPETE</p>
        <div className={classes.ComboBox}>
          <Autocomplete
            id="combo-box-demo"
            options={this.state.contests}
            getOptionLabel={option => `${option.code} - ${option.name}`}
            onChange={(a, b, c) =>
              this.props.history.push(`/contest/${b.code}`)
            }
            style={{ width: 300 }}
            renderInput={params => (
              <TextField {...params} label="All Contests" variant="outlined" />
            )}
          />
        </div>
      </div>
    );
  }
}

export default ComboBox;
