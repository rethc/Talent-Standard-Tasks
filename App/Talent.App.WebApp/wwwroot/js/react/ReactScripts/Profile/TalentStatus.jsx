import React from "react";
import { Form, Radio } from "semantic-ui-react";
import { SingleInput } from "../Form/SingleInput.jsx";
import DatePicker from "react-datepicker";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);

    this.handleCheckBoxChange = this.handleCheckBoxChange.bind(this);
  }

  handleCheckBoxChange(e, { value }) {
    const data = { jobSeekingStatus: { status: value } };
    this.props.saveProfileData(data);
  }

  renderDate() {
    return (
      <div>
        <Form.Field>
          <label>Availability date</label>
        </Form.Field>
        <DatePicker dateFormat="DD/MM/YYYY" name="availability" />
      </div>
    );
  }

  render() {
    let selectedStatus = this.props.status ? this.props.status.status : "";
    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
            <Form>
              <Form.Field>
                <label>Current Status</label>
              </Form.Field>
              <Form.Field>
                <Radio
                  name="checkboxRadioGroup"
                  label="Actively looking for a job"
                  value="Actively looking for a job"
                  checked={selectedStatus === "Actively looking for a job"}
                  onChange={this.handleCheckBoxChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  name="checkboxRadioGroup"
                  label="Not looking for a job at the moment"
                  value="Not looking for a job at the moment"
                  checked={
                    selectedStatus === "Not looking for a job at the moment"
                  }
                  onChange={this.handleCheckBoxChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  name="checkboxRadioGroup"
                  label="Currently employed but open to offers"
                  value="Currently employed but open to offers"
                  checked={
                    selectedStatus === "Currently employed but open to offers"
                  }
                  onChange={this.handleCheckBoxChange}
                />
              </Form.Field>
              <Form.Field>
                <Radio
                  name="checkboxRadioGroup"
                  label="Will be available on later date"
                  value="Will be available on later date"
                  checked={selectedStatus === "Will be available on later date"}
                  onChange={this.handleCheckBoxChange}
                />
              </Form.Field>
            </Form>
          </div>
          <div className="sixteen wide column">
            {this.props.status.status === "Will be available on later date"
              ? this.renderDate()
              : ""}
          </div>
        </div>
      </div>
    );
  }
}
