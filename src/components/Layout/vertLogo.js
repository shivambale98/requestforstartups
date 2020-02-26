import React from 'react';
import nsLogo from '../../assets/NS_logo_BGWhite_Vertical.svg';
import classes from './vertLogo.module.css';


const logo = (props) => (
    <div>
        <img  className={classes.Logo} src={nsLogo} alt="NS_Logo" />
    </div>
);

export default logo;