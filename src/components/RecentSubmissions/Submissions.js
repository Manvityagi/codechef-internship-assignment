import React from "react";
import moment from "moment";
import classes from "./Submissions.module.css";

class Submissions extends React.Component {
  render() {
    return (
      <div className={classes.submissionTable}>
        <table className={classes.sub}>
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
              <tr style={{height:"2px"}} key={i}>
                <td >{moment(sbm.date).format("Mo MMM YY hh:mm A")}</td>
                <td>{sbm.username}</td>
                <td>{sbm.problemCode}</td>

                {sbm.result === "manualDisqualificationByAdmin" ? (
                  <td>Disqualified</td>
                ) : (
                  <td>{sbm.result}</td>
                )}
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
