import React, { useState, useEffect } from 'react';
import Menu from './components/Layout/Menu';
import Welcome from './components/Layout/Welcome';
import SignUp from './components/Layout/SignUp';
import Login from './components/Layout/Login';
import Addidea from './components/Layout/Addidea';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Comment from './components/Layout/Comment';


const App = () => {
  


  return (
    <BrowserRouter>
      <div>
        <Menu />
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/addidea" component={Addidea} />
        <Route path="/comment" component={Comment} />
      </div>
    </BrowserRouter>
  );
}

export default App;
