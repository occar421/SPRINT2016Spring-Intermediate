///<reference path="../typings/index.d.ts" />

import http = require('http');
import express = require('express');
import ws = require('ws');
import Manager = require("./manager");

let server = http.createServer();
let app = express();
let port = 3000;

let WebSocketServer = ws.Server;
let wss = new WebSocketServer({ server: server });
let manager = new Manager();

app.use(express.static('app'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});

wss.on('connection', (ws) => {
	manager.add(ws);
	
	ws.on('close', () => {
		manager.remove(ws);
	});
	
	ws.on('message', (data) => {
		manager.broadcast(ws, data);
	});
});

server.on('request', app);
server.listen(port, () => {
	console.log('Listening on ' + server.address().port);
});