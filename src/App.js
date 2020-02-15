import React, { useState, useEffect } from 'react';
import Welcome from './components/Layout/Welcome';
import SignUp from './components/Layout/SignUp';
import Login from './components/Layout/Login';
import Addidea from './components/Layout/Addidea';
import Menu from './components/Layout/Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import my_ideas from './components/Layout/my_ideas';
import Cookies from 'js-cookie';
import Comment from './components/Layout/Comment';


const App = () => {


  return (
    <BrowserRouter>
      <div>
        <Route component={Menu} />
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/addidea" component={Addidea} />
        <Route path='/logout' component={Welcome} />
        <Route path='/myideas' component={my_ideas} />
        <Route path="/comment" component={Comment} />
      </div>
    </BrowserRouter>
  );
}


export default App;
