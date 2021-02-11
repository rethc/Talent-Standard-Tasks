import React, { Fragment } from "react";
import ReactPlayer from "react-player";
import PropTypes from "prop-types";
import { Embed, Label, Card, Grid, Icon, Image, Item } from "semantic-ui-react";

const availableItems = [
  { key: "0", name: "video", icon: "video" },
  { key: "1", name: "profile", icon: "user" },
  { key: "2", name: "cv", icon: "file pdf outline" },
  { key: "3", name: "linkedin", icon: "linkedin" },
  { key: "4", name: "github", icon: "github play" },
];

export default class TalentCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "video",
    };

    this.renderActiveContent = this.renderActiveContent.bind(this);
    this.renderVideo = this.renderVideo.bind(this);
    this.renderProfile = this.renderProfile.bind(this);
    this.renderCV = this.renderCV.bind(this);
    this.renderSocialMediaAccount = this.renderSocialMediaAccount.bind(this);
    this.renderMenu = this.renderMenu.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.renderSkills = this.renderSkills.bind(this);
  }

  render() {
    return (
      <Fragment>
        <Card fluid>
          <Card.Content>
            <Card.Header>
              <Grid columns="equal">
                <Grid.Row>
                  <Grid.Column>{this.props.talentData.name}</Grid.Column>
                  <Grid.Column textAlign="right">
                    <Icon name="star" />
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Card.Header>
          </Card.Content>
          {this.renderActiveContent()}
          {this.renderMenu()}
          {this.renderSkills()}
        </Card>
      </Fragment>
    );
  }

  renderActiveContent() {
    let result = null;

    switch (this.state.activeItem) {
      case "video":
        result = this.renderVideo();
        break;
      case "profile":
        result = this.renderProfile();
        break;
      case "cv":
        result = this.renderCV();
        break;
      case "linkedin":
        result = this.renderSocialMediaAccount();
      case "github":
        result = this.renderSocialMediaAccount();
    }

    return result;
  }

  renderVideo() {
    return (
      <ReactPlayer
        className="react-player"
        url="https://www.youtube.com/watch?v=dpw9EHDh2bM"
        width="100%"
      />
    );
  }

  renderProfile() {
    const src = this.props.talentData.photoId
      ? this.props.talentData.photoId
      : "https://react.semantic-ui.com/images/avatar/large/matthew.png";

    return (
      <Grid columns="equal">
        <Grid.Row>
          <Grid.Column>
            <Image src={src} />
          </Grid.Column>
          <Grid.Column>
            <Grid>
              <Grid.Row>
                <Grid.Column>
                  <h4>Talent Snapshot</h4>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <b>CURRENT EMPLOYER</b>
                  <br />
                  {this.props.talentData.currentEmployment}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <b>VISA STATUS</b>
                  <br />
                  {this.props.talentData.visa}
                </Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <b>POSITION</b>
                  <br />
                  {this.props.talentData.currentEmployment}
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  renderCV() {
    return <Card.Content>No CV for this talent.</Card.Content>;
  }

  renderSocialMediaAccount() {
    return <Card.Content>No Linked Accounts for this talent.</Card.Content>;
  }

  renderMenu() {
    const inactiveItems = availableItems.filter(
      (item) => item.name !== this.state.activeItem
    );
    const menuItems = inactiveItems.map((item) => (
      <MenuItem
        key={item.key}
        name={item.name}
        icon={item.icon}
        handleClick={this.handleItemClick}
      />
    ));

    return (
      <Card.Content>
        <div className="ui fluid four item icon secondary menu">
          {menuItems}
        </div>
      </Card.Content>
    );
  }

  handleItemClick(event, name) {
    this.setState({ activeItem: name });
  }

  renderSkills() {
    const { skills } = this.props.talentData;
    const content = skills.map((skill, index) => (
      <Label key={index} basic color="blue">
        {skill}
      </Label>
    ));

    return <Card.Content extra>{content}</Card.Content>;
  }
}

/*const skillLabels = this.props.talentData.skills.map((skill, index) => (
      <Label key={index} basic color="blue" content={skill} />
    ));

    //hardcoded
    return (
      <Card.Content extra>
        <Label basic color="blue" content="C#" />
      </Card.Content>
    );
  }*/

const MenuItem = (props) => (
  <a
    className="item"
    name={props.name}
    onClick={(e) => props.handleClick(e, props.name)}
  >
    <i aria-hidden="true" className={props.icon + " large icon"}></i>
  </a>
);
