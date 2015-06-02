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
        var _this = this;
        _super.call(this);
        this.has = function (key) {
            return key in _this._object;
        };
        this.get = function (key) {
            return _this._object[key];
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.set = function (key, value) {
            _this._object[key] = value;
            _this._subject.notify(function (observer) {
                observer.onInvalidate(key);
            });
        };
        this.delete = function (key) {
            if (!(key in _this._object))
                return;
            delete _this._object[key];
            _this._subject.notify(function (observer) {
                observer.onInvalidate(key);
            });
        };
        this._object = object;
        this._subject = new observable_1.Subject();
    }
    return SimpleRecord;
})(mutable_record_1.MutableRecord);
exports.default = SimpleRecord;
