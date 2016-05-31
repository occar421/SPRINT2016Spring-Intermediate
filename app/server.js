///<reference path="../typings/index.d.ts" />
"use strict";
var http = require('http');
var express = require('express');
var ws = require('ws');
var Manager = require("./manager");
var Bot = require("./bot");
var server = http.createServer();
var app = express();
var port = 3000;
var WebSocketServer = ws.Server;
var wss = new WebSocketServer({ server: server });
var manager = new Manager();
app.use(express.static('app'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
wss.on('connection', function (ws) {
    manager.add(ws);
    console.log("someone has connected.");
    ws.on('close', function () {
        manager.remove(ws);
        console.log("someone has disconnected.");
    });
    ws.on('message', function (data) {
        // check if bot command
        var elem = data.split(" ");
        if (elem[0] === "bot" && elem.length === 3) {
            var bot = new Bot({ "command": elem[1], "data": elem[2] });
            bot.generateHash();
            manager.broadcast(ws, data);
            manager.broadcast(ws, bot.hash);
        }
        else {
            manager.broadcast(ws, data);
        }
        console.log("sent message.");
    });
});
server.on('request', app);
server.listen(port, function () {
    console.log('Listening on ' + server.address().port);
});
//# sourceMappingURL=server.js.map