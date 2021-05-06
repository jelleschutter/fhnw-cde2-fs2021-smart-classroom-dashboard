import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sensor: '',
      items: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const url = `https://glusfqycvwrucp9-db202012181437.adb.eu-zurich-1.oraclecloudapps.com/ords/sensor_datalake/sens/sensors?q={"$orderby":{"title":"asc"}}`;
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
        const sensor = result.items[0]?.uuid ?? '';
        this.setState({
          sensor: sensor,
          items: result.items
        });
        this.props.onSensorChange(sensor);
      })
      .catch((error) => console.log(error));
  }

  handleChange(event) {
    this.setState((state) => {
      state.sensor = event.target.value;
      return state;
    });
    this.props.onSensorChange(event.target.value);
  }

  render() {
    const { items } = this.state;
    const options = items.map(sensor => <option key={sensor.uuid} value={sensor.uuid}>{sensor.title}</option>)
    return (
      <select onChange={this.handleChange}>
        {options}
      </select>
    )
  }
}

export default Filter;
