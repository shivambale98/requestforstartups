import React, { Component } from 'react';
import classes from './Login.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';


class Login extends Component {
  render () {
    return (
<div className={classes.back}>
 <h1 className={classes.header}>Request for startups </h1> 
<div className={classes.Loginstyle}>
     <MDBContainer>
       <MDBRow>
         <MDBCol md="12">
            <form class="login-form"action="http://localhost:5000/login" method="POST">
              <p className="h2 text-center mb-4">Sign in</p>
                <div className="grey-text">
                    <MDBInput class="form-control" 
                      label="Email"
                      type="text"
                      icon="user"
                      id="username" 
                      name="Email" 
                      placeholder="Email"/>
                    <MDBInput class="form-control"
                      label="Password"
                      icon="lock" 
                      type="password" 
                      id="password" 
                      name="password" 
                      placeholder="password" />
               </div>
               <div className="text-center">
                    <MDBBtn type="submit">Login</MDBBtn>
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