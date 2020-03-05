import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import * as actions from "../../store/actions/index";

class Navbar extends Component {
  onLogoutClicked = event => {
    event.preventDefault();
    this.props.logoutUser();
    window.location.href = "/login";
  };

  render() {
    const { isAuthenticated } = this.props.auth;
    const authLinks = (
      <ul>
        <li>
          <Link to="/worklist">Work List</Link>
        </li>
        <li>
          <a onClick={this.onLogoutClicked} href="#!">
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/login">
            <i className="fas fa-code"></i> Max-React-App
          </Link>
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

const mapDispatchToProps = dispath => {
  return {
    logoutUser: () => dispath(actions.logoutUser())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
