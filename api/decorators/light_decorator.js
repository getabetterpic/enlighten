const BaseDecorator = require('./base');
const JSON_ATTRS = [
  'id', 'name', 'xy', 'hue', 'brightness', 'saturation', 'on', 'reachable',
  'colorMode', 'colorTemp'
];

class LightDecorator extends BaseDecorator {
  asJSON() {
    return JSON_ATTRS.reduce((acc, curr) => {
      acc[curr] = this.obj[curr];
      return acc
    },{});
  }
}
module.exports = LightDecorator
