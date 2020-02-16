import React, { Component } from "react";
import classes from './LoginFormError.module.css' 



class LoginError extends Component {
    render(){
        return(
            <div className={classes.container}>
                <p className={classes.title}>This is a Login Error</p>
            </div>
        )
    }
};


export default  LoginError;