const express = require('express'); // Importation du module Express
const app = express(); // Création d'une instance d'Express

const port = 3000; // Définir le port sur lequel le serveur écoutera

// Définir une route pour l'URL de base ('/')
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre site web!');
});

// Démarrer le serveur et écouter sur le port défini
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
