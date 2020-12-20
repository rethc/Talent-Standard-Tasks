/* Skill section */
import React from "react";
import Cookies from "js-cookie";
import { Button, Table, Icon } from "semantic-ui-react";

export default class Skill extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddSection: false,

      newSkill: {
        skills: props.skillData ? props.skillData : [],
      },
      addSkill: {
        id: 0,
        name: "",
        level: "",
      },
      updateSkill: {
        name: "",
        level: "",
      },
      editId: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.handleupdateSkill = this.handleupdateSkill.bind(this);
    this.canceladdSkill = this.canceladdSkill.bind(this);
    this.cancelEditSkill = this.cancelEditSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
  }

  handleupdateSkill(event) {
    const data = Object.assign({}, this.state.updateSkill);

    const name = event.target.name;
    const value = event.target.value;
    data[name] = value;

    this.setState({ updateSkill: data });
  }

  cancelEditSkill() {
    this.setState({
      editId: "",
      updateSkill: { name: "", level: "" },
    });
  }

  updateSkill(id) {
    const data = Object.assign({}, this.state.newSkill);
    let skillData = this.props.skillData;
    let updateSkill = this.state.updateSkill;

    for (let i = 0; i < skillData.length; i++) {
      if (skillData[i].id == id) {
        if (!updateSkill.name) {
          updateSkill.name = skillData[i].name;
        }
        if (!updateSkill.level) {
          updateSkill.level = skillData[i].level;
        }

        skillData[i] = Object.assign({}, skillData[i], updateSkill);
      }
    }
    data.skills = skillData;
    this.setState({
      newSkill: {
        skills: skillData,
      },
      updateSkill: { name: "", level: "" },
      editId: "",
    });
    this.props.updateProfileData(data);
  }

  addSkill() {
    let addLang = this.state.addSkill;

    if (addLang.name == "" || addLang.level == "") {
      TalentUtil.notification.show(
        "Please eneter a valid skill and level",
        "error",
        null,
        null
      );
    } else {
      let skillData = this.props.skillData;
      const data = Object.assign({}, this.state.newSkill);

      console.log(addLang);
      data.skills = skillData;
      addLang.id = addLang.id + 1;

      data.skills.push(addLang);

      console.log(addLang);
      this.props.updateProfileData(data);
      this.setState({
        showAddSection: false,
        addSkill: { name: "", level: "" },
      });
    }
  }

  deleteSkill(id) {
    var skillData = this.props.skillData;
    const data = Object.assign({}, this.state.newSkill);
    for (let i = 0; i < skillData.length; i++) {
      if (skillData[i].id == id) {
        skillData.splice(i, 1);
      }
    }
    this.setState({ newSkill: { skills: skillData } });
    data.skills = skillData;
    this.props.updateProfileData(data);
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.addSkill);

    const name = event.target.name;
    const value = event.target.value;
    data[name] = value;

    this.setState({ addSkill: data });
  }

  canceladdSkill() {
    this.setState({
      showAddSection: false,
      addSkill: { name: "", level: "" },
    });
  }

  renderaddSkill() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="five wide column">
            <input
              type="text"
              name="name"
              value={this.state.addSkill.name ? this.state.addSkill.name : ""}
              placeholder="Add Skill"
              maxLength={80}
              onChange={this.handleChange}
            />
          </div>
          <div className="five wide column">
            <select
              name="level"
              value={this.state.addSkill.level ? this.state.addSkill.level : ""}
              onChange={this.handleChange}
            >
              <option value="" disabled hidden>
                Skill Level
              </option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
          <div className="five wide column">
            <button
              type="button"
              className="ui teal button"
              onClick={this.addSkill}
            >
              Add
            </button>
            <button
              type="button"
              onClick={this.canceladdSkill}
              className="ui button"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderRow(skill) {
    return (
      <Table.Row key={skill.id}>
        <Table.Cell>{skill.name}</Table.Cell>
        <Table.Cell>{skill.level}</Table.Cell>
        <Table.Cell textAlign="right">
          <Button
            type="button"
            icon="pencil"
            onClick={() => this.setState({ editId: skill.id })}
          />
          <Button
            type="button"
            icon="close"
            onClick={() => {
              this.deleteSkill(skill.id);
            }}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  renderRowUpdate(skill) {
    return (
      <Table.Row key={skill.id}>
        <Table.Cell>
          <input
            type="text"
            name="name"
            value={
              this.state.updateSkill.name
                ? this.state.updateSkill.name
                : skill.name
            }
            placeholder="Add Skill"
            maxLength={80}
            onChange={this.handleupdateSkill}
          />
        </Table.Cell>
        <Table.Cell>
          <select
            value={
              this.state.updateSkill.level
                ? this.state.updateSkill.level
                : skill.level
            }
            onChange={this.handleupdateSkill}
            name="level"
          >
            <option value="" disabled hidden>
              Skill Level
            </option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
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
              this.updateSkill(language.id);
            }}
          />

          <Button
            basic
            floated="left"
            color="red"
            type="button"
            content="Cancel"
            onClick={() => {
              this.cancelEditSkill();
            }}
          />
        </Table.Cell>
      </Table.Row>
    );
  }

  render() {
    return (
      <div className="ui sixteen wide column">
        {this.state.showAddSection ? this.renderaddSkill() : ""}
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
            {this.props.skillData.map((language) =>
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
