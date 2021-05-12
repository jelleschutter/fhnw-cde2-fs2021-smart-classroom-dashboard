import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router';

import { logout } from './authSlice';

export const Logout = () => {

  const dispatch = useDispatch();

  dispatch(logout());

  return (
    <Redirect to="/" />
  );
}
