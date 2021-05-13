import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Login.scss';
import { login } from './authSlice';
import { Button, Grid, Paper, TextField } from '@material-ui/core';

export const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(
      login(btoa(`${username}:${password}`))
    )
  }

  return (
    <div className="login-wrapper">
      <Paper>
        <form onSubmit={handleSubmit}>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            <Grid item>
              <TextField label="Username" onChange={(e) => setUsername(e.target.value)} />
            </Grid>
            <Grid item>
              <TextField type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
            </Grid>
            <Grid item>
              <Button type="submit">Login</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
