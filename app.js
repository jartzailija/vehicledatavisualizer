const express = require('express');
const path = require('path');

const apiRouter = require('./apiRouter');

const app = express();

app.use(express.static(path.join(__dirname, 'vehicledatavisualizer-client/build')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));
app.use('/api', apiRouter);

module.exports = app;