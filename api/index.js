const express = require('express');
const router = express.Router();
const LightService = require('./services/light_service');
const GithubWatcher = require('./services/github_watcher');
const Decorators = require('./decorators');

let lightService = new LightService();

const STATE_COLORS = {
  success: 'ForestGreen',
  failure: 'DarkRed',
  pending: 'Orange'
};
// TODO: make this "jake lamp" watcher better
let watcher = new GithubWatcher();
watcher.watch((newState) => {
  lightService.updateLight({id: 1, color: STATE_COLORS[newState]})
    .catch(err => console.error("Error:", err.message || err))
}, 30000);

var bodyParser = require('body-parser');
router.use(bodyParser.json())

router.get('/', (_req, res) => res.json({is: 'up'}));

router.get('/bridges', (_req, res) => {
  huejay.discover().then(bridges => res.json(bridges));
});

router.get('/lights', (_req, res) => {
  lightService.fetchLights().then(lights => {
    res.json(Decorators.Light.mapJSON(lights))
  });
});

router.post('/lights/:lightID/toggle', (req, res) => {
  lightService.toggle(req.params.lightID)
    .then(light => {
      res.json({light: new Decorators.Light(light).asJSON()});
    });
});

router.post('/lights/:lightID', (req, res) => {
  lightService.updateLight(req.body.light)
    .then(light => {
      res.json({light: new Decorators.Light(light).asJSON()});
    }).catch(err => {
      resp.status(400).json({error: err.message});
    });
});


module.exports = router;
