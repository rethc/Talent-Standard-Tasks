import React from "react";
import { Form, Radio } from "semantic-ui-react";
import { SingleInput } from "../Form/SingleInput.jsx";
import DatePicker from "react-datepicker";
import Moment from "moment";

export default class TalentStatus extends React.Component {
  constructor(props) {
    super(props);

    this.handleRadioStatusChange = this.handleRadioStatusChange.bind(this);
    this.handleAvailableDateChange = this.handleAvailableDateChange.bind(this);
  }

  handleRadioStatusChange(e, { value }) {
    const data = { jobSeekingStatus: { status: value } };
    this.props.saveProfileData(data);
  }

  handleAvailableDateChange(date) {
    if (date <= Moment()) {
      TalentUtil.notification.show(
        "Please select a future date",
        "error",
        null,
        null
      );
    } else {
      const data = {
        jobSeekingStatus: {
          status: this.props.status.status,
          availableDate: date,
        },
      };
      this.props.saveProfileData(data);
    }
  }

  renderDate() {
    return (
      <div>
        <br />
        <Form.Field>
          <label>Available date</label>
        </Form.Field>
        <DatePicker
          dateFormat="DD/MM/YYYY"
          name="availableDate"
          onChange={this.handleAvailableDateChange}
          selected={
            this.props.status.availableDate
              ? Moment(this.props.status.availableDate)
              : Moment()
          }
        />
      </div>
    );
  }

  render() {
    let selectedStatus = this.props.status ? this.props.status.status : "";
    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
            <Form.Field>
              <label>Current Status</label>
            </Form.Field>
            <Form.Field>
              <Radio
                name="checkboxRadioGroup"
                label="Actively looking for a job"
                value="Actively looking for a job"
                checked={selectedStatus === "Actively looking for a job"}
                onChange={this.handleRadioStatusChange}
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
                onChange={this.handleRadioStatusChange}
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
                onChange={this.handleRadioStatusChange}
              />
            </Form.Field>
            <Form.Field>
              <Radio
                name="checkboxRadioGroup"
                label="Will be available on later date"
                value="Will be available on later date"
                checked={selectedStatus === "Will be available on later date"}
                onChange={this.handleRadioStatusChange}
              />
            </Form.Field>
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
