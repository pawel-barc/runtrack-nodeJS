const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // Importer le body-parser pour parser les données JSON du corps de la requête
const Student = require('./models/student');
const app = express();
const port = 3000;

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/LaPlateforme', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB:'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Route pour la page d'accueil
app.get('/', (req, res) => {
  res.send('Bienvenue sur l\'API LaPlateforme!');
});

// Route pour récupérer tous les étudiants
app.get('/etudiants', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour récupérer un étudiant par son ID
app.get('/etudiant/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).send('Étudiant non trouvé');
    }
    res.json(student);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour ajouter un nouvel étudiant
app.post('/etudiants', async (req, res) => {
  try {
    const { firstname, lastname, students_number, year_id } = req.body;
    const student = new Student({ firstname, lastname, students_number, year_id });
    await student.save();
    res.status(201).send('Étudiant ajouté avec succès');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route pour supprimer un étudiant par son ID
app.delete('/etudiant/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) {
      return res.status(404).send('Étudiant non trouvé');
    }
    res.send('Étudiant supprimé avec succès');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Serveur API en cours d'exécution sur http://localhost:${port}`);
});
