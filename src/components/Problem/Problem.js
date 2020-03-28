import React from "react";
import axios from "axios";
import IDE from "../IDE/IDE";

class Problem extends React.Component {
  state = {
    pname: "",
    pcode: "",
    pstatement: "",
    sizelmt: "",
    timelmt: "",
    author: "",
    successfulSubmissions: 0,
    totalSubmissions: 0,
    languages: []
  };

  contestCode = this.props.match.params.contest_code;
  problemCode = this.props.match.params.problem_code;

  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.codechef.com/contests/${this.contestCode}/problems/${this.problemCode}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer daf1c927dd815c187e01dfc53276931885c9babf`
      }
    })
      .then(res => {
        res = res.data.result.data.content.text();

        console.log(res);
        this.setState({
          pname: res["problemName"],
          pcode: res["problemCode"],
          pstatement: res["body"],
          sizelmt: res["sourceSizeLimit"],
          timelmt: res["maxTimeLimit"],
          author: res["author"],
          successfulSubmissions: res["successfulSubmissions"],
          totalSubmissions: res["totalSubmissions"],
          languages: res["languagesSupported"]
        });
      })
      .catch(err => {
        console.log("NOT DONE");
        console.log(err);
      });
  }

  handleSubmit = e => {
    this.props.history.push(``);
  };

  render() {
    return (
      <>
        <h1>{this.state.pname}</h1>
        <div
        // dangerouslySetInnerHTML={{
        //   __html: this.state.pstatement
        // }}
        >
          {this.state.pstatement}
        </div>
        <h1>successful Submissions - {this.state.successfulSubmissions}</h1>

        <IDE languages={this.state.languages}></IDE>
      </>
    );
  }
}

export default Problem;