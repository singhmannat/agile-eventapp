import React from "react";

export default class MyChildList extends React.Component {
  render() {
    const temp = this.props.child;
    return (
      <div>
        <h3 className="mychildlistH3Tag">{temp.ChildName}</h3>
        <p>
          <strong>Gender</strong>:{temp.ChildGender} ,{" "}
          <strong>Date of Birth</strong>: {temp.ChildDOB}
        </p>
      </div>
    );
  }
}
