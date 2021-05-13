import store from '../store';
import { logout } from '../features/auth/authSlice';

export const request = (url: string) => {
  const auth = store.getState().auth;
  const fullUrl = `https://glusfqycvwrucp9-db202012181437.adb.eu-zurich-1.oraclecloudapps.com/ords/sensor_datalake/sens${url}`;
  const headers = new Headers();
  headers.set('Authorization', `Basic ${auth.token}`);
  return fetch(fullUrl, {
    method: 'GET',
    headers
  })
    .then(result => {
      if (result.ok) {
        return result.json();
      }
      store.dispatch(
        logout()
      );
      return Promise.reject(new Error(result.statusText));
    });
}