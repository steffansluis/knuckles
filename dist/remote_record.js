var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var simple_record_1 = require('./simple_record');
var RemoteRecord = (function (_super) {
    __extends(RemoteRecord, _super);
    function RemoteRecord(urlRoot) {
        this._urlRoot = urlRoot;
        _super.call(this, {});
    }
    RemoteRecord.prototype._fetch = function (key, value) {
        var url = this._urlRoot, p;
        url = key ? url + "/" + key : url;
        var options = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: key ? "GET" : "POST"
        };
        if (key && arguments.length == 2)
            options.method = value ? "PUT" : "DELETE";
        if (value != null)
            options.body = JSON.stringify(value);
        console.log(url, options);
        p = window["fetch"](url, options);
        return p.then(function (res) { return res.json(); });
        //   .then( function(json: any) {
        //     super._set(key, json);
        // })
    };
    RemoteRecord.prototype.get = function (key) {
        var value, _set = _super.prototype.set.bind(this);
        if (value = _super.prototype.get.call(this, key))
            return value;
        else
            this._fetch(key).then(function (json) {
                _set(key, json);
            });
        return null;
    };
    RemoteRecord.prototype.set = function (key, value) {
        var _set = _super.prototype.set.bind(this);
        this._fetch(key, value).then(function () {
            _set(key, value);
        });
        return null;
    };
    RemoteRecord.prototype.delete = function (key) {
        var _notify = this._subject.notify.bind(this);
        this._fetch(key, null).then(function () {
            _notify(function (observer) {
                observer.onInvalidate(key);
            });
        });
    };
    return RemoteRecord;
})(simple_record_1.default);
exports.RemoteRecord = RemoteRecord;
exports.default = RemoteRecord;
