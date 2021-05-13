import ChartComponent from 'react-chartjs-2';
import 'chartjs-adapter-moment';

import { Measurement } from '../../model/Measurement';

type Props = {
  items: Measurement[]
}

export const Chart = ({ items }: Props) => {

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
      },
      {
        label: 'Distance',
        data: items.map(o => ({
          x: o.insert_timestamp,
          y: o.distance
        })),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
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

  return <ChartComponent type="line" data={data} options={options} />
}
