import React from "react";
import axios from "axios";
import IDE from "../IDE/IDE";
import classes from "./Problem.module.css";
import ReactHtmlParser from "react-html-parser";
// const ReactMarkdown = require('react-markdown')
// const ReactMarkdown = require('react-markdown/with-html');

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
        Authorization: `Bearer ${localStorage.getItem("aut_token")}`
        // Authorization: `Bearer 2c6ef1834321a9c94ceeb957aa44675f8b1d37f5`
      }
    })
      .then(res => {
        res = res.data.result.data.content;

        // console.log(res);
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

  render() {
    // console.log(this.state.pstatement);
    return (
      <div className={classes.Problem}>
        <h1>PROBLEM</h1>
        <div className={classes.problem}>
          <h2>{this.state.pname} </h2>
          <div>{ReactHtmlParser(this.state.pstatement)}</div>
          {/* <ReactMarkdown source={this.state.pstatement} escapeHtml={false}  /> */}
          <hr />
        </div>

        <h1>Successful Submissions - {this.state.successfulSubmissions}</h1>

        <IDE languages={this.state.languages} />
      </div>
    );
  }
}

export default Problem;
