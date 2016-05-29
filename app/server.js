///<reference path="../typings/index.d.ts" />
var http = require('http');
var express = require('express');
var ws = require('ws');
var Manager = require("./manager");
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
    ws.on('close', function () {
        manager.remove(ws);
    });
    ws.on('message', function (data) {
        manager.broadcast(ws, data);
    });
});
server.on('request', app);
server.listen(port, function () {
    console.log('Listening on ' + server.address().port);
});
//# sourceMappingURL=server.js.map