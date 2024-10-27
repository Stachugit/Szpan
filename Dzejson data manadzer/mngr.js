const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function addObject() {
    const name = await promptUser('Podaj imie ');
    const age = await promptUser('Podaj wiek ');
    const email = await promptUser('Podaj email ');
    const filePath = await promptUser('Podaj ściezke do pliku Dżejson: ');

    const newObject = { name, age, email };

    let data = [];
    if (fs.existsSync(filePath)) {
        const fileContent = fs.readFileSync(filePath);
        data = JSON.parse(fileContent);
    }

    data.push(newObject);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('Dane dodane pomyślnie');
}