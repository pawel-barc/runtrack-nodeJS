const express = require('express');
const path = require('path');

const app = express();
const port = 80; 

app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});


app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));  
});

app.get('/refuges', (req, res) =>{
  res.sendFile(path.join(__dirname, 'views', 'refuges.html' ));
});

app.use((req, res, next) =>{
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

});


app.listen(port, () => {
  console.log(`Serveur marche sur http://localhost:${port}`);
});
