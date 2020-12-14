import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import DatePicker from "react-datepicker";
import Moment from "moment";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);

    this.handleVisaType = this.handleVisaType.bind(this);
    this.handleVisaExpiryDate = this.handleVisaExpiryDate.bind(this);
    this.saveVisa = this.saveVisa.bind(this);
  }

  saveVisa() {
    const data = {
      visaStatus: this.props.visaStatus,
      visaExpiryDate: this.props.visaExpiryDate,
    };
    this.props.saveProfileData(data);
  }

  handleVisaType(event) {
    const data = {};
    data[event.target.name] = event.target.value;
    this.props.saveProfileData(data);
  }

  handleVisaExpiryDate(date) {
    const data = {
      visaExpiryDate: date,
    };
    this.props.updateProfileData(data);
  }

  renderExpiryDate() {
    if (
      this.props.visaStatus == "Work Visa" ||
      this.props.visaStatus == "Student Visa"
    ) {
      return (
        <div>
          <h5>Visa expiry date</h5>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            name="visaExpiryDate"
            selected={
              this.props.visaExpiryDate
                ? Moment(this.props.visaExpiryDate)
                : Moment()
            }
            onChange={this.handleVisaExpiryDate}
          />

          <button
            type="button"
            className="ui teal button"
            onClick={this.saveVisa}
          >
            Save
          </button>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="row">
        <div className="six wide column">
          <h5>Visa type</h5>
          <select
            className="six wide column"
            value={this.props.visaStatus ? this.props.visaStatus : ""}
            onChange={this.handleVisaType}
            name="visaStatus"
          >
            <option value="" disabled hidden>
              Visa type
            </option>
            <option value="Citizen">Citizen</option>
            <option value="Permanent Resident">Permanent Resident</option>
            <option value="Work Visa">Work Visa</option>
            <option value="Student Visa">Student Visa</option>
          </select>
        </div>
        <div className="six wide column">{this.renderExpiryDate()}</div>
      </div>
    );
  }
}
