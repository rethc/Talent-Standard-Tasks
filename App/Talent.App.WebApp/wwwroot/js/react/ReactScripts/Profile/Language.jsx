/* Language section */
import React from "react";
import Cookies from "js-cookie";

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
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let value = e.target.value;
    const newNationality = { nationality: value };
    this.props.saveProfileData(newNationality);
  }

  render() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="eight wide column">
            <input
              type="text"
              name="language"
              maxLength={80}
              placeholder="Add Language"
              value="test"
              onChange={this.handleChange}
            />
          </div>
          <div className="eight wide column">
            <select className="ui right labeled dropdown" name="level">
              <option value="">Language Level</option>
              <option value="basic">Basic</option>
              <option value="conversational">Conversational</option>
              <option value="fluent">Fluent</option>
              <option value="native">Native/Bilingual</option>
            </select>
          </div>
          <div className="six wide column">
            <button
              type="button"
              className="ui teal button"
              onClick={this.addLanguage}
            >
              Add
            </button>
            <button
              type="button"
              className="ui button"
              onClick={() => {
                this.cancelAddLanguage();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
