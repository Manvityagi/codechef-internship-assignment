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
        Authorization: `Bearer 215afac3201241400af559b57876d62faa9f81d5`
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
    // console.log(event.target.getAttribute("value"));
    this.props.history.push(
      `/contests/${this.contestCode}/problems/${problemCode}`
    );
  };

  contestRank = e => {
    this.props.history.push(`/rankings/${this.contestCode}`);
  };

  render() {
    // console.log(this.state.problemList.length);
    // why is this not working as expected
    // if (this.state.problemList.length === 0) {
    //   return <><h1>This contest has not started yet</h1></>;
    // }

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
          {/* <aside className={classes.breadcrumbs}> */}
          <a href="http://localhost:3000/search">Home </a>
          &nbsp;»&nbsp;
          <h2>Contest Page - {this.contestCode}</h2>
          {/* </aside> */}
          {!noProblems ? (
            <div>
              <div>
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
                      <h3>CONTEST RANKS</h3>
                      <button onClick={this.contestRank} type="link">
                        Go to Contest Ranks
                      </button>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          ) : (
            <>
              <Timer
                startDate={this.state.startDate}
                endDate={this.state.endDate}
              ></Timer>
              <p style={{ textAlign: "center", fontSize: "20px" }}>
                This contest has no problems
              </p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Contest;
