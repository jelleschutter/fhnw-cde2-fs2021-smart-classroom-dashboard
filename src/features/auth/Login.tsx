import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import './Login.scss';
import { login } from './authSlice';
import { Button, TextField } from '@material-ui/core';

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
      <form onSubmit={handleSubmit}>
        <TextField label="Username" onChange={(e) => setUsername(e.target.value)} />
        <TextField type="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
