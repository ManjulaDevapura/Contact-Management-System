import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import * as actionCreator from "../../../actions/Contact/Contact_action";

const Table = lazy(() => import("./Contact_Table"));

class Contact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      add_name: "",
      add_phone: 0,
      add_address: "",
      add_email: "",
    };
  }

  componentDidMount() {
    $('[data-toggle="modal"]').hover(function () {
      $('[data-toggle="modal"]').tooltip();
    });

    $(function () {
      $('[data-toggle="modal"]').tooltip();
    });
  }

  render() {
    return (

      <div>
        <div className="basicdata">
          <div className="card mb3">
            <div className="card-header">
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#addContact"
                title={"Add Contact"}
                onClick={() => {
                  document.getElementById(
                    "add_name"
                  ).style.borderColor = null;
                  document.getElementById(
                    "add_phone"
                  ).style.borderColor = null;
                  document.getElementById(
                    "add_address"
                  ).style.borderColor = null;
                  document.getElementById(
                    "add_email"
                  ).style.borderColor = null;
                  document.getElementById("add_email_exits").style.display =
                    "none";
                  this.setState({
                    add_name: "",
                    add_phone: 0,
                    add_address: "",
                    add_email: "",
                  });
                }}
              >
                {"Add Contact"}
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <Suspense fallback={<div>Loading....</div>}>
                  <Table />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div id="addContact" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animate">
              <div className="modal-header">
                <h4 className="modal-title text-uppercase">{"Add Contact"}</h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div id="addData" style={{ paddingLeft: 30 }}>
                  <table>
                    <tbody>
                      <tr>
                        <td>{"Name"}* :</td>
                        <td>
                          <input
                            id="add_name"
                            value={this.state.add_name}
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => {
                              this.setState({ add_name: e.target.value });
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>{"Phone Number"}* :</td>
                        <td>
                          <input
                            id="add_phone"
                            value={this.state.add_phone}
                            type="number"
                            className="form-control"
                            autoComplete="off"
                            min={'700000000'} max={'799999999'}
                            onChange={(e) =>
                              this.setState({ add_phone: e.target.value })
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>{"Address"}* :</td>
                        <td>
                          <input
                            id="add_address"
                            value={this.state.add_address}
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) =>
                              this.setState({ add_address: e.target.value })
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>{"Email"}* :</td>
                        <td>
                          <input
                            id="add_email"
                            value={this.state.add_email}
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => {
                              this.setState({ add_email: e.target.value });
                            }}
                          />
                        </td>
                        <td id='add_email_exits' style={{ color: 'red', display: 'none' }}>{"Exist"}</td>
                      </tr>

                    </tbody>
                  </table>
                </div>
              </div>

              <div className="modal-footer">
                <button
                  id="add"
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    var valid = 1;
                    document.getElementById(
                      "add_name"
                    ).style.borderColor = null;
                    document.getElementById(
                      "add_phone"
                    ).style.borderColor = null;
                    document.getElementById(
                      "add_address"
                    ).style.borderColor = null;
                    document.getElementById(
                      "add_email"
                    ).style.borderColor = null;

                    if (this.state.add_name.toString().trim() === "") {
                      document.getElementById(
                        "add_name"
                      ).style.borderColor = "red";
                      valid = 0;
                    }
                    if ((parseInt(this.state.add_phone) < 700000000) || (parseInt(this.state.add_phone) >= 800000000)) {
                      document.getElementById('add_phone').style.borderColor = 'red'
                      valid = 0;
                    }
                    if (this.state.add_address.toString().trim() === "") {
                      document.getElementById(
                        "add_address"
                      ).style.borderColor = "red";
                      valid = 0;
                    }
                    if ((this.state.add_email).toString().trim() === ''
                      || this.state.add_email.search("@") === -1
                      || this.state.add_email.split("@")[1].length < 5) {
                      document.getElementById('add_email').style.borderColor = 'red'
                      valid = 0;
                    }

                    if (valid === 1) {
                      this.props.add_Contact(
                        this.state.add_name.toString().trim(),
                        this.state.add_phone,
                        this.state.add_address,
                        this.state.add_email.toString().trim(),
                        this.props.tbl_State
                      );
                    }
                  }}
                >
                  {"Save"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  {"Close"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  return {
    tbl_State: state.r_Contact.state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    add_Contact: (name, phone, address, email, state) => {
      dispatch(actionCreator.add_Contact(name, phone, address, email, state));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
