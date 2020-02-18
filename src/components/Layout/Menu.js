import classes from './Menu.module.css';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import Logo from './Logo';

import Cookies from 'js-cookie';
const jwt = require('jsonwebtoken');
const mainurl = 'https://gentle-retreat-77560.herokuapp.com';
//const mainurl = 'http://localhost:5000';//

class Menu extends Component {
    state = {
        loglink: '/login',
        logstatus: 'Login',
        signlink: '/signup',
        signstatus: 'Signup',
        email: '',
        token: undefined,
        redirect: false
    };

    componentDidMount() {
        if (this.props.loggedin) {
            this.setState({
                loglink: '/logout',
                logstatus: 'Logout',
                signlink: '/myideas',
                signstatus: 'Myideas',
                token: this.props.loggedin,
                redirect: true
            });
            //loggedin so re-render
        }
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    logout = () => {
        if (this.state.loglink === '/logout') {
            if (this.state.token) {
                //console.log('hey');
                Cookies.remove('jwttoken');
                this.setState({
                    loglink: '/login',
                    logstatus: 'Login',
                    signlink: '/signup',
                    signstatus: 'Signup',
                    redirect: true,
                    token: undefined
                });
                //this.props.history.push('/');
                //rerender
            }
        }
    }

    render() {
        //console.log(this.state);
        return (
            <div className={classes.Menustyle}>
                {this.renderRedirect()}
                <Logo />
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