import React, { Component } from "react";
import { connect } from "react-redux";
import $ from "jquery";
import ReactTable from "react-table";
import "react-table/react-table.css";

import * as actionCreator from "../../../actions/Contact/Contact_action";

class Contact_Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      pages: null,
      loading: false,

      upd_id: 0,
      upd_name: "",
      upd_phone: 0,
      upd_address: "",
      upd_email: "",

      columns: [
        {
          Header: `ID`,
          accessor: "id",
          width: 50,
          maxWidth: 50,
          minWidth: 50,
        },
        {
          Header: `Name`,
          accessor: "name",
        },
        {
          Header: `Phone`,
          accessor: "phone",
        },
        {
          Header: `Address`,
          accessor: "address",
        },
        {
          Header: `Email`,
          accessor: "email",
        },
        {
          Header: `Actions`,
          accessor: "id",
          sortable: false,
          filterable: false,
          width: 100,
          maxWidth: 100,
          minWidth: 100,
          Cell: (row) => (
            <div>
              <button
                id="update"
                data-toggle="modal"
                title={"Update"}
                data-target="#updatePackage"
                data-trigger="hover"
                className="btn btn-sm"
                onClick={() => {
                  this.setState({
                    upd_id: row.original.id,
                    upd_name: row.original.name,
                    upd_phone: row.original.phone,
                    upd_address: row.original.address,
                    upd_email: row.original.email,
                  });


                  document.getElementById(
                    "upd_name"
                  ).style.borderColor = null;
                  document.getElementById(
                    "upd_phone"
                  ).style.borderColor = null;
                  document.getElementById(
                    "upd_address"
                  ).style.borderColor = null;
                  document.getElementById(
                    "upd_email"
                  ).style.borderColor = null;
                  document.getElementById("upd_email_exits").style.display =
                    "none";
                }}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>
              <button
                id="delete"
                data-toggle="modal"
                title={"Delete"}
                // data-target="#section"
                className="btn btn-sm"
                onClick={() => {
                  this.props.delete_Contact(
                    row.original.id,
                    this.props.tbl_State
                  );
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          ),
        },
      ],
    };
  }

  componentDidMount() {
    $('[data-toggle="modal"]').hover(function () {
      $('[data-toggle="modal"]').tooltip();
    });
  }

  render() {
    return (
      <div>
        <ReactTable
          data={this.props.dataSet}
          pages={this.props.pageNo}
          loading={this.props.loading}
          defaultPageSize={10}
          className="-striped -highlight"
          manual
          onFetchData={(state, instance) => {
            this.props.fetch_Contacts(state);
          }}
          columns={this.state.columns}
          previousText={"Previous"}
          nextText={"Next"}
          loadingText={"Loading..."}
          noDataText={"Oops...!"}
          pageText={"Page"}
          ofText={"of"}
          rowsText={"rows"}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value
          }
        />


        <div id="updatePackage" className="modal fade" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content animate">
              <div className="modal-header">
                <h4 className="modal-title text-uppercase">
                  {"Update"}
                </h4>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                >
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div id="updData" style={{ paddingLeft: 30 }}>
                  <table>
                    <tbody>
                      <tr>
                        <td>{"id"}* :</td>
                        <td>
                          <input
                            id="upd_name"
                            value={this.state.upd_id}
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            disabled
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>{"Name"}* :</td>
                        <td>
                          <input
                            id="upd_name"
                            value={this.state.upd_name}
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => {
                              this.setState({ upd_name: e.target.value });
                            }}
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>{"Phone Number"}* :</td>
                        <td>
                          <input
                            id="upd_phone"
                            value={this.state.upd_phone}
                            type="number"
                            className="form-control"
                            autoComplete="off"
                            min={'700000000'} max={'799999999'}
                            onChange={(e) =>
                              this.setState({ upd_phone: e.target.value })
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>{"Address"}* :</td>
                        <td>
                          <input
                            id="upd_address"
                            value={this.state.upd_address}
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) =>
                              this.setState({ upd_address: e.target.value })
                            }
                          />
                        </td>
                      </tr>

                      <tr>
                        <td>{"Email"}* :</td>
                        <td>
                          <input
                            id="upd_email"
                            value={this.state.upd_email}
                            type="text"
                            className="form-control"
                            autoComplete="off"
                            onChange={(e) => {
                              this.setState({ upd_email: e.target.value });
                            }}
                          />
                        </td>
                        <td id='upd_email_exits' style={{ color: 'red', display: 'none' }}>{"Exist"}</td>
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
                      "upd_name"
                    ).style.borderColor = null;
                    document.getElementById(
                      "upd_phone"
                    ).style.borderColor = null;
                    document.getElementById(
                      "upd_address"
                    ).style.borderColor = null;
                    document.getElementById(
                      "upd_email"
                    ).style.borderColor = null;

                    if (this.state.upd_name.toString().trim() === "") {
                      document.getElementById(
                        "upd_name"
                      ).style.borderColor = "red";
                      valid = 0;
                    }
                    if ((parseInt(this.state.upd_phone) < 700000000) || (parseInt(this.state.upd_phone) >= 800000000)) {
                      document.getElementById('upd_phone').style.borderColor = 'red'
                      valid = 0;
                    }
                    if (this.state.upd_address.toString().trim() === "") {
                      document.getElementById(
                        "upd_address"
                      ).style.borderColor = "red";
                      valid = 0;
                    }
                    if ((this.state.upd_email).toString().trim() === ''
                      || this.state.upd_email.search("@") === -1
                      || this.state.upd_email.split("@")[1].length < 5) {
                      document.getElementById('upd_email').style.borderColor = 'red'
                      valid = 0;
                    }

                    if (valid === 1) {
                      this.props.update_Contact(
                        this.state.upd_id,
                        this.state.upd_name.toString().trim(),
                        this.state.upd_phone,
                        this.state.upd_address,
                        this.state.upd_email.toString().trim(),
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
    dataSet: state.r_Contact.contact_data,
    pageNo: state.r_Contact.pageNo,
    loading: state.r_Contact.loading,
    tbl_State: state.r_Contact.state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetch_Contacts: (state) => {
      dispatch(actionCreator.fetch_Contacts(state));
    },
    delete_Contact: (id, state) => {
      dispatch(actionCreator.delete_Contact(id, state));
    },
    update_Contact: (id, name, phone, address, email, state) => {
      dispatch(actionCreator.update_Contact(id, name, phone, address, email, state));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact_Table);
