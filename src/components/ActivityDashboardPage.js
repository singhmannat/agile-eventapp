import React from "react";
import database, { firebase } from "../firebase/firebase";
import ActivityItems from "./ActivityItems";
import ParentNavHeader from "./ParentNavHeader";
import moment from "moment";

export default class ActivityDashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.filterAgeGroup = this.filterAgeGroup.bind(this);

    this.state = {
      user: {},
      activities: [],
      filtersearch: "",
      filterloc: "",
    };
  }

  filterAgeGroup = (e) => {
    this.setState({ filtersearch: e.target.value });
  };
  filterByLoc = (e) => {
    this.setState({ filterloc: e.target.value });
  };

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
        <ParentNavHeader />
        {this.state.user.displayName && (
          <h3 className="message-bar">
            Welcome <u>{this.state.user.displayName}</u> , You are logged in as
            Parent. Please enrol for the event below.
          </h3>
        )}
        <button className="logoutbutton" onClick={this.handleLogOut.bind(this)}>
          Logout
        </button>

        <label className="label" for="Age">
          Filter by Age:
        </label>
        <select
          className="selectoption"
          id="Age"
          onChange={this.filterAgeGroup}
        >
          <option value="">None</option>
          <option value="AG01">0-5</option>
          <option value="AG02">5-10</option>
          <option value="AG03">10-15</option>
          <option value="AG04">15-20</option>
          <option value="AG05">20-25</option>
          <option value="AG06">25-30</option>
        </select>
        <label className="label">Search by Location:</label>
        <input type="text" onChange={this.filterByLoc} />
        {this.state.activities.map((activity) => {
          if (
            this.state.filtersearch === "" &&
            activity.ActivityLocation.toLowerCase().includes(
              this.state.filterloc.toLowerCase()
            )
          ) {
            return <ActivityItems key={activity.id} activity={activity} />;
          } else if (
            activity.AgeGroup === this.state.filtersearch &&
            activity.ActivityLocation.toLowerCase().includes(
              this.state.filterloc.toLowerCase()
            )
          ) {
            return <ActivityItems key={activity.id} activity={activity} />;
          }
        })}
      </div>
    );
  }
}
