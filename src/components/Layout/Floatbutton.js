import Fab from '@material-ui/core/Fab';
import React from 'react';
import AddIcon from '@material-ui/icons/Add';
import classes from './Floatbutton.module.css'


const FloatButton = () =>(
    <div className={classes.buts}>
    <Fab className={classes.buts} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  </div>

);

export default FloatButton;