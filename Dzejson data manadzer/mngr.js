const fs = require('fs');
const readline = require('readline');

// Tworzenie interfejsu readline do odczytu danych z konsoli
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funkcja do wyświetlania zapytania i oczekiwania na odpowiedź użytkownika
function promptUser(query) {
    return new Promise(resolve => rl.question(query, resolve));
}


async function addObject() {
    const name = await promptUser('Podaj imie ');
    const age = await promptUser('Podaj wiek ');
    const email = await promptUser('Podaj email ');
    const filePath = await promptUser('Podaj ściezke do pliku Dżejson: ');

    const newObject = { name, age, email }; // Tworzenie nowego obiektu

    let data = [];
    if (fs.existsSync(filePath)) { // Sprawdzanie, czy plik istnieje
        const fileContent = fs.readFileSync(filePath); // Odczyt zawartości pliku
        data = JSON.parse(fileContent); // Parsowanie zawartości pliku JSON
    }

    data.push(newObject); // Dodawanie nowego obiektu do danych
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2)); // Zapis danych do pliku JSON
    console.log('Dane dodane pomyślnie'); // Wyświetlanie komunikatu o sukcesie
}

// Funkcja do wyświetlania danych z pliku JSON
async function displayData() {
    const filePath = await promptUser('Podaj sdciezke do Dżejsona ');

    if (fs.existsSync(filePath)) { // Sprawdzanie, czy plik istnieje
        const fileContent = fs.readFileSync(filePath); // Odczyt zawartości pliku
        const data = JSON.parse(fileContent); // Parsowanie zawartości pliku JSON
        console.log(data);
    } else {
        console.log('Plik nie istnieje.');
    }
}

// Główna funkcja programu
async function main() {
    const choice = await promptUser('Czy chcesz dodać nowy obiekt czy wyświetlić dane? (dodaj/wyświetl): ');

    if (choice === 'dodaj') {
        await addObject();
    } else if (choice === 'wyswietl') {
        await displayData();
    } else {
        console.log('Nieprawidłowy wybór');
    }

    rl.close();
}

main();