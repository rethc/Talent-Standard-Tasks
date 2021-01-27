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
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.uploadPhoto = this.uploadPhoto.bind(this);
  }

  handleClick() {
    this.imageRef.current.click();
  }

  handleImageUpload() {
    if (this.imageRef.current.files.length > 0) {
      const imageUrl = URL.createObjectURL(this.imageRef.current.files[0]);

      this.setState({
        uploaded: false,
      });

      /** Thumbnail preview **/
      this.props.updateProfileData({
        profilePhotoUrl: imageUrl,
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
          {this.props.imageId ? this.renderImage() : this.renderNoImage()}
          {/** Hide a file upload, keep a ref to it, then when you click the image invoke the imageUploadHandler click method */}
          <input
            type="file"
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            ref={this.imageRef}
            onChange={this.handleImageUpload}
          />
        </div>
        {!this.state.uploaded && (
          <Button
            type="button"
            color="vk"
            icon="upload"
            content="Upload"
            disabled={this.state.uploading}
            onClick={this.uploadPhoto}
          />
        )}
      </div>
    );
  }

  renderImage() {
    return <Image src={this.props.imageId} size="medium" circular />;
  }

  renderNoImage() {
    return (
      <Image>
        <Icon name="camera retro" size="medium" circular />
      </Image>
    );
  }

  uploadPhoto() {
    var cookies = Cookies.get("talentAuthToken");
    let data = new FormData();
    data.append("file", this.imageRef.current.files[0]);
    console.log(data.get("file"));
    const localURL =
      "http://localhost:60290/profile/profile/updateProfilePhoto";
    const azureURL =
      "https://cprofileservices2.azurewebsites.net/profile/profile/updateProfilePhoto";

    $.ajax({
      url: azureURL,
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
