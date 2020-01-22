import React, { Component } from "react";
import classes from './Forms.module.css'
import Aux from '../hoc/Auxiliary';


class Forms extends Component {
    render () {
        return (
            <Aux>
            <div>
                buttons
            </div>
            <div className={classes.flexo}>Flex item 1</div>
            <div className={classes.flexo}>Flex item 2</div>
            <div className={classes.flexo}>Flex item 3</div>
            </Aux>
        );
    }
}


export default Forms;