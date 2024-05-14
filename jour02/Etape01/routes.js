//import d'un modul fs qui nous permets de travailler sur les données, supprimmer, ecrire, lire 
const fs = require('fs');
// modul path c'est une set des outils qui permets de retravailler les chemins d'acces au fichier ou catalogues
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');//__dirname - une variable global qui contient le chemin d'acces complet

// La gestion du request GET
function getAllTasks(req, res) {
  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error');
      return;
    }
    const tasks = JSON.parse(data).tasks;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(tasks));
  });
}



// Eksportowanie obsługi tras
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
