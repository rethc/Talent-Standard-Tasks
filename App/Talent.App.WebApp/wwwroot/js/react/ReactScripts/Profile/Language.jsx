﻿/* Language section */
import React from "react";
import Cookies from "js-cookie";
import { Grid, Table } from "semantic-ui-react";

export default class Language extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newLanguage: {
        languages: this.props.languageData,
      },
      addLanguage: {
        id: "",
        name: "",
        level: "",
      },
      showAddSection: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.cancelAddLanguage = this.cancelAddLanguage.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    const newNationality = { nationality: value };
    this.props.saveProfileData(newNationality);
  }

  cancelAddLanguage() {
    this.setState({ addLanguage: { name: "", level: "" } });
  }

  renderAddLanguage() {
    <div className="ui grid">
      <div className="row">
        <div className="six wide column">
          <input
            type="text"
            name="language"
            value={
              this.state.addLanguage.name ? this.state.addLanguage.name : ""
            }
            placeholder="Add Language"
            maxLength={80}
            onChange={this.handleChange}
          />
        </div>
        <div className="six wide column">
          <select
            name="level"
            value={
              this.state.addLanguage.level ? this.state.addLanguage.level : ""
            }
            onChange={this.handleChange}
          >
            <option value="" disabled hidden>
              Language Level
            </option>
            <option value="basic">Basic</option>
            <option value="conversational">Conversational</option>
            <option value="fluent">Fluent</option>
            <option value="native">Native/Bilingual</option>
          </select>
        </div>
        <div className="four wide column">
          <button
            type="button"
            className="ui teal button"
            onClick={this.addLanguage}
          >
            Add
          </button>
          <button
            type="button"
            onClick={this.cancelAddLanguage}
            className="ui button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>;
  }

  render() {
    return (
      <div className="ui sixteen wide column">
        {this.state.showAddSection ? this.renderAddLanguage : ""}
      </div>
    );
  }
}
