import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { Popup, Icon } from "semantic-ui-react";

export default class TalentCard extends React.Component {
  constructor(props) {
    super(props);

    let loader = loaderData;
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");
  }

  render() {
    return <h1>hello from talent card</h1>;
  }
}
