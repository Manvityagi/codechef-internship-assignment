import React from "react";
// import { render } from "react-dom";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import ReactResizeDetector from "react-resize-detector";
import classes from "./IDE.module.css";
import CloseIcon from "@material-ui/icons/Close";
import Popup from "../Popup/Popup";
// import Popup from "reactjs-popup";
class IDE extends React.Component {
  state = {
    sourceCode: "",
    language: "",
    input: "",
    output: "",
    status: "",
    memory: 0,
    date: "",
    time: "",
    stderr: "",
    cmpinfo: "",
    editorHeight: 400,
    editorWidth: "auto",
    showoutput: true,
    CustomInput: false,
    submitOutput: false
  };

  onResize = (w, h) => {
    this.setState({
      editorHeight: h,
      editorWidth: w
    });
  };

  handleRun = () => {
    axios({
      method: "post",
      url: "https://api.codechef.com/ide/run",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${localStorage.getItem("aut_token")}`
        // Authorization: `Bearer 2c6ef1834321a9c94ceeb957aa44675f8b1d37f5`
      },
      data: {
        sourceCode: this.state.sourceCode,
        language: this.state.language,
        input: this.state.input
      }
    })
      .then(res => {
        // console.log(res);
        let link = res.data.result.data.link;
        // console.log(link);

        setTimeout(() => {
          axios({
            method: "get",
            url: `https://api.codechef.com/ide/status?link=${link}`,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${localStorage.getItem("aut_token")}`
              // Authorization: `Bearer a58b4022180568338134ed334774587fbc960c75`
            }
          })
            .then(res => {
              console.log(res);
              res = res.data.result.data;
              let { output, cmpinfo, stderr, date, time, memory } = res;
              this.setState({ output, cmpinfo, stderr, date, time, memory });
            })
            .catch(err => {
              console.log("Couldnt Run to find status - 2nd api in run");
              console.log(err);
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
                    this.getContestList();
                  });
              }
            });
        }, 3000);
      })
      .catch(err => {
        console.log("Couldn't Run 1");
        console.log(err);
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
              this.handleRun();
            });
        }
      });
  };

  handleSubmit = e => {
    console.log("submit clicked");

    this.setState(prevState => ({
      ...prevState,
      submitOutput: !prevState.submitOutput
    }));
  };

  togglePopup = e => {
    console.log("close button on popup clicked");
    this.setState(prevState => ({
      ...prevState,
      submitOutput: !prevState.submitOutput
    }));
  };

  changeLanguage = e => {
    this.setState({ language: e.target.value });
  };

  changeSourceCode = e => {
    this.setState({ sourceCode: e });
  };

  changeInput = e => {
    this.setState({ input: e.target.value });
  };

  // handleOutputChange = e => {
  //   setValue(e.target.value);
  // };

  handleOnChange(event) {
    this.setState({
      msg: event.target.value
    });
  }

  render() {
    console.log("output", this.state.output);
    console.log("cmpinfo", this.state.cmpinfo);
    console.log("stderr", this.state.stderr);
    console.log("submitoutput", this.state.submitOutput);

    let msg, status;
    let isCompileInfo = this.state.cmpinfo.length === 0;
    let isOutput = this.state.output.length === 0;
    let isStderr = this.state.stderr.length === 0;

    if (!isCompileInfo) {
      status = "Compilation Error";
      msg = this.state.cmpinfo;
    } else if (!isOutput) {
      status = "Successfully Executed";
      msg = this.state.output;
    } else if (!isStderr) {
      status = "RunTime Error";
      msg = this.state.stderr;
    }

    let isOutputComponent = !isCompileInfo || !isOutput || !isStderr;

    return (
      <div className={classes.IDE}>
        <label htmlFor="language">Language</label>
        <select
          id="language"
          onChange={this.changeLanguage}
          value={this.state.language}
        >
          {this.props.languages.map(lng => (
            <option value={lng} key={lng}>
              {lng}
            </option>
          ))}
        </select>
        <div className={classes.editor}>
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onResize}
          />
          <AceEditor
            mode="javascript"
            theme="monokai"
            value={this.state.sourceCode}
            onChange={this.changeSourceCode}
            name="UNIQUE_ID_OF_DIV"
            editorProps={{ $blockScrolling: true }}
            height={this.state.editorHeight}
            width={this.state.editorWidth}
          />
        </div>
        <div className={classes.compilebuttons}>
          <button className={classes.run} onClick={this.handleRun}>
            Run
          </button>
          <button className={classes.submit} onClick={this.handleSubmit}>
            Submit
          </button>
          <button
            style={{ marginLeft: "45%" }}
            onClick={() =>
              this.setState(prevState => ({
                ...prevState,
                CustomInput: !prevState.CustomInput
              }))
            }
          >
            + Custom Input
          </button>
        </div>

        {/* Make a new component for this part later */}

        {this.state.CustomInput ? (
          <div className={classes.submissionTable}>
            <h3>Custom input</h3>
            <textarea
              rows="6"
              cols="120"
              onChange={this.changeInput}
            ></textarea>
          </div>
        ) : (
          <>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
          </>
        )}
        {isOutputComponent ? (
          <>
            <p style={{ fontSize: "19px" }}>
              <b>Status</b> {status} &nbsp; &nbsp; <b>Date</b> {this.state.date}{" "}
              &nbsp; &nbsp; <b>Time</b> {this.state.time} sec &nbsp; &nbsp;{" "}
              <b>Mem</b> {(this.state.memory / 1000).toFixed(2)} kB
            </p>
            <textarea
              rows={6}
              cols={120}
              value={msg}
              onChange={event => this.handleOnChange(event)}
            ></textarea>
          </>
        ) : (
          <br></br>
        )}

        {/* <Popup text="Submitted Successfully"></Popup> */}

        {this.state.submitOutput ? (
          <Popup text="Submitted Successfully" closePopup={this.togglePopup} />
        ) : null}

        {/* <Popup trigger={<button> Trigger</button>} position="right center">
          <div>Popup content here !!</div>
        </Popup> */}
      </div>
    );
  }
}

export default IDE;
