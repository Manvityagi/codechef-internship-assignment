import React from "react";
import axios from "axios";
import classes from "./Contest.module.css";
import { Breadcrumbs } from "@material-ui/core";
// import pictures from './assets';
class Contest extends React.Component {
  state = {
    problemList: []
  };

  contestCode = this.props.match.params.contest_code;

  componentDidMount() {
    axios({
      method: "get",
      url: `https://api.codechef.com/contests/${this.contestCode}`,
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 50cea1963d043979bffd1a35aeb1d2645c17534e`
      }
    })
      .then(res => {
        res = res.data.result.data.content.problemsList;
        // console.log(res);
        this.setState({ problemList: res });
      })
      .catch(err => {
        console.log("NOT DONE");
        console.log(err.response);
      });
  }

  problemEventHandler = event => {
    let problemCode = event.target.getAttribute("value");
    console.log(event.target.getAttribute("value"));
    this.props.history.push(
      `/contests/${this.contestCode}/problems/${problemCode}`
    );
  };

  render() {
    // why is this not working as expected
    if (this.state.problemList.length === 0)
      console.log("NO problems in this contest");
    return (
      <>
        <header>
          <div className={classes.header}>
            <img
              className={classes.himage}
              src={require("./assets/logo.svg")}
              alt="CodeChef"
            />
          </div>
        </header>

        <div className={classes.content}>
          <aside className={classes.breadcrumbs}>
            <a href="#">Home</a>

            <a href="#">Compete</a>
            <h2>Contest Page - {this.contestCode}</h2>
          </aside>
          <div>
            <b>Scorable Problems for Division 2</b>
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
          </main>
        </div>
        <div className={classes.contest}>
          Insert code for future contest here
        </div>
        <div className={classes.parent}>
          <div className={classes.contest1}>
            <h3>CONTEST RANKS</h3>
            <button type="link">Go to Contest Ranks</button>
          </div>
        </div>
      </>
    );
  }
}

export default Contest;
