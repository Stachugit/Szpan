const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function getUserInput(question) {
    return new Promise((resolve) => rl.question(question, resolve));
}

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

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

async function main() {
    try {
        const num1 = parseFloat(await getUserInput('Wpisz pierwszy numer: '));
        const num2 = parseFloat(await getUserInput('Wpisz drugi numer: '));
        const operationType = await getUserInput('Wybierz operację (dodawanie/mnozenie): ');
        const method = await getUserInput('Wybierz metodę (callback/promise): ');

        let operation;
        if (operationType === 'dodawanie') {
            operation = add;
        } else if (operationType === 'mnozenie') {
            operation = multiply;
        } else {
            throw new Error('nieznana operacja');
        }

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

main();