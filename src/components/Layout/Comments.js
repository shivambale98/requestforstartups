import React from 'react';
import classes from './Comments.module.css'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';


const Comments = (props) => (
    <div className={classes.container}>
        <MDBCol md="6">
            <MDBRow>
                <MDBContainer>
                    <div>
                        <h5>{props.name}</h5>
                        <p className={classes.title}>{props.comment}</p>
                    </div>
                </MDBContainer>
            </MDBRow>
        </MDBCol>
    </div>
);


export default Comments;