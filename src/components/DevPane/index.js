import React from "react";
import * as _ from 'lodash';
import { connect } from 'react-redux';
import EditorWindow from '../Editor';
import TabsContainer from '../TabsContainer';
import { addTab, selectFileTab } from '../../actions/Tabs';
import { setSelectedFileData, updateFileEditStatus } from '../../actions/DevPane';
import languageFromFilePath from '../../utils/getExtensionFromFilename';
import './index.scss';

class DevPane extends React.Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    window.ipcRenderer.on('openFile', (event, fileContents, filePath) => {
      const { files, selectFileTab, addTab, setSelectedFileData } = this.props;

      const isFileAlreadyOpen = _.get(files, 'files', []).filter(file => file.path === filePath)[0];
      const language = languageFromFilePath(filePath);

      if (isFileAlreadyOpen) {
        // making the tab for this file active and showing file's content in the active editor window
        selectFileTab(filePath);
        setSelectedFileData(filePath, fileContents, language, false, true);
      } else {
        // adding a tab for this file and showing file's content in the active editor window
        addTab(filePath, 'FILE', true, 0);
        setSelectedFileData(filePath, fileContents, language, true, true);
      }
    });

    window.ipcRenderer.on('saveFile', (event) => {
      const { files } = this.props;
      const selectedFile = files.selectedFile;
      const { path, contents } = selectedFile;

      window.ipcRenderer.send('saveFile', path, contents);
    })

    window.ipcRenderer.on('saveFileStatus', (event, path, status) => {
      const { updateFileEditStatus } = this.props;
      updateFileEditStatus(path, status);
    })
  }

  render() {
    const tabsList = this.props.tabs.tabsData;
    return (
      <div className='container1'>
        {tabsList.length > 0 && <TabsContainer />}
        <div>
          <EditorWindow />
        </div>
      </div>
    )
  }
}

const mapActionsToProps = {
  updateFileEditStatus,
  setSelectedFileData,
  selectFileTab,
  addTab
};

export default connect(state => state, mapActionsToProps)(DevPane);