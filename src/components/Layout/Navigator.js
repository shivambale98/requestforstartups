import React, { Component } from 'react';
import Bulb from '../../assets/bulb.png';
import classes from './Navigator.module.css';
import { Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import EmojiObjectsIcon from '@material-ui/icons/EmojiObjects';
import { Modal, ModalBody, ModalHeader } from "shards-react";
import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Aux from '../../hoc/Auxiliary';


const mainurl = require('../../links');
class Navigator extends Component {

  state = {
    records: []
  };

  getallideas = () => {
    const ideasurl = mainurl + '/';
    fetch(ideasurl)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        console.log(resdata);
        this.props.setideas(resdata.ideas);
      })
      .catch(err => {
        console.log(err);
      });

  }

  orderideas(type) {
    fetch(mainurl + '/idea/orderideas/' + type)
      .then(res => {
        return res.json();
      })
      .then(resdata => {
        this.props.setideas(resdata.ideas);
        console.log(resdata);
      })
      .catch(err => {
        console.log(err);
      });
  }

  addideahandler() {
    if (this.props.user) {
      this.setState({ addidearedirect: true });
    } else {
      this.setState({ addideamodel: !this.state.addideamodel });
    }

  }

  addidearedirecthandler = () => {
    if (this.state.addidearedirect) {
      return <Redirect to={'/addidea'} />
    }
  }



  render() {
    return (
      <Aux>
        <Container>
          <Navbar className={classes.container} fixed="top" expand="md" variant="light">
            <ul className={classes.ul}>
              <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'NEWEST')}> #NEWEST </a></li>
              <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'TRENDING')}> #TRENDING </a></li>
              <li className={classes.li}><a className={classes.links} onClick={this.orderideas.bind(this, 'TOP')}> #TOP </a></li>
            </ul>
            <div className={classes.adds}>
          <Modal open={this.state.addideamodel} toggle={this.addideahandler.bind(this)}>
            <ModalHeader>Login Error</ModalHeader>
            <ModalBody>👋 Hello there, looks like your not logged in</ModalBody>
            <ModalBody><Link className={classes.liks} to='/login'><b>login</b></Link> to addIdea</ModalBody>
          </Modal>
          {this.addidearedirecthandler()}
              <button className={classes.addidea} onClick={this.addideahandler.bind(this)}>
                <EmojiObjectsIcon style={{ fontSize: 50 }} />
                    ADD-IDEA
                </button>
            </div>
          </Navbar>
        </Container>
        </Aux>
    );
  }
}

export default Navigator;