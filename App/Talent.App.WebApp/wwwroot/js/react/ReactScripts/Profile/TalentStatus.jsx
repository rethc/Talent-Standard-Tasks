﻿import React from "react";
import { Form, Radio } from "semantic-ui-react";
import { SingleInput } from "../Form/SingleInput.jsx";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleCheckBoxChange(event) {
    const data = { jobSeekingStatus: { status: event.target.value } };
    this.props.saveProfileData(data);
  }

  renderStatus() {
    let selectedStatus = "";
    if (this.props.status != null) selectedStatus = this.props.status.status;

    return (
      <div>
        <Form.Field>
          <label>Current Status</label>
        </Form.Field>
        <Form.Field>
          <Radio
            name="statusRadio"
            label="Actively looking for a job"
            value="Actively looking for a job"
            checked={selectedStatus === "Actively looking for a job"}
            onChange={this.handleCheckBoxChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            name="statusRadio"
            label="Not looking for a job at the moment"
            value="Not looking for a job at the moment"
            checked={selectedStatus === "Not looking for a job at the moment"}
            onChange={this.handleCheckBoxChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            name="statusRadio"
            label="Currently employed but open to offers"
            value="Currently employed but open to offers"
            checked={selectedStatus === "Currently employed but open to offers"}
            onChange={this.handleCheckBoxChange}
          />
        </Form.Field>
        <Form.Field>
          <Radio
            name="statusRadio"
            label="Will be available on later date"
            value="Will be available on later date"
            checked={selectedStatus === "Will be available on later date"}
            onChange={this.handleCheckBoxChange}
          />
        </Form.Field>
      </div>
    );
  }

  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">{this.renderStatus()}</div>
        </div>
      </div>
    );
  }
}
