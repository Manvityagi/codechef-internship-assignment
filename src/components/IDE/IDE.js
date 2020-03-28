import React from "react";
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
        Authorization: `Bearer 076c84fadc7f4aba17c39c996b3b4808c88df9fa`
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
              Authorization: `Bearer 076c84fadc7f4aba17c39c996b3b4808c88df9fa`
            }
          })
            .then(res => {
              let output = res.data.result.data.output;
              this.setState({ output: output });
              console.log(output);
              console.log(res);
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

  render() {
    // console.log(this.state.language);
    // console.log(this.state.sourceCode);
    // console.log(this.state.input);
    // console.log(this.state.output.length)
    let isOutput = this.state.output.length === 0;
    // console.log(isOutput)
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

        <h3>Custom input</h3>
        <textarea rows="6" cols="141" onChange={this.changeInput}></textarea>

        {!isOutput ? (
          <>
            <h3>Output</h3>
            <textarea rows="6" cols="141">
              {this.state.output}
            </textarea>
          </>
        ) : (
          <br></br>
        )}
      </div>
    );
  }
}

export default IDE;
