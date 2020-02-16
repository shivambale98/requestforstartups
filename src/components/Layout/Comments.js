import React from 'react';
import classes from './Comments.module.css'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';


const Comments = (props) => (
    <div className={classes.container}>
        <MDBCol md="12">
            <MDBRow>
                <MDBContainer>
                    <div>
                        <h5 className={classes.head}>{props.name}</h5>
                        <p className={classes.title}><u>{props.comment}</u></p>
                    </div>
                </MDBContainer>
            </MDBRow>
        </MDBCol>
    </div>
);


export default Comments;