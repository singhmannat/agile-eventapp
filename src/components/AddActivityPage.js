import React from "react";
import { connect } from "react-redux";
import { addActivityAction } from "../actions/ActivityAction.js";
import AddActivityForm from "./AddActivityForm.js";

const AddActivityPage = props => (
  <div>
    <p>Add Activities below</p>
    <AddActivityForm
      onSubmit={activity => {
        props.dispatch(addActivityAction(activity));
        props.history.push("/dashboard");
      }}
    />
  </div>
);

export default connect()(AddActivityPage);
