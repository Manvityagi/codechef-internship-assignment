import React from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-github";

class IDE extends React.Component {
  onChange = newValue => {
    console.log("change", newValue);
  };

  render() {
    return (
      <>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={this.onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </>
    );
  }
}

export default IDE;
