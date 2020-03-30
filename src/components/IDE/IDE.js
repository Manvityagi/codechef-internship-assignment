import React, { useState } from "react";
// import { render } from "react-dom";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/theme-monokai";
import ReactResizeDetector from "react-resize-detector";
import classes from "./IDE.module.css";
class IDE extends React.Component {
  state = {
    sourceCode: "",
    language: "",
    input: "",
    output: "",
    status: "",
    memory: "",
    date: "",
    time: "",
    stderr: "",
    cmpinfo: "",
    editorHeight: 400,
    editorWidth: "auto"
  };

  onResize = (w, h) => {
    this.setState({
      editorHeight: h,
      editorWidth: w
    });
  };

  handleRun = () => {
    // if (this.state.sourceCode.length === 0) {
    //   console.log("Language Not Selected");
    //   return;
    // }

    axios({
      method: "post",
      url: "https://api.codechef.com/ide/run",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer c83f769e2250d9dedaf19c9d8cbd21d8f251a66d`
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
              Authorization: `Bearer c83f769e2250d9dedaf19c9d8cbd21d8f251a66d`
            }
          })
            .then(res => {
              let output = res.data.result.data.output;
              let cmpinfo = res.data.result.data.cmpinfo;
              let stderr = res.data.result.data.stderr;
              this.setState({ output, cmpinfo, stderr });
            })
            .catch(err => {
              console.log("Couldnt Run to find status");
              console.log(err);
            });
        }, 3000);
      })
      .catch(err => {
        console.log("Couldnt Run 1");
        console.log(err);
      });
  };

  handleSubmit = () => {};

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
    })
  }

  render() {
    console.log("output", this.state.output);
    console.log("cmpinfo", this.state.cmpinfo);
    console.log("stderr", this.state.stderr);

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
        </div>

        {/* Make a new component for this part later */}

        <h3>Custom input</h3>
        <textarea rows="6" cols="141" onChange={this.changeInput}></textarea>

        {isOutputComponent ? (
          <>
            <h3>{status}</h3>
            <textarea
              rows={6}
              cols={141}
              value={msg}
              onChange={event => this.handleOnChange(event)}
            ></textarea>
            {/* <textarea rows="6" cols="141">
              {msg}
            </textarea> */}
          </>
        ) : (
          <br></br>
        )}
      </div>
    );
  }
}

export default IDE;
