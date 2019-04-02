const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const apiRouter = require('./apiRouter');

const app = express();
const port = 8080;

app.use(express.static(path.join(__dirname, 'vehicledatavisualizer-client/build')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'build', 'index.html')));

app.use('/api', apiRouter);

app.listen(port, () => console.log('The server is running.'));