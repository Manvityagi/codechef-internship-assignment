import React from "react";
import axios from "axios";
import classes from "./Contest.module.css";
import Timer from "../Timer/Timer";
class Contest extends React.Component {
  state = {
    problemList: [],
    endDate: "",
    startDate: ""
  };

  contestCode = this.props.match.params.contest_code;

  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.codechef.com/contests/${this.contestCode}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 6fc19b90fe8ef684661c4fd67f6274ce62ab7781`
      }
    })
      .then(res => {
        console.log(res);

        res = res.data.result.data.content;
        let problemList = res.problemsList;
        let endDate = res.endDate;
        let startDate = res.startDate;
        // console.log(endDate);
        this.setState({ problemList, endDate, startDate });
      })
      .catch(err => {
        console.log("NOT DONE");
        console.log(err.response);
      });
  }

  problemEventHandler = event => {
    let problemCode = event.target.getAttribute("value");
    this.props.history.push(
      `/contests/${this.contestCode}/problems/${problemCode}`
    );
  };

  contestRank = e => {
    this.props.history.push(`/rankings/${this.contestCode}`);
  };

  render() {
    let noProblems = this.state.problemList.length === 0;

    return (
      <div>
        <header>
          <div className={classes.header}>
            <img
              className={classes.himage}
              src={require("../assets/logo.svg")}
              alt="CodeChef"
            />
          </div>
        </header>

        <div className={classes.content}>
          <a href="http://localhost:3000/search">Home </a>
          &nbsp;»&nbsp;
          <h2>Contest Page - {this.contestCode}</h2>
          {!noProblems ? (
            <div>
              <div className={classes.tableMainHeading}>
                <b>Scorable Problems</b>
              </div>
              <main>
                <table>
                  <thead>
                    <tr>
                      <th>Code</th>
                      <th>Successful Submissions</th>
                      <th>Accuracy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.problemList.map(problem => (
                      <tr key={problem.problemCode}>
                        <td
                          className={classes.problemID}
                          value={problem.problemCode}
                          onClick={this.problemEventHandler}
                        >
                          {problem.problemCode}
                        </td>
                        <td>{problem.successfulSubmissions}</td>
                        <td>{problem.accuracy.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className={classes.rightHandPage}>
                  <div className={classes.contest}>
                    <Timer
                      startDate={this.state.startDate}
                      endDate={this.state.endDate}
                    ></Timer>
                  </div>
                  <div className={classes.parent}>
                    <div className={classes.contest1}>
                      <h4>CONTEST RANKS</h4>
                      <button onClick={this.contestRank} type="link">
                        Go to Contest Ranks
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          ) : (
            <div className={classes.contestYetToBeStarted}>
              <div className={classes.timer}>
                <Timer
                  startDate={this.state.startDate}
                  endDate={this.state.endDate}
                ></Timer>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Contest;
