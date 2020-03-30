import React from "react";
import axios from "axios";
import Demo from "../Table/Table";

class Ranking extends React.Component {
  state = {
    rankarray: [],
    problems: []
  };
  contestCode = this.props.match.params.contest_code;

  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.codechef.com/rankings/${this.contestCode}?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 81ea87244c22719bce35df771581033585497aef`
      }
    }).then(res => {
      console.log(res);
      let rankarray = res.data.result.data.content;
      let problems = rankarray[0].problemScore;
      this.setState({ rankarray, problems });
    });
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
