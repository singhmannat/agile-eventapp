import React from "react";
import * as firebase from "firebase";
import firebaseConfig from "../firebase/firebase.js";
import moment from "moment";
//import "react-dates/initialize";
import { SingleDatePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

export default class AddNewActivity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activityname: "",
      activitylocation: "",
      activitydate: moment(),
      calendarFocused: false,
      message: "",
    };
  }
  onActivityNameChange = (e) => {
    this.setState({ activityname: e.target.value });
  };
  onActivityLocationChange = (e) => {
    this.setState({ activitylocation: e.target.value });
  };
  onActivityDateChange = (date) => {
    this.setState({ activitydate: date });
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };
  onSubmit = (e) => {
    e.preventDefault();
    database.ref("activities").push({
      ActivityName: this.state.activityname,
      ActivityLocation: this.state.activitylocation,
      ActivityDate: this.state.activitydate.valueOf(),
    });
    this.setState({
      activityname: "",
      activitylocation: "",
      activitydate: moment(),
      message: "Event is added successfully..!!",
    });
    setTimeout(() => {
      this.setState({ message: "" });
    }, 3000);
  };

  render() {
    return (
      <div>
        {this.state.message && <p>{this.state.message}</p>}
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Add Activity"
            value={this.state.activityname}
            onChange={this.onActivityNameChange}
          />
          <input
            type="text"
            placeholder="Location"
            value={this.state.activitylocation}
            onChange={this.onActivityLocationChange}
          />
          <SingleDatePicker
            date={this.state.activitydate}
            onDateChange={this.onActivityDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
