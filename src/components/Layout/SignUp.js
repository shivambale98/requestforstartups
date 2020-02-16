import React, { Component } from 'react';
import classes from './SignUp.module.css';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import nsVerticalLogo from '../../assets/NS_logo_Vertical.svg';
const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
//const mainurl = 'http://localhost:5000';//
import ReactDOM from "react-dom";



class SignUp extends Component {
  //form validation
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        email: "",
        password: ""
      },
      formErrors: {
        email: "",
        password: ""
      },
      formValidity: {
        email: false,
        password: false
      },
      isSubmitting: false
    };
  }

  handleValidation = target => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isEmail = name === "email";
    const isPassword = name === "password";
    const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    validity[name] = value.length > 0;
    fieldValidationErrors[name] = validity[name]
      ? ""
      : `${name} is required and cannot be empty`;

    if (validity[name]) {
      if (isEmail) {
        validity[name] = emailTest.test(value);
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be a valid email address`;
      }
      if (isPassword) {
        validity[name] = value.length >= 3;
        fieldValidationErrors[name] = validity[name]
          ? ""
          : `${name} should be 3 characters minimum`;
      }
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      alert("Form is validated! Submitting the form...");
      this.setState({ isSubmitting: false });
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.handleValidation(target);
      }
      this.setState({ isSubmitting: false });
    }
  };


//validation complete

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
        <img src={nsVerticalLogo} className={classes.images} alt="NS_Logo" />
        <div className={classes.Signupstyle}>
          <p value='message'></p>
          <MDBContainer>
            <MDBRow>
              <MDBCol md="12">
                <form class="login-form" action={mainurl + '/signup'} method="POST" onSubmit={this.handleSubmit}>
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
                      placeholder="email"
                      className={`form-control ${
                        formErrors.email ? "is-invalid" : ""
                      }`} 
                      onChange={this.handleChange}
                      value={formValues.email}
                      />
                   <div className="invalid-feedback">{formErrors.email}</div>
                    <MDBInput class="form-control"
                      label="Password"
                      type="password"
                      icon="lock"
                      id="password"
                      name="password"
                      placeholder="password"
                      className={`form-control ${
                        formErrors.password ? "is-invalid" : ""
                      }`} 
                      onChange={this.handleChange}
                      value={formValues.password}
                      />
               <div className="invalid-feedback">{formErrors.password}</div>     
    

                    <MDBInput class="form-control"
                      type="password"
                      label="confirm-password"
                      icon="lock"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="confirmpassword" 
                      />
                  </div>
                  <MDBBtn   
                     type="submit"
                     disabled={isSubmitting}>SignUp
                     </MDBBtn>
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