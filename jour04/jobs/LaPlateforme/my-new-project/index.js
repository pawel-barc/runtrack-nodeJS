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

        const yearCollection = database.collection('year');
        const years = [
            { year: "Bachelor 1" },
            { year: "Bachelor 2" },
            { year: "Bachelor 3" }
        ];
        const yearInsertResult = await yearCollection.insertMany(years);
        console.log("Years added successfully!");
        
        const yearIds = yearInsertResult.insertedIds;

        // Definicja schematu 'student' i dodanie danych
        const studentCollection = database.collection('student');
        const students = [
            { firstname: "Bob", lastname: "LeBricoleur", students_number: "2",yearIds: [0] },
            { firstname: "John", lastname: "Doe", students_number: "3", yearIds: [1] },
            { firstname: "Marine", lastname: "Dupont", students_number: "4", yearIds: [2] }
        ];
        await studentCollection.insertMany(students);
        console.log("Students added successfully!");

        // Pobranie listy studentów
        const studentList = await studentCollection.find().toArray();
        return studentList; // Zwrócenie listy studentów

    } catch (err) {
        console.error(err);
    } finally {
        // Zamknięcie połączenia
        await client.close();
        console.log("Connection to MongoDB closed");
    }
}

// Uruchomienie funkcji
run()
    .then(studentList => {
        if (studentList !== undefined) {
            console.log("List of students:", studentList); // Wyświetlenie listy studentów w konsoli
        } else {
            console.log("No students found."); // Wyświetlenie komunikatu, jeśli lista studentów jest undefined
        }
    })
    .catch(console.error);
