import React from "react";

import PropTypes from "prop-types";

export default function Header(props) {
  return (
    <div className="header">
      <div className="brand">{props.brand}</div>
      <div className="title">{props.title}</div>
      <div>{props.icons ? props.icons : ""}</div>
    </div>
  );
}

Header.propTypes = {
  brand: PropTypes.string,
  title: PropTypes.string
};
