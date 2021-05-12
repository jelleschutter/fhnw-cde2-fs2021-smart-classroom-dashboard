import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../auth/authSlice';
import { Sensor } from '../../model/Sensor';
import { AuthState, RootState } from '../../model/State';

type Props = {
  onSensorChange: (sensor: string) => void
}

export const Filter = ({ onSensorChange }: Props) => {

  const [items, setItems] = useState<Sensor[]>([]);

  const dispatch = useDispatch();
  const auth = useSelector<RootState, AuthState>((state) => state.auth);

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
          onSensorChange(sensor);
        })
        .catch((error) => {
          console.log(error);
          onSensorChange('');
        });
    } else {
      setItems([]);
    }
  }, [dispatch, onSensorChange, auth]);

  const handleChange = (event: React.FormEvent<HTMLSelectElement>) => {
    onSensorChange(event.currentTarget.value);
  }

  const options = items.map(sensor => <option key={sensor.uuid} value={sensor.uuid}>{sensor.title}</option>)
  return (
    <select onChange={handleChange}>
      {options}
    </select>
  )
}
