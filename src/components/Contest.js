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
        Authorization: `Bearer 8270428b23ae47326e1f1bb86d68cf09006743bf`
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
<<<<<<< HEAD
    console.log(event.target.getAttribute('problemID'));
=======
    let problemCode = event.target.getAttribute('value');
    console.log(event.target.getAttribute('value'));
    this.props.history.push(`contests/${this.contestCode}/problems/${problemCode}`);
>>>>>>> 53945600188f655d1776315e57c658bdb7feb423
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
<<<<<<< HEAD
              <tr key={problem.problemCode} >
                <td data-title="problemID"onClick={this.problemEventHandler}>{problem.problemCode}</td>
                <td>{problem.successfulSubmissions}</td>
=======
              <tr key={problem.problemCode}>
                <td value={problem.problemCode} onClick={this.problemEventHandler}>{problem.problemCode}</td>
                <td>{problem.successfulSubmissions}</td>  
>>>>>>> 53945600188f655d1776315e57c658bdb7feb423
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
