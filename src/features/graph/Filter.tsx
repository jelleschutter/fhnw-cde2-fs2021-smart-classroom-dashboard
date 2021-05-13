import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { logout } from '../auth/authSlice';
import { Sensor } from '../../model/Sensor';
import { AuthState, RootState } from '../../model/State';
import { MenuItem, Select } from '@material-ui/core';

type Props = {
  onSensorChange: (sensor: string) => void
}

export const Filter = ({ onSensorChange }: Props) => {

  const [items, setItems] = useState<Sensor[]>([]);
  const [sensor, setSensor] = useState('');

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
          setSensor(sensor);
        })
        .catch((error) => {
          console.log(error);
          onSensorChange('');
          setSensor('');
        });
    } else {
      setItems([]);
    }
  }, [dispatch, onSensorChange, auth]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const sensor = event.target.value as string;
    onSensorChange(sensor);
    setSensor(sensor);
  }

  const options = items.map(sensor => <MenuItem key={sensor.uuid} value={sensor.uuid}>{sensor.title}</MenuItem>)
  return (
    <Select value={sensor} onChange={handleChange}>
      {options}
    </Select>
  )
}
