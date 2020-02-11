import React, { Component } from 'react';
import './Welcome.css';
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBMask,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBBtn,
  MDBView,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBFormInline,
  MDBAnimation
} from "mdbreact";
import Ideaforms from './Ideaforms';
import Aux from '../../hoc/Auxiliary';
const mainurl = 'https://gentle-retreat-77560.herokuapp.com';

class Welcome extends Component {
  state = {
    collapseID: "",
    records: [],
    link: ''
  };

  componentDidMount() {
    const ideasurl = 'https://gentle-retreat-77560.herokuapp.com/';
    fetch(ideasurl)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.setState({ records: resdata.recordlist });
        return this.state.records;
      })
      .then(records => {
        records.map(((record, index) => {
          this.getuser(record.data.user[0], index);
        }));
        console.log('done');
      })
      .catch(err => {
        console.log(err);
      });

  }

  getuser = (userid, index) => {
    //console.log(userid);
    var url = mainurl + '/getusers/' + userid;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        var email = resdata.email;
        //console.log(email);
        this.state.records[index].email = email;
        this.setState({});
      })
      .catch(err => {
        console.log(err);
      });
  }

  upvotebuttonHandler = recordid => {

    const url = mainurl + "/idea/upvote/" + recordid;
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        var { record } = resdata;
        var { id } = record;
        var { link } = resdata;
        console.log(resdata);
        var temp = [];
        this.state.records.map(recordt => {
          if (recordt.id === id) {
            var temprecord = recordt;
            recordt = record;
            recordt.email = temprecord.email;
            temp.push(recordt);
          } else {
            temp.push(recordt);
          }
        });
        console.log(temp);

        this.setState({ records: temp });
        this.setState({ link: link });
      })
      .catch(err => {
        console.log(err);
      });
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    const overlay = (
      <div
        id="sidenav-overlay"
        style={{ backgroundColor: "transparent" }}
        onClick={this.toggleCollapse("navbarCollapse")}
      />
    );

    const ideas = this.state.records.map((record, index) => {
      return <Ideaforms
        email={record.email}
        problem={record.data.Problem}
        upvote={record.data.upvote}
        onUpvote={this.upvotebuttonHandler.bind(this, record.id)}
      />
    });

    return (
      <Aux>
        <div id="classicformpage">
          <MDBView>
            <MDBMask className="d-flex justify-content-center align-items-center gradient">
              <MDBContainer>
                <MDBRow>

                  <MDBAnimation
                    type="fadeInLeft"
                    delay=".3s"
                    className="white-text text-center text-md-left col-md-6 mt-xl-5 mb-5"
                  >
                    <h1 className="h1-responsive font-weight-bold">
                      Welcome To Request For Startups
                  </h1>
                    <hr className="hr-light" />
                    <h6 className="mb-4">
                      "Bad shit is coming. It always is in a startup. The odds of getting from launch to liquidity without some kind of disaster happening are one in a thousand. So don't get demoralized."--Paul Graham, co-founder of Y Combinator
                  <br />
                      <br />
                      <br />
                      Please Sign-Up to Add Your startup Idea
                  </h6>

                  </MDBAnimation>
                </MDBRow>
              </MDBContainer>
            </MDBMask>
          </MDBView>
        </div>
        <div id="text">
          <h1>This is where we provide the solution to every problem </h1>
        </div>
        {ideas}
      </Aux>
    );
  }
}


export default Welcome;