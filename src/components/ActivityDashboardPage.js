import React from "react";
import database, { firebase } from "../firebase/firebase";
import ActivityItems from "./ActivityItems";

export default class ActivityDashboardPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      activities: [],
    };
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Parent Login Successful");
        this.setState({ user: user });
      } else {
        console.log("Parent Log out Successful");
      }
    });

    database.ref("activities").on("value", (snapshot) => {
      const firebaseActivities = [];
      snapshot.forEach((childSnapshot) => {
        firebaseActivities.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      this.setState({
        activities: firebaseActivities,
      });
      console.log(this.state.activities);
    });
  }

  handleLogOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.history.push("/");
      });
  };

  render() {
    return (
      <div>
        {this.state.user.displayName && (
          <p className="message-bar">
            Welcome {this.state.user.displayName}, You are logged in as Guest.
            Please enrol for the event below.
          </p>
        )}
        <button className="logoutbutton" onClick={this.handleLogOut.bind(this)}>
          Logout
        </button>
        {this.state.activities.map((activity) => {
          return <ActivityItems key={activity.id} activity={activity} />;
        })}
      </div>
    );
  }
}
