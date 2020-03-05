import React from 'react';
import classes from './Addcomment.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


const Addcomment = (props) => (
    
    <div 
    className={classes.Modal}
    style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
         opacity: props.show ? '1' : '0'
    }}>
        <Form>
     <h3>You are replying to..</h3>
     <Form.Group controlId="exampleForm.ControlTextarea1">
    <Form.Control as="textarea" rows="3" />
  </Form.Group>
  </Form>
  <Button variant="primary">Post</Button>{' '}
    </div>
    
);


export default Addcomment;

