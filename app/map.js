"use strict";
/**
 * Map_
 */
var Map_ = (function () {
    function Map_() {
        this.array = new Array();
    }
    Map_.prototype.add = function (key, value) {
        var index = this.indexOfValue(value);
        if (index == -1) {
            this.array.push(new KVPair(key, value));
            return true;
        }
        return false;
    };
    Map_.prototype.remove = function (value) {
        var index = this.indexOfValue(value);
        if (index != -1) {
            this.array.splice(index, 1);
            return true;
        }
        return false;
    };
    Map_.prototype.indexOfValue = function (value) {
        var index = -1;
        this.array.forEach(function (kv, i) {
            if (kv.value === value) {
                index = i;
            }
        });
        return index;
    };
    Map_.prototype.getKey = function (value) {
        var index = this.indexOfValue(value);
        if (index == -1) {
            return null;
        }
        return this.array[index].key;
    };
    Map_.prototype.getValues = function () {
        return this.array.map(function (kv) { return kv.value; });
    };
    return Map_;
}());
/**
 * KVPair
 */
var KVPair = (function () {
    function KVPair(key, value) {
        this.key = key;
        this.value = value;
    }
    return KVPair;
}());
module.exports = Map_;
//# sourceMappingURL=map.js.map