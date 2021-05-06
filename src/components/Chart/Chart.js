import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-moment';

class Chart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.sensor !== this.props.sensor) {
      this.fetchData();
    }
  }

  fetchData() {
    const url = `https://glusfqycvwrucp9-db202012181437.adb.eu-zurich-1.oraclecloudapps.com/ords/sensor_datalake/sens/measurements?q={"sensor_uuid":{"$eq":"${this.props.sensor}"},"$orderby":{"insert_timestamp":"desc"}}`;
    const headers = new Headers();
    headers.set('Authorization', `Basic ${this.props.token}`);
    fetch(url, {
      method: 'GET',
      headers
    })
      .then(result => {
        if (result.ok) {
          return result.json();
        }
        this.props.setToken(false);
        return Promise.reject(new Error(result.statusText));
      })
      .then((result) => {
        this.setState({
          items: result.items
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { items } = this.state;
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
        <Line data={data} options={options} />
      </div>
    )
  }
}

export default Chart;
