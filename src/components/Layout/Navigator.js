import React, { Component } from 'react';
import Bulb from '../../assets/bulb.png';
import classes from './Navigator.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';

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
    <div className={classes.image}>
     <img className={classes.image} src={Bulb} alt="NS_Logo" />
     </div>
  </Navbar>
</Container>
        );
    }
}  

export default Navigator;