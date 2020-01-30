import React from 'react';
import Forms from './containers/Forms';
import Menu from './components/Layout/Menu';
import Welcome from './components/Layout/Welcome';
import SignUp from './components/Layout/SignUp';
import Login from './components/Layout/Login';
import {BrowserRouter, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div>
        <Menu />
        <Route path="/" exact component= {Welcome} />
       
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Forms />
    </div>
    </BrowserRouter>
  );
}

export default App;
