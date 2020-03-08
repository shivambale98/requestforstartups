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
      <div className={classes.loginstuff}>
        {this.renderRedirect()}
        <h3 className={classes.head}>Want to see your startup idea become a reality?</h3>
        <h4 className={classes.head2}>then rub a genie lamp.</h4>
        <h5 className={classes.head3}>Incase of lack in genie lamps you can </h5>
        <div className={classes.button}>
          <a href={mainurl + '/auth/twitter/reverse'} >
            <Button variant="outline-dark" className={classes.buts}>Login with twitter</Button>
          </a>

        </div>
      </div>
    )
  };
}


export default Login;