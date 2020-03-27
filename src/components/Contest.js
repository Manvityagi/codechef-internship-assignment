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
        Authorization: `Bearer f1a0593c6e762855d5ea68f5ebf8c9fa7bd4d80b`
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
    let problemCode = event.target.getAttribute('value');
    console.log(event.target.getAttribute('value'));
    this.props.history.push(`/contests/${this.contestCode}/problems/${problemCode}`);
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
                <td value={problem.problemCode} onClick={this.problemEventHandler}>{problem.problemCode}</td>
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
