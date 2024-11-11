const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class FileAnalyzer extends EventEmitter {
    constructor(dir) {
        super();
        this.dir = dir;
    }

    analyze() {
        this.emit('analysisStarted', this.dir);
        console.log(`Analiza katalogu rozpoczęta: ${this.dir}`);

        fs.readdir(this.dir, (err, files) => {
            if (err) {
                console.error('Błąd podczas odczytu katalogu', err);
                return;
            }

            files.forEach(file => {
                const filePath = path.join(this.dir, file);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        console.error('Błąd podczas sprawdzania pliku', err);
                        return;
                    }

                    if (stats.isFile()) {
                        console.log(`Plik: ${file}`);
                        console.log(`Rozmiar: ${stats.size} bajtów`);
                        console.log(`Rozszerzenie: ${path.extname(file)}`);
                        console.log(`Ostatnia modyfikacja: ${stats.mtime}`);
                    } else if (stats.isDirectory()) {
                        console.log(`Katalog: ${file}`);
                    }
                });
            });

            this.emit('analysisFinished', this.dir);
            console.log(`Analiza katalogu zakończona: ${this.dir}`);
        });
    }
}

const dirPath = process.argv[2];
if (!dirPath) {
    console.error('Proszę podać ścieżkę do katalogu jako argument.');
    process.exit(1);
}

const analyzer = new FileAnalyzer(dirPath);
analyzer.on('analysisStarted', dir => console.log(`Zdarzenie: Analiza katalogu rozpoczęta dla ${dir}`));
analyzer.on('analysisFinished', dir => console.log(`Zdarzenie: Analiza katalogu zakończona dla ${dir}`));
analyzer.analyze();