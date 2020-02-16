import React, { useState, useEffect, Component } from 'react';
import Welcome from './components/Layout/Welcome';
import SignUp from './components/Layout/SignUp';
import Login from './components/Layout/Login';
import Addidea from './components/Layout/Addidea';
import Menu from './components/Layout/Menu';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import my_ideas from './components/Layout/my_ideas';
import Cookies from 'js-cookie';
import Comment from './components/Layout/Comment';
const jwt = require('jsonwebtoken');

class App extends Component {

  constructor(props) {
    super(props);
    this.updatestate = this.updatestate.bind(this);
  }

  state = {
    loggedin: false
  }

  componentDidMount() {
    const token = Cookies.get('jwttoken');
    var decodedtoken;
    try {
      decodedtoken = jwt.verify(token, 'heyphil123');
    } catch (err) {
      console.log(err);
    }
    if (decodedtoken) {
      this.setState({
        loggedin: true
      });
    } else {
      this.setState({
        loggedin: false
      });
    }
  }

  updatestate(loggedin) {
    this.setState({
      loggedin: loggedin
    });
  }

  render() {
    console.log(this.state);
    const menu = () => {
      return <Menu loggedin={this.state.loggedin} />
    }

    const login = () => {
      return <Login updatestate={this.updatestate} />
    }

    return (
      <BrowserRouter>
        <div>
          <Route component={menu} />
          <Route path="/" exact component={Welcome} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={login} />
          <Route path="/addidea" component={Addidea} />
          <Route path='/logout' component={Welcome} />
          <Route path='/myideas' component={my_ideas} />
          <Route path="/comments/:id" component={Comment} />
        </div>
      </BrowserRouter>
    );
  }

}


export default App;
