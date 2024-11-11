const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

class FileWatcher extends EventEmitter {
    constructor(dir) {
        super();
        this.dir = dir;
        this.logFile = path.join(dir, 'filewatcher.log');
        this.startWatching();
    }

    log(message) {
        fs.appendFile(this.logFile, `${new Date().toISOString()} - ${message}\n`, err => {
            if (err) console.error('Błąd podczas zapisywania do pliku logu', err);
        });
    }

    startWatching() {
        fs.watch(this.dir, (eventType, filename) => {
            if (filename) {
                const filePath = path.join(this.dir, filename);
                fs.stat(filePath, (err, stats) => {
                    if (err) {
                        if (err.code === 'ENOENT') {
                            this.emit('deleted', filename);
                            this.log(`Plik usunięty: ${filename}`);
                        } else {
                            console.error('Błąd podczas sprawdzania pliku', err);
                        }
                    } else {
                        if (eventType === 'rename' && stats.isFile()) {
                            this.emit('added', filename);
                            this.log(`Plik dodany: ${filename}`);
                        } else if (eventType === 'change') {
                            this.emit('changed', filename);
                            this.log(`Plik zmieniony: ${filename}`);
                        }
                    }
                });
            }
        });
    }
}

const watcher = new FileWatcher('../FileWatcher/watched');
watcher.on('added', filename => console.log(`Plik dodany: ${filename}`));
watcher.on('changed', filename => console.log(`Plik zmieniony: ${filename}`));
watcher.on('deleted', filename => console.log(`Plik usunięty: ${filename}`));