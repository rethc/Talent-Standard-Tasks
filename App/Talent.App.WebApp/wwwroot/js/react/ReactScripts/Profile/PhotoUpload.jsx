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

    this.imageRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
  }

  handleClick() {
    this.imageRef.current.click();
  }

  imageUploadHandler() {
    if (this.imageRef.current.files.length > 0) {
      const imageURL = URL.createObjectURL(this.imageRef.current.files[0]);

      this.setState({ uploaded: false });

      this.props.updateProfileData({ profilePhotoUrl: imageURL });
    }
  }

  render() {
    return (
      <div className="ui sixteen wide column">
        <Form.Field>
          <label>Profile Photo</label>
        </Form.Field>
        <div className="imageUpload" onClick={this.handleClick}>
          {this.props.imageId ? (
            <Image src={this.props.imageId} size="huge" circular />
          ) : (
            <Image>
              <Icon name="camera retro" size="huge" circular />
            </Image>
          )}

          {/** Hide a file upload, keep a ref to it, then when you click the image invoke the imageUploadHandler click method */}
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            ref={this.imageRef}
            onChange={this.imageUploadHandler}
          />
        </div>
        {!this.state.uploaded && (
          <Button type="button" color="vk" icon="upload" content="Upload" />
        )}
      </div>
    );
  }
}
