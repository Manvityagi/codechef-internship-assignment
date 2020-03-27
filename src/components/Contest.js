import React from "react";
import axios from "axios";

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
        Authorization: `Bearer baab61a4dd2e023347442f559e2542a8579e4b7c`
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
    console.log(event.currentTarget);
  };

  render() {
    return (
      <>
        <h2>Contest Page - {this.contestCode}</h2>

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
                <td onClick={this.problemEventHandler}>{problem.problemCode}</td>
                <td>{problem.successfulSubmissions}</td>
                <td>{problem.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

export default Contest;

// {this.state.problemList.map(problem => (
//   <li key={problem.problemCode}>
//     {problem.problemCode}
//     {/* <button onClick={this.props.history.push(`contests/${this.contestCode}/problems/${problem.problemCode}`)}>
//       {problem.problemCode}
//     </button> */}
//         {problem.successfulSubmissions}    {problem.accuracy}{" "}
//   </li> //problem.accuracy.fixed(2)
// ))}
