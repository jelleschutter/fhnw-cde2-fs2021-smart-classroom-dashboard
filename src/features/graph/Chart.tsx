import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChartComponent from 'react-chartjs-2';
import 'chartjs-adapter-moment';

import { logout } from '../auth/authSlice';
import { AuthState, RootState } from '../../model/State';
import { Measurement } from '../../model/Measurement';

type Props = {
  sensor: string
}

export const Chart = (props: Props) => {

  const [items, setItems] = useState<Measurement[]>([]);
  const auth = useSelector<RootState, AuthState>((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = () => {
      if (auth.loggedIn && props.sensor) {
        const url = `https://glusfqycvwrucp9-db202012181437.adb.eu-zurich-1.oraclecloudapps.com/ords/sensor_datalake/sens/measurements?q={"sensor_uuid":{"$eq":"${props.sensor}"},"$orderby":{"insert_timestamp":"desc"}}`;
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
            setItems(result.items);
          })
          .catch((error) => console.log(error));
      } else {
        setItems([]);
      }
    }

    fetchData();

    const id = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(id);
  }, [dispatch, props, auth]);

  const data = {
    datasets: [
      {
        label: 'CO2',
        data: items.map(o => ({
          x: o.insert_timestamp,
          y: o.co2
        })),
        fill: false,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Temperature',
        data: items.map(o => ({
          x: o.insert_timestamp,
          y: o.temperature
        })),
        fill: false,
        backgroundColor: 'rgb(255, 159, 64)',
        borderColor: 'rgba(255, 159, 64, 0.2)',
      },
      {
        label: 'Humidity',
        data: items.map(o => ({
          x: o.insert_timestamp,
          y: o.humidity
        })),
        fill: false,
        backgroundColor: 'rgb(255, 205, 86)',
        borderColor: 'rgba(255, 205, 86, 0.2)',
      }
    ]
  };

  const options = {
    animation: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'hour',
          displayFormats: {
            hour: 'HH:mm',
            day: 'DD.MM.YYYY'
          }
        }
      },
      y: {
        suggestedMin: 0,
      }
    }
  };

  return (
    <div className="Chart">
      <ChartComponent type="line" data={data} options={options} />
    </div>
  )
}
