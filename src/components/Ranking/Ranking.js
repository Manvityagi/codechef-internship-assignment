import React from "react";
import axios from "axios";
import Demo from "../Table/Table";

class Ranking extends React.Component {
  state = {
    rankarray: [],
    problems: []
  };
  contestCode = this.props.match.params.contest_code;

  getRankings = () => {
    axios({
      method: "get",
      url: `https://api.codechef.com/rankings/${this.contestCode}?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("aut_token")}`
        // Authorization: `Bearer 2c6ef1834321a9c94ceeb957aa44675f8b1d37f5`
      }
    })
      .then(res => {
        console.log(res);
        let rankarray = res.data.result.data.content;
        let problems = rankarray[0].problemScore;
        this.setState({ rankarray, problems });
      })
      .catch(err => {
        console.log("NOT DONE");
        console.log(err.response);
        if (localStorage.getItem("ref_token") === null) {
          window.location.href = `http://localhost:8000/index.php`;
        } else {
          fetch(
            `http://localhost:8000/index.php?ref_token=${localStorage.getItem(
              "ref_token"
            )}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json"
              },
              method: "GET"
            }
          )
            .then(res => {
              return res.json();
            })
            .then(res => {
              var tk = res.access_token;
              var rtk = res.refresh_token;
              localStorage.setItem("aut_token", tk);
              localStorage.setItem("ref_token", rtk);
              this.getRankings();
            });
        }
      });
  };

  componentDidMount() {
    this.getRankings();
  }
  render() {
    console.log(this.state.problems);
    return (
      <>
        <h2>RANKS - {this.contestCode}</h2>
        <Demo
          rankarray={this.state.rankarray}
          problems={this.state.problems}
        ></Demo>
      </>
    );
  }
}

export default Ranking;
