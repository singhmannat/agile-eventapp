import React from "react";
import { connect } from "react-redux";

const ActivityDashboardPage = props => {
  return (
    <div>
      <p>All the activities are showing here...</p>
      {props.activity.map(activityitem => {
        return <p>{activityitem.activityname}</p>;
      })}
    </div>
  );
};
const mapStateToProps = state => {
  return {
    activity: this.state
  };
};

export default connect(mapStateToProps)(ActivityDashboardPage);
