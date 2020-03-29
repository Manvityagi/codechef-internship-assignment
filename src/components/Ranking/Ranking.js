import React from "react";

class Ranking extends React.Component {
  contestCode = this.props.match.params.contest_code;
  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.codechef.com/rankings/${this.contestCode}?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 0679c26e82d1d643afd0b353c959289d0d77ba94`
      }
    });
  }
  render() {
    return <h2>RANKS - {this.contestCode}</h2>;
  }
}

export default Ranking;
