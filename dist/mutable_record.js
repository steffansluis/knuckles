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
        _super.call(this, record);
        if (record != null) {
            this.set = record.set;
            this.delete = record.delete;
        }
    }
    MutableRecord.prototype.set = function (key, value) {
        throw new Error("Not implemented");
    };
    MutableRecord.prototype.delete = function (key) {
        throw new Error("Not implemented");
    };
    MutableRecord.prototype.zoom = function (key) {
        return mutable_list_1.MutableList.create(MutableRecord.zoom(this, key));
    };
    MutableRecord.prototype.compose = function (lens) {
        return MutableRecord.create(MutableRecord.compose(this, lens));
    };
    MutableRecord.create = function (record) {
        return new MutableRecord(record);
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
    MutableRecord.compose = function (record, lens) {
        function get(key) {
            return lens.get(record.get(key));
        }
        function set(key, value) {
            record.set(key, lens.set(record.get(key), value));
        }
        return {
            has: record.has.bind(record),
            get: get,
            set: set,
            delete: record.delete.bind(record),
            observe: record.observe.bind(record)
        };
    };
    return MutableRecord;
})(observable_record_1.ObservableRecord);
exports.MutableRecord = MutableRecord;
exports.default = MutableRecord;
