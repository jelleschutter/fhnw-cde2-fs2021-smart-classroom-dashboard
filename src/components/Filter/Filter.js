import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../../features/auth/authSlice';

export const Filter = ({ onSensorChange }) => {

  const [items, setItems] = useState([]);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const triggerSensorChange = useCallback(onSensorChange, [onSensorChange]);

  useEffect(() => {
    if (auth.loggedIn) {
      const url = `https://glusfqycvwrucp9-db202012181437.adb.eu-zurich-1.oraclecloudapps.com/ords/sensor_datalake/sens/sensors?q={"$orderby":{"title":"asc"}}`;
      const headers = new Headers();
      headers.set('Authorization', `Basic ${auth.token}`);
      fetch(url, {
        method: 'GET',
        headers
      })
        .then(result => {
          if (result.ok) {
            return result.json();
          }
          dispatch(
            logout()
          );
          return Promise.reject(new Error(result.statusText));
        })
        .then((result) => {
          const sensor = result.items[0]?.uuid ?? '';
          setItems(result.items);
          triggerSensorChange(sensor);
        })
        .catch((error) => {
          console.log(error);
          triggerSensorChange('');
        });
    } else {
      setItems([]);
    }
  }, [dispatch, triggerSensorChange, auth]);

  const handleChange = (event) => {
    triggerSensorChange(event.target.value);
  }

  const options = items.map(sensor => <option key={sensor.uuid} value={sensor.uuid}>{sensor.title}</option>)
  return (
    <select onChange={handleChange}>
      {options}
    </select>
  )
}
