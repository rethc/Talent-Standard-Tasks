/* Self introduction section */
import React, { Component } from "react";
import Cookies from "js-cookie";

export default class SelfIntroduction extends React.Component {
  constructor(props) {
    super(props);

    this.updateDescription = this.updateDescription.bind(this);
    this.saveDescription = this.saveDescription.bind(this);
  }

  updateDescription(event) {
    const data = {};
    data[event.target.name] = event.target.value;
    this.props.updateWithoutSave(data);
  }

  saveDescription() {
    const data = {
      summary: this.props.summary,
      description: this.props.description,
    };

    if (data.description == "" || data.summary == "") {
      TalentUtil.notification.show(
        "Please enter a summary and description",
        "error",
        null,
        null
      );
    } else if (data.description != "" && data.description.length > 150) {
      this.props.updateProfileData(data);
    } else {
      TalentUtil.notification.show(
        "Description too short",
        "error",
        null,
        null
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="four wide column">
          <h3>Description</h3>
        </div>
        <div className="twelve wide column">
          <div className="field">
            <input
              type="text"
              value={this.props.summary ? this.props.summary : ""}
              label="Summary"
              name="summary"
              onChange={this.updateDescription}
              maxLength={150}
              placeholder="Please provide a short summary about yourself"
            />
          </div>
          <p>Summary must be no more than 150 characters.</p>
          <div className="field">
            <textarea
              maxLength={600}
              name="description"
              placeholder="Please tell us about any hobbies, additional expertise, or anything else you’d like to add."
              value={this.props.description ? this.props.description : ""}
              onChange={this.updateDescription}
            ></textarea>
          </div>
          <p>Description must be between 150-600 characters.</p>
          <button
            type="button"
            className="ui right floated teal button"
            onClick={this.saveDescription}
          >
            Save
          </button>
        </div>
      </React.Fragment>
    );
  }
}
