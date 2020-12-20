/* Language section */
import React from "react";
import Cookies from "js-cookie";
import { Button, Table, Icon } from "semantic-ui-react";

//TODO: to fix null ID's after first language has been saved.

export default class Language extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddSection: false,

      newLanguage: {
        languages: props.languageData ? props.languageData : [],
      },
      addLanguage: {
        id: 0,
        name: "",
        level: "",
      },
      updateLanguage: {
        name: "",
        level: "",
      },
      editId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.addLanguage = this.addLanguage.bind(this);
    this.handleUpdateLanguage = this.handleUpdateLanguage.bind(this);
    this.cancelAddLanguage = this.cancelAddLanguage.bind(this);
    this.cancelEditLanguage = this.cancelEditLanguage.bind(this);
    this.deleteLanguage = this.deleteLanguage.bind(this);
  }

  handleUpdateLanguage(event) {
    const data = Object.assign({}, this.state.updateLanguage);

    const name = event.target.name;
    const value = event.target.value;
    data[name] = value;

    this.setState({ updateLanguage: data });
  }

  cancelEditLanguage() {
    this.setState({
      editId: "",
      updateLanguage: { name: "", level: "" },
    });
  }

  updateLanguage(id) {
    const data = Object.assign({}, this.state.newLanguage);
    let languageData = this.props.languageData;
    let updateLanguage = this.state.updateLanguage;

    for (let i = 0; i < languageData.length; i++) {
      if (languageData[i].id == id) {
        if (!updateLanguage.name) {
          updateLanguage.name = languageData[i].name;
        }
        if (!updateLanguage.level) {
          updateLanguage.level = languageData[i].level;
        }

        languageData[i] = Object.assign({}, languageData[i], updateLanguage);
      }
    }
    data.languages = languageData;
    this.setState({
      newLanguage: {
        languages: languageData,
      },
      updateLanguage: { name: "", level: "" },
      editId: "",
    });
    this.props.updateProfileData(data);
  }

  addLanguage() {
    let addLang = this.state.addLanguage;

    if (addLang.name == "" || addLang.level == "") {
      TalentUtil.notification.show(
        "Please enter a valid language and level",
        "error",
        null,
        null
      );
    } else {
      let languageData = this.props.languageData;
      const data = Object.assign({}, this.state.newLanguage);

      console.log(addLang);
      data.languages = languageData;
      addLang.id = addLang.id + 1;

      data.languages.push(addLang);

      console.log(addLang);
      this.props.updateProfileData(data);
      this.setState({
        showAddSection: false,
        addLanguage: { name: "", level: "" },
      });
    }
  }

  deleteLanguage(id) {
    var languageData = this.props.languageData;
    const data = Object.assign({}, this.state.newLanguage);
    for (let i = 0; i < languageData.length; i++) {
      if (languageData[i].id == id) {
        languageData.splice(i, 1);
      }
    }
    this.setState({ newLanguage: { languages: languageData } });
    data.languages = languageData;
    this.props.updateProfileData(data);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.addLanguage);

    const name = event.target.name;
    const value = event.target.value;
    data[name] = value;

    this.setState({ addLanguage: data });
  }

  cancelAddLanguage() {
    this.setState({
      showAddSection: false,
      addLanguage: { name: "", level: "" },
    });
  }

  renderAddLanguage() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="five wide column">
            <input
              type="text"
              name="name"
              value={
                this.state.addLanguage.name ? this.state.addLanguage.name : ""
              }
              placeholder="Add Language"
              maxLength={80}
              onChange={this.handleChange}
            />
          </div>
          <div className="five wide column">
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
              <option value="Basic">Basic</option>
              <option value="Conversational">Conversational</option>
              <option value="Fluent">Fluent</option>
              <option value="Native/Bilingual">Native/Bilingual</option>
            </select>
          </div>
          <div className="five wide column">
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
      </div>
    );
  }

  renderRow(language) {
    return (
      <Table.Row key={language.id}>
        <Table.Cell>{language.name}</Table.Cell>
        <Table.Cell>{language.level}</Table.Cell>
        <Table.Cell textAlign="right">
          <Button
            type="button"
            icon="pencil"
            onClick={() => this.setState({ editId: language.id })}
          />
          <Button
            type="button"
            icon="close"
            onClick={() => {
              this.deleteLanguage(language.id);
            }}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  renderRowUpdate(language) {
    return (
      <Table.Row key={language.id}>
        <Table.Cell>
          <input
            type="text"
            name="name"
            value={
              this.state.updateLanguage.name
                ? this.state.updateLanguage.name
                : language.name
            }
            placeholder="Add Language"
            maxLength={80}
            onChange={this.handleUpdateLanguage}
          />
        </Table.Cell>
        <Table.Cell>
          <select
            value={
              this.state.updateLanguage.level
                ? this.state.updateLanguage.level
                : language.level
            }
            onChange={this.handleUpdateLanguage}
            name="level"
          >
            <option value="">Language Level</option>
            <option value="Basic">Basic</option>
            <option value="Conversational">Conversational</option>
            <option value="Fluent">Fluent</option>
            <option value="Native/Bilingual">Native/Bilingual</option>
          </select>
        </Table.Cell>
        <Table.Cell>
          <Button
            basic
            floated="left"
            color="blue"
            type="button"
            content="Update"
            onClick={() => {
              this.updateLanguage(language.id);
            }}
          />

          <Button
            basic
            floated="left"
            color="red"
            type="button"
            content="Cancel"
            onClick={() => {
              this.cancelEditLanguage();
            }}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    return (
      <div className="ui sixteen wide column">
        {this.state.showAddSection ? this.renderAddLanguage() : ""}
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Language</Table.HeaderCell>
              <Table.HeaderCell>Level</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">
                <button
                  type="button"
                  className="ui teal button"
                  onClick={() => this.setState({ showAddSection: true })}
                >
                  <Icon name="plus" /> Add New
                </button>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {this.props.languageData.map((language) =>
              language.id === this.state.editId
                ? this.renderRowUpdate(language)
                : this.renderRow(language)
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
