import { combineReducers } from "redux";

import reducer_Contacts from "./basicData/reducer_Contacts";

export const rootReducer = combineReducers({
  r_Contact: reducer_Contacts,
});
