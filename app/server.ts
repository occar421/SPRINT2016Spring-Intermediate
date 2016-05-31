///<reference path="../typings/index.d.ts" />

import http = require('http');
import express = require('express');
import ws = require('ws');
import Manager = require("./manager");
import Bot = require("./bot");

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
	console.log("someone has connected.");
	
	ws.on('close', () => {
		manager.remove(ws);
		console.log("someone has disconnected.");
	});
	
	ws.on('message', (data: string) => {
		// check if bot command
		let elem = data.split(" ");
		if (elem[0] === "bot" && elem.length === 3) {
			let bot = new Bot({"command": elem[1], "data": elem[2]});
			bot.generateHash();
			manager.broadcast(ws, data);
			manager.broadcast(ws, bot.hash);
		} else {
			manager.broadcast(ws, data);	
		}
		console.log("sent message.");
	});
});

server.on('request', app);
server.listen(port, () => {
	console.log('Listening on ' + server.address().port);
});