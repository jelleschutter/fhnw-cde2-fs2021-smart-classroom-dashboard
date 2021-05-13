import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import './App.scss';
import { Explore } from './features/explore/Explore';
import { Login } from './features/auth/Login';
import { AuthState, RootState } from './model/State';
import { Logout } from './features/auth/Logout';
import { CustomAppBar } from './features/nav/CustomAppBar';
import { Dashboard } from './features/dashboard/Dashboard';

function App() {

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
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/explore/:uuid">
          <Explore />
        </Route>
        <Route path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
