import React, { Component } from 'react';
import classes from './Ideaforms.module.css';
import Aux from '../../hoc/Auxiliary';
import {
    MDBRow,
    MDBCol,
    MDBContainer,
  } from "mdbreact";

const Ideaforms = (props) => (
    <Aux>
<section className={classes.righttoolbar}>    
   <div className={classes.parent}>
       <div className={classes.container}>
            <MDBCol md="6">
                <MDBRow>
                    <MDBContainer>
                        <div>
                        <p className={classes.head}>problem: </p>   
                        <p className={classes.title}>{props.problem} </p>
                        </div>
                        <div className={classes.comments}>
                        <p>
                        <i class="fas fa-comment"> Comments
                        </i>
                        </p>
                       </div> 
                    </MDBContainer>
                </MDBRow>
            </MDBCol>
            <button className={classes.btn}>
              {props.upvote}   Upvote 
            </button>
        </div>
    </div>
    </section>
    </Aux>
);

export default Ideaforms;