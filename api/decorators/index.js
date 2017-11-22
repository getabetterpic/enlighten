let files = require('fs').readdirSync(__dirname + '/');
module.exports = files.reduce(function(exports, file) {
  if (file.match(/\.js$/) !== null && file !== 'index.js') {
    // turn 'light_decorator.js' into 'Light'
    var name = file.replace('_decorator.js', '');
    name = name.charAt(0).toUpperCase() + name.slice(1);

    exports[name] = require('./' + file);
  }
  return exports;
}, {});
