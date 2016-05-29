///<reference path="../typings/index.d.ts" />

import ws = require('ws');
import Map_ = require("./map");

/**
 * Manager
 */
class Manager {
	private counter: number;
	private connections: Map_<number, ws>;
	
	constructor() {
		this.counter = 0;
		this.connections = new Map_<number, ws>();
	}
	
	add(client: ws) {
		if(this.connections.add(this.counter, client)) {
			this.counter++;
		}
	}
	
	remove(client: ws) {
		this.connections.remove(client);
	}
	
	broadcast(sender: ws, message: string) {
		let id = this.connections.getKey(sender);
		let data = message;
		this.connections.getValues().forEach((client) => {
			client.send(JSON.stringify({"id": id, "data": data}));
		});
	}
}
export = Manager