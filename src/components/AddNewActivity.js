import React from "react";
import { firebase } from "../firebase/firebase.js";
import moment from "moment";
import { SingleDatePicker } from "react-dates";
import TimePicker from "react-time-picker";
import "react-dates/lib/css/_datepicker.css";

const DEFAULT_STATE = {
  activityname: "",
  activitylocation: "",
  activitydate: moment(),
  activityaddress: "",
  activitydescription: "",
  activitytime: "10:00",
  agegroup: "AG01",
  calendarFocused: false,
  message: "",
};

const database = firebase.database();
export default class AddNewActivity extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_STATE,
      user: {},
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log("Host Login Successful.");
        this.setState({ user: user });
      } else {
        console.log("Host Log out successful.");
      }
    });
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
  onActivityAddressChange = (e) => {
    this.setState({ activityaddress: e.target.value });
  };
  onActivityDescriptionChange = (e) => {
    this.setState({ activitydescription: e.target.value });
  };
  onTimeChange = (time) => {
    this.setState({ activitytime: time });
  };
  onSelectAgeGroup = (e) => {
    this.setState({ agegroup: e.target.value });
  };
  reset = () => {
    this.setState({
      ...DEFAULT_STATE,
    });
  };
  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    database
      .ref("activities")
      .push({
        ActivityName: this.state.activityname,
        ActivityLocation: this.state.activitylocation,
        ActivityAddress: this.state.activityaddress,
        ActivityDescription: this.state.activitydescription,
        ActivityDate: moment(this.state.activitydate).format("MMM Do YYYY"),
        ActivityTime: this.state.activitytime,
        ActivityUserName: this.state.user.displayName,
        AgeGroup: this.state.agegroup,
      })
      .then(() => {
        this.setState({
          ...DEFAULT_STATE,
          message: "Event is added successfully..!!",
        });
      });
    setTimeout(() => {
      this.setState({ message: "" });
    }, 5000);
  };

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
            Welcome {this.state.user.displayName}, You are logged in as Host.
            Please add your event here.
          </p>
        )}
        <br></br>
        <button className="logoutbutton" onClick={this.handleLogOut.bind(this)}>
          Sign Out
        </button>
        <br></br>
        {this.state.message && <p>{this.state.message}</p>}
        <br></br>
        <form onSubmit={this.onSubmit}>
          <div className="ib-name-location">
            <label className="label" for="activityname">
              Activity Name:
            </label>
            <br></br>
            <input
              className="actname"
              name="activityname"
              type="text"
              placeholder="Activity Name"
              value={this.state.activityname}
              onChange={this.onActivityNameChange}
              required
            />
          </div>
          <div className="ib-name-location">
            <label className="label" for="activitylocation">
              Activity Location:
            </label>
            <br></br>
            <input
              className="location"
              name="activitylocation"
              type="text"
              placeholder="Activity Location"
              value={this.state.activitylocation}
              onChange={this.onActivityLocationChange}
              required
            />
          </div>
          <br></br>
          <br></br>
          <div className="ib-dt-tm-age">
            <label className="label" for="activitydate">
              Activity Date:
            </label>
            <br></br>
            <div className="datepicker">
              <SingleDatePicker
                id="activitydate"
                date={this.state.activitydate}
                onDateChange={this.onActivityDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
              />
            </div>
          </div>
          <div className="ib-dt-tm-age">
            <label className="label" for="activitytime">
              Activity Time:
            </label>
            <br></br>
            <TimePicker
              id="activitytime"
              onChange={this.onTimeChange}
              value={this.state.activitytime}
              required
            />
          </div>
          <div className="ib-dt-tm-age">
            <label className="label" for="Age">
              Age Group:
            </label>
            <br></br>
            <select
              className="selectoption"
              id="Age"
              onChange={this.onSelectAgeGroup}
              value={this.state.agegroup}
            >
              <option value="AG01">0-5</option>
              <option value="AG02">5-10</option>
              <option value="AG03">10-15</option>
              <option value="AG04">15-20</option>
              <option value="AG05">20-25</option>
              <option value="AG06">25-30</option>
            </select>
          </div>
          <br></br>
          <br></br>
          <div className="ib-desc-address">
            <label className="label" for="activitydescription">
              Event Description:
            </label>
            <br></br>
            <textarea
              className="activitydescription"
              id="activitydescription"
              placeholder="Event Description"
              rows="4"
              cols="25"
              value={this.state.activitydescription}
              onChange={this.onActivityDescriptionChange}
              required
            />
          </div>
          <div className="ib-desc-address">
            <label className="label" for="activityaddress">
              Venue:
            </label>
            <br></br>
            <textarea
              className="activityaddress"
              id="activityaddress"
              placeholder="Address"
              rows="4"
              cols="25"
              value={this.state.activityaddress}
              onChange={this.onActivityAddressChange}
              required
            />
          </div>
          <br></br>
          <br></br>
          <div className="ib-submit-reset">
            <button className="button">Submit</button>
          </div>
          <div className="ib-submit-reset">
            <button className="button" onClick={this.reset.bind(this)}>
              Reset
            </button>
          </div>
        </form>
      </div>
    );
  }
}
