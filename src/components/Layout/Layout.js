import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Welcome from './Welcome';
import Forms from '../../containers/Forms'


const layout = ( props ) => (
    <Aux>
        <Welcome />
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);


export default layout;