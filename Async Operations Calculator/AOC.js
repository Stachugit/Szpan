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