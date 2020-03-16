import React from 'react';
import MLogo from '../../assets/mobile_logo.svg';
import classes from './mobilelogo.module.css';


const Mobilelogo = (props) => (
    <div className={classes.logs}>
        <img  className={classes.Logo} src={MLogo} alt="NS_Logo" />
        <img className={classes.img}
                  src="https://pbs.twimg.com/profile_images/1228890736206188545/3s2Ayy7x_normal.jpg"
                  alt="image"
                  width={50}
                  height={60}
                />
    </div>
);

export default Mobilelogo;