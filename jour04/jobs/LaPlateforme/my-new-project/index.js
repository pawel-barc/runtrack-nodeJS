const { MongoClient } = require('mongodb');
const readline = require('readline');

// Adresse URL du serveur MongoDB
const uri = "mongodb://localhost:27017"; 

// Création d'un nouveau client MongoDB
const client = new MongoClient(uri);

// Création d'une interface pour la saisie utilisateur
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fonction pour obtenir le nom de famille de l'étudiant de l'utilisateur
function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function run() {
    try {
        // Connexion au serveur MongoDB
        await client.connect();
        console.log("Connecté à MongoDB!");

        // Accès à la base de données 'LaPlateforme'
        const database = client.db('LaPlateforme');

        // Définition du schéma 'year' et ajout des données
        const yearCollection = database.collection('year');
        const years = [
            { year: "Bachelor 1" },
            { year: "Bachelor 2" },
            { year: "Bachelor 3" }
        ];
        const yearInsertResult = await yearCollection.insertMany(years);
        console.log("Années ajoutées avec succès!");

        // Obtention des ID des années d'études ajoutées
        const yearIds = yearInsertResult.insertedIds;

        // Définition du schéma 'student' et ajout des données avec liaison 'year'
        const studentCollection = database.collection('student');
        const students = [
            { firstname: "Bob", lastname: "LeBricoleur", students_number: 2, year_id: yearIds[0] },
            { firstname: "John", lastname: "Doe", students_number: 3, year_id: yearIds[1] },
            { firstname: "Marine", lastname: "Dupont", students_number: 4, year_id: yearIds[2] }
        ];
        await studentCollection.insertMany(students);
        console.log("Étudiants ajoutés avec succès!");

        // Obtention du nom de famille de l'étudiant de l'utilisateur
        const lastnameInput = await askQuestion("Entrez le nom de famille de l'étudiant: ");

        // Exécution de la requête pour obtenir les informations de l'étudiant
        const studentInfo = await studentCollection.aggregate([
            {
                $lookup: {
                    from: 'year',
                    localField: 'year_id',
                    foreignField: '_id',
                    as: 'cursus'
                }
            },
            {
                $unwind: '$cursus'
            },
            {
                $match: { lastname: lastnameInput }
            }
        ]).toArray();

        if (studentInfo.length > 0) {
            console.log("Étudiant trouvé:", studentInfo);
        } else {
            console.log("Aucun étudiant trouvé avec ce nom de famille.");
        }

    } catch (err) {
        console.error(err);
    } finally {
        // Fermeture de la connexion et de l'interface readline
        await client.close();
        rl.close();
        console.log("Connexion à MongoDB fermée");
    }
}

// Exécution de la fonction principale
run().catch(console.error);
async function updateStudentCursus(studentId, newCursus) {
    try {
        // Connexion à MongoDB
        await client.connect();

        // Accès à la base de données 'LaPlateforme'
        const database = client.db('LaPlateforme');
        const studentCollection = database.collection('student');

        // Mise à jour du cursus de l'étudiant en fonction de son ID
        const result = await studentCollection.updateOne(
            { _id: studentId },
            { $set: { cursus: newCursus } }
        );

        if (result.modifiedCount > 0) {
            console.log("Cursus de l'étudiant mis à jour avec succès.");
        } else {
            console.log("Aucun étudiant trouvé avec cet ID.");
        }
    } catch (err) {
        console.error("Erreur lors de la mise à jour du cursus de l'étudiant:", err);
    } finally {
        // Fermeture de la connexion à MongoDB
        await client.close();
    }
}

// Exemple d'utilisation : mettre à jour le cursus de l'étudiant avec l'ID '123' en 'Bachelor 2'
updateStudentCursus('6645e976c752593bf08b5d51', 'Bachelor 2')
