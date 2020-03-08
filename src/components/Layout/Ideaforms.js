import React, { Component } from 'react';
import classes from './Ideaforms.module.css';
import Aux from '../../hoc/Auxiliary';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Ideaforms = (props) => (
    <Aux>

        <div className={classes.righttoolbar}>
            <div className={classes.parent}>
                <div >
                    <img className={classes.img}
                        src={props.pic}
                        alt="image"
                        width={70}
                        height={70}

                    />
                </div>
                <div className={classes.container}>
                    <p className={classes.head}>{props.name} </p>
                    <p className={classes.title}>{props.problem}</p>

                </div>
                <div className={classes.comments}>
                    <Link className={classes.comment} onClick={props.onComment} class="fa fa-comment" ><b> Comment</b></Link>
                </div>
                <div className={classes.buttn}>
                    <button className={classes.btn} onClick={props.onUpvote} style={{ background: props.upvotecolor }}>
                        {props.upvote}   Upvote
                    </button>
                </div>
            </div>
        </div>
    </Aux>
);

export default Ideaforms;