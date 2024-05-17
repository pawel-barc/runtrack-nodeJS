const express = require('express'); // Importation du module Express
const app = express(); // Création d'une instance d'Express

const port = 80; // Définir le port sur lequel le serveur écoutera

// Route pour la page d'accueil ('/')
app.get('/', (req, res) => {
  res.send('Bienvenue sur notre site web!'); // Opis strony głównej
});

// Route pour la page "À propos" ('/about')
app.get('/about', (req, res) => {
  res.send('À propos de notre projet'); // Opis strony "À propos"
});

// Démarrer le serveur et écouter sur le port défini
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
