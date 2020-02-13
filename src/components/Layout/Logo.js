import React from 'react';
import nsLogo from '../../assets/NS_logo_Regular.svg';
import classes from './Logo.module.css';


const logo = (props) => (
    <div className={classes.Logo}>
        <img src={nsLogo} alt="NS_Logo" />
    </div>
);

export default logo;