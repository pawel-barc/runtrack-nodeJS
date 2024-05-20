const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student'); // import model Student
const app = express();
const port = 3000;

// Connection avec la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/LaPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connections avec MongoDB:'));
db.once('open', () => {
  console.log('Connecté avec MongoDB');
});

// Route pour la page principale
app.get('/', (req, res) => {
  res.send('Bienvenu à API LaPlateforme!');
});

// Route pour télécharger chaques étudiant
app.get('/etudiants', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour télécharger chaques étudiant selon ID
app.get('/etudiant/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Etudiant pas trouvé');
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Demmarage du serveur
app.listen(port, () => {
  console.log(`Serveur API marche sur: http://localhost:${port}`);
});
