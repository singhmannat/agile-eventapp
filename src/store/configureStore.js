import { createStore } from "redux";
import ActivityReducer from "../reducers/ActivityReducer.js";

export default () => {
  return createStore(ActivityReducer);
};
