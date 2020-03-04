import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/Form/TextFieldGroup";
import Spinner from "../common/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Login extends Component {
  state = {
    username: "",
    password: "",
    errors: {}
  };
  onLoginHandler = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password);
  };

  onInputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { errors } = this.state; // const errors = this.state.errors;
    const loading = this.props.auth.loading;
    let form = (
      <form className="form" onSubmit={this.onLoginHandler}>
        <TextFieldGroup
          placeholder="Username"
          name="username"
          value={this.state.username}
          onChange={this.onInputChangeHandler}
          error={errors.username}
        />
        <TextFieldGroup
          type="password"
          placeholder="Password"
          name="password"
          value={this.state.password}
          onChange={this.onInputChangeHandler}
          error={errors.password}
        />
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    );
    if (loading) {
      form = <Spinner />;
    }
    return (
      <div className="container">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        {form}
      </div>
    );
  }
}

Login.prototypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (username, password) => dispatch(actions.login(username, password))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
