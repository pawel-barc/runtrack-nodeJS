const fs = require('fs');

// Chemin du fichier à lire
const filePath = '../data.txt';

// Lecture asynchrone du contenu du fichier
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Erreur lors de la lecture du fichier :', err);
    return;
  }

  // Affichage du contenu dans le terminal
  console.log('Contenu du fichier data.txt :');
  console.log(data);
});
