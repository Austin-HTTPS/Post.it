const express = require("express");
const app = express();
const fs = require('fs');
const db = JSON.parse(fs.readFileSync('db.json'))

const socket = require("socket.io");
const server = app.listen(3000, () => { console.log("Server started on port 3000") });
const io = socket(server);

app.use(express.static("public"));


io.on('connection', socket => {
  io.sockets.emit('db', db)
  socket.on('posts', data => {
    io.sockets.emit('posts', data);
    db.push(data)
    
    if (db.length > 25) db.splice(0, 1);

    fs.writeFile('db.json', JSON.stringify(db), err => {
      if (err) console.log(err);
    });
  });
});

console.clear()
