const url = require('url');

// Définition de la constante URL
const URL = "https://www.google.com/search?q=nodejs";

// Parsing de l'URL à l'aide du module url
const parsedUrl = url.parse(URL);

// Récupération des informations à partir de l'objet parsedUrl
const protocole = parsedUrl.protocol;
const nomHote = parsedUrl.host;
const parametres = parsedUrl.query;

// Réformatage de l'URL en une nouvelle URL valide
const nouvelleURL = url.format({
  protocol: protocole,
  host: "www.laplateforme.io",
  pathname: parsedUrl.pathname,
  query: parametres
});

// Ajout d'un paramètre à la nouvelle URL
const nouvelleURLAvecParam = url.format({
  protocol: protocole,
  host: "www.laplateforme.io",
  pathname: parsedUrl.pathname,
  query: parametres + "&newparam=newvalue"
});

// Affichage dans le terminal de la nouvelle URL avec le paramètre ajouté
console.log('Le protocole est: ' + protocole)
console.log(nouvelleURLAvecParam);
