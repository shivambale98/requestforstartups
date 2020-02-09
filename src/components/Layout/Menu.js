import React from 'react';
import classes from  './Menu.module.css';
import { Link } from 'react-router-dom';

const Menu = () => {
    return(
        <div className={classes.Menustyle}>
            <ul>
                <li> <Link to="/"> HOME </Link> </li>
                <li> <Link to="/login"> lOGIN </Link> </li>
                <li> <Link to="/signup"> SIGN-UP </Link> </li>
                <li> <Link to="/addidea">ADD-IDEA </Link></li>
            </ul>
        </div>
    )
}

export default Menu;