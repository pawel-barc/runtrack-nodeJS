//import d'un modul fs qui nous permets de travailler sur les données, supprimmer, ecrire, lire 
const fs = require('fs');
// modul path c'est une set des outils qui permets de retravailler les chemins d'acces au fichier ou catalogues
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');//__dirname - une variable global qui contient le chemin d'acces complet

// La gestion du request GET
function getAllTasks(req, res) {  // cette fonction télécharge le contenu du fichier json et le retourner dans le format json dans le reponse http
  fs.readFile(dataPath, 'utf8', (err, data) => {//la methode readfile permets de lire le contenu, argument err pour eventuel erreur,  data pour lire le contenu
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    const tasks = JSON.parse(data).tasks;// variable qui télécharge le tableau du json et stock le contenu json sous le clé tasks
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  });
}


// Eksort du gestion des routes
module.exports = {
  handleRequest(req, res) {
    const { method, url } = req;
    if (method === 'GET' && url === '/tasks') {
      getAllTasks(req, res);
    }else {
      res.writeHead(404);
      res.end('Not Found');
    }
  }
};
