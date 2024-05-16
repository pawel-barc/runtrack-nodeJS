const { MongoClient } = require('mongodb');

// Adres URL serwera MongoDB
const uri = "mongodb://localhost:27017"; 

// Tworzenie nowego klienta MongoDB
const client = new MongoClient(uri);

async function run() {
    try {
        // Połączenie z serwerem MongoDB
        await client.connect();
        console.log("Connected to MongoDB!");

        // Dostęp do bazy danych 'LaPlateforme'
        const database = client.db('LaPlateforme');

        // Definicja schematu 'student' i dodanie danych
        const studentCollection = database.collection('student');
        const students = [
            { firstname: "Paul", lastname: "Ricardo" },
            { firstname: "John", lastname: "Travollta" },
            { firstname: "Marine", lastname: "Le Pen" }
        ];
        await studentCollection.insertMany(students);
        console.log("Students added successfully!");

    } catch (err) {
        console.error(err);
    } finally {
        // Zamknięcie połączenia
        await client.close();
        console.log("Connection to MongoDB closed");
    }
}

// Uruchomienie funkcji
run().catch(console.error);
