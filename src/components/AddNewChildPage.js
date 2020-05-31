import React from "react";
import ParentNavHeader from "./ParentNavHeader";
import MyChildList from "./MyChildList";
import { firebase } from "../firebase/firebase.js";

const DEFAULT_STATE = {
  childfname: "",
  childlname: "",
  guardianfname: "",
  guardianlname: "",
  rel: "REL1",
  gemail: "",
  cgender: "Male",
  cdob: "",
  gcontactno: "",
  address: "",
  emercontactfname: "",
  emercontactlname: "",
  emercontactno: "",
  message: "",
};

const database = firebase.database();

export default class AddNewChildPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      ...DEFAULT_STATE,
      mychildren: [],
    };
  }

  componentDidMount() {
    const user = firebase.auth().currentUser;

    database
      .ref("parentchild" + "/" + user.displayName)
      .on("value", (snapshot) => {
        const mychildlist = [];
        snapshot.forEach((childSnapshot) => {
          mychildlist.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
          });
        });
        this.setState({
          mychildren: mychildlist,
        });
      });
  }

  onChildFNameChange = (e) => {
    this.setState({ childfname: e.target.value });
  };
  onChildLNameChange = (e) => {
    this.setState({ childlname: e.target.value });
  };
  onGuardianFNameChange = (e) => {
    this.setState({ guardianfname: e.target.value });
  };
  onGuardianLNameChange = (e) => {
    this.setState({ guardianlname: e.target.value });
  };
  onRelChange = (e) => {
    this.setState({ rel: e.target.value });
  };
  onEmailChange = (e) => {
    this.setState({ gemail: e.target.value });
  };
  onGenderChange = (e) => {
    this.setState({ cgender: e.target.value });
  };
  onDOBChange = (e) => {
    this.setState({ cdob: e.target.value });
  };
  onGContactNoChange = (e) => {
    this.setState({ gcontactno: e.target.value });
  };
  onAddressChange = (e) => {
    this.setState({ address: e.target.value });
  };

  onEmerConFNameChange = (e) => {
    this.setState({ emercontactfname: e.target.value });
  };
  onEmerConLNameChange = (e) => {
    this.setState({ emercontactlname: e.target.value });
  };
  onEmerConNoChange = (e) => {
    this.setState({ emercontactno: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const user = firebase.auth().currentUser;

    database
      .ref("parentchild" + "/" + user.displayName)
      .push({
        ChildName: this.state.childfname + " " + this.state.childlname,
        GuardianName: this.state.guardianfname + " " + this.state.guardianlname,
        Relationship: this.state.rel,
        GEmail: this.state.gemail,
        ChildGender: this.state.cgender,
        ChildDOB: this.state.cdob,
        GuardianContNo: this.state.gcontactno,
        Address: this.state.address,
        EmerContactName:
          this.state.emercontactfname + " " + this.state.emercontactlname,
        EmerContactNo: this.state.emercontactno,
      })
      .then(() => {
        this.setState({
          ...DEFAULT_STATE,
          message: "Child details have been added successfully..!!",
        });
      });
    setTimeout(() => {
      this.setState({ message: "" });
    }, 5000);
  };

  reset = () => {
    this.setState({
      ...DEFAULT_STATE,
    });
  };

  render() {
    return (
      <div>
        <ParentNavHeader />
        <br></br>
        {this.state.message && (
          <p className="submit-message">{this.state.message}</p>
        )}
        <div className="formfield">
          <form onSubmit={this.onSubmit}>
            <h3 className="headertag">Add New Child Details</h3>
            <label>
              Child Name*:
              <input
                type="text"
                placeholder="First Name"
                value={this.state.childfname}
                onChange={this.onChildFNameChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={this.state.childlname}
                onChange={this.onChildLNameChange}
                required
              />
            </label>
            <br></br>
            <label>
              Parent/Guardian*:
              <input
                type="text"
                placeholder="First Name"
                value={this.state.guardianfname}
                onChange={this.onGuardianFNameChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={this.state.guardianlname}
                onChange={this.onGuardianLNameChange}
                required
              />
            </label>

            <br></br>
            <label>
              Relationship to Child:
              <select onChange={this.onRelChange} value={this.state.rel}>
                <option value="REL1">Father</option>
                <option value="REL2">Mother</option>
                <option value="REL3">Grand Father</option>
                <option value="REL4">Grand Mother</option>
                <option value="REL5">Uncle</option>
                <option value="REL6">Aunt</option>
                <option value="REL7">Brother</option>
                <option value="REL8">Sister</option>
              </select>
            </label>
            <br></br>
            <label>
              Email Address*:
              <input
                type="text"
                placeholder="me@example.com"
                onChange={this.onEmailChange}
                value={this.state.gemail}
                required
              />
            </label>
            <br></br>
            <label>
              Gender:
              <select onChange={this.onGenderChange} value={this.state.cgender}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </label>
            <br></br>
            <label>Date of Birth*:</label>
            <input
              type="date"
              onChange={this.onDOBChange}
              value={this.state.cdob}
              required
            ></input>
            <br></br>
            <label>Contact Number*:</label>
            <input
              type="number"
              placeholder="Phone Number"
              onChange={this.onGContactNoChange}
              value={this.state.gcontactno}
              required
            ></input>
            <br></br>
            <label>
              Address*:
              <textarea
                placeholder="Enter Address"
                onChange={this.onAddressChange}
                value={this.state.address}
                required
              />
            </label>
            <br></br>
            <h3 className="headertag">Emergency Contact Person</h3>
            <label>
              Contact Name:
              <input
                type="text"
                placeholder="First Name"
                onChange={this.onEmerConFNameChange}
                value={this.state.emercontactfname}
              />
              <input
                type="text"
                placeholder="Last Name"
                onChange={this.onEmerConLNameChange}
                value={this.state.emercontactlname}
              />
            </label>
            <br></br>
            <label>Phone Number:</label>
            <input
              type="number"
              placeholder="Phone Number"
              onChange={this.onEmerConNoChange}
              value={this.state.emercontactno}
            ></input>
            <br></br>
            <div className="ib-submit-reset">
              <button type="submit" className="button">
                Submit
              </button>
            </div>
            <div className="ib-submit-reset">
              <button
                type="reset"
                className="button"
                onClick={this.reset.bind(this)}
              >
                Reset
              </button>
            </div>
          </form>
        </div>
        <div className="formfieldmychild">
          <h2 className="headertagmychild">List of My Child</h2>
          {this.state.mychildren.map((child) => {
            return <MyChildList key={child.id} child={child} />;
          })}
        </div>
      </div>
    );
  }
}
