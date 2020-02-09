import React, { Component } from 'react';
import classes from './SignUp.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';


class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  handleChange = e => {
    const inputId = e.target.name;
    const value = e.target.value;
    this.setState({ [inputId]: value })
  }

  render() {
    return (
      <div className={classes.area}>
        <h1 className={classes.header2}>Request for startups </h1>
        <div className={classes.Signupstyle}>
          <p value='message'></p>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form class="login-form" action="http://localhost:5000/signup" method="POST">
                  <p className="h2 text-center mb-4">Sign up</p>
                  <div className="grey-text">
                    <MDBInput class="form-control"
                      label="User Name"
                      type="text"
                      icon="user"
                      id="username"
                      name="username"
                      placeholder="username" />
                    <MDBInput class="form-control"
                      label="Email"
                      icon="envelope"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email" />
                    <MDBInput class="form-control"
                      label="Password"
                      type="password"
                      icon="lock"
                      id="password"
                      name="password"
                      placeholder="password" />
                    <MDBInput class="form-control"
                      type="password"
                      label="confirm-password"
                      icon="lock"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="confirmpassword" />
                  </div>
                  <MDBBtn type="submit">SignUp</MDBBtn>
                </form>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    )
  }

};

export default SignUp;