import React from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import {
  Popup,
  Icon,
  Card,
  Button,
  Grid,
  Segment,
  Label,
} from "semantic-ui-react";
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
    const cardHeader = (
      <React.Fragment>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column>
              <h3>TalentName</h3>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Icon name="star" size="large" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );

    const cardButtons = (
      <React.Fragment>
        <Grid columns="equal">
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button inverted>
                <Icon name="user" color="black" size="large" />
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Button inverted>
                <Icon name="file pdf outline" color="black" size="large" />
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Button inverted>
                <Icon name="linkedin" color="black" size="large" />
              </Button>
            </Grid.Column>
            <Grid.Column textAlign="center">
              <Button inverted>
                <Icon name="github" color="black" size="large" />
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    );

    return (
      <Card fluid>
        <Card.Content header={cardHeader} />
        <div className="player-wrapper">
          <ReactPlayer
            className="react-player"
            url="https://www.youtube.com/watch?v=dpw9EHDh2bM"
            width="100%"
          />
        </div>
        <Card.Content>{cardButtons}</Card.Content>
        <Card.Content extra>
          <Label basic color="blue" content="C#" />
        </Card.Content>
      </Card>
    );
  }
}
