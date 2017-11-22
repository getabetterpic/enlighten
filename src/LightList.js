import React, { Component } from 'react';
import './LightList.css';

class LightList extends Component {
  constructor() {
    super()
    this.state = { lights: [] };
  }
  componentDidMount() {
    fetch('/api/lights')
      .then(res => res.json())
      .then(lights => this.setState({lights: lights}));
  }

  toggleLight(id) {
    // also works:
    // fetch('/api/lights/' + id + '/toggle', { method: 'POST' });
    let light = this.state.lights.find(l => l.id === id);
    light.on = !light.on;
    fetch('/api/lights/' + id, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),
      body: JSON.stringify({ light: light })
    });
  }

  saveLight(light) {
    fetch('/api/lights/' + light.id + '/toggle', {
      method: 'POST',
      body: JSON.stringify({ light: light })
    });
  }

  lightHTML(light) {
    let degrees = Math.floor(light.hue / 65536 * 360);
    let saturation = Math.floor(light.saturation / 255 * 100).toString() + '%';
    let lightness = '50%';//Math.floor(light.brightness / 255 * 100).toString() + '%';
    let lightStyle = { backgroundColor:  `hsl(${degrees}, ${saturation}, ${lightness})` };
    return <li key={light.id} style={lightStyle}>
      <button onClick={(e) => this.toggleLight(light.id)}>Toggle</button><em>{light.name}</em> { light.hue }
    </li>
  }

  render() {
    return (
      <ul className="LightList">
        {this.state.lights.map(l => this.lightHTML(l))}
      </ul>
    );
  }
}

export default LightList;
