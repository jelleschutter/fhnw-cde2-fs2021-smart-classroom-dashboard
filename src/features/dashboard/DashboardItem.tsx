import { useEffect, useState } from 'react';
import { Button, Card, CardActions, CardContent, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { request } from '../../helpers/Request';
import { Measurement } from '../../model/Measurement';
import { Sensor as SensorModel } from '../../model/Sensor';

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 13
  },
  attribute: {
    marginTop: 10,
    fontSize: 13
  },
  uuid: {
    fontSize: 14,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
});

type Props = {
  sensor: SensorModel
}

export const DashboardItem = ({ sensor }: Props) => {

  const classes = useStyles();

  const [latestMeasurement, setLatestMeasurement] = useState<Measurement>();
  
  useEffect(() => {
    const fetchData = () => {
      if (sensor) {
        request(`/measurements?q={"sensor_uuid":{"$eq":"${sensor.uuid}"},"$orderby":{"insert_timestamp":"desc"}}?limit=1`)
          .then((result) => {
            if (result.count > 0) {
              setLatestMeasurement(result.items[0]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        setLatestMeasurement(undefined);
      }
    }

    fetchData();

    const id = setInterval(() => {
      fetchData();
    }, 15000);
    return () => clearInterval(id);
  }, [sensor]);

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Sensor
        </Typography>
        <Typography variant="h6" component="h2">
          {sensor.title}
        </Typography>
        <Typography className={classes.uuid} variant="body2" color="textSecondary">
          {sensor.uuid}
        </Typography>
        <Typography className={classes.attribute} color="textSecondary">
          CO2
        </Typography>
        <Typography variant="body1" component="p">
          {latestMeasurement ? Math.round(latestMeasurement.co2) : ''} ppm
        </Typography>
        <Typography className={classes.attribute} color="textSecondary">
          Temperature
        </Typography>
        <Typography variant="body1" component="p">
          {latestMeasurement ? Math.round(latestMeasurement.temperature) : ''} C°
        </Typography>
        <Typography className={classes.attribute} color="textSecondary">
          Humidity
        </Typography>
        <Typography variant="body1" component="p">
          {latestMeasurement ? Math.round(latestMeasurement.humidity) : ''}%
        </Typography>
      </CardContent>
      <CardActions>
        <Button component={Link} size="small" to={`/explore/${sensor.uuid}`}>View latest data</Button>
      </CardActions>
    </Card>
  );
}
