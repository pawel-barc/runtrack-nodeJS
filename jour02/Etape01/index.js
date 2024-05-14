// une variable qui defini le chemin d'acces pour l'importer le données du server.js
const server = require("./server");

// une variable qui defini le numero du Port
const PORT = process.env.PORT || 3000;

// Une fonction callback qui écoute si le serveur a été mis en route, si oui, un communiqué s'affiche

server.listen( PORT, () =>{
  console.log(`Server is running on port ${PORT}`);
});