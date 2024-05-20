const express = require('express');
const path = require('path');

const app = express();
const port = 80; // Możesz użyć innego portu, np. 3000, jeśli port 80 jest zajęty

// Ustawienie folderu 'public' jako statycznego, aby serwować pliki statyczne
app.use(express.static(path.join(__dirname, 'public')));

// Route dla strony głównej
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Route dla strony 'about'
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));  
});

app.get('/refuges', (req, res) =>{
  res.sendFile(path.join(__dirname, 'views', 'refuges.html' ));
});

app.use((req, res, next) =>{
  res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

});

// Uruchomienie serwera
app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`);
});
