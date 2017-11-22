// Dev API server, and optional production static + API server
const express = require('express');
const path = require('path');
const api = require('./api');

const app = express();

// the API for our react app
app.use('/api', api);

// --- BELOW IS PRODUCTION ASSET LOADING ---
// (see README for expected dev + deploy process)

// react builds static assets into 'build'
app.use(express.static(path.join(__dirname, 'build'))); 

// _everything_ else renders index.html
app.get('/*', (_req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});  

app.listen(process.env.PORT || 9000);
