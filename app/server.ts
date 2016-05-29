///<reference path="../typings/index.d.ts" />

import http = require('http');
import express = require('express');
import ws = require('ws');

let server = http.createServer();
let app = express();
let port = 3000;

let WebSocketServer = ws.Server;
let wss = new WebSocketServer({ server: server});

app.use(express.static('app'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

wss.on('connection', (ws) => {
	
});

server.on('request', app);
server.listen(port, () => {
	console.log('Listening on ' + server.address().port);
});