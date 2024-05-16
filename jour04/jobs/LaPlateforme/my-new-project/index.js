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

        // Definicja schematu 'year' i dodanie danych
        const yearCollection = database.collection('year');
        const years = [
            { year: "Bachelor 1" },
            { year: "Bachelor 2" },
            { year: "Bachelor 3" }
        ];
        const yearInsertResult = await yearCollection.insertMany(years);
        console.log("Years added successfully!");

        // Pobranie ID dodanych lat studiów
        const yearIds = yearInsertResult.insertedIds;

        // Definicja schematu 'student' i dodanie danych z powiązaniem z 'year'
        const studentCollection = database.collection('student');
        const students = [
            { firstname: "Bob", lastname: "LeBricoleur", students_number: "2", year_id: yearIds[0] },
            { firstname: "John", lastname: "Doe", students_number: "3", year_id: yearIds[1] },
            { firstname: "Marine", lastname: "Dupont", students_number: "4", year_id: yearIds[2] }
        ];
        await studentCollection.insertMany(students);
        console.log("Students added successfully!");

        // Agregacja studentów z ich rokiem studiów
        const studentWithYear = await studentCollection.aggregate([
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
            }
        ]).toArray();

        console.log("Students with their cursus:", studentWithYear);

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
