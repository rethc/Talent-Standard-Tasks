/* Language section */
import React from "react";
import Cookies from "js-cookie";
import { Button, Table, Icon } from "semantic-ui-react";

export default class Language extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      languageData: this.props.languageData ? this.props.languageData : [],
      showAddSection: false,

      newLanguage: {
        languages: props.languageData,
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
  }

  // **************************************************/
  //** START OF UPDATE FUNCTIONS AND EVENTLISTENERS **/
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
      editLanguage: { name: "", level: "" },
    });
  }

  updateLanguage(id) {
    const data = Object.assign({}, this.state.newLanguage);
    let { name, level } = this.state.updateLanguage;
    let { languageData } = this.state.languageData;

    for (let i = 0; i < languageData.length; i++) {
      if (languageData[i].id == id) {
        if (!name) {
          name = languageData[i].name;
        }
        if (!level) {
          level = languageData[i].level;
        }

        languageData[i] = Object.assign(
          {},
          languageData[i],
          this.state.updateLanguage
        );
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

  //** END OF UPDATE FUNCTIONS **/
  // ****************************/

  // ***********************************************/
  //** START OF ADD FUNCTIONS AND EVENTLISTENERS **/
  addLanguage() {
    const { name, level } = this.state.addLanguage;
    let { id } = this.state.addLanguage;

    if (name == "" || level == "") {
      TalentUtil.notification.show(
        "Please a valid language and level",
        "error",
        null,
        null
      );
    } else {
      const data = Object.assign({}, this.state.newLangauge);
      data.languages = this.state.languageData;
      id = id + 1;
      data.languages.push(this.state.addLanguage);

      this.props.updateProfileData(data);
      this.setState({
        showAddSection: false,
        addLanguage: { name: "", level: "" },
      });
    }
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
  //** END OF ADD FUNCTIONS AND EVENTLISTENERS **/
  // ********************************************/

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
              <option value="basic">Basic</option>
              <option value="conversational">Conversational</option>
              <option value="fluent">Fluent</option>
              <option value="native">Native/Bilingual</option>
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
            onClick={() => this.setState({ editId: language.id })}
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
            <option value="basic">Basic</option>
            <option value="conversational">Conversational</option>
            <option value="fluent">Fluent</option>
            <option value="native">Native/Bilingual</option>
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
            {this.props.languageData ? (
              this.props.languageData.map((language) =>
                language.id === this.state.editId
                  ? this.renderRowUpdate(language)
                  : this.renderRow(language)
              )
            ) : (
              <Table.Row key={0}></Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
