/* Experience section */
import React from "react";
import Cookies from "js-cookie";
import DatePicker from "react-datepicker";
import Moment from "moment";
import { Icon, Table, Form, Button, Grid } from "semantic-ui-react";

export default class Experience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newExperience: {
        experience: props.experienceData ? props.experienceData : [],
      },
      showAddSection: false,
      addExperience: {
        id: 0,
        company: "",
        position: "",
        start: "",
        end: "",
        responsibilities: "",
      },
      updateExperience: {
        company: "",
        position: "",
        start: "",
        end: "",
        responsibilities: "",
      },
      editId: "",
      isEndEnabled: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.handleUpdateStartDate = this.handleUpdateStartDate.bind(this);
    this.handleUpdateEndDate = this.handleUpdateEndDate.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.add = this.add.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.edit = this.edit.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
    this.renderAdd = this.renderAdd.bind(this);
    this.renderUpdateRow = this.renderUpdateRow.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }

  handleChange(event) {
    var data = Object.assign({}, this.state.addExperience);

    const name = event.target.name;
    const value = event.target.value;

    data[name] = value;

    this.setState({
      addExperience: data,
    });
  }

  handleChangeStartDate(date) {
    const startDate = date;

    var data = Object.assign({}, this.state.addExperience);

    let today = new Moment();
    if (startDate >= today) {
      TalentUtil.notification.show(
        "Experience start date can't be today or in the future",
        "error",
        null,
        null
      );
    } else {
      data.start = Moment(date);
      this.setState({
        addExperience: data,
        isEndEnabled: true,
      });
    }
  }

  handleChangeEndDate(date) {
    const endDate = date;

    var data = Object.assign({}, this.state.addExperience);

    let today = new Moment();
    if (endDate <= data.start) {
      TalentUtil.notification.show(
        "Experience end date needs to be past start date",
        "error",
        null,
        null
      );
    } else if (endDate > today) {
      TalentUtil.notification.show(
        "Experience end date can't be in the future",
        "error",
        null,
        null
      );
    } else {
      data.end = Moment(date);
      this.setState({
        addExperience: data,
      });
    }
  }

  handleUpdateStartDate(date) {
    const startDate = date;

    var data = Object.assign({}, this.state.updateExperience);

    let today = new Moment();
    if (startDate >= today) {
      TalentUtil.notification.show(
        "Experience start date can't be today or in the future",
        "error",
        null,
        null
      );
    } else {
      data.start = Moment(date);
      this.setState({
        updateExperience: data,
      });
    }
  }

  handleUpdateEndDate(date) {
    const endDate = date;

    var data = Object.assign({}, this.state.updateExperience);

    let today = new Moment();
    if (endDate <= data.start) {
      TalentUtil.notification.show(
        "Experience end date needs to be past start date",
        "error",
        null,
        null
      );
    } else if (endDate > today) {
      TalentUtil.notification.show(
        "Experience end date can't be in the future",
        "error",
        null,
        null
      );
    } else {
      data.end = Moment(date);
      this.setState({
        addExperience: data,
      });
    }
  }

  handleUpdate(event) {
    var data = Object.assign({}, this.state.updateExperience);

    const name = event.target.name;
    const value = event.target.value;

    data[name] = value;

    this.setState({
      updateExperience: data,
    });
  }

  add() {
    var experiences = this.props.experienceData;
    var addExperience = this.state.addExperience;
    var data = Object.assign({}, this.state.newExperience);

    if (addExperience.company == "") {
      TalentUtil.notification.show("Company field empty", "error", null, null);
    } else if (addExperience.position == "") {
      TalentUtil.notification.show("Position field empty", "error", null, null);
    } else if (addExperience.start == "") {
      TalentUtil.notification.show(
        "Please select start date",
        "error",
        null,
        null
      );
    } else if (addExperience.end == "") {
      TalentUtil.notification.show(
        "Please select end date",
        "error",
        null,
        null
      );
    } else if (addExperience.responsibilities == "") {
      TalentUtil.notification.show(
        "Responsibilities field empty",
        "error",
        null,
        null
      );
    } else {
      data.experience = experiences;
      addExperience.id = addExperience.id + 1;
      data.experience.push(addExperience);
      this.props.updateProfileData(data);
      this.setState({
        showAddSection: false,
        addExperience: {
          company: "",
          position: "",
          start: "",
          end: "",
          responsibilities: "",
        },
        isEndEnabled: false,
      });
    }
  }

  delete(id) {
    var i;
    var experiences = this.props.experienceData;
    var data = Object.assign({}, this.state.newExperience);
    for (i = 0; i < experiences.length; i++) {
      if (experiences[i].id == id) {
        experiences.splice(i, 1);
      }
    }
    this.setState({ newExperience: { experience: experiences } });
    data.experience = experiences;
    this.props.updateProfileData(data);
  }

  update(id) {
    var i;
    var experiences = this.props.experienceData;
    var data = Object.assign({}, this.state.newExperience);
    var update = this.state.updateExperience;

    for (i = 0; i < experiences.length; i++) {
      if (experiences[i].id == id) {
        experiences[i] = Object.assign({}, experiences[i], update);
      }
    }
    data.experience = experiences;
    this.setState({
      newExperience: { experience: experiences },
      editId: "",
      updateExperience: {
        company: "",
        position: "",
        start: "",
        end: "",
        responsibilities: "",
      },
    });
    this.props.updateProfileData(data);
  }

  edit(id) {
    var experiences = this.props.experienceData;

    for (var i = 0; i < experiences.length; i++) {
      if (experiences[i].id == id) {
        this.setState({
          editId: id,
          updateExperience: Object.assign({}, experiences[i]),
        });
      }
    }
  }

  cancelAdd() {
    this.setState({
      showAddSection: false,
      addExperience: {
        company: "",
        position: "",
        start: "",
        end: "",
        responsibilities: "",
      },
    });
  }

  cancelUpdate() {
    this.setState({
      editId: "",
      updateExperience: {
        company: "",
        position: "",
        start: "",
        end: "",
        responsibilities: "",
      },
    });
  }

  render() {
    return (
      <div className="ui sixteen wide column">
        {this.state.showAddSection ? this.renderAdd() : ""}
        <div>
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Company</Table.HeaderCell>
                <Table.HeaderCell>Position</Table.HeaderCell>
                <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                <Table.HeaderCell>Start</Table.HeaderCell>
                <Table.HeaderCell>End</Table.HeaderCell>
                <Table.HeaderCell>
                  <button
                    type="button"
                    className="ui right floated teal button"
                    onClick={() => this.setState({ showAddSection: true })}
                  >
                    <Icon name="plus" />
                    Add New
                  </button>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.experienceData.map((experience) =>
                experience.id === this.state.editId
                  ? this.renderUpdateRow(experience)
                  : this.renderRow(experience)
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }

  renderAdd() {
    return (
      <div className="ui grid">
        <div className="row">
          <div className="eight wide column">
            <Form.Field>
              <label>Company:</label>
            </Form.Field>
            <input
              type="text"
              name="company"
              value={
                this.state.addExperience.company
                  ? this.state.addExperience.company
                  : ""
              }
              placeholder="Company"
              maxLength={20}
              onChange={this.handleChange}
            />
          </div>
          <div className="eight wide column">
            <Form.Field>
              <label>Position:</label>
            </Form.Field>
            <input
              type="text"
              name="position"
              value={
                this.state.addExperience.position
                  ? this.state.addExperience.position
                  : ""
              }
              placeholder="Position"
              maxLength={20}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="eight wide column">
            <Form.Field>
              <label>Start Date:</label>
            </Form.Field>
            <DatePicker
              dateFormat="DD/MM/YYYY"
              name="start"
              selected={
                this.state.addExperience.start
                  ? this.state.addExperience.start
                  : Moment()
              }
              onChange={this.handleChangeStartDate}
            />
          </div>
          <div className="eight wide column">
            <Form.Field>
              <label>End Date:</label>
            </Form.Field>
            <DatePicker
              dateFormat="DD/MM/YYYY"
              disabled={!this.state.isEndEnabled}
              name="end"
              selected={
                this.state.addExperience.end
                  ? this.state.addExperience.end
                  : Moment()
              }
              onChange={this.handleChangeEndDate}
            />
          </div>
        </div>
        <div className="row">
          <div className="sixteen wide column">
            <Form.Field>
              <label>Responsibilities:</label>
            </Form.Field>
            <input
              type="text"
              name="responsibilities"
              value={
                this.state.addExperience.responsibilities
                  ? this.state.addExperience.responsibilities
                  : ""
              }
              placeholder="Responsibilities"
              maxLength={20}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="sixteen wide column">
            <button type="button" className="ui teal button" onClick={this.add}>
              Add
            </button>
            <button
              type="button"
              className="ui button"
              onClick={() => {
                this.cancelAdd();
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  renderUpdateRow(experience) {
    return (
      <Table.Row key={experience.id}>
        <Table.Cell colSpan="6">
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label>Company:</label>
                </Form.Field>
                <input
                  type="text"
                  name="company"
                  value={
                    this.state.updateExperience.company
                      ? this.state.updateExperience.company
                      : experience.company
                  }
                  placeholder="Company"
                  maxLength={20}
                  onChange={this.handleUpdate}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>Position:</label>
                </Form.Field>
                <input
                  type="text"
                  name="position"
                  value={
                    this.state.updateExperience.position
                      ? this.state.updateExperience.position
                      : experience.position
                  }
                  placeholder="Position"
                  maxLength={20}
                  onChange={this.handleUpdate}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={2}>
              <Grid.Column>
                <Form.Field>
                  <label>Start Date:</label>
                </Form.Field>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  name="start"
                  selected={Moment(this.state.updateExperience.start)}
                  onChange={this.handleUpdateStartDate}
                />
              </Grid.Column>
              <Grid.Column>
                <Form.Field>
                  <label>End Date:</label>
                </Form.Field>
                <DatePicker
                  dateFormat="DD/MM/YYYY"
                  name="end"
                  selected={Moment(this.state.updateExperience.end)}
                  onChange={this.handleUpdateEndDate}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row columns={1}>
              <Grid.Column>
                <Form.Field>
                  <label>Responsibilities:</label>
                </Form.Field>
                <input
                  type="text"
                  name="responsibilities"
                  value={
                    this.state.updateExperience.responsibilities
                      ? this.state.updateExperience.responsibilities
                      : experience.responsibilities
                  }
                  placeholder="Responsibilities"
                  maxLength={20}
                  onChange={this.handleUpdate}
                />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <button
                  type="button"
                  className="ui teal button"
                  onClick={() => {
                    this.update(experience.id);
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="ui button"
                  onClick={() => {
                    this.cancelUpdate();
                  }}
                >
                  Cancel
                </button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Table.Cell>
      </Table.Row>
    );
  }

  renderRow(experience) {
    return (
      <Table.Row key={experience.id}>
        <Table.Cell>{experience.company}</Table.Cell>
        <Table.Cell>{experience.position}</Table.Cell>
        <Table.Cell>{experience.responsibilities}</Table.Cell>
        <Table.Cell>
          {Moment(experience.start).format("Do MMM, YYYY")}
        </Table.Cell>
        <Table.Cell>{Moment(experience.end).format("Do MMM, YYYY")}</Table.Cell>
        <Table.Cell textAlign="right">
          <Button
            type="button"
            icon="pencil"
            onClick={() => this.edit(experience.id)}
          ></Button>

          <Button
            type="button"
            icon="close"
            onClick={() => {
              this.delete(experience.id);
            }}
          ></Button>
        </Table.Cell>
      </Table.Row>
    );
  }
}
