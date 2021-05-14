import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Container } from '@material-ui/core';

import { requestItem, requestItems } from '../../helpers/Request';
import { Measurement } from '../../model/Measurement';
import { Chart } from './Chart';
import { Sensor } from '../../model/Sensor';

type Params = {
  uuid: string
}

export const Explore = () => {

  const [sensor, setSensor] = useState<Sensor>();
  const [items, setItems] = useState<Measurement[]>([]);
  const { uuid } = useParams<Params>();

  useEffect(() => {
    const fetchData = () => {
      if (uuid) {
        const date = new Date();
        date.setHours(date.getHours() - 12);

        requestItems<Measurement>(`/sensors/${uuid}/measurements`, {
          insert_timestamp: {
            $gte: {
              $date: date.toISOString()
            }
          },
          $orderby: {
            insert_timestamp: 'desc'
          }
        })
          .then((items) => {
            setItems(items);
          })
          .catch((error) => console.log(error));

        requestItem<Sensor>(`/sensors/${uuid}`)
          .then((result) => {
            setSensor(result);
          })
          .catch((error) => { console.log(error) });
      } else {
        setItems([]);
        setSensor(undefined);
      }
    }

    fetchData();

    const id = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(id);
  }, [uuid]);

  return (
    <Container>
      <h2>{sensor?.title}</h2>
      <p>Count: {items.length}</p>
      <Chart items={items} />
    </Container>
  )
}
