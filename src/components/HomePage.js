import React from "react";
import { firebase, googleAuthProvider } from "../firebase/firebase";

export default class HomePage extends React.Component {
  hostLogin() {
    googleAuthProvider.setCustomParameters({
      prompt: "select_account",
    });
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        console.log("Host Login success");
        this.props.history.push("/add");
      });
  }

  parentLogin() {
    googleAuthProvider.setCustomParameters({
      prompt: "select_account",
    });
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then((result) => {
        console.log("Parent Login success");
        this.props.history.push("/dashboard");
      });
  }
  render() {
    return (
      <div>
        <h1>Brogrammers</h1>
        <p>Hello There.....</p>
        <p>Thanks,</p>
        <p>Balwinder, Gurpreet and Mannat</p>
        <button className="homepagebutton" onClick={this.hostLogin.bind(this)}>
          Host Login
        </button>
        <button
          className="homepagebutton"
          onClick={this.parentLogin.bind(this)}
        >
          Parent Login
        </button>
      </div>
    );
  }
}
