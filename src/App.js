import React from 'react';
import Welcome from './components/Layout/Welcome';
import SignUp from './components/Layout/SignUp';
import Login from './components/Layout/Login';
import Addidea from './components/Layout/Addidea';
import Menu from './components/Layout/Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Route component={Menu} />
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={Login} />
        <Route path="/addidea" component={Addidea} />
        <Route path='/logout' component={Welcome} />
      </div>
    </BrowserRouter>
  );
}


export default App;
