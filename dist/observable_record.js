var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unit_1 = require('../node_modules/sonic/dist/unit');
var record_1 = require('./record');
var observable_list_1 = require('../node_modules/sonic/dist/observable_list');
;
var ObservableRecord = (function (_super) {
    __extends(ObservableRecord, _super);
    function ObservableRecord(record) {
        var _this = this;
        _super.call(this, record);
        this.observe = function (observer) {
            throw new Error("Not implemented");
        };
        this.zoom = function (key) {
            return observable_list_1.ObservableList.create(ObservableRecord.zoom(_this, key));
        };
        if (record != null)
            this.observe = record.observe;
    }
    ObservableRecord.create = function (record) {
        return new ObservableRecord(record);
    };
    ObservableRecord.zoom = function (record, key) {
        var unit = new unit_1.default();
        if (record.has(key))
            unit.set(key, record.get(key));
        record.observe({
            onInvalidate: function (key) {
                if (record.has(key))
                    unit.set(key, record.get(key));
                else
                    unit.splice(null, null);
            }
        });
        return {
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next,
            observe: unit.observe
        };
    };
    return ObservableRecord;
})(record_1.Record);
exports.ObservableRecord = ObservableRecord;
exports.default = ObservableRecord;
