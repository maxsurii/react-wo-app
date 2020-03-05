import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page extends Component {
  onClick = e => {
    this.props.history.push("/detail/0");
  };

  render() {
    return (
      <div>
        <div>{this.props.children}</div>
      </div>
    );
  }
}

export default withRouter(Page);
