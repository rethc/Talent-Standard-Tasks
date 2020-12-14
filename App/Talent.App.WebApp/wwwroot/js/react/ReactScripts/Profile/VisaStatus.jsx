﻿import React from "react";
import { SingleInput } from "../Form/SingleInput.jsx";
import DatePicker from "react-datepicker";
import Moment from "moment";

export default class VisaStatus extends React.Component {
  constructor(props) {
    super(props);
  }

  renderExpiryDate() {
    if (
      this.props.visaStatus == "Work Visa" ||
      this.props.visaStatus == "Student Visa"
    ) {
      return (
        <div>
          <label>Visa expiry date</label>
          <br />
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
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div className="row">
        <div className="six wide column">
          <label>Visa type</label>
          <select
            className="ui right labeled dropdown"
            value={this.props.visaStatus ? this.props.visaStatus : ""}
            onChange={this.updateContact}
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
