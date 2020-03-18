import Fab from '@material-ui/core/Fab';
import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import fclasses from './Floatbutton.module.css'


const FloatButton = (props) => (
  <div className={fclasses.buts}>
    <Fab className={fclasses.buts} color="primary" aria-label="add">
      <AddIcon />
    </Fab>
  </div>

);

export default FloatButton;