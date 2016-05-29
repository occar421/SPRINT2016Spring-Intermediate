/**
 * Map_
 */
class Map_<K, V> {
	private array: Array<KVPair<K, V>>;
	constructor(){
		this.array = new Array<KVPair<K, V>>();
	}
	
	add(key: K, value: V): boolean {
		let index = this.indexOfValue(value);
		if (index == -1) {
			this.array.push(new KVPair(key, value));	
			return true;
		}
		return false;
	}
	
	remove(value: V): boolean {
		let index = this.indexOfValue(value);
		if (index != -1) {
			this.array.splice(index, 1);
			return true;
		}
		return false;
	}
	
	private indexOfValue(value: V) {
		let index = -1;
		this.array.forEach((kv, i) => {
			if (kv.value === value) {
				index = i;
			}
		});
		return index;
	}
	
	getKey(value: V): K {
		let index = this.indexOfValue(value);
		if (index == -1) {
			return null;
		}
		return this.array[index].key;
	}
	
	getValues(): V[] {
		return this.array.map(kv => kv.value);
	}
}

/**
 * KVPair
 */
class KVPair<K, V> {
	key: K;
	value: V;
	constructor(key: K, value: V) {
		this.key = key;
		this.value = value;
	}
}

export = Map_