import React, { Component } from 'react';
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
    token: ''
  }


  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({ isAuthenticated: true, user: user, token: token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuthenticated: false, token: '', user: null })
  };

  render() {

    let content = !!this.state.isAuthenticated ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
          </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:5000/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:4000/twitter/reverse" />
      );

    return (
      <div className="App">
        {content}
      </div>
    )
  };
}


export default Login;