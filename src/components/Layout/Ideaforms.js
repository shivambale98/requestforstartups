import React, { Component } from 'react';
import classes from './Ideaforms.module.css';
import { MDBRow, MDBContainer, MDBCol } from 'mdbreact';



const Ideaforms = (props) => (
    
    <div className={classes.parent}>
        <div className={classes.container}>
            <MDBCol md="10">
                <MDBRow>
                    <MDBContainer>
                        <div>
                        <p className={classes.head}>problem: </p>   
                        <p className={classes.title}>{props.problem} </p>
                        </div>
                    </MDBContainer>
                </MDBRow>
            </MDBCol>
            <div className={classes.comments}>
                
            <p>
            <i class="fas fa-comment"> Comments
            </i>
            </p>
            </div>
            <button className={classes.btn}>
              {props.upvote}   Upvote 
            </button>
            
        </div>
    </div>
    
);

export default Ideaforms;