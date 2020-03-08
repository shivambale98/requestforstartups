import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import classes from './Login.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import nsVerticalLogo from '../../assets/NS_logo_Vertical.svg';
import LoginFormError from '../Layout/LoginFormError';
import TwitterLogin from 'react-twitter-auth';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';

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
    var token = path.split('/')[2];
    var decodedtoken;
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      this.setState({
        redirect: true
      });
      Cookies.set('jwttoken', token);
    } else {
      this.setState({
        redirect: false
      });
    }
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div class={classes.loginstuff}>
        {this.renderRedirect()}
        <h3>Want to see your startup idea become a reality?</h3>
        <h4>then rub a genie lamp</h4>
        <h5>incase of lack in genie lamps you can
        <a href={mainurl + '/auth/twitter/reverse'} >
            <button>Login</button>
          </a>
        </h5>
      </div>
    )
  };
}


export default Login;