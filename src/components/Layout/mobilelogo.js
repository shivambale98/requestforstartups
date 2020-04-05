import React from 'react';
import MLogo from '../../assets/mobile_logo.svg';
import classes from './mobilelogo.module.css';


const Mobilelogo = (props) => (
    <div className={classes.logs}>
        <img className={classes.Logo} src={MLogo} alt="NS_Logo" />
    </div>
);

export default Mobilelogo;