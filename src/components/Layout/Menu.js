import classes from './Menu.module.css';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');
const mainurl = 'http://localhost:5000';//'https://gentle-retreat-77560.herokuapp.com';

class Menu extends Component {
    state = {
        token: '',
        loglink: '/login',
        logstatus: 'Login',
        signlink: '/signup',
        signstatus: 'Signup',
        email: '',
        token: undefined
    };

    componentDidMount() {
        const token = Cookies.get('jwttoken');
        var decodedtoken;
        try {
            decodedtoken = jwt.verify(token, 'heyphil123');
        } catch (err) {
            console.log(err);
        }
        if (decodedtoken) {
            this.setState({
                loglink: '/logout',
                logstatus: 'Logout',
                signlink: '/myideas',
                signstatus: 'Myideas',
                token: decodedtoken
            });
        }
    }

    logout = () => {
        if (this.state.loglink === '/logout') {
            if (this.state.token) {
                console.log('hey');
                Cookies.remove('jwttoken');
                this.props.history.push('/');
            }
        }
    }

    render() {
        return (
            <div className={classes.Menustyle}>
                <ul className={classes.ul}>
                    <li className={classes.li}> <Link className={classes.links} to="/"> HOME </Link> </li>
                    <li className={classes.li}> <Link className={classes.links} onClick={this.logout} to={this.state.loglink}> {this.state.logstatus}</Link> </li>
                    <li className={classes.li}> <Link className={classes.links} to={this.state.signlink}> {this.state.signstatus} </Link> </li>
                    <li className={classes.li}> <Link className={classes.links} to="/addidea">ADD-IDEA </Link></li>
                </ul>
            </div>
        )
    }

};

export default Menu;