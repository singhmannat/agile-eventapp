import React from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

export default class ActivityItems extends React.Component {
  render() {
    const temp = this.props.activity;
    return (
      <div>
        <h3>
          {temp.ActivityName}{" "}
          <Tooltip title="Enrol Child" aria-label="enrol">
            <Fab color="primary">
              <AddIcon />
            </Fab>
          </Tooltip>
        </h3>
        <p>
          At {temp.ActivityLocation} scheduled on {temp.ActivityDate}
          <br></br>
          Hosted by:<strong>{temp.ActivityUserName}</strong>
        </p>
      </div>
    );
  }
}
