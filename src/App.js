import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';
import { Filter } from './components/Filter/Filter';
import { Chart } from './components/Chart/Chart';
import { Login } from './features/auth/Login';

function App() {

  const [sensor, setSensor] = useState('');

  const auth = useSelector((state) => state.auth);

  if (!auth.loggedIn) {
    return <Login />
  }

  return (
    <div className="wrapper">
      <Router>
        <Switch>
          <Route path="/logout">
            <h1>Logout</h1>
          </Route>
          <Route path="/">
            <Filter onSensorChange={setSensor} />
            <Chart sensor={sensor} />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
