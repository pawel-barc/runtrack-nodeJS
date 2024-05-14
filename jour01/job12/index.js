const http = require('http');
const fs = require('fs');

// Création du serveur web
const server = http.createServer((req, res) => {
  // Vérification que la requête concerne la racine de l'URL
  if (req.url === '/') {
    // Lecture du fichier index.html
    fs.readFile('index.html', 'utf8', (err, data) => {
      if (err) {
        // En cas d'erreur, renvoi d'un code d'erreur 500
        res.writeHead(500);
        res.end('Erreur lors de la lecture du fichier index.html');
      } else {
        // Sinon, renvoi du contenu du fichier index.html avec le bon type MIME
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else {
    // Si la requête ne concerne pas la racine de l'URL, renvoi d'un code d'erreur 404
    res.writeHead(404);
    res.end('Page non trouvée');
  }
});

// Démarrage du serveur web sur le port 8887
server.listen(8887, () => {
  console.log('Serveur web démarré sur le port 8887');
});
