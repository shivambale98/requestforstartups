import React from 'react';
/*import './SignUp.css';*/
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';


const SignUp = () => {
  return (
    <div>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="6">
            <form action="http://localhost:5000/signup" method="POST">
              <p className="h2 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <MDBInput
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  validate
                  error="wrong"
                  success="right"
                  name="email"
                />
                <MDBInput
                  label="Password"
                  icon="exclamation-triangle"
                  group
                  type="text"
                  validate
                  error="wrong"
                  success="right"
                  name="password"
                />
                <MDBInput
                  label="Confirm password"
                  icon="lock"
                  group
                  type="password"
                  validate
                  name="confirmPassword"
                />
              </div>
              <div className="text-center">
                <MDBBtn color="primary" type='submit'>SignUp</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  )
}


export default SignUp;