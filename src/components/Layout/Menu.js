import classes from './Menu.module.css';
import mobclasses from './mobilelogo.module.css';
import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Logo from './vertLogo';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Cookies from 'js-cookie';
import Mobilelogo from './mobilelogo';
import background from '../../assets/brain-2062056_1920.png';
import MenuIcon from '@material-ui/icons/Menu';
const jwt = require('jsonwebtoken');
const mainurl = require('../../links');

class Menu extends Component {
    state = {
        loglink: '/login',
        logstatus: 'Login',
        token: undefined,
        homeredirect: false,
        addidearedirect: false,
        logredirect: false
    };

    componentDidMount() {
        console.log(this.props.user);

        if (this.props.user) {
            this.setState({
                loglink: '/',
                logstatus: 'Logout',
                token: this.props.user,
                logredirect: false
            });
            //loggedin so re-render
        }
    }

    menulogo = () => {
        if (this.props.user) {
            return <img className={mobclasses.img}
                src={this.props.user.user.profile_image_url}
                alt="image"
                width={50}
                height={50}
            />
        }
    }

    renderRedirect = () => {
        if (this.state.logredirect) {
            return <Redirect to='/' />
        }
    }

    logout = () => {
        if (this.state.logstatus === 'Logout') {
            if (this.state.token) {
                //console.log('hey');
                Cookies.remove('jwttoken');
                this.setState({
                    loglink: '/login',
                    logstatus: 'Login',
                    logredirect: true,
                    token: undefined
                });
                this.props.updatestate(undefined);
                //this.props.history.push('/');
                //rerender
            }
        }
    }
    //------------------------------mobile menu start----------------------------------------------------------//

    addideabut = () => {
        console.log(this.props.user);
        if (this.props.user) {

            return <Link to='/addidea' className={classes.links} >
                <button className={classes.addidea}>
                    <EmojiObjectsIcon style={{ fontSize: 50 }} />
                    ADD-IDEA
                </button>
            </Link >
        }
    };

    addideabutmobile = () => {
        console.log(this.props.user);
        if (this.props.user) {
            return <Nav.Link href="/addidea">ADD-IDEA</Nav.Link>
        }
    };

    //------------------------------mobile menu over---------------------------------------------------------//   
    render() {
        return (
            <Fragment>
                {/* mobile navbar */}
                <div className={classes.mobile}>
                    {this.renderRedirect()}
                    <Navbar className={classes.mobile} fixed="top" bg="dark" variant="dark">
                        <Navbar.Brand href="/">
                            <Mobilelogo className={classes.moblogo} />
                        </Navbar.Brand>
                        {this.menulogo()}
                        <div className={classes.inner}>
                            <Nav className="mr-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href={this.state.loglink} onClick={this.logout}>{this.state.logstatus}</Nav.Link>
                                {this.addideabutmobile()}
                            </Nav>
                        </div>
                    </Navbar>
                </div>
                {/* mobile navbar */}
                <div className={classes.Menustyle} >
                    <Logo className={classes.logs} />
                    {this.renderRedirect()}
                    <ul className={classes.ul}>
                        <Link className={classes.links} to='/' ><button className={classes.nots}><li className={classes.li}> <HomeOutlinedIcon style={{ fontSize: 50 }} />  HOME  </li> </button></Link>
                        <Link className={classes.links} to={this.state.loglink}> <button onClick={this.logout} className={classes.nots}> <li className={classes.li}> <LockOpenIcon style={{ fontSize: 50 }} /> {this.state.logstatus} </li> </button></Link>
                    </ul>
                    {/* {this.addideabut()} */}
                </div>
            </Fragment>
        )
    }

};

export default Menu;