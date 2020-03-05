import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import TextFieldGroup from "../common/Form/TextFieldGroup";
import Spinner from "../common/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Login extends Component {
  state = {
    username: "maxadmin",
    password: "maxadmin",
    host: "http://localhost:9080/maximo",
    errors: {}
  };
  onLoginHandler = event => {
    event.preventDefault();
    this.props.login(this.state.username, this.state.password, this.state.host);
  };

  onInputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    // If the person is authenticated and tries to directly select login
    // then route the user to worklist
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/worklist");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/worklist");
    }
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { errors } = this.state; // const errors = this.state.errors;
    const loading = this.props.auth.loading;
    let form = (
      <form className="form" onSubmit={this.onLoginHandler}>
        <TextFieldGroup
          placeholder="Host"
          name="host"
          value={this.state.host}
          onChange={this.onInputChangeHandler}
          error={errors.host}
        />
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
    login: (username, password, host) =>
      dispatch(actions.login(username, password, host))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
