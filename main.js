const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let comments = []; // Array untuk menyimpan komentar

// Middleware untuk melayani file statis
app.use(express.static('public'));

// Event ketika pengguna terhubung
io.on('connection', (socket) => {
    console.log('A user connected');

    // Kirim semua komentar yang ada saat pengguna baru terhubung
    socket.emit('load comments', comments);

    // Dengarkan event 'new comment'
    socket.on('new comment', (comment) => {
        comments.push(comment);
        io.emit('new comment', comment); // broadcast komentar baru ke semua pengguna
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Jalankan server di port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});