import React from "react";
import { connect } from 'react-redux';
import { ControlledEditor } from "@monaco-editor/react";
import { updateFileContentInEditor } from '../../actions/DevPane';

class EditorWindow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      fileContent: ''
    };
  }

  handleEditorChange = (ev, value) => {
    const { selectedFile, updateFileContentInEditor } = this.props;
    const { path } = selectedFile;

    updateFileContentInEditor(path, value);
  };

  render () {
    let {contents = '', language = 'text'} = this.props.selectedFile;
    if (language === 'NotSupported') {
      contents = `This file format is not supported`;
    }

    return (
      <>
        <ControlledEditor
          height="100vh"
          language={language}
          value={contents}
          theme="dark"
          onChange={this.handleEditorChange.bind(this)}
        />
      </>
    );
  }
}

const mapActionsToProps = {
  updateFileContentInEditor
}

export default connect(state => state.files, mapActionsToProps)(EditorWindow);