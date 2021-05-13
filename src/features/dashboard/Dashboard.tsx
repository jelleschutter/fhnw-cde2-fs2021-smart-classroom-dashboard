import { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';

import { request } from '../../helpers/Request';
import { Sensor as SensorModel } from '../../model/Sensor';
import { DashboardItem } from './DashboardItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16)
      }
    }
  })
);

export const Dashboard = () => {

  const classes = useStyles();

  const [items, setItems] = useState<SensorModel[]>([]);

  useEffect(() => {
    request(`/sensors?q={"$orderby":{"title":"asc"}}`)
      .then((result) => {
        setItems(result.items);
      })
      .catch((error) => {
        console.log(error);
      });
  });

  const dashboardItems = items.map(sensor => <DashboardItem key={sensor.uuid} sensor={sensor} />)
  return (
    <div className={classes.root}>
      {dashboardItems}
    </div>
  )
}
