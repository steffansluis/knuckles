var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var mutable_record_1 = require('./mutable_record');
var observable_1 = require('../node_modules/sonic/dist/observable');
var Knuckle = (function (_super) {
    __extends(Knuckle, _super);
    function Knuckle() {
        var _this = this;
        var sources = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            sources[_i - 0] = arguments[_i];
        }
        _super.call(this);
        this.addSource = function (source) {
            _this._sources.push(source);
            return _this;
        };
        this._sources = sources;
        this._subject = new observable_1.Subject();
    }
    Knuckle.prototype.has = function (key) {
        return this._sources.reduce(function (memo, source) { return memo || source.has(key); }, false);
    };
    Knuckle.prototype.get = function (key) {
        var value;
        for (var i in this._sources) {
            if (value = this._sources[i].get(key)) {
                return value;
            }
        }
        return null;
    };
    Knuckle.prototype.observe = function (observer) {
        return this._subject.observe(observer);
    };
    Knuckle.prototype.set = function (key, value) {
        this._sources.forEach(function (source) {
            if (source["set"] != null)
                source["set"](key, value);
        });
        this._subject.notify(function (observer) {
            observer.onInvalidate(key);
        });
    };
    Knuckle.prototype.delete = function (key) {
        this._sources.forEach(function (source) {
            if (source["delete"] != null)
                source["delete"](key);
        });
        this._subject.notify(function (observer) {
            observer.onInvalidate(key);
        });
    };
    return Knuckle;
})(mutable_record_1.MutableRecord);
exports.Knuckle = Knuckle;
exports.default = Knuckle;
