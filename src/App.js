import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import './App.css';
import Filter from './components/Filter/Filter';
import Chart from './components/Chart/Chart';
import Login from './components/Login/Login';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      sensor: '',
      token: localStorage.getItem('token')
    };

    this.handleSensorChange = this.handleSensorChange.bind(this);
    this.setToken = this.setToken.bind(this);
  }

  handleSensorChange(sensor) {
    this.setState((state) => {
      state.sensor = sensor;
      return state;
    });
  }

  setToken(token) {
    this.setState((state) => {
      state.token = token;
      return state;
    });
    localStorage.setItem('token', token);
  }

  getToken() {
    return this.state.token;
  }

  render() {
    const token = this.getToken()

    if (!token) {
      return <Login setToken={this.setToken} />
    }

    return (
      <div className="wrapper">
        <Router>
          <Switch>
            <Route path="/logout">
              <h1>Logout</h1>
            </Route>
            <Route path="/">
              <Filter token={token} setToken={this.setToken} onSensorChange={this.handleSensorChange} />
              <Chart token={token} setToken={this.setToken} sensor={this.state.sensor} />
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App;
