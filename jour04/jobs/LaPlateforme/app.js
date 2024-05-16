const { MongoClient } = require('mongodb');

const uri = "mongodb://localhost:27017"; // Adres serwera MongoDB
const client = new MongoClient(uri);
async function createDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db('LaPlateforme');

        // Tworzenie kolekcji "student" i dodanie przykładowego dokumentu
        const studentCollection = db.collection('student');
        await studentCollection.insertOne({
            id: 1,
            lastname: "Gump",
            firstname: "Forest",
            students_number: "1",
            year_id: 1
        });
        console.log("Collection 'student' created and sample document inserted");

        // Tworzenie kolekcji "year" i dodanie przykładowego dokumentu
        const yearCollection = db.collection('year');
        await yearCollection.insertOne({ year: "2023" });
        console.log("Collection 'year' created and sample document inserted");

    } finally {
        await client.close();
        console.log("Connection to MongoDB closed");
    }
}

createDatabase().catch(console.error);
