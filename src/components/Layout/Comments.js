import React from 'react';
import classes from './Comments.module.css'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';


const Comments  = (props) => (
    <div className={classes.container}>
    <MDBCol md="6">
        <MDBRow>
            <MDBContainer>
                <div>
                <p className={classes.title}>This where all comments will be displayed</p>
                </div> 
            </MDBContainer>
        </MDBRow>
    </MDBCol>
    </div>
);


export default Comments;