import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.scss';
import { Filter } from './features/graph/Filter';
import { Chart } from './features/graph/Chart';
import { Login } from './features/auth/Login';
import { AuthState, RootState } from './model/State';
import { Logout } from './features/auth/Logout';
import { CustomAppBar } from './features/nav/CustomAppBar';

function App() {

  const [sensor, setSensor] = useState('');

  const auth = useSelector<RootState, AuthState>((state) => state.auth);

  if (!auth.loggedIn) {
    return (
      <Login />
    )
  }

  return (
    <Router>
      <CustomAppBar />
      <Switch>
        <Route path="/logout">
          <Logout />
        </Route>
        <Route path="/">
          <Filter onSensorChange={setSensor} />
          <Chart sensor={sensor} />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
