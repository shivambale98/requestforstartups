import React, { Component } from 'react';
import classes from './Login.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
const mainurl = 'https://gentle-retreat-77560.herokuapp.com';

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
        var decodedtoken;
        try {
          decodedtoken = jwt.verify(token, 'heyphil123');
        } catch (err) {

        }
        if (decodedtoken) {
          const email = decodedtoken.email;
          Cookies.set('jwttoken', email);
          this.props.history.push('/');
          //this.setState({ redirect: true });
        }

      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (

      <div className={classes.back}>
        <h1 className={classes.header}>Request for startups </h1>
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