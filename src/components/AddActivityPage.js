import React from "react";
import { connect } from "react-redux";
import { addActivityAction } from "../actions/ActivityAction.js";
import AddActivityForm from "./AddActivityForm.js";

const AddActivityPage = (props) => (
  <div>
    <p>Add Activities below</p>
    <AddActivityForm
      onSubmit={() => {
        props.dispatch(addActivityAction(props.activity));
        props.history.push("/");
      }}
    />
  </div>
);
const mapStateToProps = (state) => {
  return {
    activity: state,
  };
};
export default connect(mapStateToProps)(AddActivityPage);
