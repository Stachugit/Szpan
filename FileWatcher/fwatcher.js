const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// Klasa FileWatcher dziedziczy po EventEmitter
class FileWatcher extends EventEmitter {
    constructor(dir) {
        super();
        this.dir = dir; // Ścieżka do monitorowanego katalogu
        this.logFile = path.join(dir, 'filewatcher.log'); // Ścieżka do pliku logu
        this.startWatching(); // Rozpoczęcie monitorowania
    }

    // Logowanie wiadomości do pliku logu
    log(message) {
        fs.appendFile(this.logFile, `${new Date().toISOString()} - ${message}\n`, err => {
            if (err) console.error('Błąd zapisu do pliku logu', err);
        });
    }

    // Rozpoczęcie monitorowania katalogu
    startWatching() {
        fs.watch(this.dir, (eventType, filename) => {
            if (filename) { // Jeśli nazwa pliku jest dostępna
                const filePath = path.join(this.dir, filename); // Pełna ścieżka do pliku
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        if (err.code === 'ENOENT') { // Plik usunięty
                            this.emit('deleted', filename);
                            this.log(`Plik usunięty: ${filename}`);
                        } else {
                            console.error('Błąd sprawdzania pliku', err);
                        }
                    } else {
                        if (eventType === 'rename' && stats.isFile()) { // Plik dodany
                            this.emit('added', filename);
                            this.log(`Plik dodany: ${filename}`);
                        } else if (eventType === 'change') { // Plik zmieniony
                            this.emit('changed', filename);
                            this.log(`Plik zmieniony: ${filename}`);
                        }
                    }
                });
            }
        });
    }
}

// Tworzenie instancji FileWatcher i monitorowanie katalogu
const watcher = new FileWatcher('../FileWatcher/watched');
watcher.on('added', filename => console.log(`Plik dodany: ${filename}`));
watcher.on('changed', filename => console.log(`Plik zmieniony: ${filename}`));
watcher.on('deleted', filename => console.log(`Plik usunięty: ${filename}`));