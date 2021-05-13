import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import { Button, createMuiTheme, CssBaseline, ThemeProvider, useMediaQuery } from '@material-ui/core';

import './App.scss';
import { Filter } from './features/graph/Filter';
import { Chart } from './features/graph/Chart';
import { Login } from './features/auth/Login';
import { AuthState, RootState } from './model/State';
import { Logout } from './features/auth/Logout';

function App() {

  const [sensor, setSensor] = useState('');

  const auth = useSelector<RootState, AuthState>((state) => state.auth);

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );


  if (!auth.loggedIn) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Login />
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/">
            <Filter onSensorChange={setSensor} />
            <Button component={Link} to="/logout">Logout</Button>
            <Chart sensor={sensor} />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
