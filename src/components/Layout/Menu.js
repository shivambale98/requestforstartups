import React from 'react';
import classes from  './Menu.module.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';


const Menu = () => {
    return(
        <div className={classes.Menustyle}>
            <Logo />
            <ul className={classes.ul}>
                <li className={classes.li}> <Link className={classes.links} to="/"> HOME </Link> </li>
                <li className={classes.li}> <Link className={classes.links} to="/login"> lOGIN </Link> </li>
                <li className={classes.li}> <Link className={classes.links} to="/signup"> SIGN-UP </Link> </li>
                <li className={classes.li}> <Link className={classes.links} to="/addidea">ADD-IDEA </Link></li>
            </ul>
        </div>
    )
}

export default Menu;