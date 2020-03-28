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
    axios({
      method: "get",
      url: `https://api.codechef.com/contests/?fields=&sortBy=&sortOrder=`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 029df49ef6e3f314b2c947816887f151c99e9391`
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
      <>
        <header>
          <div className={classes.header}>
            <img
              className={classes.himage}
              src={require("../assets/logo.svg")}
              alt="CodeChef"
            />
          </div>
        </header>
        <img src={require("../assets/wp1828902.png")} />
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
      </>
    );
  }
}

export default ComboBox;
