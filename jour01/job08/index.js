const fs = require('fs');
const path = require('path');

// Chemin du fichier à lire
const filePath = path.join('C:', 'Users', 'Pawel Barc', 'Downloads', 'data.txt');

try {
    // Lecture asynchrone du contenu du fichier
    const fileContent = fs.readFileSync(filePath, 'utf8');

    // Affichage d'une lettre sur deux dans le terminal
    let result = '';
    for (let i = 0; i < fileContent.length; i += 2) {
        result += fileContent[i];
    }
    console.log('Contenu du fichier data.txt :');
    console.log(result);
} catch (err) {
    // Gestion des erreurs
    console.error('Erreur lors de la lecture du fichier :', err);
}
