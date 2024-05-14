const http = require('http');

// Création du serveur web
const server = http.createServer((req, res) => {
  // Définition de l'en-tête de réponse
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', '13');

  // Envoi de la réponse "Hello World !"
  res.end('Hello World !');
});

// Démarrage du serveur web sur le port 8888
server.listen(8888, () => {
  console.log('Serveur web démarré sur le port 8888');
});
const page = 'http://localhost:8888/'
