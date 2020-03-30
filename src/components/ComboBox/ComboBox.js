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
        Authorization: `Bearer 215afac3201241400af559b57876d62faa9f81d5`
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
              src={require("../assets/logo.svg")}
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
