var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mutable_record_1 = require('./mutable_record');
var observable_1 = require('../node_modules/sonic/dist/observable');
var SimpleRecord = (function (_super) {
    __extends(SimpleRecord, _super);
    function SimpleRecord(object) {
        _super.call(this);
        this._object = object;
        this._subject = new observable_1.Subject();
    }
    SimpleRecord.prototype.has = function (key) {
        return key in this._object;
    };
    SimpleRecord.prototype.get = function (key) {
        return this._object[key];
    };
    SimpleRecord.prototype.observe = function (observer) {
        return this._subject.observe(observer);
    };
    SimpleRecord.prototype.set = function (key, value) {
        this._object[key] = value;
        this._subject.notify(function (observer) {
            observer.onInvalidate(key);
        });
    };
    SimpleRecord.prototype.delete = function (key) {
        if (!(key in this._object))
            return;
        delete this._object[key];
        this._subject.notify(function (observer) {
            observer.onInvalidate(key);
        });
    };
    return SimpleRecord;
})(mutable_record_1.MutableRecord);
exports.default = SimpleRecord;
