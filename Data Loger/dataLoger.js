const fs = require('fs').promises;
const readline = require('readline');

// Tworzenie interfejsu readline do odczytu danych z konsoli
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Funkcja do zadawania pytań użytkownikowi
function askQuestion(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Główna funkcja programu
async function main() {
  try {
    // Pobieranie danych od użytkownika
    const firstName = await askQuestion("Podaj imię: ");
    const lastName = await askQuestion("Podaj nazwisko: ");
    const age = await askQuestion("Podaj wiek: ");

    // Tworzenie obiektu z danymi użytkownika
    const userData = {
      firstName,
      lastName,
      age
    };

    console.log("Dane użytkownika:", userData); // Wyświetlanie danych użytkownika
    await fs.writeFile('userData.json', JSON.stringify(userData, null, 2)); // Zapis danych do pliku JSON
    console.log("Dane zostały zapisane do pliku"); // Informacja o zapisaniu danych

    rl.close(); // Zamknięcie interfejsu readline
  } catch (error) {
    console.error("Wystąpił błąd:", error); // Obsługa błędów
    rl.close(); // Zamknięcie interfejsu readline w przypadku błędu
  }
}

main(); // Wywołanie głównej funkcji programu