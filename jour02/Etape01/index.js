const server = require('./server');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

server.on('request', (req, res) => {
  if (req.method === 'GET' && req.url === '/tasks') {
    routes.getAllTasks(req, res);
  } else if (req.method === 'POST' && req.url === '/tasks') {
    routes.createTask(req, res);
  } else if (req.method === 'PUT' && req.url.match(/^\/tasks\/\d+$/)) {
    routes.updateTask(req, res);
  } else if (req.method === 'DELETE' && req.url.match(/^\/tasks\/\d+$/)) {
    routes.deleteTask(req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
