const huejay = require('huejay');
const Colors = require('./colors');
const SETTABLE = ['on', 'xy', 'name', 'hue', 'saturation', 'brightness', 'colorTemp'];

module.exports = class LightService {
  constructor() {
    if (process.env.BRIDGE_IP) {
      this.client = new huejay.Client({
        host: process.env.BRIDGE_IP,
        username: process.env.HUE_USER
      });
    } else {
      console.log("No BRIDGE_IP env var. Discovering bridge...");
      LightService.discoverBridge().then(client => this.client = client);
    }
  }

  static discoverBridge() {
    return huejay.discover().then(bridges => {
      console.log("Bridge found! Bridge: ", bridges[0] || '<what?>');
      return new huejay.Client({
        host: bridges[0] && bridges[0].ip,
        username: process.env.HUE_USER
      });
    });
  }

  fetchLights() {
    return this.client.lights.getAll();
  }

  toggle(id) {
    return this.client.lights.getById(id).then(light => {
      light.on = !light.on;
      this.saveLight(light);
    });
  }

  updateLight(attrs) {
    return this.client.lights.getById(attrs.id).then(light => {
      if (!light.on && !attrs.on) {
        throw new Error("light is off. turn it on first");
      }
      if (Colors.PRESETS[attrs.color]) {
        attrs.xy = Colors.presetToXY(attrs.color);
        delete attrs.color;
      }
      for (var i in SETTABLE) {
        let key = SETTABLE[i];
        if (attrs[key] === undefined) continue;
        if (light[key] === attrs[key]) continue;
        light[key] = attrs[key];
      }
      return this.saveLight(light);
    });
  }

  saveLight(light) {
    return this.client.lights.save(light);
  }
}

