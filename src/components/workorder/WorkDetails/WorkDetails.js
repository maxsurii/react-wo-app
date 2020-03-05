import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import Spinner from "../../common/Spinner/Spinner";
import TextFieldGroup from "../../common/Form/TextFieldGroup";
import TextAreaFieldGroup from "../../common/Form/TextAreaFieldGroup";
import SelectListGroup from "../../common/Form/SelectListGroup";

class WorkDetails extends Component {
  state = {
    newWork: false,
    wonum: "",
    description: "",
    status: "",
    woId: ""
  };

  componentWillMount() {
    let woId = this.props.match.params.woId;
    if (parseInt(woId, 10) === 0) {
      this.setState({ newWork: true });
    } else {
      this.setState({ woId: woId });
      this.props.fetchWorkOrderDetail(this.props.auth, woId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wostore.workdetail.wonum !== null) {
      this.setState({
        wonum: nextProps.wostore.workdetail.wonum,
        description: nextProps.wostore.workdetail.description,
        status: nextProps.wostore.workdetail.status
      });
    }
  }

  onWorkOrderSubmitHandler = event => {
    event.preventDefault();
    const wodetail = {
      wonum: this.state.wonum,
      description: this.state.description,
      status: this.state.status,
      siteid: "NBNCO",
      orgid: "NBN CO",
      woId: this.state.woId
    };
    this.props.saveWorkOrder(this.props.auth, wodetail, this.props.history);
  };

  onInputChangeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    //Select options for status
    const options = [
      { label: "Select Status", value: "0" },
      { label: "Approved", value: "APPR" },
      { label: "DP Commence Work", value: "DPCOMMENCE" }
    ];

    const { errors } = this.props; // const errors = this.state.errors;
    const { loading } = this.props.wostore;
    let form;
    if (errors.message) {
      return <div>Error: {errors.message}</div>;
    }
    if (loading) {
      form = <Spinner />;
    } else {
      form = (
        <form className="form" onSubmit={this.onWorkOrderSubmitHandler}>
          <TextFieldGroup
            placeholder="Work Order"
            name="wonum"
            value={this.state.wonum}
            onChange={this.onInputChangeHandler}
          />
          <TextAreaFieldGroup
            placeholder="Description"
            name="description"
            value={this.state.description}
            onChange={this.onInputChangeHandler}
          />
          <SelectListGroup
            placeholder="Status"
            name="status"
            value={this.state.status}
            onChange={this.onInputChangeHandler}
            options={options}
            error={errors.status}
            info="Select a valid to be status"
          />
          <input type="submit" className="btn btn-primary" value="Submit" />
        </form>
      );
    }
    return (
      <div className="container">
        <h1 className="large text-primary">Work Order Details</h1>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors,
    wostore: state.wostore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchWorkOrderDetail: (auth, woId) =>
      dispatch(actions.fetchWorkOrderDetail(auth, woId)),
    saveWorkOrder: (auth, wo, history) =>
      dispatch(actions.saveWorkOrder(auth, wo, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkDetails);
