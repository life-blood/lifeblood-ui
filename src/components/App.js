import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home/Home';
import Donate from './Donate/Donate';
import Patients from './Patients/Patients';
import Login from './Auth/Login';
import Map from './Map/Map';
import TopBar from './TopBar';
import PrivateRoute from './Auth/PrivateRoute';

const fakeAuth = {
  authenticate(cb) {
    setTimeout(cb, 500) // fake async
  },
  signout(cb) {
    setTimeout(cb, 500) // fake async
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({ isAuthenticated: true });
  }

  logout() {
    this.setState({ isAuthenticated: false });
    localStorage.clear();
  }

  render() {
    const { isAuthenticated } = this.state;

    return (
      <>
        {isAuthenticated && <TopBar logout={this.logout}/>}
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/login" render={() => <Login auth={fakeAuth} cb={this.login} />} />
          <PrivateRoute auth={isAuthenticated} exact path="/home" component={Home} />
          <PrivateRoute auth={isAuthenticated} exact path="/donate" component={Donate} />
          <PrivateRoute auth={isAuthenticated} exact path="/patients" component={Patients} />
          <PrivateRoute auth={isAuthenticated} exact path="/map" component={Map} />
        </Switch>
      </>
    )
  }
}

export default App;