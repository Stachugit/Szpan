const fs = require('fs').promises;
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
  }
  
  async function main() {
    try {
      const firstName = await askQuestion("Podaj imię: ");
      const lastName = await askQuestion("Podaj nazwisko: ");
      const age = await askQuestion("Podaj wiek: ");
  
      const userData = {
        firstName,
        lastName,
        age
      };
      console.log("Dane użytkownika:", userData);
      rl.close();
    } catch (error) {
      console.error("Wystąpił błąd:", error);
      rl.close();
    }
  }
main();