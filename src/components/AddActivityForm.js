import React from "react";

export default class AddActivityForm extends React.Component {
  constructor(props) {
    super(props);
    this.onActivityNameChange = this.onActivityNameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      activityname: ""
    };
  }
  onActivityNameChange = e => {
    this.setState({ activityname: e.target.value });
  };
  onSubmit = e => {
    e.preventDefault();
    console.log("The activity added by you: " + this.state.activityname);
    this.props.onSubmit({
      activityname: this.state.activityname
    });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            placeholder="Add activity here"
            value={this.state.activityname}
            onChange={this.onActivityNameChange}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
