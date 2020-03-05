import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import * as actions from "../../../store/actions/index";
import Page from "../../common/Page/Page";
import Spinner from "../../common/Spinner/Spinner";

class WorkList extends Component {
  state = {
    worklist: [],
    errors: {}
  };

  componentWillMount() {
    let queryParams = {
      "oslc.pageSize": this.props.wostore.pageSize,
      "oslc.select":
        "wonum,description,name,status,status_description,workorderid,priority",
      collectioncount: 1, //also returns the total number of records and pages
      "oslc.where": 'istask=0 and status="WAPPR"',
      pageno: this.props.wostore.page
    };
    this.props.loadWorkOrders(this.props.auth, queryParams);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.wostore.worklist.length > 0) {
      this.setState({ worklist: nextProps.wostore.worklist });
    }
  }

  onChangePagination = e => {
    console.log("Pagination Event:", e);
    const workStore = this.props.wostore;
    workStore.page = e.page;
    workStore.pageSize = e.pageSize;
    workStore.loadWork();
  };

  renderDescription = wo => {
    let description = "<empty description>";
    if (wo.description) {
      description = wo.description;
    }
    return description;
  };

  render() {
    const { worklist, loading } = this.props.wostore;
    const { errors } = this.props; // const errors = this.state.errors;
    if (errors.message) {
      return <div>Error: {errors.message}</div>;
    }

    let worklistContent;
    if (worklist && worklist.length > 0) {
      worklistContent = worklist.map(wo => (
        <div className="woItem" key={wo.workorderid}>
          <div>
            <h2>
              <Link to={"/wodetail/" + wo.workorderid}>{wo.wonum}</Link>
            </h2>
            <hr />
            <h3>{this.renderDescription(wo)}</h3>
          </div>
        </div>
      ));
    }
    console.log(`worklistContent : ${worklistContent}`);
    if (worklist.length <= 0 || loading) {
      worklistContent = <Spinner />;
    }
    return <Page>{worklistContent}</Page>;
  }
}

WorkList.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  wostore: PropTypes.object.isRequired,
  loadWorkOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    errors: state.errors,
    wostore: state.wostore
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadWorkOrders: (authStore, queryParams) =>
      dispatch(actions.loadWorkOrders(authStore, queryParams))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkList);
