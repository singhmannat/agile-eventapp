import React from "react";

export default class ActivityItems extends React.Component {
  render() {
    const temp = this.props.activity;
    return (
      <div>
        <h3>{temp.ActivityName}</h3>
        <p>
          At {temp.ActivityLocation} scheduled on {temp.ActivityDate}
          <br></br>
          Hosted by:{temp.ActivityUserName}
        </p>
      </div>
    );
  }
}
