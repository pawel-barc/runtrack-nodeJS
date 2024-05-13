const fs = require('fs');
const path = require('path');
 // Chemin du fichier à lire
 const filePath = path.join('C:', 'Users', 'Pawel Barc', 'Downloads', 'data.txt');

try {
    // Lecture synchrone du contenu du fichier
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Affichage du contenu dans le terminal
    console.log('Contenu du fichier data.txt :');
    console.log(fileContent);
} catch (err) {
    // Gestion des erreurs
    console.error('Erreur lors de la lecture du fichier :', err);
}
