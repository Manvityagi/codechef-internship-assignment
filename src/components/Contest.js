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
        Authorization: `Bearer 9db90b86958ec1d36946adad73228a31ec636094`
      }
    })
      .then(res => {
        res = res.data.result.data.content.problemsList;
        console.log(res);
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
      `contests/${this.contestCode}/problems/${problemCode}`
    );
  };

  render() {
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
          {/* <div>
            <form className={classes.login} action="/action_page.php">
              <input type="text" placeholder="Username" name="username" />
              <input type="text" placeholder="Password" name="psw" />
              <button type="submit">Login</button>
            </form>
          </div>
          <div className={classes.container}>
            <span className={classes.psw}>
              <a className={classes.forget} href="#">
                Forgot Password
              </a>
            </span>
          </div>

          <div className={classes.images}>
            <img
              className={classes.icons}
              src={require("./assets/google.webp")}
              alt="google plus"
            />
            <img
              className={classes.icons}
              src={require("./assets/github.png")}
              alt="github"
            />
            <img
              className={classes.icons}
              src={require("./assets/facebook.png")}
              alt="facebook"
            />
          </div> */}

          {/* <div className={classes.signup}>
            <button className={classes.newinput} type="link">
              New User
            </button>
          </div> */}
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
                    <td>{problem.accuracy}</td>
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

// onClick={this.props.history.push(`contests/${this.contestCode}/problems/${problem.problemCode}`)}

// {this.state.problemList.map(problem => (
//   <li key={problem.problemCode}>
//     {problem.problemCode}
//     {/* <button onClick={this.props.history.push(`contests/${this.contestCode}/problems/${problem.problemCode}`)}>
//       {problem.problemCode}
//     </button> */}
//         {problem.successfulSubmissions}    {problem.accuracy}{" "}
//   </li> //problem.accuracy.fixed(2)
// ))}
