import React from "react";
import axios from "axios";
import classes from "./Contest.module.css";
import Timer from "../Timer/Timer";
import Submissions from "../RecentSubmissions/Submissions";
class Contest extends React.Component {
  state = {
    problemList: [],
    endDate: "",
    startDate: "",
    show: false,
    content: []
  };

  contestCode = this.props.match.params.contest_code;

  getproblems = () => {
    axios({
      method: "get",
      url: `https://api.codechef.com/contests/${this.contestCode}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("aut_token")}`
        // Authorization: `Bearer 2c6ef1834321a9c94ceeb957aa44675f8b1d37f5`
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
              this.getproblems();
            });
        }
      });
  };

  getsubmissions = () => {
    axios({
      method: "get",
      url: `https://api.codechef.com/submissions/?result=&year=&username=&language=&problemCode=&contestCode${this.contestCode}=&fields=`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("aut_token")}`
        // Authorization: `Bearer 2c6ef1834321a9c94ceeb957aa44675f8b1d37f5`
      }
    })
      .then(res => {
        console.log(res);

        let content = res.data.result.data.content;

        this.setState({ content });
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
              this.getsubmissions();
            });
        }
      });
  };

  componentDidMount() {
    this.getproblems();
    this.getsubmissions();
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
              src={require("../assets/finalLogo.jpeg")}
              alt="CodeChef"
            />
          </div>
        </header>

        <div className={classes.content}>
          <a href="http://localhost:3000/search">Home </a>
          &nbsp;»&nbsp;
          <h2>Contest Page - {this.contestCode}</h2>
          {!noProblems ? (
            <div className={classes.MAINN}>
              <div className={classes.tableMainHeading}>
                <b className={classes.boldd}>Scorable Problems</b>
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
                  <button
                    id="activity"
                    className={classes.submissionButton}
                    onClick={() =>
                      this.setState(prevState => ({
                        ...prevState,
                        show: !prevState.show
                      }))
                    }
                  >
                    + Recent Activity
                  </button>
                  {this.state.show ? (
                    <div className={classes.submissionTable}>
                      <Submissions content={this.state.content}></Submissions>
                    </div>
                  ) : (
                    <br></br>
                  )}
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
