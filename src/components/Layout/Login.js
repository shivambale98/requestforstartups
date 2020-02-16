import React, { Component } from 'react';
import classes from './Login.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from 'mdbreact';
import nsVerticalLogo from '../../assets/NS_logo_Vertical.svg';
//import * as EmailValidator from "email-validator";
//import * as Yup from "yup";

class Login extends Component {
  render() {
//<Formik
  // validationSchema = {Yup.object().shape({
    //   email: Yup.string()
//        .email()
//        .required("Required")
//        .min(6, "Password is too short - should be 6 characters minimum")
//        .matches(/(?=.*[0-9])/, "Password must contain a number")
//    })}
//    >

// </Formik>  

//   {props => {
//     const {
//       values,
//       touched,
//       errors,
//       handleChange,
//       handleBlur,
//       handleSubmit
//     } = props;
//   }}

    return (
   <div className={classes.back}>
        <h1 className={classes.header}>Request for startups </h1>
        <img src={nsVerticalLogo} className={classes.images} alt="NS_Logo" />
        <div className={classes.Loginstyle}>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form class="login-form" action="http://localhost:5000/login" method="POST">
                  <p className="h2 text-center mb-4">Sign in</p>
                  <div className="grey-text">
                    <MDBInput class="form-control"
                      label="Email"
                      type="text"
                      icon="user"
                      id="email"
                      name="email"
                     // value={values.email}
                      placeholder="Email"
                     // className={errors.email && touched.email && "errors"} 
                      />
                    <MDBInput class="form-control"
                      label="Password"
                      icon="lock"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="password"
                     // className={errors.password && touched.password && "errors"}  
                      />
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