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
    user: undefined,
    menuOpen: false
  }

  drawerToggleClickHandler = () => {
    this.setState((prevState) => {
      return { menuOpen: !prevState.menuOpen };
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
      //console.log(decodedtoken);
      this.setState({
        user: decodedtoken
      });
    } else {
      this.setState({
        user: undefined
      });
    }
    this.updatestate(decodedtoken);
  }

  updatestate(user) {
    // console.log(user);
    this.setState({
      user: user
    });
  }

  render() {
    const menu = () => {
      return <Menu user={this.state.user}
        updatestate={this.updatestate}
      />

      if (this.state.menuOpen) {
        menu = <Menu />;
      }

      return <Menu loggedin={this.state.loggedin} />
    }

    const login = () => {
      return <Login updatestate={this.updatestate} />
    }

    const welcome = () => {
      return <Welcome user={this.state.user} />
    }

    const comment = () => {
      return <Comment user={this.state.user} />
    }

    return (
      <Fragment>

        <BrowserRouter>
          <Route component={menu}
            drawerClickedHandler={this.drawerToggleClickHandler} />
          <Route path="/" exact component={welcome} />
          <Route path="/ideas" component={welcome} />
          <Route path="/login" component={login} />
          <Route path="/login/:token" component={login} />
          <Route path="/addidea" component={Addidea} />
          <Route path='/logout' component={welcome} />
          <Route path='/myideas' component={my_ideas} />
          <Route path="/comments/:id" component={comment} />
        </BrowserRouter>
      </Fragment>
    );
  }

}


export default App;
