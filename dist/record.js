var unit_1 = require('../node_modules/sonic/dist/unit');
var list_1 = require('../node_modules/sonic/dist/list');
var Record = (function () {
    function Record(record) {
        var _this = this;
        this.has = function (key) {
            throw new Error("Not implemented");
        };
        this.get = function (key) {
            throw new Error("Not implemented");
        };
        this.zoom = function (key) {
            return list_1.List.create(Record.zoom(_this, key));
        };
        if (record != null) {
            this.get = record.get;
            this.has = record.has;
        }
    }
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
