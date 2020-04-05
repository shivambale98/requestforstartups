import React from 'react';
import { Component } from 'react';
import classes from './Addcomment.module.css'
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, FormTextarea } from "shards-react";



class Addcomment extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { value: null };
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    const { value } = this.state;
    return (
      <div>
        <Modal open={this.props.open} toggle={this.props.postComment}>
          <ModalHeader>Post your comment</ModalHeader>
          <ModalBody>
            <FormTextarea onChange={this.handleChange} />
            <Button onClick={this.toggle}>Post</Button>
          </ModalBody>
        </Modal>
      </div>
    );
  }

}

export default Addcomment;

