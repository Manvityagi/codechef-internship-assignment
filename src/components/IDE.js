import React from "react";
import { render } from "react-dom";
import axios from "axios";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

class IDE extends React.Component {
  state = {
    sourceCode: "",
    language: "",
    input: "",
    output: "",
    status:"",
    memory:"",
    date:"",
    time:""
  };

  handleRun = () => {
    if (this.state.sourceCode.length === 0) {
      console.log("Language Not Selected");
      return;
    }
  
    axios({
      method: "post",
      url: "https://api.codechef.com/ide/run",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer 50cea1963d043979bffd1a35aeb1d2645c17534e`
      },
      data: {
        sourceCode: this.state.sourceCode,
        language: this.state.language,
        input: this.state.input
      }
    })
      .then(res => {
        console.log(res);
        let link = res.data.result.data.link;
        console.log(link);
  
        setTimeout(() => {
          axios({
            method: "get",
            url: `https://api.codechef.com/ide/status?link=${link}`,
            headers: {
              Accept: "application/json",
              Authorization: `Bearer 50cea1963d043979bffd1a35aeb1d2645c17534e`
            }
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log("Couldnt Run to find status");
              console.log(err.response);
            });
        }, 1000);
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
    return (
      <>
        <label htmlfor="language">Language</label>
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

        <AceEditor
          mode="javascript"
          theme="github"
          value={this.state.sourceCode}
          onChange={this.changeSourceCode}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <button onClick={this.handleRun}>Run</button>
        <button onClick={this.handleSubmit}>Submit</button>

        <h3>Custom input</h3>
        <textarea rows="4" cols="50" onChange={this.changeInput}></textarea>
        <h3>Output</h3>
        <textarea rows="4" cols="50">{this.state.output}</textarea>
      </>
    );
  }
}

export default IDE;
