var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_record_1 = require('./observable_record');
var mutable_list_1 = require('../node_modules/sonic/dist/mutable_list');
;
var MutableRecord = (function (_super) {
    __extends(MutableRecord, _super);
    function MutableRecord(record) {
        var _this = this;
        _super.call(this, record);
        this.set = function (key, value) {
            throw new Error("Not implemented");
        };
        this.delete = function (key) {
            throw new Error("Not implemented");
        };
        this.zoom = function (key) {
            return mutable_list_1.MutableList.create(MutableRecord.zoom(_this, key));
        };
        if (record != null) {
            this.set = record.set;
            this.delete = record.delete;
        }
    }
    MutableRecord.create = function (record) {
        return new observable_record_1.ObservableRecord(record);
    };
    MutableRecord.zoom = function (record, key) {
        var unit = observable_record_1.ObservableRecord.zoom(record, key);
        function set(_key, value) {
            if (_key == key)
                record.set(key, value);
        }
        function splice(prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                record.set(key, values[0]);
            else
                record.delete(key);
        }
        return {
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next,
            observe: unit.observe,
            set: set,
            splice: splice
        };
    };
    return MutableRecord;
})(observable_record_1.ObservableRecord);
exports.MutableRecord = MutableRecord;
exports.default = MutableRecord;
