//une variable qui import modul http qui sert à création de serveur
const http = require('http');

const routes = require('./routes');

const server = http.createServer((req, res) => {
  routes.handleRequest(req, res);
});

module.exports = server;