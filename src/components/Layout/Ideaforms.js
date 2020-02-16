import React, { Component } from 'react';
import classes from './Ideaforms.module.css';
import Aux from '../../hoc/Auxiliary';
import {
    MDBRow,
    MDBCol,
    MDBContainer,
  } from "mdbreact";
  import { Link } from 'react-router-dom';


const Ideaforms = (props) => (
    <Aux>
<section className={classes.righttoolbar}>    
   <div className={classes.parent}>
       <div className={classes.container}>
            <MDBCol md="10">
                <MDBRow>
                    <MDBContainer>
                        <div>
                        <p className={classes.head}>problem: </p>   
                        <p className={classes.title}>{props.problem}</p>
                        </div>
                        <div className={classes.comments}>
                        <Link className={classes.comment} class="fa fa-comment"  to="/comment"><b> Comment</b></Link>    
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