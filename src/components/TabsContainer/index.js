import React from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import * as _ from "lodash";
import { selectFileTab, removeFileTab } from "../../actions/Tabs";
import { setSelectedFileData, clearFileData } from "../../actions/DevPane";
import close from "../../assets/svg/close.svg";
import saveDot from "../../assets/svg/saveDot.svg";
import "./index.scss";

class TabsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.closeTab = this.closeTab.bind(this);
  }

  closeTab(e, tab) {
    e.stopPropagation();
    const { type, path, active } = tab;
    const { removeFileTab, clearFileData, files, tabs, setSelectedFileData } =
      this.props;
    if (type === "FILE") {
      const allFiles = files.files;
      const fileTabs = tabs.tabsData.filter((tab) => tab.type === "FILE");
      let isLastTab = false;

      fileTabs.forEach((tab, index) => {
        if (tab.path === path && index === fileTabs.length - 1) {
          isLastTab = true;
        }
      });

      const fileToBeSelected = isLastTab
        ? allFiles[allFiles.length - 2]
        : allFiles[allFiles.length - 1];

      if (active) {
        if (fileToBeSelected) {
          setSelectedFileData(
            fileToBeSelected.path,
            fileToBeSelected.contents,
            fileToBeSelected.language,
            false,
            true
          );
        } else {
          setSelectedFileData("", "", "text", false);
        }
      }

      removeFileTab(path);
      clearFileData(path);
    }
  }

  selectTab(tab) {
    const { type, path = "", saved = false, active = false } = tab;
    if (type === "FILE") {
      if (!active) {
        if (saved) {
          const fileToBeSelected = _.get(this, "props.files.files", []).filter(
            (file) => file.path === path
          )[0];
          const { contents, language } = fileToBeSelected;
          this.props.selectFileTab(path);
          this.props.setSelectedFileData(path, contents, language, false, true);
        } else {
          // here we will handle selecting a tab pointing new file which is not saved yet
        }
      }
    }
  }

  render() {
    const { tabs, files } = this.props;
    const allTabs = tabs.tabsData;
    const allFiles = files.files;
    const tabItems = allTabs.map((tab, i) => {
      let isBeingEdited = false;
      if (tab.type === "FILE") {
        isBeingEdited = _.get(
          allFiles.filter((file) => file.path === tab.path),
          "[0].isBeingEdited",
          false
        );
      }
      const tabStyles = classNames("tabItem", {
        selectedTab: tab.active,
      });
      return (
        <div
          key={i}
          onClick={this.selectTab.bind(this, tab)}
          className={tabStyles}
        >
          <p>{tab.name}</p>{" "}
          {isBeingEdited && tab.type === "FILE" && (
            <img src={saveDot} onClick={(e) => this.closeTab(e, tab)} alt="" />
          )}
          {(!isBeingEdited || tab.type !== "FILE") && (
            <img src={close} onClick={(e) => this.closeTab(e, tab)} alt="" />
          )}
        </div>
      );
    });

    return <div className="container2">{tabItems}</div>;
  }
}

const mapActionsToProps = {
  selectFileTab,
  removeFileTab,
  clearFileData,
  setSelectedFileData,
};

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, mapActionsToProps)(TabsContainer);
