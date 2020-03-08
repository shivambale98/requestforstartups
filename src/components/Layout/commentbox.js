import React from 'react';
import classes from './Comment.module.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'


const commentbox = (props) => (

    <div>
        <div className={classes.parentc}>
            <img className={classes.imgc}
                src={props.userimage}
                alt="image"
                width={50}
                height={50}

            />
            <div className={classes.containerc}>
                <p className={classes.head}>@{props.username}</p>
                <p className={classes.title}>{props.usercomment}</p>
            </div>
        </div>

    </div>

);


export default commentbox;

