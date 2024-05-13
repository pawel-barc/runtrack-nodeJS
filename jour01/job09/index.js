const fs = require('fs');

// Chemin du fichier à modifier
const filePath = './data.txt';

// Contenu à écrire dans le fichier
const newContent = 'Je manipule les fichiers avec un module node !';

// Écriture asynchrone du contenu dans le fichier
fs.writeFile(filePath, newContent, 'utf8', (err) => {
  if (err) {
    console.error('Erreur lors de la modification du fichier :', err);
    return;
  }

  // Affichage d'un message de confirmation dans le terminal
  console.log(newContent);
});
