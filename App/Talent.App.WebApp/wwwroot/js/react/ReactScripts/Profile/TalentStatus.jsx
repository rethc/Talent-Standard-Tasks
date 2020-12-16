import React from "react";
import { Form, Checkbox } from "semantic-ui-react";
import { SingleInput } from "../Form/SingleInput.jsx";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  renderStatus() {
    return (
      <div>
        <Form.Field>
          <label>Current Status</label>
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Actively looking for a job"
            value="1"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Not looking for a job at the moment"
            value="2"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Currently employed but open to offers"
            value="3"
            onChange={this.handleChange}
          />
        </Form.Field>
        <Form.Field>
          <Checkbox
            radio
            label="Will be available on later date"
            value="4"
            onChange={this.handleChange}
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
