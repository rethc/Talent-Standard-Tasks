import React from "react";
import { Loader, Card, Icon, Image, Button, Grid } from "semantic-ui-react";

export default class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let location = "No location found";

    return (
      <Card>
        <Card.Content textAlign="center">
          <Card.Header>
            {this.props.details ? this.props.details.companyContact.name : ""}
          </Card.Header>
          <Card.Meta>{location}</Card.Meta>
          <Card.Description>
            We currently do not have specific skills that we desire
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <p>
            <Icon name="phone" />:
            {this.props.details
              ? " " + this.props.details.companyContact.phone
              : ""}
          </p>
          <p>
            <Icon name="mail" />:
            {this.props.details
              ? " " + this.props.details.companyContact.email
              : ""}
          </p>
        </Card.Content>
      </Card>
    );
  }
}
