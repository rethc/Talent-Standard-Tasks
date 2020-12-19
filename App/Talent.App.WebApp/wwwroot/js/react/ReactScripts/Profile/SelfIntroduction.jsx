/* Self introduction section */
import React, { Component } from "react";
import Cookies from "js-cookie";
import { ChildSingleInput, ChildTextareaInput } from "../Form/SingleInput.jsx";

export default class SelfIntroduction extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className="four wide column">
          <h3>Description</h3>
        </div>
        <div className="twelve wide column">
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
      </React.Fragment>
    );
  }
}
