import React from "react";
import ReactDOM from "react-dom";
import ReactPlayer from "react-player";
import {
  Embed,
  Label,
  Card,
  Grid,
  Icon,
  Image,
  Item,
  Button,
} from "semantic-ui-react";

export default class TalentCardDetail extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { activeItem, talentData } = this.props;

    //Show video view
    if (activeItem === "profile") {
      return (
        <React.Fragment>
          <ReactPlayer
            className="react-player"
            url={
              talentData.videoUrl
                ? talentData.videoUrl
                : "https://www.youtube.com/watch?v=dpw9EHDh2bM"
            }
            width="100%"
          />
        </React.Fragment>
      );
      //Show profile view
    } else {
      return (
        <React.Fragment>
          <Grid columns="equal">
            <Grid.Row>
              <Grid.Column>
                <Image
                  src={
                    this.props.talentData.photoId
                      ? this.props.talentData.photoId
                      : "https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  }
                />
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
                      {talentData.currentEmployment.company}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <b>VISA STATUS</b>
                      <br />
                      {talentData.visa}
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <b>POSITION</b>
                      <br />
                      {talentData.currentEmployment.position}
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
      );
    }
  }
}
