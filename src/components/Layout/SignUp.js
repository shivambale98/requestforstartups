import React, { Component } from 'react';
import classes from './SignUp.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import nsVerticalLogo from '../../assets/NS_logo_Vertical.svg';
import Cookies from 'js-cookie';

//const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
const mainurl = 'http://localhost:5000';//



class SignUp extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmpassword: ''
  }

  handelchnage = (event) => {

    if (event.target.name == 'name') {
      this.setState({ name: event.target.value });
    }
    if (event.target.name == 'email') {
      this.setState({ email: event.target.value });
    }
    if (event.target.name == 'password') {
      this.setState({ password: event.target.value });
    }
    if (event.target.name == 'confirmpassword') {
      this.setState({ confirmpassword: event.target.value });
    }
  }

  submit = () => {
    fetch(mainurl + '/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmpassword: this.state.confirmpassword
      })
    })
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        console.log(resdata);
        var message = resdata.message;
        var token = resdata.token;
        if (message === 'done') {
          Cookies.set('jwttoken', token);
          this.props.updatestate(true);
        } else {

        }

      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className={classes.area}>
        <h1 className={classes.header2}>Request for startups </h1>
        <img src={nsVerticalLogo} className={classes.images} alt="NS_Logo" />
        <div className={classes.Signupstyle}>
          <p value='message'></p>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form class="login-form" action={mainurl + '/signup'} method="POST">
                  <p className="h2 text-center mb-4">Sign up</p>
                  <div className="grey-text">
                    <MDBInput class="form-control"
                      label="User Name"
                      type="text"
                      icon="user"
                      id="username"
                      name="name"
                      placeholder="username"
                      value={this.state.name}
                      onChange={this.handelchnage}
                    />
                    <MDBInput class="form-control"
                      label="Email"
                      icon="envelope"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="email"
                      value={this.state.email}
                      onChange={this.handelchnage}
                    />
                    <MDBInput class="form-control"
                      label="Password"
                      type="password"
                      icon="lock"
                      id="password"
                      name="password"
                      placeholder="password"
                      value={this.state.password}
                      onChange={this.handelchnage}
                    />
                    <MDBInput class="form-control"
                      type="password"
                      label="confirm-password"
                      icon="lock"
                      id="confirmPassword"
                      name="confirmpassword"
                      placeholder="confirmpassword"
                      value={this.state.confirmpassword}
                      onChange={this.handelchnage}
                    />
                  </div>
                  <MDBBtn onClick={this.submit}>SignUp</MDBBtn>
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