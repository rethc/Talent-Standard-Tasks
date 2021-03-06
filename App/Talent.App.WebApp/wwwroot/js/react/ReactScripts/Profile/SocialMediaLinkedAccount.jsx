﻿/* Social media JSX */
import React from "react";
import { ChildSingleInput } from "../Form/SingleInput.jsx";
import { Button, Icon } from "semantic-ui-react";

export default class SocialMediaLinkedAccount extends React.Component {
  constructor(props) {
    super(props);

    const linkedAccounts = props.linkedAccounts
      ? Object.assign({}, props.linkedAccounts)
      : {
          linkedIn: "",
          github: "",
        };

    this.state = {
      showEditSection: false,
      newLinkedAccounts: linkedAccounts,
    };

    this.openEdit = this.openEdit.bind(this);
    this.closeEdit = this.closeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.saveLinkedAccounts = this.saveLinkedAccounts.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderDisplay = this.renderDisplay.bind(this);
  }

  /*componentDidMount() {
        $('.ui.button.social-media')
            .popup();
    }*/

  openEdit() {
    const linkedAccounts = Object.assign({}, this.props.linkedAccounts);
    this.setState({
      showEditSection: true,
      newLinkedAccounts: linkedAccounts,
    });
  }

  closeEdit() {
    this.setState({
      showEditSection: false,
    });
  }

  handleChange(event) {
    const data = Object.assign({}, this.state.newLinkedAccounts);
    data[event.target.name] = event.target.value;
    this.setState({
      newLinkedAccounts: data,
    });
  }

  saveLinkedAccounts() {
    const linkedAccounts = { linkedAccounts: this.state.newLinkedAccounts };
    const data = Object.assign({}, linkedAccounts);

    //ensure URL starts with HTTP/HTTPS
    //https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url
    var expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
    var regex = new RegExp(expression);

    if (!data.linkedAccounts.linkedIn.match(regex)) {
      TalentUtil.notification.show(
        "Invalid LinkedIn Profile URL",
        "error",
        null,
        null
      );
    } else if (!data.linkedAccounts.github.match(regex)) {
      TalentUtil.notification.show("Invalid GitHub URL", "error", null, null);
    } else {
      this.props.saveProfileData(data);
      this.closeEdit();
    }
  }

  render() {
    return this.state.showEditSection
      ? this.renderEdit()
      : this.renderDisplay();
  }

  renderEdit() {
    return (
      <div className="ui sixteen wide column">
        <ChildSingleInput
          inputType="text"
          label="LinkedIn"
          name="linkedIn"
          value={this.state.newLinkedAccounts.linkedIn}
          controlFunc={this.handleChange}
          maxLength={255}
          placeholder="Enter your LinkedIn Profile URL"
          errorMessage="Please enter a valid Profile URL"
        />
        <ChildSingleInput
          inputType="text"
          label="GitHub"
          name="github"
          value={this.state.newLinkedAccounts.github}
          controlFunc={this.handleChange}
          maxLength={255}
          placeholder="Enter your GitHub URL"
          errorMessage="Please enter a valid GitHub URL"
        />
        <button
          type="button"
          className="ui teal button"
          onClick={this.saveLinkedAccounts}
        >
          Save
        </button>
        <button type="button" className="ui button" onClick={this.closeEdit}>
          Cancel
        </button>
      </div>
    );
  }

  renderDisplay() {
    let linkedIn = this.props.linkedAccounts
      ? this.props.linkedAccounts.linkedIn
      : "";
    let github = this.props.linkedAccounts
      ? this.props.linkedAccounts.github
      : "";

    return (
      <div className="row">
        <div className="ui sixteen wide column">
          <Button
            color="linkedin"
            as="a"
            target="_blank"
            href={this.props.linkedAccounts.linkedIn}
          >
            <Icon name="linkedin" /> LinkedIn
          </Button>
          <Button
            color="black"
            as="a"
            target="_blank"
            href={this.props.linkedAccounts.github}
          >
            <Icon name="github" /> GitHub
          </Button>
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
