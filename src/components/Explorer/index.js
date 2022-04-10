import React from "react";
import { connect } from 'react-redux';
import FolderTreeView from '../FolderTreeView';

import { setFolderViewJson } from '../../actions/DevPane';
import * as s from './index.scss';

class Explorer extends React.Component {
  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  componentDidMount() {
    window.ipcRenderer.on('openFolder', (event, files) => {
      this.props.setFolderViewJson(null, files);
    })

    window.ipcRenderer.on('openDirectory', (event, key, files) => {
      this.props.setFolderViewJson(key, files);
    })
  }

  onToggle(node, toggled) {
    const { key, path } = node;
    if (!node.children) {
      window.ipcRenderer.send('openFile', node.path);
    } else {
      if (!node.toggled && !node.fetched) {
        window.ipcRenderer.send('openDirectory', key, path);
      } else {
        node.toggled = toggled;
        this.props.setFolderViewJson(key, node);
      }
    }
  }

  render() {
    const { structure } = this.props;
    return (
      <div className={s.container}>
        <div className={'tabItem'}>
          <p>EXPLORER</p>
        </div>
        <FolderTreeView data={structure} onToggle={this.onToggle} />
      </div>
    );
  }
}

const mapActionsToProps = {
  setFolderViewJson
};

export default connect(state => state.fileexplorer, mapActionsToProps)(Explorer);