import classes from './Menu.module.css';
import { Link } from 'react-router-dom';
import React, { Component, Fragment } from 'react';
import { Nav, Navbar,  NavDropdown } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import Logo from './vertLogo';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import Cookies from 'js-cookie';
import Mobilelogo from './mobilelogo';
import MenuIcon from '@material-ui/icons/Menu';
const jwt = require('jsonwebtoken');
const mainurl = require('../../links');

class Menu extends Component {
    state = {
        loglink: '/login',
        logstatus: 'Login',
        token: undefined,
        redirect: false
    };

    componentDidMount() {
        console.log(this.props.user);

        if (this.props.user) {
            this.setState({
                loglink: '/logout',
                logstatus: 'Logout',
                token: this.props.user,
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
                    redirect: true,
                    token: undefined
                });
                //this.props.history.push('/');
                //rerender
            }
        }
    }
//------------------------------mobile menu----------------------------------------------------------//

//------------------------------mobile menu---------------------------------------------------------//   
    render() {
        //console.log(this.state);
        return (
        <Fragment>
 {/* mobile navbar */}
 <div className={classes.mobile}>
 <Navbar  collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">
      <Mobilelogo />
      </Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#features">HOME</Nav.Link>
      <Nav.Link href="#pricing">lOGIN</Nav.Link>
      <Nav.Link href="#pricing">ADD-IDEA</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>

</div>

{/* mobile navbar */}
            <div className={classes.Menustyle}>
               <Logo className={classes.logs} />
                {this.renderRedirect()}
                <ul className={classes.ul}>
                    <button className={classes.nots}><li className={classes.li}> <Link className={classes.links} to="/"><HomeOutlinedIcon style={{ fontSize: 50 }} />  HOME </Link> </li> </button>
                    <button className={classes.nots}> <li className={classes.li}> <Link className={classes.links} onClick={this.logout} to={this.state.loglink}><LockOpenIcon style={{ fontSize: 50 }} /> {this.state.logstatus}</Link> </li> </button>
                </ul>
                <button className={classes.addidea}>
                    <EmojiObjectsIcon style={{ fontSize: 50 }} />
                    <Link className={classes.links} to="/addidea">ADD-IDEA </Link>
                </button>
            </div>
        </Fragment>
        )
    }

};

export default Menu;