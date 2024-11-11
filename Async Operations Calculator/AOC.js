const readline = require('readline'); // Importowanie modułu readline do interakcji z użytkownikiem

// Tworzenie interfejsu readline do odczytu danych z konsoli
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Funkcja do zadawania pytań użytkownikowi
function getUserInput(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

// Funkcja do dodawania dwóch liczb
function add(a, b) {
    return a + b;
}

// Funkcja do mnożenia dwóch liczb
function multiply(a, b) {
    return a * b;
}

// Asynchroniczna operacja z użyciem callback
function asyncOperationCallback(a, b, operation, callback) {
    setTimeout(() => {
        try {
            const result = operation(a, b);
            callback(null, result);
        } catch (error) {
            callback(error);
        }
    }, 1000);
}

// Asynchroniczna operacja z użyciem Promise
function asyncOperationPromise(a, b, operation) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                const result = operation(a, b);
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }, 1000);
    });
}

// Główna funkcja programu
async function main() {
    try {
        // Pobieranie danych od użytkownika
        const num1 = parseFloat(await getUserInput('Wpisz pierwszy numer: '));
        const num2 = parseFloat(await getUserInput('Wpisz drugi numer: '));
        const operationType = await getUserInput('Wybierz operację (dodawanie/mnozenie): ');
        const method = await getUserInput('Wybierz metodę (callback/promise): ');

        // Wybór operacji na podstawie danych użytkownika
        let operation;
        if (operationType === 'dodawanie') {
            operation = add;
        } else if (operationType === 'mnozenie') {
            operation = multiply;
        } else {
            throw new Error('nieznana operacja');
        }

        // Wykonanie operacji z użyciem wybranej metody
        if (method === 'callback') {
            asyncOperationCallback(num1, num2, operation, (error, result) => {
                if (error) {
                    console.error('Error:', error.message);
                } else {
                    console.log('Rezultat:', result);
                }
                rl.close();
            });
        } else if (method === 'promise') {
            asyncOperationPromise(num1, num2, operation)
                .then(result => {
                    console.log('Rezultat:', result);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                })
                .finally(() => rl.close());
        } else {
            throw new Error('Nieznana metoda');
        }

    } catch (error) {
        console.error('Error:', error.message);
        rl.close();
    }
}

main(); // Wywołanie głównej funkcji programu