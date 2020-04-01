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
    let str;
    try {
      // console.log("hey");
      localStorage.setItem("aut_token", "");
      console.log(window.location.href);
      str = window.location.href.split("=")[1].split("&")[0];
      // console.log(str);
    } catch {
      console.log("Catch");
      window.location.href = "http://localhost:8000/";
    }
    axios({
      method: "get",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json"
      },
      url: `http://localhost:8000/index.php?code=${str}`
    })
      .then(res => {
        // console.log("--------->", res);
        return JSON.parse(JSON.stringify(res));
      })
      .then(res => {
        // console.log(res);
        var tk = res.data.access_token;
        var rtk = res.data.refresh_token;
        // console.log(tk);
        localStorage.setItem("aut_token", tk);
        // console.log(localStorage.getItem("aut_token"));
        localStorage.setItem("ref_token", rtk);

        axios({
          method: "get",
          url: `https://api.codechef.com/contests/?fields=&sortBy=&sortOrder=`,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("aut_token")}`
            // Authorization: `Bearer `
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
      })
      .catch(err => {
        console.log("ERROR");
        console.log(err);
      });

    // console.log("AUAU", localStorage.getItem("aut_token"));

    // let i = 0;
    // while (localStorage.getItem("aut_token") === "") {
    //   console.log(i);
    //   i += 1;
    // }

    // axios({
    //   method: "get",
    //   url: `https://api.codechef.com/contests/?fields=&sortBy=&sortOrder=`,
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `Bearer ${localStorage.getItem("aut_token")}`
    //     // Authorization: `Bearer `
    //   }
    // })
    //   .then(res => {
    //     res = res.data.result.data.content.contestList;
    //     this.setState({ contests: res });
    //   })
    //   .catch(err => {
    //     console.log("NOT DONE");
    //     console.log(err.response);
    //   });
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
