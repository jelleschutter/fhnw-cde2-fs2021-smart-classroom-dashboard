import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { request } from '../../helpers/Request';
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
        request(`/measurements?q={"sensor_uuid":{"$eq":"${uuid}"},"$orderby":{"insert_timestamp":"desc"}}`)
          .then((result) => {
            setItems(result.items);
          })
          .catch((error) => console.log(error));

        request(`/sensors?q={"uuid":{"$eq":"${uuid}"}}`)
          .then((result) => {
            if (result.count > 0) {
              setSensor(result.items[0]);
            } else {
              setSensor(undefined);
            }
          })
          .catch((error) => console.log(error));
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
    <div className="explore-wrapper">
      <h2>{sensor?.title}</h2>
      <Chart items={items} />
    </div>
  )
}
