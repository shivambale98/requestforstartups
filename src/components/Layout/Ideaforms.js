import React, { Component } from 'react';
import classes from './Ideaforms.module.css';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';

const Ideaforms = (props) => (
    <div className={classes.parent}>
        <div className={classes.container}>
            <MDBCol md="10">
                <MDBRow>
                    <MDBContainer>
                        <h4 className={classes.title}> {props.problem} </h4>
                    </MDBContainer>
                </MDBRow>
            </MDBCol>
            <button className={classes.btn}>
                {props.upvote} upvotes
            </button>
        </div>
    </div>
);

export default Ideaforms;