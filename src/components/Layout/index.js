import React from "react";
import DevPane from "../DevPane";
import Explorer from "../Explorer";
import "./index.scss";

class AppLayout extends React.Component {
  render() {
    return (
      <div className="mainLayoutContainer">
        <Explorer />
        <DevPane />
      </div>
    );
  }
}

export default AppLayout;
