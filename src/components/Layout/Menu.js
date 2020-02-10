import classes from './Menu.module.css';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Menu extends Component {
    state = {
        token: '',
        loglink: '/login',
        logstatus: 'Login',
        signlink: '/signup',
        signstatus: 'Signup'
    };

    componentDidMount() {
        const token = Cookies.get('jwttoken');
        this.setState({ token: token });
        //console.log(token);
        this.linkassign(token);
    }

    linkassign = (token) => {
        console.log(token);
        const url = 'http://localhost:5000/getmenu/' + token;
        //const formdata = new FormData();
        //formdata.append('toks', token);
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(resdata => {
                this.setState({
                    loglink: resdata.loglink,
                    logstatus: resdata.logstatus,
                    signlink: resdata.signlink,
                    signstatus: resdata.signstatus
                });
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        // if (this.state.loglink === '/login') {
        //     console.log('hey');
        //     Cookies.remove('jwttoken');
        // }
        return (
            <div className={classes.Menustyle}>
                <ul className={classes.ul}>
                    <li className={classes.li}> <Link className={classes.links} to="/"> HOME </Link> </li>
                    <li className={classes.li}> <Link className={classes.links} to={this.state.loglink}> {this.state.logstatus}</Link> </li>
                    <li className={classes.li}> <Link className={classes.links} to={this.state.signlink}> {this.state.signstatus} </Link> </li>
                    <li className={classes.li}> <Link className={classes.links} to="/addidea">ADD-IDEA </Link></li>
                </ul>
            </div>
        )
    }

};

export default Menu;