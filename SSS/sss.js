const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

// Tworzenie serwera HTTP
const server = http.createServer((req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const filePath = queryObject.file;

    if (!filePath) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Proszę podać nazwę pliku jako parametr w URL, np. ?file=example.txt');
        return;
    }

    const fullPath = path.join(__dirname, filePath);

    fs.access(fullPath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Plik nie istnieje');
            return;
        }

        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        fs.createReadStream(fullPath).pipe(res);
    });
});

// Nasłuchiwanie na porcie 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Serwer nasłuchuje na porcie ${PORT}`);
});