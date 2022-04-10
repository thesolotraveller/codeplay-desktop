import React from "react";
import { isEmpty } from 'lodash';
import fileIcon from '../../assets/svg/file.svg';
import folderIcon from '../../assets/svg/folder.svg';
import arrowRight from '../../assets/svg/arrowRight.svg';
import arrowDown from '../../assets/svg/arrowDown.svg';
import './index.scss';

export default class FolderTreeView extends React.Component {

  constructor(props) {
    super(props);
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(e, node) {
    e.stopPropagation();
    const toggled = node.children ? !node.toggled : true;
    this.props.onToggle(node, toggled)
  }

  render() {
    const { data } = this.props;
    const treeViewData = [data];
    const treeViewRenderItem = (treeViewJson) => {
      return treeViewJson.map((item, i) => {
        return (
        <div className={'levelLeftPadding'} key={i} onClick={(e) => this.onToggle(e, item)}>
          {item.children && item.toggled && <img src={arrowDown} alt=''/>}
          {item.children && !item.toggled && <img src={arrowRight} alt=''/>}
          <span className={!item.children ? 'levelLeftPadding' : null}>
            <img src={!item.children ? fileIcon : folderIcon} alt=''/>
            {item.name}
          </span>
          {item.toggled && treeViewRenderItem(item.children)}
        </div>);
      })
    }
    return (
      <div className="container">
        {!isEmpty(treeViewData[0]) && treeViewRenderItem(treeViewData)}
      </div>
    );
  }
}