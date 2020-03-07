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
import DrawerToggleButton from './components/Layout/DrawerToggleButton'
import { Fragment } from 'react';
const jwt = require('jsonwebtoken');

class App extends Component {

  constructor(props) {
    super(props);
    this.updatestate = this.updatestate.bind(this);
  }

  state = {
    loggedin: false,
    menuOpen: false
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState)=> {
       return {menuOpen: !prevState.menuOpen};
    });
  };
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

      if (this.state.menuOpen) {
        menu = <Menu /> ;
    }
  
      return <Menu loggedin={this.state.loggedin} />
    }

    const login = () => {
      return <Login updatestate={this.updatestate} />
    }

    const welcome = () => {
      return <Welcome loggedin={this.state.loggedin} />
    }

    const signup = () => {
      return <SignUp updatestate={this.updatestate} />
    }

    return (
      <Fragment>
      <div>
    <DrawerToggleButton click={this.props.drawerClickedHandler}/>
      </div>
      <BrowserRouter>
          <Route component={menu}
           drawerClickedHandler={this.drawerToggleClickHandler}/>
          <Route path="/" exact component={welcome} />
          <Route path="/signup" component={signup} />
          <Route path="/login" component={login} />
          <Route path="/addidea" component={Addidea} />
          <Route path='/logout' component={welcome} />
          <Route path='/myideas' component={my_ideas} />
          <Route path="/comments/:id" component={Comment} />
      </BrowserRouter>
      </Fragment>
    );
  }

}


export default App;
