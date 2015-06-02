var unit_1 = require('../node_modules/sonic/dist/unit');
var list_1 = require('../node_modules/sonic/dist/list');
var Record = (function () {
    function Record(record) {
        if (record != null) {
            this.get = record.get;
            this.has = record.has;
        }
    }
    Record.prototype.has = function (key) {
        throw new Error("Not implemented");
    };
    Record.prototype.get = function (key) {
        throw new Error("Not implemented");
    };
    Record.prototype.zoom = function (key) {
        return list_1.List.create(Record.zoom(this, key));
    };
    Record.create = function (record) {
        return new Record(record);
    };
    Record.zoom = function (record, key) {
        var unit = new unit_1.default();
        if (record.has(key))
            unit.set(key, record.get(key));
        return {
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next
        };
    };
    return Record;
})();
exports.Record = Record;
exports.default = Record;
