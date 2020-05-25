import React from "react";
import ParentNavHeader from "./ParentNavHeader";

export default class HelpPage extends React.Component {
  render() {
    return (
      <div>
        <ParentNavHeader />
        <h3 className="message-bar">
          Please refer our help desk below for any concerns
        </h3>
        <div>
          <h3>Phone Number:</h3>
          <p>+64-0221231234</p>
        </div>
        <div>
          <h3>Email:</h3>
          <p>brogrammers@eventapp.ac.nz</p>
        </div>
        <div>
          <h3>Location:</h3>
          <p>
            Unitec Institute of Technology<br></br> 139 Carrington Road, Mt
            Albert Campus<br></br> Auckland, New Zealand
          </p>
        </div>
        <div>
          <h3>Available Hours:</h3>
          <p>
            Mon-Fri 9AM-11AM<br></br> Weekend Closed
          </p>
        </div>
      </div>
    );
  }
}
