import React, { Component } from 'react';
import classes from './Ideaforms.module.css';




class Ideaforms extends Component {


    render () {
        return (
        <div className={classes.parent}>    
           <div className={classes.container}>
            <h4 className={classes.title}> startup 1 </h4>
            <button className={classes.btn}>
            {this.props.upvote} upvotes
            </button>
           </div>
       </div>
        );
    }
}

export default Ideaforms;