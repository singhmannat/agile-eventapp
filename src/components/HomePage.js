import React from "react";
import database, { firebase, googleAuthProvider } from "../firebase/firebase";
import ActivityItemsHome from "./ActivityItemsHome";
import moment from "moment";

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: [],
    };
  }
  componentDidMount() {
    database.ref("activities").on("value", (snapshot) => {
      const firebaseActivities = [];
      const currentdate = new moment().format("MM-DD-YYYY");
      snapshot.forEach((childSnapshot) => {
        if (currentdate < childSnapshot.val().ActivityDate) {
          firebaseActivities.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        }
      });
      this.setState({
        activities: firebaseActivities,
      });
    });
  }

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
        <p>Hello There, Welcome to our Event Application</p>
        <p>
          Thanks,<br></br>Balwinder, Gurpreet and Mannat
        </p>

        <button className="homepagebutton" onClick={this.hostLogin.bind(this)}>
          Host Login
        </button>
        <button
          className="homepagebutton"
          onClick={this.parentLogin.bind(this)}
        >
          Parent Login
        </button>
        {this.state.activities.map((activity) => {
          return <ActivityItemsHome key={activity.id} activity={activity} />;
        })}
      </div>
    );
  }
}
