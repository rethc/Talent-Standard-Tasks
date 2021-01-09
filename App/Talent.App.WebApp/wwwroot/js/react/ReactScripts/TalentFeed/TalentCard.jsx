import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { Popup, Icon, Card, Button, Grid, Segment } from "semantic-ui-react";
import { BodyWrapper, loaderData } from "../Layout/BodyWrapper.jsx";

export default class TalentCard extends React.Component {
  constructor(props) {
    super(props);

    let loader = loaderData;
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");

    this.init = this.init.bind(this);
  }

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
    loaderData.isLoading = false;
    this.setState({ loaderData });
  }

  componentDidMount() {}

  render() {
    const header = (
      <React.Fragment>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <h3>Name</h3>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Icon name="star" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );
    return (
      <Card fluid>
        <Card.Content header={header} />
        <Card.Content description>dfdsf</Card.Content>
      </Card>
    );
  }
}
