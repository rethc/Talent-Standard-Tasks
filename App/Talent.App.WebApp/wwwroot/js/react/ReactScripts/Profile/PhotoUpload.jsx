import React, { Component } from "react";
import Cookies from "js-cookie";
import { Icon, Image, Form, Button } from "semantic-ui-react";

export default class PhotoUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploaded: true,
      uploading: false,
    };
  }

  render() {
    return <div className="ui sixteen wide column"></div>;
  }
}
