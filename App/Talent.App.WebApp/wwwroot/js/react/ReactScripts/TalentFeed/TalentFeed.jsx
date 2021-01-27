import React from "react";
import ReactDOM from "react-dom";
import Cookies from "js-cookie";
import TalentCard from "../TalentFeed/TalentCard.jsx";
import { Loader, Card, Icon, Image, Button } from "semantic-ui-react";
import CompanyProfile from "../TalentFeed/CompanyProfile.jsx";
import FollowingSuggestion from "../TalentFeed/FollowingSuggestion.jsx";
import { BodyWrapper, loaderData } from "../Layout/BodyWrapper.jsx";

export default class TalentFeed extends React.Component {
  constructor(props) {
    super(props);

    let loader = loaderData;
    loader.allowedUsers.push("Employer");
    loader.allowedUsers.push("Recruiter");

    this.state = {
      loadNumber: 5,
      loadPosition: 0,
      feedData: [],
      watchlist: [],
      loaderData: loader,
      loadingFeedData: false,
      companyDetails: null,
    };

    this.init = this.init.bind(this);
  }

  init() {
    let loaderData = TalentUtil.deepCopy(this.state.loaderData);
    loaderData.isLoading = false;
    this.setState({ loaderData }); //comment this
  }

  componentDidMount() {
    //window.addEventListener("scroll", this.handleScroll);
    //this.init();
    this.loadEmployerData();
    this.loadTalentData();
    this.init();
  }

  loadEmployerData() {
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url:
        "https://cprofileservices2.azurewebsites.net/profile/profile/getEmployerProfile",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "GET",
      contentType: "application/json",
      dataType: "json",
      success: function (res) {
        let employerData = null;
        if (res.employer) {
          employerData = res.employer;
        }
        console.log(res);
        this.setState({
          companyDetails: employerData,
        });
      }.bind(this),
      error: function (res) {
        console.log(res.status);
      },
    });
  }

  loadTalentData() {
    var cookies = Cookies.get("talentAuthToken");
    $.ajax({
      url:
        "https://cprofileservices2.azurewebsites.net/profile/profile/getTalent",
      headers: {
        Authorization: "Bearer " + cookies,
        "Content-Type": "application/json",
      },
      type: "GET",
      data: {
        position: this.state.loadPosition,
        number: this.state.loadNumber,
      },
      contentType: "application/json",
      dataType: "json",
      success: function (res) {
        let newFeedData = this.state.feedData;
        let newLoadPosition = this.state.loadPosition;

        if (res.data) {
          newFeedData = newFeedData.concat(res.data);
          newLoadPosition += this.state.loadNumber;
          console.log(newFeedData);
          console.log(newLoadPosition);
        }
        console.log(res);
        this.setState({
          feedData: newFeedData,
          loadPosition: newLoadPosition,
        });
      }.bind(this),
      error: function (res) {
        console.log(res.status);
      },
    });
  }

  renderTalents() {
    const talentList = this.state.feedData.map((talent) => (
      <TalentCard key={talent.id} id={talent.id} talentData={talent} />
    ));

    return talentList && talentList.length > 0 ? (
      talentList
    ) : (
      <p>There are no talents found for your recruitment company</p>
    );
  }
  render() {
    return (
      <BodyWrapper reload={this.init} loaderData={this.state.loaderData}>
        <section className="page-body">
          <div className="ui container">
            <div className="ui grid">
              <div className="row">
                <div className="four wide column">
                  <CompanyProfile details={this.state.companyDetails} />
                </div>
                <div className="eight wide column">{this.renderTalents()}</div>
                <div className="four wide column">
                  <Card>
                    <FollowingSuggestion />
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </BodyWrapper>
    );
  }
}
