import $ from "jquery";
const axios = require("axios");

export const fetch_Contacts = (state) => {
  return (dispatch) => {
    axios
      .post("/contacts/getContacts", {
        pages: state.pageSize,
        page: state.page,
        sort: state.sorted,
        filtered: state.filtered,
      })
      .then((res) => {
        if (res.status === 200) {
          dispatch(data_Async(res.data.rows));
          dispatch(pageNo_Async(res.data.pages));
          dispatch(loading_Async(false));
          dispatch(state_Async(state));
        }
      });
  };
};

export const data_Async = (data) => {
  return { type: "FETCH_Contact_data", data };
};

export const pageNo_Async = (pageNo) => {
  return { type: "FETCH_Contact_pageNo", pageNo };
};

export const loading_Async = (loading) => {
  return { type: "FETCH_Contact_loading", loading };
};

export const state_Async = (state) => {
  return { type: "FETCH_Contact_state", state };
};

export const add_Contact = (
  name, phone, address, email, state
) => {
  return (dispatch) => {
    axios
      .post("/contacts/addContact", {
        name, phone, address, email
      })
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(fetch_Contacts(state));
          $("#addContact").modal("toggle");
        }
        else if (!res.data) {
          document.getElementById("add_email_exits").style.display =
            "block";
          document.getElementById('add_email').style.borderColor = 'red';
        }
      })
      .catch((err) => {
        $(document).ready(function () {
          $('#errorToast').toast('show')
        })
        document.getElementById('toastHeader').style.backgroundColor = "#f8d7da"
        document.getElementById('validMsg').style.color = '#975057'
        document.getElementById('errVal').innerHTML = err?.response?.data
        document.getElementById('validMsg').innerHTML = `INSERT FAILD...!`
      });
  };
};

export const update_Contact = (
  id,
  name, phone, address, email, state
) => {
  return (dispatch) => {
    axios
      .post("/contacts/update_Package", {
        id, name, phone, address, email, state
      })
      .then((res) => {
        if (res.status === 200 && res.data) {
          dispatch(fetch_Contacts(state));
          $("#updatePackage").modal("toggle");
        } else if (!res.data) {
          document.getElementById("upd_email_exits").style.display =
            "block";
          document.getElementById('upd_email').style.borderColor = 'red';
        }
      })
      .catch((err) => {
        $(document).ready(function () {
          $('#errorToast').toast('show')
        })
        document.getElementById('toastHeader').style.backgroundColor = "#f8d7da"
        document.getElementById('validMsg').style.color = '#975057'
        document.getElementById('errVal').innerHTML = err?.response?.data
        document.getElementById('validMsg').innerHTML = `UPDATE FAILD...!`
      });
  };
};

export const delete_Contact = (id, state) => {
  return (dispatch) => {
    axios.delete(`/contacts/deleteContact?id=${id}`).then((res) => {
      if (res.status === 200) {
        dispatch(fetch_Contacts(state));
      }
    });
  };
};
