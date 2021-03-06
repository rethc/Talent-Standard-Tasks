﻿import React from "react";
import { Loader, Card, Icon } from "semantic-ui-react";

export default class CompanyProfile extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let location = "No location found";
    if (this.props.details) {
      if (
        this.props.details.companyContact.location.city &&
        this.props.details.companyContact.location.country
      )
        location =
          this.props.details.companyContact.location.city +
          ", " +
          this.props.details.companyContact.location.country;
      else if (
        !this.props.details.companyContact.location.city &&
        this.props.details.companyContact.location.country
      )
        location = this.props.details.companyContact.location.country;
      else {
        location = this.props.details.companyContact.location.city;
      }
    }

    return (
      <Card>
        <Card.Content textAlign="center">
          <Card.Header>
            {this.props.details ? this.props.details.companyContact.name : ""}
          </Card.Header>
          <Card.Meta>
            <Icon name="marker" /> {location}
          </Card.Meta>
          <Card.Description>
            We currently do not have specific skills that we desire.
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
