const path = require('path');

// Le chemin d'acces va être defini
const filePath = './Users/Pawel Barc/Documents/La Platforme/projets/runtrack-nodeJS/jour01/job05/index.js';

// Chercher le nom du fichier           
const fileName = path.basename(filePath);
console.log('Nom du fichier:', fileName);

// Chercher extension du fichier
const fileExt = path.extname(filePath);
console.log('Extension du fichier:', fileExt); 

// Chercher répertoire parent du fichier
const parentDir = path.dirname(filePath);
console.log('Répertoire parent du fichier:', parentDir); 
