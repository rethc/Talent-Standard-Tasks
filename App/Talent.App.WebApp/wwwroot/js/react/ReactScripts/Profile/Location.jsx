﻿import React from "react";
import Cookies from "js-cookie";
import { default as Countries } from "../../../../util/jsonFiles/countries.json";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Form, Grid } from "semantic-ui-react";

export class Address extends React.Component {
  constructor(props) {
    super(props);

    const address = props.addressData
      ? Object.assign({}, props.addressData)
      : {
          number: "",
          street: "",
          suburb: "",
          postCode: "",
          city: "",
          country: "",
        };

    this.state = {
      showEditSection: false,
      newAddress: address,
      enableCity: address.country ? true : false,
    };

    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  openEdit() {
    const address = Object.assign({}, this.props.addressData);
    this.setState({
      showEditSection: true,
      newAddress: address,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newAddress);
    data[event.target.name] = event.target.value;
    this.setState({
      newAddress: data,
    });
  }

  saveContact() {
    const updatedAddress = { address: this.state.newAddress };
    const data = Object.assign({}, updatedAddress);
    this.props.saveProfileData(data);
    this.closeEdit();
  }

  handleDropdownChange(event) {
    var data = Object.assign({}, this.state.newAddress);
    //required
    const name = event.target.name;
    let value = event.target.value;
    const id = event.target.id;

    data[name] = value;

    if (name == "country") {
      data["city"] = "";
      if (value) {
        this.setState({
          newAddress: data,
          enableCity: true,
        });
      } else {
        this.setState({
          newAddress: data,
          enableCity: false,
        });
      }
    }

    this.setState({
      newAddress: data,
    });
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    const countryOptions = Object.keys(Countries).map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));
    let cityOptions = [];

    if (this.state.newAddress.country) {
      const cities = [
        ...new Set(Object(Countries[this.state.newAddress.country])),
      ];
      cityOptions = cities.map((x) => (
        <option key={x} value={x}>
          {x}
        </option>
      ));
    }

    return (
      <div className="ui grid">
        <div className="row">
          <div className="four wide column">
            <label>Number</label>
            <input
              type="text"
              name="number"
              value={
                this.state.newAddress.number ? this.state.newAddress.number : ""
              }
              placeholder="Number"
              maxLength={10}
              onChange={this.handleChange}
            />
          </div>
          <div className="eight wide column">
            <label>Street</label>
            <input
              type="text"
              name="street"
              value={
                this.state.newAddress.street ? this.state.newAddress.street : ""
              }
              placeholder="Street name"
              maxLength={80}
              onChange={this.handleChange}
            />
          </div>
          <div className="four wide column">
            <label>Suburb</label>
            <input
              type="text"
              name="suburb"
              value={
                this.state.newAddress.suburb ? this.state.newAddress.suburb : ""
              }
              placeholder="Suburb name"
              maxLength={20}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="six wide column">
            <label>Country</label>
            <select
              className="ui right labeled dropdown"
              placeholder="Country"
              value={
                this.state.newAddress.country
                  ? this.state.newAddress.country
                  : ""
              }
              onChange={this.handleDropdownChange}
              name="country"
            >
              <option value="">Select a country</option>
              {countryOptions}
            </select>
          </div>
          <div className="six wide column">
            <label>City</label>
            <select
              className="ui right labeled dropdown"
              placeholder="City"
              value={
                this.state.newAddress.city ? this.state.newAddress.city : ""
              }
              onChange={this.handleDropdownChange}
              name="city"
            >
              <option value="">
                {this.state.enableCity
                  ? "Select a city"
                  : "Select country first"}
              </option>
              {cityOptions}
            </select>
          </div>
          <div className="four wide column">
            <label>Postcode</label>
            <input
              type="text"
              name="postCode"
              value={
                this.state.newAddress.postCode
                  ? this.state.newAddress.postCode
                  : ""
              }
              placeholder="Post Code"
              maxLength={20}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="six wide column">
            <button
              type="button"
              className="ui teal button"
              onClick={this.saveContact}
            >
              Save
            </button>
            <button
              type="button"
              className="ui button"
              onClick={this.closeEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderDisplay() {
    let fullAddress = this.props.addressData.number
      ? `${this.props.addressData.number}, ${this.props.addressData.street}, ${this.props.addressData.suburb}, ${this.props.addressData.postCode}`
      : "";
    let city = this.props.addressData ? this.props.addressData.city : "";
    let country = this.props.addressData ? this.props.addressData.country : "";

    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <React.Fragment>
            <p>Address: {fullAddress}</p>
            <p>City: {city}</p>
            <p>Country: {country}</p>
          </React.Fragment>
          <button
            type="button"
            className="ui right floated teal button"
            onClick={this.openEdit}
          >
            Edit
          </button>
        </div>
      </div>
    );
  }
}

export class Nationality extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    const newNationality = { nationality: value };
    this.props.saveProfileData(newNationality);
  }

  render() {
    const countryOptions = Object.keys(Countries).map((x) => (
      <option key={x} value={x}>
        {x}
      </option>
    ));

    return (
      <div className="ui grid">
        <div className="row">
          <div className="sixteen wide column">
            <select
              className="ui right labeled dropdown"
              placeholder="Country"
              value={
                this.props.nationalityData ? this.props.nationalityData : ""
              }
              onChange={this.handleChange}
              name="nationality"
            >
              <option value="" disabled hidden>
                Select your nationality
              </option>
              {countryOptions}
            </select>
          </div>
        </div>
      </div>
    );
  }
}
