import React from "react";
import axios from "axios";
class Ranking extends React.Component {
  contestCode = this.props.match.params.contest_code;
  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.codechef.com/rankings/${this.contestCode}?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer fa0eb595c921467a8ebec137740d7e191890c26e`
      }
    });
  }
  render() {
    return <h2>RANKS - {this.contestCode}</h2>;
  }
}

export default Ranking;
