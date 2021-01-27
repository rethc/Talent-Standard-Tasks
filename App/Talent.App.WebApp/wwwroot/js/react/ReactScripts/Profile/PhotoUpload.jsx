import React, { Component } from "react";
import Cookies from "js-cookie";
import { Icon, Image, Form, Button } from "semantic-ui-react";

export default class PhotoUpload extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploaded: true,
      uploading: false,
      file: "",
    };

    this.imageRef = React.createRef();

    this.handleClick = this.handleClick.bind(this);
    this.imageUploadHandler = this.imageUploadHandler.bind(this);
    this.upload = this.upload.bind(this);
  }

  handleClick() {
    this.imageRef.current.click();
  }

  imageUploadHandler() {
    if (this.imageRef.current.files.length > 0) {
      const imageURL = URL.createObjectURL(this.imageRef.current.files[0]);

      this.setState({ uploaded: false });

      //AccountProfile props savePhotoUrl="https://cprofileservices.azurewebsites.net/profile/profile/updateProfilePhoto"
      //this.props.updateProfileData({ profilePhotoUrl: imageURL });
    }
  }

  upload() {
    if (this.imageRef.current.files.length != 0) {
      var cookies = Cookies.get("talentAuthToken");
      let data = new FormData();
      data.append("photo", this.imageRef.current.files[0]);
      console.log(data.get("photo"));
      const localURL =
        "http://localhost:60290/profile/profile/updateProfilePhoto";
      const azureURL =
        "https://cprofileservices.azurewebsites.net/profile/profile/updateProfilePhoto";

      $.ajax({
        url: localURL,
        headers: {
          Authorization: "Bearer " + cookies,
        },
        type: "POST",
        data: data,
        processData: false,
        contentType: false,
        success: function (res) {
          if (res.success === true) {
            this.setState({
              uploaded: true,
              uploading: false,
            });

            this.props.loadData();

            TalentUtil.notification.show(
              "Updated profile photo successfully",
              "success",
              null,
              null
            );
          } else {
            TalentUtil.notification.show(
              "Error uploading profile photo",
              "error",
              null,
              null
            );

            this.setState({
              uploading: false,
            });
          }
        }.bind(this),
        error: function (res, a, b) {
          console.log(res);
          console.log(a);
          console.log(b);
        },
      });

      this.setState({
        uploading: true,
      });
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
          <Button
            type="button"
            color="vk"
            icon="upload"
            content="Upload"
            disabled={this.state.uploading}
            onClick={this.upload}
          />
        )}
      </div>
    );
  }
}
