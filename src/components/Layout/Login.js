import React, { Component } from 'react';
import classes from './Login.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import nsVerticalLogo from '../../assets/NS_logo_Vertical.svg';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
//const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
const mainurl = 'http://localhost:5000';//

class Login extends Component {

  state = {
    email: '',
    password: '',
    redirect: false
  }

  handelchnage = (event) => {
    if (event.target.name == 'email') {
      this.setState({ email: event.target.value });
    }
    if (event.target.name == 'password') {
      this.setState({ password: event.target.value });
    }
  }

  submit = () => {
    fetch(mainurl + '/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        const token = resdata.token;
        Cookies.set('jwttoken', token);
        this.props.history.push('/');
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={classes.back}>
        <h1 className={classes.header}>Request for startups </h1>
        <img src={nsVerticalLogo} className={classes.images} alt="NS_Logo" />
        <div className={classes.Loginstyle}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form class="login-form" action={mainurl + '/login'} method="POST">
                  <p className="h2 text-center mb-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput class="form-control"
                      label="Email"
                      type="text"
                      icon="user"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handelchnage}
                    />
                    <MDBInput class="form-control"
                      label="Password"
                      icon="lock"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.handelchnage}
                    />
                  </div>
                  <div className="text-center">
                    <MDBBtn onClick={this.submit}>Login</MDBBtn>
                  </div>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div >
      </div>
    )
  };
}


export default Login;