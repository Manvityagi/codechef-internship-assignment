import React from "react";
import axios from "axios";
import moment from "moment";

class Submissions extends React.Component {
  // state = {
  //   show: false,
  //   content: []
  // };
  // componentDidMount() {
  //   axios({
  //     method: "get",
  //     url: `https://api.codechef.com/submissions/?result=&year=&username=&language=&problemCode=&contestCode${this.props.contestCode}=&fields=`,
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `Bearer 29350f8974c14b68c00e56732438d2f6574f5d0f`
  //     }
  //   })
  //     .then(res => {
  //       console.log(res);

  //       let content = res.data.result.data.content;

  //       this.setState({ content });
  //     })
  //     .catch(err => {
  //       console.log("NOT DONE");
  //       console.log(err.response);
  //     });
  // }

  render() {
    // console.log(this.state.content,"fhbvh"); 
    return (
      <>
        <h1>Submissions</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>User</th>
              <th>Problem</th>
              <th>Result</th>
              <th>Language</th>
            </tr>
          </thead>
          <tbody>
          {this.props.content.map( (sbm,i) => 
            (<tr key = {i} >
              <td>{moment(sbm.date).format("Mo MMM YY")}</td>
              <td>{sbm.username}</td>
              <td>{sbm.problemCode}</td>
              <td>{sbm.result}</td>
              <td>{sbm.language}</td>
            </tr>)
           )}
          </tbody>
        </table>
      </>
    );
  }
}

export default Submissions;
