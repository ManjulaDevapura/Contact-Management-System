import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Toast from '../components/Toast'
import Contact from "../dashboard/Contact/Contact";

export class Controller extends Component {
  render() {
    const PrivateRoute = ({ component: Component, ...rest }) => (
      <div>
        <Route path="/" component={Contact} />
      </div>
    );

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark static-top">
          <NavLink
            className="navbar-brand mr-1"
            style={{
              height: 40,
              alignContent: "center",
              textAlign: "center"
            }}
            to="/"
          >
            <span
              style={{
                height: 40,
                alignContent: "center",
                textAlign: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: 20,
                paddingLeft: 25
              }}
            >Contact Management System</span>
          </NavLink>
        </nav>

        <div style={{
          backgroundColor: 'black', backgroundImage: `url({$})`, height: 650,
          backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed',
          backgroundSize: '100%'
        }} >
          <PrivateRoute />
          <div id='ToastSection'>
            <div id='errorToast' className="toast" role="alert" aria-live="assertive" aria-atomic="true" autohide='true' data-animation='true' data-delay='10000' style={{ position: 'fixed', bottom: '2px', right: '3px' }}>
              <Toast id='errT' />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {

  };
};

const mapDispatchToProps = dispatch => {
  return {

  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Controller)
);
