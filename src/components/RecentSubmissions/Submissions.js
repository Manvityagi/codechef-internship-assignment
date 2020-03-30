import React from "react";
import axios from "axios";
import moment from "moment";
import classes from './Submissions.module.css';

class Submissions extends React.Component {
  render() {
    return (
      <div className={classes.submissionTable}>
        <h4 className={classes.submissionTitle}>Submissions</h4>
        <table className={classes.sub} >
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
            {this.props.content.map((sbm, i) => (
              <tr key={i}>
                <td>{moment(sbm.date).format("Mo MMM YY")}</td>
                <td>{sbm.username}</td>
                <td>{sbm.problemCode}</td>
                <td>{sbm.result.splice}</td>
                <td>{sbm.language}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Submissions;
