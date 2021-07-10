const initialState = {
  contact_data: [{
    name: "",
    phone: 0,
    address: "",
    email: "",
  }],
  pageNo: 0,
  loading: false,
  state: {}
};

export default (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case "FETCH_Contact_data":
      newState.contact_data = action.data;
      break;

    case "FETCH_Contact_pageNo":
      newState.pageNo = action.pageNo;
      break;

    case "FETCH_Contact_loading":
      newState.loading = action.loading;
      break;

    case "FETCH_Contact_state":
      newState.state = action.state;
      break;

    default:
      break;
  }
  return newState;
};
