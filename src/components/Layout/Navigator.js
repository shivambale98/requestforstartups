import React, { Component } from 'react';
import Bulb from '../../assets/bulb.png';
import classes from './Navigator.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';

class Navigator extends Component {
    render() {
        return(
<Container className={classes.main}>
  <Navbar  className={classes.container} fixed="top" expand="md" variant="light">
  <ul className={classes.ul}>
      <li className={classes.li}><a className={classes.links} > #NEWEST </a></li>
      <li className={classes.li}><a className={classes.links} > #TRENDING </a></li>
      <li className={classes.li}><a className={classes.links} > #TOP </a></li>
    </ul>
    <div className={classes.adds}>
    <Link to='/addidea' className={classes.links} >
                <button className={classes.addidea}>
                    <EmojiObjectsIcon style={{ fontSize: 50 }} />
                    ADD-IDEA
                </button>
            </Link >
    </div>
  </Navbar>
</Container>
        );
    }
}  

export default Navigator;