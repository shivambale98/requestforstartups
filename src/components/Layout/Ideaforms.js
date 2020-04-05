import React, { Component } from 'react';
import classes from './Ideaforms.module.css';
import Aux from '../../hoc/Auxiliary';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';



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
                <Container maxWidth="lg">
                    <div className={classes.container}>
                        <Paper elevation={0}>
                            <p className={classes.head}>@{props.name} </p>
                            <p className={classes.title}>{props.problem}</p>
                        </Paper>
                    </div>
                </ Container>
                <div className={classes.comments}>
                    <a className={classes.comment} onClick={props.onComment} class="fa fa-comment" ><b> Comment</b></a>
                </div>
                <div className={classes.buttn}>
                    <button className={classes.btn} onClick={props.onUpvote} style={{ color: props.upvotecolor }}>
                        <div className={classes.icon}>
                            < ArrowDropUpIcon />
                            <p className={classes.vote}>
                                {props.upvote}
                            </p>
                        </div>
                    </button>
                </div>
            </div>

        </div>

    </Aux>
);

export default Ideaforms;