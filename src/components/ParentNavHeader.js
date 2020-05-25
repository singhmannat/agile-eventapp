import React from "react";
import { Link } from "react-router-dom";

export default class ParentNavHeader extends React.Component {
  render() {
    return (
      <div>
        <nav className="navheader">
          <ul>
            <li>
              <Link to="/dashboard">List of Events</Link>
            </li>
            <li>
              <Link to="/addnewchild">Add a new Child</Link>
            </li>
            <li>
              <Link to="/mua">My Upcoming Activities</Link>
            </li>
            <li>
              <Link to="/helppage">Help Desk</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}
