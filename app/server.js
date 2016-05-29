///<reference path="../typings/index.d.ts" />
var http = require('http');
var express = require('express');
var ws = require('ws');
var server = http.createServer();
var app = express();
var port = 3000;
var WebSocketServer = ws.Server;
var wss = new WebSocketServer({ server: server });
app.use(express.static('app'));
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
wss.on('connection', function (ws) {
});
server.on('request', app);
server.listen(port, function () {
    console.log('Listening on ' + server.address().port);
});
