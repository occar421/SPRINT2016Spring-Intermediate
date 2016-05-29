///<reference path="../typings/index.d.ts" />
var Map_ = require("./map");
/**
 * Manager
 */
var Manager = (function () {
    function Manager() {
        this.counter = 0;
        this.connections = new Map_();
    }
    Manager.prototype.add = function (client) {
        if (this.connections.add(this.counter, client)) {
            this.counter++;
        }
    };
    Manager.prototype.remove = function (client) {
        this.connections.remove(client);
    };
    Manager.prototype.broadcast = function (sender, message) {
        var id = this.connections.getKey(sender);
        var data = message;
        this.connections.getValues().forEach(function (client) {
            client.send(JSON.stringify({ "id": id, "data": data }));
        });
    };
    return Manager;
})();
module.exports = Manager;
//# sourceMappingURL=manager.js.map