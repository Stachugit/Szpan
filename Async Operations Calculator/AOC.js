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