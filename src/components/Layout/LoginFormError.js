import React, { Component } from "react";
import classes from './LoginFormError.module.css'



class LoginError extends Component {
    render() {
        return (
            <div className={classes.usermessage} className={classes.usermessageerror}>{this.props.error}</div>
        )
    }
};


export default LoginError;