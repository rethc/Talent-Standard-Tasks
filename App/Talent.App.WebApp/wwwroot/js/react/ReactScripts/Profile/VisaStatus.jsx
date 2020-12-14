import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import DatePicker from "react-datepicker";
import Moment from "moment";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);

    this.saveVisaType = this.saveVisaType.bind(this);
  }

  saveVisaType(event) {
    const data = {};
    data[event.target.name] = event.target.value;
    this.props.saveProfileData(data);
  }

  renderExpiryDate() {
    if (
      this.props.visaStatus == "Work Visa" ||
      this.props.visaStatus == "Student Visa"
    ) {
      return (
        <div className="six wide column">
          <label>Visa expiry date</label>
          <DatePicker
            dateFormat="DD/MM/YYYY"
            name="expiry"
            selected={
              Moment(this.props.visaExpiryDate)
                ? Moment(this.props.visaExpiryDate)
                : Moment()
            }
            onChange={this.handleChangeExpiryDate}
          />
          <div className="four wide column">
            <button
              type="button"
              className="ui teal button"
              onClick={this.saveContact}
            >
              Save
            </button>
          </div>
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
            className="ui right labeled dropdown"
            value={this.props.visaStatus ? this.props.visaStatus : ""}
            onChange={this.saveVisaType}
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
