import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import classes from './Login.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import nsVerticalLogo from '../../assets/NS_logo_Vertical.svg';
import LoginFormError from '../Layout/LoginFormError';
import TwitterLogin from 'react-twitter-auth';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { Button } from 'react-bootstrap';
import Cryptr from 'cryptr';


const cryptr = new Cryptr('heyphil123');
const mainurl = require('../../links');

class Login extends Component {
  state = {
    isAuthenticated: false,
    user: null,
    token: '',
    redirect: false
  }

  componentDidMount() {
    //console.log(window.location.pathname);
    var path = window.location.pathname;
    var token, decodedtoken;
    var enctoken = path.split('/login/')[1];
    if (enctoken) {
      fetch(mainurl + '/getusertoken/' + enctoken)
        .then(res => {
          return res.json();
        })
        .then(resdata => {
          Cookies.set('jwttoken', resdata.decodedtoken);

          this.setState({
            redirect: true,
            token: resdata.token
          });

          //this.props.updatestate(resdata.token);

        });

    } else {
      this.setState({
        redirect: false
      });
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      this.props.updatestate(this.state.token);
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div className={classes.loginstuff}>
        {this.renderRedirect()}
        <h2 className={classes.head}>Want to see your startup idea become a reality?</h2>
        <h3 className={classes.head2}>then rub a genie lamp</h3>
        <h4 className={classes.head3}>Incase of lack in genie lamps you can Login and add your idea here</h4>
        <div className={classes.button}>
          <a href={mainurl + '/auth/twitter/reverse'} >
            <Button variant="danger" className={classes.buts}>LOGIN WITH TWITTER</Button>
          </a>
        </div>
      </div>
    )
  };
}


export default Login;