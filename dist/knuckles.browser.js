(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Knuckles = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;desc = parent = getter = undefined;_again = false;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
}

var _simple_record = require('./simple_record');

var _xhr = require('./xhr');

var Collection = (function (_SimpleRecord) {
    function Collection(urlRoot, models) {
        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).call(this, {});
        this._urlRoot = urlRoot;
    }

    _inherits(Collection, _SimpleRecord);

    _createClass(Collection, [{
        key: 'all',
        value: function all() {
            var _this = this;

            return _xhr.XHR.get(this._urlRoot).then(function (res) {
                var arr = JSON.parse(res.responseText);
                arr.forEach(function (value) {
                    _get(Object.getPrototypeOf(Collection.prototype), 'set', _this).call(_this, value.id, value);
                });
                return arr;
            });
        }
    }, {
        key: 'has',
        value: function has(key) {
            var _this2 = this;

            return _get(Object.getPrototypeOf(Collection.prototype), 'has', this).call(this, key).then(function (has) {
                return has || _xhr.XHR.head(_this2._urlRoot + '/' + key).then(function () {
                    return true;
                })['catch'](function () {
                    return false;
                });
            });
        }
    }, {
        key: 'get',
        value: function get(key) {
            var _this3 = this;

            return key in this._object ? _get(Object.getPrototypeOf(Collection.prototype), 'get', this).call(this, key) : _xhr.XHR.get(this._urlRoot + '/' + key).then(function (res) {
                var value = JSON.parse(res.responseText);
                _get(Object.getPrototypeOf(Collection.prototype), 'set', _this3).call(_this3, key, value);
                return value;
            });
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            var _this4 = this;

            if (key in this._object) return _xhr.XHR.put(this._urlRoot + '/' + key, value).then(function (res) {
                return _get(Object.getPrototypeOf(Collection.prototype), 'set', _this4).call(_this4, key, JSON.parse(res.responseText));
            });else return _xhr.XHR.post(this._urlRoot, value).then(function (res) {
                var value = JSON.parse(res.responseText);
                return _get(Object.getPrototypeOf(Collection.prototype), 'set', _this4).call(_this4, value.id, value);
            });
        }
    }, {
        key: 'observe',
        value: function observe(observer) {
            return this._subject.observe(observer);
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            var _this5 = this;

            return _xhr.XHR['delete'](this._urlRoot + '/' + key).then(function (res) {
                return _get(Object.getPrototypeOf(Collection.prototype), 'delete', _this5).call(_this5, key);
            });
        }
    }]);

    return Collection;
})(_simple_record.SimpleRecord);

exports.Collection = Collection;
exports['default'] = Collection;

},{"./simple_record":5,"./xhr":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;desc = parent = getter = undefined;_again = false;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
}

var _observable_record = require('./observable_record');

var _node_modulesSonicDistMutable_list = require('../node_modules/sonic/dist/mutable_list');

;

var MutableRecord = (function (_ObservableRecord) {
    function MutableRecord(record) {
        _classCallCheck(this, MutableRecord);

        _get(Object.getPrototypeOf(MutableRecord.prototype), 'constructor', this).call(this, record);
        if (record != null) {
            this.set = record.set;
            this['delete'] = record['delete'];
        }
    }

    _inherits(MutableRecord, _ObservableRecord);

    _createClass(MutableRecord, [{
        key: 'set',
        value: function set(key, value) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'zoom',
        value: function zoom(key) {
            return _node_modulesSonicDistMutable_list.MutableList.create(MutableRecord.zoom(this, key));
        }
    }], [{
        key: 'create',

        // compose<W>(lens: ILens<V,W>): MutableRecord<W> {
        //   return MutableRecord.create<W>(MutableRecord.compose<V,W>(this, lens));
        // }
        value: function create(record) {
            return new MutableRecord(record);
        }
    }, {
        key: 'zoom',
        value: function zoom(record, key) {
            var unit = _observable_record.ObservableRecord.zoom(record, key);
            function set(_key, value) {
                if (_key == key) record.set(key, value);
            }
            function splice(prev, next) {
                for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key2 = 2; _key2 < _len; _key2++) {
                    values[_key2 - 2] = arguments[_key2];
                }

                if (values.length) record.set(key, values[0]);else record['delete'](key);
            }
            return _node_modulesSonicDistMutable_list.MutableList.create({
                has: unit.has,
                get: unit.get,
                prev: unit.prev,
                next: unit.next,
                observe: unit.observe,
                set: set,
                splice: splice
            });
        }
    }]);

    return MutableRecord;
})(_observable_record.ObservableRecord);

exports.MutableRecord = MutableRecord;
exports['default'] = MutableRecord;

},{"../node_modules/sonic/dist/mutable_list":15,"./observable_record":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;desc = parent = getter = undefined;_again = false;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
}

var _node_modulesSonicDistUnit = require('../node_modules/sonic/dist/unit');

var _node_modulesSonicDistUnit2 = _interopRequireDefault(_node_modulesSonicDistUnit);

var _record = require('./record');

var _node_modulesSonicDistObservable_list = require('../node_modules/sonic/dist/observable_list');

;

var ObservableRecord = (function (_Record) {
    function ObservableRecord(record) {
        _classCallCheck(this, ObservableRecord);

        _get(Object.getPrototypeOf(ObservableRecord.prototype), 'constructor', this).call(this, record);
        if (record != null) this.observe = record.observe;
    }

    _inherits(ObservableRecord, _Record);

    _createClass(ObservableRecord, [{
        key: 'observe',
        value: function observe(observer) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'zoom',
        value: function zoom(key) {
            return _node_modulesSonicDistObservable_list.ObservableList.create(ObservableRecord.zoom(this, key));
        }
    }], [{
        key: 'create',
        value: function create(record) {
            return new ObservableRecord(record);
        }
    }, {
        key: 'zoom',
        value: function zoom(record, key) {
            var unit = new _node_modulesSonicDistUnit2['default']();
            record.get(key).then(function (value) {
                return unit.set(key, value);
            });
            record.observe({
                onInvalidate: function onInvalidate(k) {
                    if (k != key) return;
                    record.get(key).then(function (value) {
                        return unit.set(key, value);
                    })['catch'](function () {
                        return unit.splice(null, null);
                    });
                }
            });
            return _node_modulesSonicDistObservable_list.ObservableList.create(unit);
        }
    }]);

    return ObservableRecord;
})(_record.Record);

exports.ObservableRecord = ObservableRecord;
exports['default'] = ObservableRecord;

},{"../node_modules/sonic/dist/observable_list":20,"../node_modules/sonic/dist/unit":22,"./record":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

var _node_modulesSonicDistList = require('../node_modules/sonic/dist/list');

var _node_modulesSonicDistFactory = require('../node_modules/sonic/dist/factory');

var Record = (function () {
    function Record(record) {
        _classCallCheck(this, Record);

        if (record != null) {
            this.get = record.get;
            this.has = record.has;
        }
    }

    _createClass(Record, [{
        key: 'has',
        value: function has(key) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'get',
        value: function get(key) {
            throw new Error('Not implemented');
        }
    }, {
        key: 'zoom',
        value: function zoom(key) {
            return _node_modulesSonicDistList.List.create(Record.zoom(this, key));
        }
    }], [{
        key: 'create',
        value: function create(record) {
            return new Record(record);
        }
    }, {
        key: 'zoom',
        value: function zoom(record, key) {
            var unit = (0, _node_modulesSonicDistFactory.fromPromise)(record.get(key));
            return {
                has: unit.has,
                get: unit.get,
                prev: unit.prev,
                next: unit.next
            };
        }
    }]);

    return Record;
})();

exports.Record = Record;
exports['default'] = Record;

},{"../node_modules/sonic/dist/factory":10,"../node_modules/sonic/dist/list":14}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
        }
    }return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
    };
})();

var _get = function get(_x, _x2, _x3) {
    var _again = true;_function: while (_again) {
        var object = _x,
            property = _x2,
            receiver = _x3;desc = parent = getter = undefined;_again = false;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
            var parent = Object.getPrototypeOf(object);if (parent === null) {
                return undefined;
            } else {
                _x = parent;_x2 = property;_x3 = receiver;_again = true;continue _function;
            }
        } else if ('value' in desc) {
            return desc.value;
        } else {
            var getter = desc.get;if (getter === undefined) {
                return undefined;
            }return getter.call(receiver);
        }
    }
};

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError('Cannot call a class as a function');
    }
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== 'function' && superClass !== null) {
        throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
    }subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) subClass.__proto__ = superClass;
}

var _mutable_record = require('./mutable_record');

var _node_modulesSonicDistObservable = require('../node_modules/sonic/dist/observable');

var SimpleRecord = (function (_MutableRecord) {
    function SimpleRecord(object) {
        _classCallCheck(this, SimpleRecord);

        _get(Object.getPrototypeOf(SimpleRecord.prototype), 'constructor', this).call(this);
        this._object = object;
        this._subject = new _node_modulesSonicDistObservable.Subject();
    }

    _inherits(SimpleRecord, _MutableRecord);

    _createClass(SimpleRecord, [{
        key: 'has',
        value: function has(key) {
            var _this = this;

            return new Promise(function (resolve, reject) {
                resolve(key in _this._object);
            });
        }
    }, {
        key: 'get',
        value: function get(key) {
            var _this2 = this;

            return new Promise(function (resolve, reject) {
                key in _this2._object ? resolve(_this2._object[key]) : reject();
            });
        }
    }, {
        key: 'observe',
        value: function observe(observer) {
            return this._subject.observe(observer);
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            var _this3 = this;

            return new Promise(function (resolve, reject) {
                _this3._object[key] = value;
                _this3._subject.notify(function (observer) {
                    observer.onInvalidate(key);
                });
                resolve(key);
            });
        }
    }, {
        key: 'delete',
        value: function _delete(key) {
            var _this4 = this;

            return new Promise(function (resolve, reject) {
                if (!(key in _this4._object)) reject();
                var value = _this4._object[key];
                delete _this4._object[key];
                _this4._subject.notify(function (observer) {
                    observer.onInvalidate(key);
                });
                resolve(value);
            });
        }
    }]);

    return SimpleRecord;
})(_mutable_record.MutableRecord);

exports.SimpleRecord = SimpleRecord;
exports['default'] = SimpleRecord;

},{"../node_modules/sonic/dist/observable":16,"./mutable_record":2}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var XHR = {
    create: function create(key, options) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();var url = key.toString();var method = options.method;
            var body = options.body;

            xhr.onload = function () {
                if (xhr.status >= 200 && xhr.status < 400) {
                    resolve(xhr);
                } else {
                    reject(xhr);
                }
            };
            xhr.onerror = function () {
                reject(xhr);
            };
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            xhr.send(JSON.stringify(body));
        });
    },
    head: function head(url) {
        return XHR.create(url, { method: 'HEAD' });
    },
    get: function get(url) {
        return XHR.create(url, { method: 'GET' });
    },
    put: function put(url, body) {
        return XHR.create(url, { method: 'PUT', body: body });
    },
    post: function post(url, body) {
        return XHR.create(url, { method: 'POST', body: body });
    },
    'delete': function _delete(url) {
        return XHR.create(url, { method: 'DELETE' });
    }
};
// export class XHRRecord<V> implements IMutableRecord<V> {
//   protected _subject: Subject<IRecordObserver>;
//
//   constructor() {
//     this._subject = XHRRecord._subject;
//   }
//
//   has(key: Key): boolean {
//      return XHRRecord.has(key);
//    }
//
//   get(key: Key): V {
//      return <V>XHRRecord.get(key);
//    }
//
//   set(key: Key, value: V): void {
//      return XHRRecord.set(key, value);
//    }
//
//   observe(observer: IRecordObserver): ISubscription {
//      return XHRRecord.observe(observer);
//    }
//
//   delete(key: Key): void {
//      return XHRRecord.delete(key);
//    }
//
//   static _subject = new Subject<IRecordObserver>();
//
//   static invalidate = (key: Key): void => {
//     XHRRecord._subject.notify(function(observer: IRecordObserver) {
//       observer.onInvalidate(key);
//     });
//   }
//
//   static has = (key: string): Promise<boolean> => {
//     return XHR.head(key)
//               .then(function() { return true; })
//               .catch(function() { return false; });
//   }
//
//   static get = <V>(key: string): Promise<V> => {
//     return XHR.get(key)
//               .then(function(xhr) { return JSON.parse(xhr.responseText); })
//   }
//
//   // static set = <V>(key: string, value: V): Promise<V> => {
//   //   return XHR.
//   // }
//
//   static observe = (observer: IRecordObserver): ISubscription => {
//     return XHRRecord._subject.observe(observer);
//   }
//
//   static delete = (key: Key): void => {
//     var xhr = XHR["delete"](key);
//     XHRRecord.invalidate(key);
//
//     return null;
//   }
//
// }
//
// export default XHRRecord;
exports.XHR = XHR;

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _observable = require('./observable');

var _mutable_list = require('./mutable_list');

var ArrayList = (function (_MutableList) {
    function ArrayList() {
        var _this = this;

        var array = arguments[0] === undefined ? [] : arguments[0];

        _classCallCheck(this, ArrayList);

        _get(Object.getPrototypeOf(ArrayList.prototype), 'constructor', this).call(this);
        this.has = function (key) {
            return key != null && -1 < key && key < _this._array.length;
        };
        this.get = function (key) {
            if (_this.has(key)) return _this._array[key];
            return;
        };
        this.prev = function (key) {
            if (key == null && _this._array.length) return _this._array.length - 1;
            if (_this._array.length > 0 && key != null && _this.has(key) && _this.has(key - 1)) return key - 1;
            return null;
        };
        this.next = function (key) {
            if (key == null && _this._array.length) return 0;
            if (_this._array.length > 0 && key != null && _this.has(key) && _this.has(key + 1)) return key + 1;
            return null;
        };
        this.set = function (key, value) {
            if (!_this.has(key)) return null;
            _this._array[key] = value;
            return key;
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            var _array;

            if (prev == null) prev = -1;else if (!_this.has(prev)) return;
            if (next == null) next = _this._array.length;else if (!_this.has(next)) return;
            (_array = _this._array).splice.apply(_array, [prev + 1, next - (prev + 1)].concat(values));
            _this._invalidate(prev, null);
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._invalidate = function (prev, next) {
            if (!_this.has(prev)) prev = null;
            if (!_this.has(next)) next = null;
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new _observable.Subject();
        this._array = array;
    }

    _inherits(ArrayList, _MutableList);

    return ArrayList;
})(_mutable_list.MutableList);

exports['default'] = ArrayList;
module.exports = exports['default'];

},{"./mutable_list":15,"./observable":16}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AsyncList = (function () {
    function AsyncList(list, scheduler) {
        var _this = this;

        _classCallCheck(this, AsyncList);

        this.has = function (key) {
            return new Promise(function (resolve, reject) {
                _this._scheduler(function () {
                    Promise.resolve(_this._list.has(key)).then(resolve)["catch"](reject);
                });
            });
        };
        this.get = function (key) {
            return new Promise(function (resolve, reject) {
                _this.has(key).then(function (has) {
                    return has ? resolve(_this._list.get(key)) : reject();
                })["catch"](reject);
            });
        };
        this.prev = function (key) {
            return new Promise(function (resolve, reject) {
                _this._scheduler(function () {
                    Promise.resolve(_this._list.prev(key)).then(function (prev) {
                        return prev != null ? resolve(prev) : reject();
                    })["catch"](reject);
                });
            });
        };
        this.next = function (key) {
            return new Promise(function (resolve, reject) {
                _this._scheduler(function () {
                    Promise.resolve(_this._list.next(key)).then(function (prev) {
                        return prev != null ? resolve(prev) : reject();
                    })["catch"](reject);
                });
            });
        };
        this._list = list;
        this._scheduler = scheduler || window.setTimeout;
    }

    _createClass(AsyncList, null, [{
        key: "create",
        value: function create(list) {
            return new AsyncList(list);
        }
    }, {
        key: "map",
        value: function map(list, mapFn) {
            var has = list.has;
            var prev = list.prev;
            var next = list.next;

            function get(key) {
                return list.get(key).then(mapFn);
            }
            return new AsyncList({ has: has, get: get, prev: prev, next: next });
        }
    }]);

    return AsyncList;
})();

exports.AsyncList = AsyncList;
exports["default"] = AsyncList;

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function Cache(list) {
    var _this = this;

    _classCallCheck(this, Cache);

    this.has = function (key) {
        return key in _this._byKey || _this._list.has(key);
    };
    this.get = function (key) {
        if (key in _this._byKey) return _this._byKey[key];
        if (_this._list.has(key)) return _this._byKey[key] = _this._list.get(key);
        return;
    };
    this.prev = function (key) {
        if (key in _this._prev) return _this._prev[key];
        var prevKey = _this._list.prev(key);
        if (prevKey == null) prevKey = null;
        _this._prev[key] = prevKey;
        _this._next[prevKey] = key;
        return prevKey;
    };
    this.next = function () {
        var key = arguments[0] === undefined ? null : arguments[0];

        if (key in _this._next) return _this._next[key];
        var nextKey = _this._list.next(key);
        if (nextKey == null) nextKey = null;
        _this._next[key] = nextKey;
        _this._prev[nextKey] = key;
        return nextKey;
    };
    this._byKey = Object.create(null), this._next = Object.create(null), this._prev = Object.create(null);
    this._list = list;
};

exports.Cache = Cache;
exports["default"] = Cache;

},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports['default'] = factory;
exports.fromPromise = fromPromise;
exports.fromIterator = fromIterator;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _list = require('./list');

var _observable_list = require('./observable_list');

var _mutable_list = require('./mutable_list');

var _unit = require('./unit');

var _unit2 = _interopRequireDefault(_unit);

var _array_list = require('./array_list');

var _array_list2 = _interopRequireDefault(_array_list);

function factory(obj) {
    if (_mutable_list.MutableList.isMutableList(obj)) return _mutable_list.MutableList.create(obj);
    if (_observable_list.ObservableList.isObservableList(obj)) return _observable_list.ObservableList.create(obj);
    if (_list.List.isList(obj)) return _list.List.create(obj);
    if (Array.isArray(obj)) return new _array_list2['default'](obj);
    return _unit2['default'].create(obj);
}

function fromPromise(promise) {
    var unit = new _unit2['default']();
    promise.then(function (value) {
        unit.push(value);
    });
    return _observable_list.ObservableList.create(unit);
}

function fromIterator(iterator) {
    var list = {
        has: function has(key) {
            return null;
        },
        get: function get(key) {
            return null;
        },
        prev: function prev(key) {
            return null;
        },
        next: function next(key) {
            return null;
        }
    };
    return list;
}

},{"./array_list":7,"./list":14,"./mutable_list":15,"./observable_list":20,"./unit":22}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Index = function Index(list) {
    var _this = this;

    _classCallCheck(this, Index);

    this.has = function (index) {
        if (index >= 0 && index < _this._byIndex.length) return true;
        var next,
            last = _this._byIndex.length - 1;
        while (last != index) {
            next = _this._list.next(_this._byIndex[last]);
            if (next == null) return false;
            _this._byIndex[++last] = next;
        }
        return true;
    };
    this.get = function (index) {
        return _this.has(index) ? _this._list.get(_this._byIndex[index]) : undefined;
    };
    this.prev = function (index) {
        if (_this.has(index - 1)) return index - 1;
        if (index == null && _this._byIndex.length) return _this._byIndex.length - 1;
        return null;
    };
    this.next = function () {
        var index = arguments[0] === undefined ? -1 : arguments[0];

        if (_this.has(index + 1)) return index + 1;
        return null;
    };
    this._byIndex = [];
    this._list = list;
};

exports.Index = Index;
exports["default"] = Index;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Key;
(function (Key) {
    var uniqueKey = 0;
    function key(key) {
        return key.toString();
    }
    Key.key = key;
    function create() {
        return uniqueKey++;
    }
    Key.create = create;
})(Key || (Key = {}));
exports["default"] = Key;
module.exports = exports["default"];

},{}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KeyBy = function KeyBy(list, keyFn) {
    var _this = this;

    _classCallCheck(this, KeyBy);

    this.has = function (key) {
        if (key in _this._sourceKeyByKey) return true;
        var last = null;
        while ((last = _this.next(last)) != null) if (last == key) return true;
        return false;
    };
    this.get = function (key) {
        return _this.has(key) ? _this._list.get(_this._sourceKeyByKey[key]) : undefined;
    };
    this.prev = function (key) {
        if (_this.has(key) || key == null) return _this._keyBySourceKey[_this._list.prev(_this._sourceKeyByKey[key])];
    };
    this.next = function () {
        var key = arguments[0] === undefined ? null : arguments[0];

        var sourceKey, sourceNext, res;
        if (key in _this._sourceKeyByKey) sourceKey = _this._sourceKeyByKey[key];else sourceKey = null;
        while (key != null && !(key in _this._sourceKeyByKey)) {
            sourceKey = _this._list.next(sourceKey);
            if (!(sourceKey in _this._keyBySourceKey)) {
                if (sourceKey == null) return null;
                res = _this._keyFn(_this._list.get(sourceKey), sourceKey);
                _this._keyBySourceKey[sourceKey] = res;
                _this._sourceKeyByKey[res] = sourceKey;
                if (res == key) break;
            }
        }
        sourceKey = _this._list.next(sourceKey);
        if (sourceKey == null) return null;
        res = _this._keyFn(_this._list.get(sourceKey), sourceKey);
        _this._keyBySourceKey[sourceKey] = res;
        _this._sourceKeyByKey[res] = sourceKey;
        return res;
    };
    this._list = list;
    this._keyFn = keyFn;
    this._sourceKeyByKey = Object.create(null);
    this._keyBySourceKey = Object.create(null);
};

exports.KeyBy = KeyBy;
exports["default"] = KeyBy;

},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _tree = require('./tree');

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _key_by = require('./key_by');

var _key_by2 = _interopRequireDefault(_key_by);

var _async_list = require('./async_list');

var List = (function () {
    function List(list) {
        var _this = this;

        _classCallCheck(this, List);

        this.has = function (key) {
            throw new Error('Not implemented');
        };
        this.get = function (key) {
            throw new Error('Not implemented');
        };
        this.prev = function (key) {
            throw new Error('Not implemented');
        };
        this.next = function (key) {
            throw new Error('Not implemented');
        };
        this.first = function () {
            return List.first(_this);
        };
        this.last = function () {
            return List.last(_this);
        };
        this.forEach = function (fn) {
            return List.forEach(_this, fn);
        };
        this.reduce = function (fn, memo) {
            return List.reduce(_this, fn);
        };
        this.toArray = function () {
            return List.toArray(_this);
        };
        this.findKey = function (fn) {
            return List.findKey(_this, fn);
        };
        this.find = function (fn) {
            return List.find(_this, fn);
        };
        this.keyOf = function (value) {
            return List.keyOf(_this, value);
        };
        this.indexOf = function (value) {
            return List.indexOf(_this, value);
        };
        this.keyAt = function (index) {
            return List.keyAt(_this, index);
        };
        this.at = function (index) {
            return List.at(_this, index);
        };
        this.every = function (predicate) {
            return List.every(_this, predicate);
        };
        this.some = function (predicate) {
            return List.some(_this, predicate);
        };
        this.contains = function (value) {
            return List.contains(_this, value);
        };
        this.reverse = function () {
            return List.create(List.reverse(_this));
        };
        this.map = function (mapFn) {
            return List.create(List.map(_this, mapFn));
        };
        this.filter = function (filterFn) {
            return List.create(List.filter(_this, filterFn));
        };
        this.flatten = function () {
            return List.create(List.flatten(_this));
        };
        this.flatMap = function (flatMapFn) {
            return List.create(List.flatMap(_this, flatMapFn));
        };
        this.cache = function () {
            return List.create(List.cache(_this));
        };
        this.index = function () {
            return List.create(List.index(_this));
        };
        this.keyBy = function (keyFn) {
            return List.create(List.keyBy(_this, keyFn));
        };
        this.zip = function (other, zipFn) {
            return List.create(List.zip(_this, other, zipFn));
        };
        this.skip = function (k) {
            return List.create(List.skip(_this, k));
        };
        this.take = function (n) {
            return List.create(List.take(_this, n));
        };
        this.range = function (k, n) {
            return List.create(List.range(_this, k, n));
        };
        this.scan = function (scanFn, memo) {
            return List.create(List.scan(_this, scanFn, memo));
        };
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }

    _createClass(List, null, [{
        key: 'isList',
        value: function isList(obj) {
            return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
        }
    }, {
        key: 'create',
        value: function create(list) {
            return new List({
                has: list.has,
                get: list.get,
                prev: list.prev,
                next: list.next
            });
        }
    }, {
        key: 'first',
        value: function first(list) {
            return list.get(list.next());
        }
    }, {
        key: 'last',
        value: function last(list) {
            return list.get(list.prev());
        }
    }, {
        key: 'forEach',
        value: function forEach(list, fn) {
            var key;
            while ((key = list.next(key)) != null) fn(list.get(key), key);
        }
    }, {
        key: 'reduce',
        value: function reduce(list, fn, memo) {
            var key;
            while ((key = list.next(key)) != null) memo = fn(memo, list.get(key), key);
            return memo;
        }
    }, {
        key: 'toArray',
        value: function toArray(list) {
            var key,
                index = 0,
                array = [];
            while ((key = list.next(key)) != null) array[index++] = list.get(key);
            return array;
        }
    }, {
        key: 'findKey',
        value: function findKey(list, fn) {
            var key;
            while ((key = list.next(key)) != null) if (fn(list.get(key), key)) return key;
        }
    }, {
        key: 'find',
        value: function find(list, fn) {
            return list.get(List.findKey(list, fn));
        }
    }, {
        key: 'keyOf',
        value: function keyOf(list, value) {
            return List.findKey(list, function (v) {
                return v === value;
            });
        }
    }, {
        key: 'indexOf',
        value: function indexOf(list, value) {
            var key,
                i = 0;
            while ((key = list.next(key)) != null) {
                if (list.get(key) === value) return i;
                i++;
            }
        }
    }, {
        key: 'keyAt',
        value: function keyAt(list, index) {
            var key,
                i = 0;
            while ((key = list.next(key)) != null) if (i++ == index) return key;
            return null;
        }
    }, {
        key: 'at',
        value: function at(list, index) {
            return list.get(List.keyAt(list, index));
        }
    }, {
        key: 'every',
        value: function every(list, predicate) {
            var key;
            while ((key = list.next(key)) != null) if (!predicate(list.get(key), key)) return false;
            return true;
        }
    }, {
        key: 'some',
        value: function some(list, predicate) {
            var key;
            while ((key = list.next(key)) != null) if (predicate(list.get(key), key)) return true;
            return false;
        }
    }, {
        key: 'contains',
        value: function contains(list, value) {
            return List.some(list, function (v) {
                return v === value;
            });
        }
    }, {
        key: 'reverse',
        value: function reverse(list) {
            var has = list.has;
            var get = list.get;

            function prev(key) {
                return list.next(key);
            }
            function next(key) {
                return list.prev(key);
            }
            return { has: has, get: get, prev: prev, next: next };
        }
    }, {
        key: 'map',
        value: function map(list, mapFn) {
            var has = list.has;
            var prev = list.prev;
            var next = list.next;

            function get(key) {
                return has(key) ? mapFn(list.get(key), key) : undefined;
            }
            return { has: has, get: get, prev: prev, next: next };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            function has(key) {
                return list.has(key) && filterFn(list.get(key), key);
            }
            function get(key) {
                if (has(key)) return list.get(key);
                return;
            }
            function prev(key) {
                var prev = key;
                while ((prev = list.prev(prev)) != null) if (has(prev)) return prev;
                return null;
            }
            function next(key) {
                var next = key;
                while ((next = list.next(next)) != null) if (has(next)) return next;
                return null;
            }
            return { has: has, get: get, prev: prev, next: next };
        }
    }, {
        key: 'flatten',
        value: function flatten(list) {
            function has(key) {
                var path = _tree.Path.create(key);
                return _tree.Tree.has(list, path, 1);
            }
            function get(key) {
                var path = _tree.Path.create(key);
                return _tree.Tree.get(list, path, 1);
            }
            function prev(key) {
                var path = _tree.Path.create(key);
                return _tree.Path.key(_tree.Tree.prev(list, path, 1));
            }
            function next(key) {
                var path = _tree.Path.create(key);
                return _tree.Path.key(_tree.Tree.next(list, path, 1));
            }
            return { has: has, get: get, prev: prev, next: next };
        }
    }, {
        key: 'flatMap',
        value: function flatMap(list, flatMapFn) {
            return List.flatten(List.map(list, flatMapFn));
        }
    }, {
        key: 'cache',
        value: function cache(list) {
            return new _cache2['default'](list);
        }
    }, {
        key: 'index',
        value: function index(list) {
            return new _index2['default'](list);
        }
    }, {
        key: 'keyBy',
        value: function keyBy(list, keyFn) {
            return new _key_by2['default'](list, keyFn);
        }
    }, {
        key: 'zip',
        value: function zip(list, other, zipFn) {
            list = List.index(list);
            other = List.index(other);
            function has(key) {
                return list.has(key) && other.has(key);
            }
            function get(key) {
                return has(key) ? zipFn(list.get(key), other.get(key)) : undefined;
            }
            function prev(key) {
                var prev = list.prev(key);
                return prev != null && prev == other.prev(key) ? prev : null;
            }
            function next(key) {
                var next = list.next(key);
                return next != null && next == other.next(key) ? next : null;
            }
            return { has: has, get: get, prev: prev, next: next };
        }
    }, {
        key: 'skip',
        value: function skip(list, k) {
            return List.filter(List.index(list), function (value, key) {
                return key >= k;
            });
        }
    }, {
        key: 'take',
        value: function take(list, n) {
            return List.filter(List.index(list), function (value, key) {
                return key < n;
            });
        }
    }, {
        key: 'range',
        value: function range(list, k, n) {
            return List.filter(List.index(list), function (value, key) {
                return key >= k && key < n + k;
            });
        }
    }, {
        key: 'scan',
        value: function scan(list, scanFn, memo) {
            var has = list.has;
            var prev = list.prev;
            var next = list.next;var scanList;
            function get(key) {
                var prev = scanList.prev(key);
                return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
            }
            scanList = List.cache({ has: has, get: get, prev: prev, next: next });
            return scanList;
        }
    }, {
        key: 'async',
        value: function async(list, scheduler) {
            return new _async_list.AsyncList(list);
        }
    }]);

    return List;
})();

exports.List = List;
exports['default'] = List;

},{"./async_list":8,"./cache":9,"./index":11,"./key_by":13,"./tree":21}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _observable_list = require("./observable_list");

var MutableList = (function (_ObservableList) {
    function MutableList(list) {
        var _this = this;

        _classCallCheck(this, MutableList);

        _get(Object.getPrototypeOf(MutableList.prototype), "constructor", this).call(this, list);
        this.set = function (key, value) {
            throw new Error("Not implemented");
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            throw new Error("Not implemented");
        };
        this.addBefore = function (key, value) {
            return MutableList.addBefore(_this, key, value);
        };
        this.addAfter = function (key, value) {
            return MutableList.addAfter(_this, key, value);
        };
        this.push = function (value) {
            return MutableList.push(_this, value);
        };
        this.unshift = function (value) {
            return MutableList.unshift(_this, value);
        };
        this["delete"] = function (key) {
            return MutableList["delete"](_this, key);
        };
        this.deleteBefore = function (key) {
            return MutableList.deleteBefore(_this, key);
        };
        this.deleteAfter = function (key) {
            return MutableList.deleteAfter(_this, key);
        };
        this.pop = function () {
            return MutableList.pop(_this);
        };
        this.shift = function () {
            return MutableList.shift(_this);
        };
        this.remove = function (value) {
            return MutableList.remove(_this, value);
        };
        this.compose = function (lens) {
            return MutableList.create(MutableList.compose(_this, lens));
        };
        if (list != null) {
            this.set = list.set;
            this.splice = list.splice;
        }
    }

    _inherits(MutableList, _ObservableList);

    _createClass(MutableList, null, [{
        key: "isMutableList",
        value: function isMutableList(obj) {
            return _observable_list.ObservableList.isObservableList(obj) && !!obj["set"] && !!obj["splice"];
        }
    }, {
        key: "create",
        value: function create(list) {
            return new MutableList({
                has: list.has,
                get: list.get,
                prev: list.prev,
                next: list.next,
                observe: list.observe,
                set: list.set,
                splice: list.splice
            });
        }
    }, {
        key: "addBefore",
        value: function addBefore(list, key, value) {
            list.splice(list.prev(key), key, value);
            return list.prev(key);
        }
    }, {
        key: "addAfter",
        value: function addAfter(list, key, value) {
            list.splice(key, list.next(key), value);
            return list.next(key);
        }
    }, {
        key: "push",
        value: function push(list, value) {
            return MutableList.addBefore(list, null, value);
        }
    }, {
        key: "unshift",
        value: function unshift(list, value) {
            return MutableList.addAfter(list, null, value);
        }
    }, {
        key: "delete",
        value: function _delete(list, key) {
            if (!list.has(key)) return;
            var value = list.get(key);
            list.splice(list.prev(key), list.next(key));
            return value;
        }
    }, {
        key: "deleteBefore",
        value: function deleteBefore(list, key) {
            return MutableList["delete"](list, list.prev(key));
        }
    }, {
        key: "deleteAfter",
        value: function deleteAfter(list, key) {
            return MutableList["delete"](list, list.next(key));
        }
    }, {
        key: "pop",
        value: function pop(list) {
            return MutableList.deleteBefore(list, null);
        }
    }, {
        key: "shift",
        value: function shift(list) {
            return MutableList.deleteAfter(list, null);
        }
    }, {
        key: "remove",
        value: function remove(list, value) {
            var key = MutableList.keyOf(list, value);
            if (key == null) return false;
            delete (list, key);
            return true;
        }
    }, {
        key: "compose",
        value: function compose(list, lens) {
            function get(key) {
                return lens.get(list.get(key));
            }
            function set(key, value) {
                list.set(key, lens.set(list.get(key), value));
            }
            function splice(prev, next) {
                for (var _len2 = arguments.length, values = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
                    values[_key2 - 2] = arguments[_key2];
                }

                list.splice.apply(list, [prev, next].concat(_toConsumableArray(values.map(function (val) {
                    return lens.set(null, val);
                }))));
            }
            return {
                has: list.has,
                get: get,
                set: set,
                splice: splice,
                prev: list.prev,
                next: list.next,
                observe: list.observe
            };
        }
    }]);

    return MutableList;
})(_observable_list.ObservableList);

exports.MutableList = MutableList;
exports["default"] = MutableList;

},{"./observable_list":20}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Subject = function Subject() {
    var _this = this;

    _classCallCheck(this, Subject);

    this.observe = function (observer) {
        var observerKey = _key2['default'].create();
        _this._observers[observerKey] = observer;
        return {
            unsubscribe: function unsubscribe() {
                delete _this._observers[observerKey];
            }
        };
    };
    this.notify = function (notifier) {
        for (var observerKey in _this._observers) notifier(_this._observers[observerKey]);
    };
    this._observers = Object.create(null);
};

exports.Subject = Subject;

},{"./key":12}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var ObservableCache = (function (_Cache) {
    function ObservableCache(list) {
        var _this = this;

        _classCallCheck(this, ObservableCache);

        _get(Object.getPrototypeOf(ObservableCache.prototype), 'constructor', this).call(this, list);
        this.observe = function (observer) {
            return _this._list.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            var key;
            key = prev;
            while ((key = _this._next[key]) !== undefined) {
                delete _this._next[_this._prev[key]];
                delete _this._prev[key];
                if (key == next) break;
                delete _this._byKey[key];
            }
            while ((key = _this._prev[key]) !== undefined) {
                delete _this._prev[_this._next[key]];
                delete _this._next[key];
                if (key == prev) break;
                delete _this._byKey[key];
            }
        };
        list.observe(this);
    }

    _inherits(ObservableCache, _Cache);

    return ObservableCache;
})(_cache2['default']);

exports.ObservableCache = ObservableCache;
exports['default'] = ObservableCache;

},{"./cache":9}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _observable = require('./observable');

var ObservableIndex = (function (_Index) {
    function ObservableIndex(list) {
        var _this = this;

        _classCallCheck(this, ObservableIndex);

        _get(Object.getPrototypeOf(ObservableIndex.prototype), 'constructor', this).call(this, list);
        this.has = function (index) {
            if (index >= 0 && index < _this._byIndex.length) return true;
            var next,
                last = _this._byIndex.length - 1;
            while (last != index) {
                next = _this._list.next(_this._byIndex[last]);
                if (next == null) return false;
                _this._byIndex[++last] = next;
                _this._byKey[next] = last;
            }
            return true;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            var prevIndex = _this._byKey[prev],
                length = _this._byIndex.length,
                index = prevIndex;
            while (++index < length) delete _this._byKey[_this._byIndex[index]];
            _this._byIndex.splice(prevIndex + 1);
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prevIndex, null);
            });
        };
        this._byKey = Object.create(null);
        this._subject = new _observable.Subject();
        list.observe(this);
    }

    _inherits(ObservableIndex, _Index);

    return ObservableIndex;
})(_index2['default']);

exports.ObservableIndex = ObservableIndex;
exports['default'] = ObservableIndex;

},{"./index":11,"./observable":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _key_by = require('./key_by');

var _key_by2 = _interopRequireDefault(_key_by);

var _observable = require('./observable');

var ObservableKeyBy = (function (_KeyBy) {
    function ObservableKeyBy(list, keyFn) {
        var _this = this;

        _classCallCheck(this, ObservableKeyBy);

        _get(Object.getPrototypeOf(ObservableKeyBy.prototype), 'constructor', this).call(this, list, keyFn);
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (prev, next) {
            _this._subject.notify(function (observer) {
                observer.onInvalidate(this._keyBySourceKey[prev], this._keyBySourceKey[next]);
            });
        };
        this._subject = new _observable.Subject();
        list.observe(this);
    }

    _inherits(ObservableKeyBy, _KeyBy);

    return ObservableKeyBy;
})(_key_by2['default']);

exports.ObservableKeyBy = ObservableKeyBy;
exports['default'] = ObservableKeyBy;

},{"./key_by":13,"./observable":16}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _list = require('./list');

var _tree = require('./tree');

var _observable = require('./observable');

var _observable_cache = require('./observable_cache');

var _observable_cache2 = _interopRequireDefault(_observable_cache);

var _observable_index = require('./observable_index');

var _observable_index2 = _interopRequireDefault(_observable_index);

var _observable_key_by = require('./observable_key_by');

var _observable_key_by2 = _interopRequireDefault(_observable_key_by);

;

var ObservableList = (function (_List) {
    function ObservableList(list) {
        var _this = this;

        _classCallCheck(this, ObservableList);

        _get(Object.getPrototypeOf(ObservableList.prototype), 'constructor', this).call(this, list);
        this.observe = function (observer) {
            throw new Error('Not implemented');
        };
        this.reverse = function () {
            return ObservableList.create(ObservableList.reverse(_this));
        };
        this.map = function (mapFn) {
            return ObservableList.create(ObservableList.map(_this, mapFn));
        };
        this.filter = function (filterFn) {
            return ObservableList.create(ObservableList.filter(_this, filterFn));
        };
        this.flatten = function () {
            return ObservableList.create(ObservableList.flatten(_this));
        };
        this.flatMap = function (flatMapFn) {
            return ObservableList.create(ObservableList.flatMap(_this, flatMapFn));
        };
        this.cache = function () {
            return ObservableList.create(ObservableList.cache(_this));
        };
        this.index = function () {
            return ObservableList.create(ObservableList.index(_this));
        };
        this.keyBy = function (keyFn) {
            return ObservableList.create(ObservableList.keyBy(_this, keyFn));
        };
        this.zip = function (other, zipFn) {
            return ObservableList.create(ObservableList.zip(_this, other, zipFn));
        };
        this.skip = function (k) {
            return ObservableList.create(ObservableList.skip(_this, k));
        };
        this.take = function (n) {
            return ObservableList.create(ObservableList.take(_this, n));
        };
        this.range = function (k, n) {
            return ObservableList.create(ObservableList.range(_this, k, n));
        };
        this.scan = function (scanFn, memo) {
            return ObservableList.create(ObservableList.scan(_this, scanFn, memo));
        };
        if (list != null) this.observe = list.observe;
    }

    _inherits(ObservableList, _List);

    _createClass(ObservableList, null, [{
        key: 'isObservableList',
        value: function isObservableList(obj) {
            return _list.List.isList(obj) && !!obj['observe'];
        }
    }, {
        key: 'create',
        value: function create(list) {
            return new ObservableList({
                has: list.has,
                get: list.get,
                prev: list.prev,
                next: list.next,
                observe: list.observe
            });
        }
    }, {
        key: 'reverse',
        value: function reverse(list) {
            var _List$reverse = _list.List.reverse(list);

            var has = _List$reverse.has;
            var get = _List$reverse.get;
            var prev = _List$reverse.prev;
            var next = _List$reverse.next;

            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(prev, next) {
                        observer.onInvalidate(next, prev);
                    }
                });
            }
            return { has: has, get: get, prev: prev, next: next, observe: observe };
        }
    }, {
        key: 'map',
        value: function map(list, mapFn) {
            var _List$map = _list.List.map(list, mapFn);

            var has = _List$map.has;
            var get = _List$map.get;
            var prev = _List$map.prev;
            var next = _List$map.next;

            return { has: has, get: get, prev: prev, next: next, observe: list.observe };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            var _List$filter = _list.List.filter(list, filterFn);

            var has = _List$filter.has;
            var get = _List$filter.get;
            var prev = _List$filter.prev;
            var next = _List$filter.next;

            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(p, n) {
                        p = has(p) ? p : prev(p);
                        n = has(n) ? n : next(n);
                        observer.onInvalidate(p, n);
                    }
                });
            }
            return { has: has, get: get, prev: prev, next: next, observe: observe };
        }
    }, {
        key: 'flatten',
        value: function flatten(list) {
            var cache;
            var subscriptions = Object.create(null);
            var subject = new _observable.Subject();
            list.observe({
                onInvalidate: function onInvalidate(prev, next) {
                    var key;
                    key = prev;
                    while ((key = cache.next(key)) != null && key != next) {
                        var subscription = subscriptions[key];
                        if (subscription) {
                            subscription.unsubscribe();
                            delete subscriptions[key];
                        }
                    }
                    key = next;
                    while ((key = cache.prev(key)) != null && key != prev) {
                        var subscription = subscriptions[key];
                        if (subscription) {
                            subscription.unsubscribe();
                            delete subscriptions[key];
                        }
                    }
                }
            });
            cache = ObservableList.cache(ObservableList.map(list, function (value, key) {
                subscriptions[key] = value.observe({
                    onInvalidate: function onInvalidate(prev, next) {
                        var prevKey,
                            nextKey,
                            prevPath = _tree.Path.append(key, prev),
                            nextPath = _tree.Path.append(key, next);
                        if (prev == null) prevPath = _tree.Tree.prev(list, _tree.Tree.next(list, prevPath));
                        if (next == null) nextPath = _tree.Tree.next(list, _tree.Tree.prev(list, nextPath));
                        prevKey = _tree.Path.key(prevPath);
                        nextKey = _tree.Path.key(nextPath);
                        subject.notify(function (observer) {
                            observer.onInvalidate(prevKey, nextKey);
                        });
                    }
                });
                return value;
            }));
            cache.observe({
                onInvalidate: function onInvalidate(prev, next) {
                    var prevKey = _tree.Path.key(_tree.Tree.prev(list, [prev])),
                        nextKey = _tree.Path.key(_tree.Tree.next(list, [next]));
                    subject.notify(function (observer) {
                        observer.onInvalidate(prevKey, nextKey);
                    });
                }
            });

            var _List$flatten = _list.List.flatten(cache);

            var has = _List$flatten.has;
            var get = _List$flatten.get;
            var next = _List$flatten.next;
            var prev = _List$flatten.prev;

            return { has: has, get: get, next: next, prev: prev, observe: subject.observe };
        }
    }, {
        key: 'flatMap',
        value: function flatMap(list, flatMapFn) {
            return ObservableList.flatten(ObservableList.map(list, flatMapFn));
        }
    }, {
        key: 'cache',
        value: function cache(list) {
            return new _observable_cache2['default'](list);
        }
    }, {
        key: 'index',
        value: function index(list) {
            return new _observable_index2['default'](list);
        }
    }, {
        key: 'keyBy',
        value: function keyBy(list, keyFn) {
            return new _observable_key_by2['default'](list, keyFn);
        }
    }, {
        key: 'zip',
        value: function zip(list, other, zipFn) {
            list = ObservableList.index(list);
            other = ObservableList.index(other);
            function has(key) {
                return list.has(key) && other.has(key);
            }
            function get(key) {
                return has(key) ? zipFn(list.get(key), other.get(key)) : undefined;
            }
            function prev(key) {
                var prev = list.prev(key);
                return prev != null && prev == other.prev(key) ? prev : null;
            }
            function next(key) {
                var next = list.next(key);
                return next != null && next == other.next(key) ? next : null;
            }
            var subject = new _observable.Subject(),
                observer = {
                onInvalidate: function onInvalidate(prev, next) {
                    subject.notify(function (_observer) {
                        _observer.onInvalidate(prev, next);
                    });
                }
            };
            list.observe(observer);
            other.observe(observer);
            return { has: has, get: get, prev: prev, next: next, observe: subject.observe };
        }
    }, {
        key: 'skip',
        value: function skip(list, k) {
            return ObservableList.filter(ObservableList.index(list), function (value, key) {
                return key >= k;
            });
        }
    }, {
        key: 'take',
        value: function take(list, n) {
            return ObservableList.filter(ObservableList.index(list), function (value, key) {
                return key < n;
            });
        }
    }, {
        key: 'range',
        value: function range(list, k, n) {
            return ObservableList.filter(ObservableList.index(list), function (value, key) {
                return key >= k && key < n + k;
            });
        }
    }, {
        key: 'scan',
        value: function scan(list, scanFn, memo) {
            var has = list.has;
            var prev = list.prev;
            var next = list.next;var scanList;
            function get(key) {
                var prev = scanList.prev(key);
                return scanFn(prev != null ? scanList.get(prev) : memo, list.get(key));
            }
            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(prev, next) {
                        observer.onInvalidate(prev, null);
                    }
                });
            }
            scanList = ObservableList.cache({ has: has, get: get, prev: prev, next: next, observe: observe });
            return scanList;
        }
    }]);

    return ObservableList;
})(_list.List);

exports.ObservableList = ObservableList;
exports['default'] = ObservableList;

},{"./list":14,"./observable":16,"./observable_cache":17,"./observable_index":18,"./observable_key_by":19,"./tree":21}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _list = require('./list');

;
var Path;
exports.Path = Path;
(function (Path) {
    function key(path) {
        return JSON.stringify(path);
    }
    Path.key = key;
    function create(key) {
        return key == null ? null : JSON.parse(key.toString());
    }
    Path.create = create;
    function head(path) {
        return path ? path[0] : null;
    }
    Path.head = head;
    function get(path, index) {
        return path[index];
    }
    Path.get = get;
    function tail(path) {
        return path == null ? [] : path.slice(1, path.length);
    }
    Path.tail = tail;
    function append(a, b) {
        return [].concat(a).concat(b);
    }
    Path.append = append;
})(Path || (exports.Path = Path = {}));
var Tree;
exports.Tree = Tree;
(function (Tree) {
    function has(list, path) {
        var depth = arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        return list.has(head) && (tail.length == 0 || depth == 0 || Tree.has(list.get(head), tail, depth));
    }
    Tree.has = has;
    function get(list, path) {
        var depth = arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        if (!list.has(head)) return;
        var value = list.get(head);
        if (tail.length == 0 || depth == 0) return value;
        return Tree.get(value, tail, depth);
    }
    Tree.get = get;
    function prev(list) {
        var path = arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path),
            key = head,
            value;
        if (head != null && !list.has(head)) return;
        do {
            value = list.get(key);
            if (!_list.List.isList(value) || depth == 0) {
                if (key != null && key != head) return [key];
            } else {
                var prevPath = Tree.prev(value, tail, depth - 1);
                if (prevPath != null) return Path.append(key, prevPath);
                tail = [];
            }
        } while ((key = list.prev(key)) != null);
    }
    Tree.prev = prev;
    function next(list) {
        var path = arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path),
            key = head,
            value;
        if (head != null && !list.has(head)) return;
        do {
            value = list.get(key);
            if (!_list.List.isList(value) || depth == 0) {
                if (key != null && key != head) return [key];
            } else {
                var nextPath = Tree.next(value, tail, depth - 1);
                if (nextPath != null) return Path.append(key, nextPath);
                tail = [];
            }
        } while ((key = list.next(key)) != null);
    }
    Tree.next = next;
})(Tree || (exports.Tree = Tree = {}));
exports['default'] = Tree;

},{"./list":14}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _key2 = require('./key');

var _key3 = _interopRequireDefault(_key2);

var _observable = require('./observable');

var _mutable_list = require('./mutable_list');

var Unit = (function (_MutableList) {
    function Unit(value) {
        var _this = this;

        _classCallCheck(this, Unit);

        _get(Object.getPrototypeOf(Unit.prototype), 'constructor', this).call(this);
        this.has = function (key) {
            return _this._key == key;
        };
        this.get = function (key) {
            if (_this.has(key)) return _this._value;
        };
        this.prev = function (key) {
            if (key == null) return _this._key;
            return null;
        };
        this.next = function (key) {
            if (key == null) return _this._key;
            return null;
        };
        this.set = function (key, value) {
            _this._key = key;
            _this._value = value;
            _this._invalidate();
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            if (values.length) return _this.set(_key3['default'].create(), values[0]);
            delete _this._key;
            delete _this._value;
            _this._invalidate();
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._invalidate = function (prev, next) {
            _this._subject.notify(function (observer) {
                observer.onInvalidate(prev, next);
            });
        };
        this._subject = new _observable.Subject();
        if (arguments.length) this.splice(null, null, value);
    }

    _inherits(Unit, _MutableList);

    return Unit;
})(_mutable_list.MutableList);

exports['default'] = Unit;
module.exports = exports['default'];

},{"./key":12,"./mutable_list":15,"./observable":16}],23:[function(require,module,exports){
// Build upon the IList standard from Sonic
// import {IList} from '../../sonic/dist/list.d';
// import Id from '../../sonic/dist/key.d';
// import {ILens} from './lenses';
// import _Fetchable from './fetchable';
'use strict';

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _record = require('./record');

var _record2 = _interopRequireDefault(_record);

var _observable_record = require('./observable_record');

var _observable_record2 = _interopRequireDefault(_observable_record);

var _mutable_record = require('./mutable_record');

var _mutable_record2 = _interopRequireDefault(_mutable_record);

var _simple_record = require('./simple_record');

var _simple_record2 = _interopRequireDefault(_simple_record);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

var _xhr = require('./xhr');

// Export Sonic for development purposes
// import _Sonic              from '../node_modules/sonic/dist/sonic';
function Knuckles(key, value) {}
;
var Knuckles;
(function (Knuckles) {
    Knuckles.Record = _record2['default'];
    Knuckles.ObservableRecord = _observable_record2['default'];
    Knuckles.MutableRecord = _mutable_record2['default'];
    Knuckles.SimpleRecord = _simple_record2['default'];
    Knuckles.Collection = _collection2['default'];
    Knuckles.XHR = _xhr.XHR;
})(Knuckles || (Knuckles = {}));
module.exports = Knuckles;

// if (arguments.length == 2) return Knuckles.set(key, value);
// else return Knuckles.get(key);

},{"./collection":1,"./mutable_record":2,"./observable_record":3,"./record":4,"./simple_record":5,"./xhr":6}]},{},[23])(23)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC9jb2xsZWN0aW9uLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL2Rpc3QvbXV0YWJsZV9yZWNvcmQuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC9vYnNlcnZhYmxlX3JlY29yZC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9kaXN0L3JlY29yZC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9kaXN0L3NpbXBsZV9yZWNvcmQuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC94aHIuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvYXJyYXlfbGlzdC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9hc3luY19saXN0LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2ZhY3RvcnkuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvaW5kZXguanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qva2V5LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2tleV9ieS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9saXN0LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L211dGFibGVfbGlzdC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfY2FjaGUuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZV9pbmRleC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlX2tleV9ieS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlX2xpc3QuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvdHJlZS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC91bml0LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL2Rpc3Qva251Y2tsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsZ0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FBRTtLQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsWUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFX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QkFBQSxDQUFBLFNBQUEsQ0FBaUIsQ0FBQztBQUN4QyxZQUFRLENBQUMsWUFBWSxHQUFBLGVBQUEsQ0FBQSxTQUFBLENBQWdCLENBQUM7QUFDdEMsWUFBUSxDQUFDLFVBQVUsR0FBQSxZQUFBLENBQUEsU0FBQSxDQUFjLENBQUM7QUFDbEMsWUFBUSxDQUFDLEdBQUcsR0FBQSxJQUFBLENBZlAsR0FBRyxDQWVZO0NBQ3ZCLENBQUEsQ0FBRSxRQUFRLEtBQUssUUFBUSxHQUFHLEVBQUUsQ0FBQSxDQUFFLENBQUM7QUFDaEMsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHsgU2ltcGxlUmVjb3JkIH0gZnJvbSAnLi9zaW1wbGVfcmVjb3JkJztcbmltcG9ydCB7IFhIUiB9IGZyb20gJy4veGhyJztcbmV4cG9ydCBjbGFzcyBDb2xsZWN0aW9uIGV4dGVuZHMgU2ltcGxlUmVjb3JkIHtcbiAgICBjb25zdHJ1Y3Rvcih1cmxSb290LCBtb2RlbHMpIHtcbiAgICAgICAgc3VwZXIoe30pO1xuICAgICAgICB0aGlzLl91cmxSb290ID0gdXJsUm9vdDtcbiAgICB9XG4gICAgYWxsKCkge1xuICAgICAgICByZXR1cm4gWEhSLmdldCh0aGlzLl91cmxSb290KS50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHZhciBhcnIgPSBKU09OLnBhcnNlKHJlcy5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgYXJyLmZvckVhY2goKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICAgICAgc3VwZXIuc2V0KHZhbHVlLmlkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBhcnI7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiBzdXBlci5oYXMoa2V5KS50aGVuKChoYXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBoYXMgfHwgWEhSLmhlYWQodGhpcy5fdXJsUm9vdCArIFwiL1wiICsga2V5KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRydWUpXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSBpbiB0aGlzLl9vYmplY3QgPyBzdXBlci5nZXQoa2V5KSA6IFhIUi5nZXQodGhpcy5fdXJsUm9vdCArIFwiL1wiICsga2V5KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShyZXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIHN1cGVyLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fb2JqZWN0KVxuICAgICAgICAgICAgcmV0dXJuIFhIUi5wdXQodGhpcy5fdXJsUm9vdCArIFwiL1wiICsga2V5LCB2YWx1ZSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLnNldChrZXksIEpTT04ucGFyc2UocmVzLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBYSFIucG9zdCh0aGlzLl91cmxSb290LCB2YWx1ZSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShyZXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuc2V0KHZhbHVlLmlkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgb2JzZXJ2ZShvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gWEhSLmRlbGV0ZSh0aGlzLl91cmxSb290ICsgXCIvXCIgKyBrZXkpLnRoZW4oKHJlcykgPT4gc3VwZXIuZGVsZXRlKGtleSkpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb247XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlUmVjb3JkIH0gZnJvbSAnLi9vYnNlcnZhYmxlX3JlY29yZCc7XG5pbXBvcnQgeyBNdXRhYmxlTGlzdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L211dGFibGVfbGlzdCc7XG47XG5leHBvcnQgY2xhc3MgTXV0YWJsZVJlY29yZCBleHRlbmRzIE9ic2VydmFibGVSZWNvcmQge1xuICAgIGNvbnN0cnVjdG9yKHJlY29yZCkge1xuICAgICAgICBzdXBlcihyZWNvcmQpO1xuICAgICAgICBpZiAocmVjb3JkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0ID0gcmVjb3JkLnNldDtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gcmVjb3JkLmRlbGV0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICB6b29tKGtleSkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKE11dGFibGVSZWNvcmQuem9vbSh0aGlzLCBrZXkpKTtcbiAgICB9XG4gICAgLy8gY29tcG9zZTxXPihsZW5zOiBJTGVuczxWLFc+KTogTXV0YWJsZVJlY29yZDxXPiB7XG4gICAgLy8gICByZXR1cm4gTXV0YWJsZVJlY29yZC5jcmVhdGU8Vz4oTXV0YWJsZVJlY29yZC5jb21wb3NlPFYsVz4odGhpcywgbGVucykpO1xuICAgIC8vIH1cbiAgICBzdGF0aWMgY3JlYXRlKHJlY29yZCkge1xuICAgICAgICByZXR1cm4gbmV3IE11dGFibGVSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgc3RhdGljIHpvb20ocmVjb3JkLCBrZXkpIHtcbiAgICAgICAgdmFyIHVuaXQgPSBPYnNlcnZhYmxlUmVjb3JkLnpvb20ocmVjb3JkLCBrZXkpO1xuICAgICAgICBmdW5jdGlvbiBzZXQoX2tleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChfa2V5ID09IGtleSlcbiAgICAgICAgICAgICAgICByZWNvcmQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNwbGljZShwcmV2LCBuZXh0LCAuLi52YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJlY29yZC5zZXQoa2V5LCB2YWx1ZXNbMF0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlY29yZC5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKHtcbiAgICAgICAgICAgIGhhczogdW5pdC5oYXMsXG4gICAgICAgICAgICBnZXQ6IHVuaXQuZ2V0LFxuICAgICAgICAgICAgcHJldjogdW5pdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogdW5pdC5uZXh0LFxuICAgICAgICAgICAgb2JzZXJ2ZTogdW5pdC5vYnNlcnZlLFxuICAgICAgICAgICAgc2V0OiBzZXQsXG4gICAgICAgICAgICBzcGxpY2U6IHNwbGljZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBNdXRhYmxlUmVjb3JkO1xuIiwiaW1wb3J0IFVuaXQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvdW5pdCc7XG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuL3JlY29yZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlTGlzdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfbGlzdCc7XG47XG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVJlY29yZCBleHRlbmRzIFJlY29yZCB7XG4gICAgY29uc3RydWN0b3IocmVjb3JkKSB7XG4gICAgICAgIHN1cGVyKHJlY29yZCk7XG4gICAgICAgIGlmIChyZWNvcmQgIT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSA9IHJlY29yZC5vYnNlcnZlO1xuICAgIH1cbiAgICBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgem9vbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlUmVjb3JkLnpvb20odGhpcywga2V5KSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUocmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBzdGF0aWMgem9vbShyZWNvcmQsIGtleSkge1xuICAgICAgICB2YXIgdW5pdCA9IG5ldyBVbml0KCk7XG4gICAgICAgIHJlY29yZC5nZXQoa2V5KS50aGVuKCh2YWx1ZSkgPT4gdW5pdC5zZXQoa2V5LCB2YWx1ZSkpO1xuICAgICAgICByZWNvcmQub2JzZXJ2ZSh7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGsgIT0ga2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgcmVjb3JkLmdldChrZXkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh2YWx1ZSkgPT4gdW5pdC5zZXQoa2V5LCB2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB1bml0LnNwbGljZShudWxsLCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKHVuaXQpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGVSZWNvcmQ7XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvbGlzdCc7XG5pbXBvcnQgeyBmcm9tUHJvbWlzZSB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2ZhY3RvcnknO1xuZXhwb3J0IGNsYXNzIFJlY29yZCB7XG4gICAgY29uc3RydWN0b3IocmVjb3JkKSB7XG4gICAgICAgIGlmIChyZWNvcmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5nZXQgPSByZWNvcmQuZ2V0O1xuICAgICAgICAgICAgdGhpcy5oYXMgPSByZWNvcmQuaGFzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgem9vbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKFJlY29yZC56b29tKHRoaXMsIGtleSkpO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKHJlY29yZCkge1xuICAgICAgICByZXR1cm4gbmV3IFJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBzdGF0aWMgem9vbShyZWNvcmQsIGtleSkge1xuICAgICAgICB2YXIgdW5pdCA9IGZyb21Qcm9taXNlKHJlY29yZC5nZXQoa2V5KSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXM6IHVuaXQuaGFzLFxuICAgICAgICAgICAgZ2V0OiB1bml0LmdldCxcbiAgICAgICAgICAgIHByZXY6IHVuaXQucHJldixcbiAgICAgICAgICAgIG5leHQ6IHVuaXQubmV4dFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFJlY29yZDtcbiIsImltcG9ydCB7IE11dGFibGVSZWNvcmQgfSBmcm9tICcuL211dGFibGVfcmVjb3JkJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlJztcbmV4cG9ydCBjbGFzcyBTaW1wbGVSZWNvcmQgZXh0ZW5kcyBNdXRhYmxlUmVjb3JkIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShrZXkgaW4gdGhpcy5fb2JqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGtleSBpbiB0aGlzLl9vYmplY3QgPyByZXNvbHZlKHRoaXMuX29iamVjdFtrZXldKSA6IHJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb2JzZXJ2ZShvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICB9XG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX29iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzb2x2ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX29iamVjdCkpXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl9vYmplY3Rba2V5XTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vYmplY3Rba2V5XTtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlUmVjb3JkO1xuIiwiZXhwb3J0IHZhciBYSFIgPSB7XG4gICAgY3JlYXRlOiAoa2V5LCBvcHRpb25zKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHVybCA9IGtleS50b1N0cmluZygpLCB7IG1ldGhvZCwgYm9keSB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgLy8geGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKVxuICAgICAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoYm9keSkpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGhlYWQ6ICh1cmwpID0+IHtcbiAgICAgICAgcmV0dXJuIFhIUi5jcmVhdGUodXJsLCB7IG1ldGhvZDogXCJIRUFEXCIgfSk7XG4gICAgfSxcbiAgICBnZXQ6ICh1cmwpID0+IHtcbiAgICAgICAgcmV0dXJuIFhIUi5jcmVhdGUodXJsLCB7IG1ldGhvZDogXCJHRVRcIiB9KTtcbiAgICB9LFxuICAgIHB1dDogKHVybCwgYm9keSkgPT4ge1xuICAgICAgICByZXR1cm4gWEhSLmNyZWF0ZSh1cmwsIHsgbWV0aG9kOiBcIlBVVFwiLCBib2R5OiBib2R5IH0pO1xuICAgIH0sXG4gICAgcG9zdDogKHVybCwgYm9keSkgPT4ge1xuICAgICAgICByZXR1cm4gWEhSLmNyZWF0ZSh1cmwsIHsgbWV0aG9kOiBcIlBPU1RcIiwgYm9keTogYm9keSB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZTogKHVybCkgPT4ge1xuICAgICAgICByZXR1cm4gWEhSLmNyZWF0ZSh1cmwsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xuICAgIH1cbn07XG4vLyBleHBvcnQgY2xhc3MgWEhSUmVjb3JkPFY+IGltcGxlbWVudHMgSU11dGFibGVSZWNvcmQ8Vj4ge1xuLy8gICBwcm90ZWN0ZWQgX3N1YmplY3Q6IFN1YmplY3Q8SVJlY29yZE9ic2VydmVyPjtcbi8vXG4vLyAgIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgIHRoaXMuX3N1YmplY3QgPSBYSFJSZWNvcmQuX3N1YmplY3Q7XG4vLyAgIH1cbi8vXG4vLyAgIGhhcyhrZXk6IEtleSk6IGJvb2xlYW4ge1xuLy8gICAgICByZXR1cm4gWEhSUmVjb3JkLmhhcyhrZXkpO1xuLy8gICAgfVxuLy9cbi8vICAgZ2V0KGtleTogS2V5KTogViB7XG4vLyAgICAgIHJldHVybiA8Vj5YSFJSZWNvcmQuZ2V0KGtleSk7XG4vLyAgICB9XG4vL1xuLy8gICBzZXQoa2V5OiBLZXksIHZhbHVlOiBWKTogdm9pZCB7XG4vLyAgICAgIHJldHVybiBYSFJSZWNvcmQuc2V0KGtleSwgdmFsdWUpO1xuLy8gICAgfVxuLy9cbi8vICAgb2JzZXJ2ZShvYnNlcnZlcjogSVJlY29yZE9ic2VydmVyKTogSVN1YnNjcmlwdGlvbiB7XG4vLyAgICAgIHJldHVybiBYSFJSZWNvcmQub2JzZXJ2ZShvYnNlcnZlcik7XG4vLyAgICB9XG4vL1xuLy8gICBkZWxldGUoa2V5OiBLZXkpOiB2b2lkIHtcbi8vICAgICAgcmV0dXJuIFhIUlJlY29yZC5kZWxldGUoa2V5KTtcbi8vICAgIH1cbi8vXG4vLyAgIHN0YXRpYyBfc3ViamVjdCA9IG5ldyBTdWJqZWN0PElSZWNvcmRPYnNlcnZlcj4oKTtcbi8vXG4vLyAgIHN0YXRpYyBpbnZhbGlkYXRlID0gKGtleTogS2V5KTogdm9pZCA9PiB7XG4vLyAgICAgWEhSUmVjb3JkLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbihvYnNlcnZlcjogSVJlY29yZE9ic2VydmVyKSB7XG4vLyAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUoa2V5KTtcbi8vICAgICB9KTtcbi8vICAgfVxuLy9cbi8vICAgc3RhdGljIGhhcyA9IChrZXk6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuLy8gICAgIHJldHVybiBYSFIuaGVhZChrZXkpXG4vLyAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSlcbi8vICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuLy8gICB9XG4vL1xuLy8gICBzdGF0aWMgZ2V0ID0gPFY+KGtleTogc3RyaW5nKTogUHJvbWlzZTxWPiA9PiB7XG4vLyAgICAgcmV0dXJuIFhIUi5nZXQoa2V5KVxuLy8gICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih4aHIpIHsgcmV0dXJuIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7IH0pXG4vLyAgIH1cbi8vXG4vLyAgIC8vIHN0YXRpYyBzZXQgPSA8Vj4oa2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogUHJvbWlzZTxWPiA9PiB7XG4vLyAgIC8vICAgcmV0dXJuIFhIUi5cbi8vICAgLy8gfVxuLy9cbi8vICAgc3RhdGljIG9ic2VydmUgPSAob2JzZXJ2ZXI6IElSZWNvcmRPYnNlcnZlcik6IElTdWJzY3JpcHRpb24gPT4ge1xuLy8gICAgIHJldHVybiBYSFJSZWNvcmQuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4vLyAgIH1cbi8vXG4vLyAgIHN0YXRpYyBkZWxldGUgPSAoa2V5OiBLZXkpOiB2b2lkID0+IHtcbi8vICAgICB2YXIgeGhyID0gWEhSW1wiZGVsZXRlXCJdKGtleSk7XG4vLyAgICAgWEhSUmVjb3JkLmludmFsaWRhdGUoa2V5KTtcbi8vXG4vLyAgICAgcmV0dXJuIG51bGw7XG4vLyAgIH1cbi8vXG4vLyB9XG4vL1xuLy8gZXhwb3J0IGRlZmF1bHQgWEhSUmVjb3JkO1xuIiwiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNdXRhYmxlTGlzdCB9IGZyb20gJy4vbXV0YWJsZV9saXN0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5TGlzdCBleHRlbmRzIE11dGFibGVMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSA9IFtdKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleSAhPSBudWxsICYmIC0xIDwga2V5ICYmIGtleSA8IHRoaXMuX2FycmF5Lmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXlba2V5XTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsICYmIHRoaXMuX2FycmF5Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcnJheS5sZW5ndGggPiAwICYmIGtleSAhPSBudWxsICYmIHRoaXMuaGFzKGtleSkgJiYgdGhpcy5oYXMoa2V5IC0gMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSAtIDE7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5uZXh0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsICYmIHRoaXMuX2FycmF5Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcnJheS5sZW5ndGggPiAwICYmIGtleSAhPSBudWxsICYmIHRoaXMuaGFzKGtleSkgJiYgdGhpcy5oYXMoa2V5ICsgMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSArIDE7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgdGhpcy5fYXJyYXlba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zcGxpY2UgPSAocHJldiwgbmV4dCwgLi4udmFsdWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHByZXYgPSAtMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmhhcyhwcmV2KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLl9hcnJheS5sZW5ndGg7XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5oYXMobmV4dCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKHByZXYgKyAxLCBuZXh0IC0gKHByZXYgKyAxKSwgLi4udmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMuX2ludmFsaWRhdGUocHJldiwgbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGUgPSAocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhwcmV2KSlcbiAgICAgICAgICAgICAgICBwcmV2ID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXMobmV4dCkpXG4gICAgICAgICAgICAgICAgbmV4dCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUocHJldiwgbmV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyYXk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEFzeW5jTGlzdCB7XG4gICAgY29uc3RydWN0b3IobGlzdCwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5fbGlzdC5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXMoa2V5KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihoYXMgPT4gaGFzID8gcmVzb2x2ZSh0aGlzLl9saXN0LmdldChrZXkpKSA6IHJlamVjdCgpKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLl9saXN0LnByZXYoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gcmVzb2x2ZShwcmV2KSA6IHJlamVjdCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5uZXh0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5fbGlzdC5uZXh0KGtleSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHJlc29sdmUocHJldikgOiByZWplY3QoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgICAgICB0aGlzLl9zY2hlZHVsZXIgPSBzY2hlZHVsZXIgfHwgd2luZG93LnNldFRpbWVvdXQ7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jTGlzdChsaXN0KTtcbiAgICB9XG4gICAgc3RhdGljIG1hcChsaXN0LCBtYXBGbikge1xuICAgICAgICB2YXIgeyBoYXMsIHByZXYsIG5leHQgfSA9IGxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpLnRoZW4obWFwRm4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNMaXN0KHsgaGFzLCBnZXQsIHByZXYsIG5leHQgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXN5bmNMaXN0O1xuIiwiZXhwb3J0IGNsYXNzIENhY2hlIHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiB0aGlzLl9ieUtleSB8fCB0aGlzLl9saXN0LmhhcyhrZXkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gdGhpcy5fYnlLZXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J5S2V5W2tleV07XG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnlLZXlba2V5XSA9IHRoaXMuX2xpc3QuZ2V0KGtleSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gdGhpcy5fcHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJldltrZXldO1xuICAgICAgICAgICAgdmFyIHByZXZLZXkgPSB0aGlzLl9saXN0LnByZXYoa2V5KTtcbiAgICAgICAgICAgIGlmIChwcmV2S2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcHJldktleSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9wcmV2W2tleV0gPSBwcmV2S2V5O1xuICAgICAgICAgICAgdGhpcy5fbmV4dFtwcmV2S2V5XSA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiBwcmV2S2V5O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9uZXh0KVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZXh0W2tleV07XG4gICAgICAgICAgICB2YXIgbmV4dEtleSA9IHRoaXMuX2xpc3QubmV4dChrZXkpO1xuICAgICAgICAgICAgaWYgKG5leHRLZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBuZXh0S2V5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX25leHRba2V5XSA9IG5leHRLZXk7XG4gICAgICAgICAgICB0aGlzLl9wcmV2W25leHRLZXldID0ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIG5leHRLZXk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2J5S2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIHRoaXMuX25leHQgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgdGhpcy5fcHJldiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlTGlzdCB9IGZyb20gJy4vb2JzZXJ2YWJsZV9saXN0JztcbmltcG9ydCB7IE11dGFibGVMaXN0IH0gZnJvbSAnLi9tdXRhYmxlX2xpc3QnO1xuaW1wb3J0IFVuaXQgZnJvbSAnLi91bml0JztcbmltcG9ydCBBcnJheUxpc3QgZnJvbSAnLi9hcnJheV9saXN0JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhY3Rvcnkob2JqKSB7XG4gICAgaWYgKE11dGFibGVMaXN0LmlzTXV0YWJsZUxpc3Qob2JqKSlcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmNyZWF0ZShvYmopO1xuICAgIGlmIChPYnNlcnZhYmxlTGlzdC5pc09ic2VydmFibGVMaXN0KG9iaikpXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUob2JqKTtcbiAgICBpZiAoTGlzdC5pc0xpc3Qob2JqKSlcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKG9iaik7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUxpc3Qob2JqKTtcbiAgICByZXR1cm4gVW5pdC5jcmVhdGUob2JqKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG4gICAgdmFyIHVuaXQgPSBuZXcgVW5pdCgpO1xuICAgIHByb21pc2UudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgdW5pdC5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKHVuaXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JdGVyYXRvcihpdGVyYXRvcikge1xuICAgIHZhciBsaXN0ID0ge1xuICAgICAgICBoYXM6IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcHJldjogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIH07XG4gICAgcmV0dXJuIGxpc3Q7XG59XG4iLCJleHBvcnQgY2xhc3MgSW5kZXgge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgdGhpcy5oYXMgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgbmV4dCwgbGFzdCA9IHRoaXMuX2J5SW5kZXgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChsYXN0ICE9IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuX2xpc3QubmV4dCh0aGlzLl9ieUluZGV4W2xhc3RdKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnlJbmRleFsrK2xhc3RdID0gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGluZGV4KSA/IHRoaXMuX2xpc3QuZ2V0KHRoaXMuX2J5SW5kZXhbaW5kZXhdKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMoaW5kZXggLSAxKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggLSAxO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IG51bGwgJiYgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J5SW5kZXgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoaW5kZXggPSAtMSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKGluZGV4ICsgMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ieUluZGV4ID0gW107XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4O1xuIiwidmFyIEtleTtcbihmdW5jdGlvbiAoS2V5KSB7XG4gICAgdmFyIHVuaXF1ZUtleSA9IDA7XG4gICAgZnVuY3Rpb24ga2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEtleS5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gdW5pcXVlS2V5Kys7XG4gICAgfVxuICAgIEtleS5jcmVhdGUgPSBjcmVhdGU7XG59KShLZXkgfHwgKEtleSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLZXk7XG4iLCJleHBvcnQgY2xhc3MgS2V5Qnkge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QsIGtleUZuKSB7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9zb3VyY2VLZXlCeUtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBsYXN0ID0gbnVsbDtcbiAgICAgICAgICAgIHdoaWxlICgobGFzdCA9IHRoaXMubmV4dChsYXN0KSkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBpZiAobGFzdCA9PSBrZXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhcyhrZXkpID8gdGhpcy5fbGlzdC5nZXQodGhpcy5fc291cmNlS2V5QnlLZXlba2V5XSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhcyhrZXkpIHx8IGtleSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9rZXlCeVNvdXJjZUtleVt0aGlzLl9saXN0LnByZXYodGhpcy5fc291cmNlS2V5QnlLZXlba2V5XSldO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgdmFyIHNvdXJjZUtleSwgc291cmNlTmV4dCwgcmVzO1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9zb3VyY2VLZXlCeUtleSlcbiAgICAgICAgICAgICAgICBzb3VyY2VLZXkgPSB0aGlzLl9zb3VyY2VLZXlCeUtleVtrZXldO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNvdXJjZUtleSA9IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAoa2V5ICE9IG51bGwgJiYgIShrZXkgaW4gdGhpcy5fc291cmNlS2V5QnlLZXkpKSB7XG4gICAgICAgICAgICAgICAgc291cmNlS2V5ID0gdGhpcy5fbGlzdC5uZXh0KHNvdXJjZUtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCEoc291cmNlS2V5IGluIHRoaXMuX2tleUJ5U291cmNlS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlS2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gdGhpcy5fa2V5Rm4odGhpcy5fbGlzdC5nZXQoc291cmNlS2V5KSwgc291cmNlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5QnlTb3VyY2VLZXlbc291cmNlS2V5XSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291cmNlS2V5QnlLZXlbcmVzXSA9IHNvdXJjZUtleTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyA9PSBrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2VLZXkgPSB0aGlzLl9saXN0Lm5leHQoc291cmNlS2V5KTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VLZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJlcyA9IHRoaXMuX2tleUZuKHRoaXMuX2xpc3QuZ2V0KHNvdXJjZUtleSksIHNvdXJjZUtleSk7XG4gICAgICAgICAgICB0aGlzLl9rZXlCeVNvdXJjZUtleVtzb3VyY2VLZXldID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5fc291cmNlS2V5QnlLZXlbcmVzXSA9IHNvdXJjZUtleTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgICAgICB0aGlzLl9rZXlGbiA9IGtleUZuO1xuICAgICAgICB0aGlzLl9zb3VyY2VLZXlCeUtleSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2tleUJ5U291cmNlS2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBLZXlCeTtcbiIsImltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEluZGV4IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IEtleUJ5IGZyb20gJy4va2V5X2J5JztcbmltcG9ydCB7IEFzeW5jTGlzdCB9IGZyb20gJy4vYXN5bmNfbGlzdCc7XG5leHBvcnQgY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICB0aGlzLmhhcyA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5uZXh0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpcnN0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmlyc3QodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGFzdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0Lmxhc3QodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZm9yRWFjaCA9IChmbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZm9yRWFjaCh0aGlzLCBmbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVkdWNlID0gKGZuLCBtZW1vKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5yZWR1Y2UodGhpcywgZm4pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvQXJyYXkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC50b0FycmF5KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbmRLZXkgPSAoZm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmZpbmRLZXkodGhpcywgZm4pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbmQgPSAoZm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmZpbmQodGhpcywgZm4pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmtleU9mID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5rZXlPZih0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5kZXhPZiA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuaW5kZXhPZih0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua2V5QXQgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmtleUF0KHRoaXMsIGluZGV4KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hdCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuYXQodGhpcywgaW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmV2ZXJ5ID0gKHByZWRpY2F0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZXZlcnkodGhpcywgcHJlZGljYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb21lID0gKHByZWRpY2F0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3Quc29tZSh0aGlzLCBwcmVkaWNhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRhaW5zID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jb250YWlucyh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmV2ZXJzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LnJldmVyc2UodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1hcCA9IChtYXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QubWFwKHRoaXMsIG1hcEZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlsdGVyID0gKGZpbHRlckZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5maWx0ZXIodGhpcywgZmlsdGVyRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mbGF0dGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuZmxhdHRlbih0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdE1hcCA9IChmbGF0TWFwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmZsYXRNYXAodGhpcywgZmxhdE1hcEZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2FjaGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5jYWNoZSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5kZXggPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5pbmRleCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua2V5QnkgPSAoa2V5Rm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmtleUJ5KHRoaXMsIGtleUZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuemlwID0gKG90aGVyLCB6aXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuemlwKHRoaXMsIG90aGVyLCB6aXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNraXAgPSAoaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3Quc2tpcCh0aGlzLCBrKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFrZSA9IChuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC50YWtlKHRoaXMsIG4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yYW5nZSA9IChrLCBuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5yYW5nZSh0aGlzLCBrLCBuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NhbiA9IChzY2FuRm4sIG1lbW8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LnNjYW4odGhpcywgc2NhbkZuLCBtZW1vKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzID0gbGlzdC5oYXM7XG4gICAgICAgICAgICB0aGlzLmdldCA9IGxpc3QuZ2V0O1xuICAgICAgICAgICAgdGhpcy5wcmV2ID0gbGlzdC5wcmV2O1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gbGlzdC5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIDtcbiAgICBzdGF0aWMgaXNMaXN0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgISFvYmpbJ2hhcyddICYmICEhb2JqWydnZXQnXSAmJiAhIW9ialsncHJldiddICYmICEhb2JqWyduZXh0J107XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3Qoe1xuICAgICAgICAgICAgaGFzOiBsaXN0LmhhcyxcbiAgICAgICAgICAgIGdldDogbGlzdC5nZXQsXG4gICAgICAgICAgICBwcmV2OiBsaXN0LnByZXYsXG4gICAgICAgICAgICBuZXh0OiBsaXN0Lm5leHRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBmaXJzdChsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0LmdldChsaXN0Lm5leHQoKSk7XG4gICAgfVxuICAgIHN0YXRpYyBsYXN0KGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KGxpc3QucHJldigpKTtcbiAgICB9XG4gICAgc3RhdGljIGZvckVhY2gobGlzdCwgZm4pIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGZuKGxpc3QuZ2V0KGtleSksIGtleSk7XG4gICAgfVxuICAgIHN0YXRpYyByZWR1Y2UobGlzdCwgZm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIG1lbW8gPSBmbihtZW1vLCBsaXN0LmdldChrZXkpLCBrZXkpO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICB9XG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xuICAgICAgICB2YXIga2V5LCBpbmRleCA9IDAsIGFycmF5ID0gW107XG4gICAgICAgIHdoaWxlICgoa2V5ID0gbGlzdC5uZXh0KGtleSkpICE9IG51bGwpXG4gICAgICAgICAgICBhcnJheVtpbmRleCsrXSA9IGxpc3QuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG4gICAgc3RhdGljIGZpbmRLZXkobGlzdCwgZm4pIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGlmIChmbihsaXN0LmdldChrZXkpLCBrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICAgIHN0YXRpYyBmaW5kKGxpc3QsIGZuKSB7XG4gICAgICAgIHJldHVybiBsaXN0LmdldChMaXN0LmZpbmRLZXkobGlzdCwgZm4pKTtcbiAgICB9XG4gICAgc3RhdGljIGtleU9mKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZpbmRLZXkobGlzdCwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIHN0YXRpYyBpbmRleE9mKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHZhciBrZXksIGkgPSAwO1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdC5nZXQoa2V5KSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGtleUF0KGxpc3QsIGluZGV4KSB7XG4gICAgICAgIHZhciBrZXksIGkgPSAwO1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKGkrKyA9PSBpbmRleClcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3RhdGljIGF0KGxpc3QsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0LmdldChMaXN0LmtleUF0KGxpc3QsIGluZGV4KSk7XG4gICAgfVxuICAgIHN0YXRpYyBldmVyeShsaXN0LCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKGxpc3QuZ2V0KGtleSksIGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIHNvbWUobGlzdCwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHdoaWxlICgoa2V5ID0gbGlzdC5uZXh0KGtleSkpICE9IG51bGwpXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKGxpc3QuZ2V0KGtleSksIGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3RhdGljIGNvbnRhaW5zKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LnNvbWUobGlzdCwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIHN0YXRpYyByZXZlcnNlKGxpc3QpIHtcbiAgICAgICAgdmFyIHsgaGFzLCBnZXQgfSA9IGxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LnByZXYoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgbWFwKGxpc3QsIG1hcEZuKSB7XG4gICAgICAgIHZhciB7IGhhcywgcHJldiwgbmV4dCB9ID0gbGlzdDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhrZXkpID8gbWFwRm4obGlzdC5nZXQoa2V5KSwga2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgZmlsdGVyKGxpc3QsIGZpbHRlckZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmhhcyhrZXkpICYmIGZpbHRlckZuKGxpc3QuZ2V0KGtleSksIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgaWYgKGhhcyhrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IGtleTtcbiAgICAgICAgICAgIHdoaWxlICgocHJldiA9IGxpc3QucHJldihwcmV2KSkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBpZiAoaGFzKHByZXYpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IGtleTtcbiAgICAgICAgICAgIHdoaWxlICgobmV4dCA9IGxpc3QubmV4dChuZXh0KSkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBpZiAoaGFzKG5leHQpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIHN0YXRpYyBmbGF0dGVuKGxpc3QpIHtcbiAgICAgICAgZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICAgICAgdmFyIHBhdGggPSBQYXRoLmNyZWF0ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFRyZWUuaGFzKGxpc3QsIHBhdGgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5jcmVhdGUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBUcmVlLmdldChsaXN0LCBwYXRoLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgdmFyIHBhdGggPSBQYXRoLmNyZWF0ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFBhdGgua2V5KFRyZWUucHJldihsaXN0LCBwYXRoLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5jcmVhdGUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBQYXRoLmtleShUcmVlLm5leHQobGlzdCwgcGF0aCwgMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIHN0YXRpYyBmbGF0TWFwKGxpc3QsIGZsYXRNYXBGbikge1xuICAgICAgICByZXR1cm4gTGlzdC5mbGF0dGVuKExpc3QubWFwKGxpc3QsIGZsYXRNYXBGbikpO1xuICAgIH1cbiAgICBzdGF0aWMgY2FjaGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IENhY2hlKGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgaW5kZXgobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IEluZGV4KGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMga2V5QnkobGlzdCwga2V5Rm4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBLZXlCeShsaXN0LCBrZXlGbik7XG4gICAgfVxuICAgIHN0YXRpYyB6aXAobGlzdCwgb3RoZXIsIHppcEZuKSB7XG4gICAgICAgIGxpc3QgPSBMaXN0LmluZGV4KGxpc3QpO1xuICAgICAgICBvdGhlciA9IExpc3QuaW5kZXgob3RoZXIpO1xuICAgICAgICBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5oYXMoa2V5KSAmJiBvdGhlci5oYXMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGtleSkgPyB6aXBGbihsaXN0LmdldChrZXkpLCBvdGhlci5nZXQoa2V5KSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gbGlzdC5wcmV2KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gcHJldiAhPSBudWxsICYmIHByZXYgPT0gb3RoZXIucHJldihrZXkpID8gcHJldiA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gbGlzdC5uZXh0KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dCAhPSBudWxsICYmIG5leHQgPT0gb3RoZXIubmV4dChrZXkpID8gbmV4dCA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgc3RhdGljIHNraXAobGlzdCwgaykge1xuICAgICAgICByZXR1cm4gTGlzdC5maWx0ZXIoTGlzdC5pbmRleChsaXN0KSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPj0gaztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyB0YWtlKGxpc3QsIG4pIHtcbiAgICAgICAgcmV0dXJuIExpc3QuZmlsdGVyKExpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IDwgbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByYW5nZShsaXN0LCBrLCBuKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZpbHRlcihMaXN0LmluZGV4KGxpc3QpLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSA+PSBrICYmIGtleSA8IG4gKyBrO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHNjYW4obGlzdCwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIHZhciB7IGhhcywgcHJldiwgbmV4dCB9ID0gbGlzdCwgc2Nhbkxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gc2Nhbkxpc3QucHJldihrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHNjYW5GbihwcmV2ICE9IG51bGwgPyBzY2FuTGlzdC5nZXQocHJldikgOiBtZW1vLCBsaXN0LmdldChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBzY2FuTGlzdCA9IExpc3QuY2FjaGUoeyBoYXMsIGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICAgICAgcmV0dXJuIHNjYW5MaXN0O1xuICAgIH1cbiAgICBzdGF0aWMgYXN5bmMobGlzdCwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNMaXN0KGxpc3QpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlTGlzdCB9IGZyb20gJy4vb2JzZXJ2YWJsZV9saXN0JztcbmV4cG9ydCBjbGFzcyBNdXRhYmxlTGlzdCBleHRlbmRzIE9ic2VydmFibGVMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHN1cGVyKGxpc3QpO1xuICAgICAgICB0aGlzLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3BsaWNlID0gKHByZXYsIG5leHQsIC4uLnZhbHVlcykgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZEJlZm9yZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuYWRkQmVmb3JlKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZEFmdGVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5hZGRBZnRlcih0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wdXNoID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QucHVzaCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudW5zaGlmdCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnVuc2hpZnQodGhpcywgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlbGV0ZSA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGUodGhpcywga2V5KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGVCZWZvcmUgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQmVmb3JlKHRoaXMsIGtleSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlQWZ0ZXIgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQWZ0ZXIodGhpcywga2V5KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wb3AgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QucG9wKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNoaWZ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnNoaWZ0KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlbW92ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnJlbW92ZSh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29tcG9zZSA9IChsZW5zKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKE11dGFibGVMaXN0LmNvbXBvc2UodGhpcywgbGVucykpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAobGlzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNldCA9IGxpc3Quc2V0O1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UgPSBsaXN0LnNwbGljZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNNdXRhYmxlTGlzdChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmlzT2JzZXJ2YWJsZUxpc3Qob2JqKSAmJiAhIW9ialsnc2V0J10gJiYgISFvYmpbJ3NwbGljZSddO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNdXRhYmxlTGlzdCh7XG4gICAgICAgICAgICBoYXM6IGxpc3QuaGFzLFxuICAgICAgICAgICAgZ2V0OiBsaXN0LmdldCxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dCxcbiAgICAgICAgICAgIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZSxcbiAgICAgICAgICAgIHNldDogbGlzdC5zZXQsXG4gICAgICAgICAgICBzcGxpY2U6IGxpc3Quc3BsaWNlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkQmVmb3JlKGxpc3QsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5wcmV2KGtleSksIGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gbGlzdC5wcmV2KGtleSk7XG4gICAgfVxuICAgIHN0YXRpYyBhZGRBZnRlcihsaXN0LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGxpc3Quc3BsaWNlKGtleSwgbGlzdC5uZXh0KGtleSksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGxpc3QubmV4dChrZXkpO1xuICAgIH1cbiAgICBzdGF0aWMgcHVzaChsaXN0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuYWRkQmVmb3JlKGxpc3QsIG51bGwsIHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIHVuc2hpZnQobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmFkZEFmdGVyKGxpc3QsIG51bGwsIHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZShsaXN0LCBrZXkpIHtcbiAgICAgICAgaWYgKCFsaXN0LmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgdmFsdWUgPSBsaXN0LmdldChrZXkpO1xuICAgICAgICBsaXN0LnNwbGljZShsaXN0LnByZXYoa2V5KSwgbGlzdC5uZXh0KGtleSkpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGVCZWZvcmUobGlzdCwga2V5KSB7XG4gICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGUobGlzdCwgbGlzdC5wcmV2KGtleSkpO1xuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlQWZ0ZXIobGlzdCwga2V5KSB7XG4gICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGUobGlzdCwgbGlzdC5uZXh0KGtleSkpO1xuICAgIH1cbiAgICBzdGF0aWMgcG9wKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZUJlZm9yZShsaXN0LCBudWxsKTtcbiAgICB9XG4gICAgc3RhdGljIHNoaWZ0KGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZUFmdGVyKGxpc3QsIG51bGwpO1xuICAgIH1cbiAgICBzdGF0aWMgcmVtb3ZlKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHZhciBrZXkgPSBNdXRhYmxlTGlzdC5rZXlPZihsaXN0LCB2YWx1ZSk7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZGVsZXRlIChsaXN0LCBrZXkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIGNvbXBvc2UobGlzdCwgbGVucykge1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGVucy5nZXQobGlzdC5nZXQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGxpc3Quc2V0KGtleSwgbGVucy5zZXQobGlzdC5nZXQoa2V5KSwgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzcGxpY2UocHJldiwgbmV4dCwgLi4udmFsdWVzKSB7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShwcmV2LCBuZXh0LCAuLi52YWx1ZXMubWFwKCh2YWwpID0+IGxlbnMuc2V0KG51bGwsIHZhbCkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFzOiBsaXN0LmhhcyxcbiAgICAgICAgICAgIGdldCxcbiAgICAgICAgICAgIHNldCxcbiAgICAgICAgICAgIHNwbGljZSxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dCxcbiAgICAgICAgICAgIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZVxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE11dGFibGVMaXN0O1xuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgY2xhc3MgU3ViamVjdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyS2V5ID0gS2V5LmNyZWF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSA9IG9ic2VydmVyO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZTogKCkgPT4geyBkZWxldGUgdGhpcy5fb2JzZXJ2ZXJzW29ic2VydmVyS2V5XTsgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ub3RpZnkgPSAobm90aWZpZXIpID0+IHtcbiAgICAgICAgICAgIGZvciAodmFyIG9ic2VydmVyS2V5IGluIHRoaXMuX29ic2VydmVycylcbiAgICAgICAgICAgICAgICBub3RpZmllcih0aGlzLl9vYnNlcnZlcnNbb2JzZXJ2ZXJLZXldKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZUNhY2hlIGV4dGVuZHMgQ2FjaGUge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgc3VwZXIobGlzdCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25JbnZhbGlkYXRlID0gKHByZXYsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICBrZXkgPSBwcmV2O1xuICAgICAgICAgICAgd2hpbGUgKChrZXkgPSB0aGlzLl9uZXh0W2tleV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbmV4dFt0aGlzLl9wcmV2W2tleV1dO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2W2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBuZXh0KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYnlLZXlba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgoa2V5ID0gdGhpcy5fcHJldltrZXldKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByZXZbdGhpcy5fbmV4dFtrZXldXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbmV4dFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gcHJldilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2J5S2V5W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxpc3Qub2JzZXJ2ZSh0aGlzKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYnNlcnZhYmxlQ2FjaGU7XG4iLCJpbXBvcnQgSW5kZXggZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlSW5kZXggZXh0ZW5kcyBJbmRleCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICBzdXBlcihsaXN0KTtcbiAgICAgICAgdGhpcy5oYXMgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgbmV4dCwgbGFzdCA9IHRoaXMuX2J5SW5kZXgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChsYXN0ICE9IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuX2xpc3QubmV4dCh0aGlzLl9ieUluZGV4W2xhc3RdKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnlJbmRleFsrK2xhc3RdID0gbmV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLl9ieUtleVtuZXh0XSA9IGxhc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkludmFsaWRhdGUgPSAocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMuX2J5S2V5W3ByZXZdLCBsZW5ndGggPSB0aGlzLl9ieUluZGV4Lmxlbmd0aCwgaW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aClcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYnlLZXlbdGhpcy5fYnlJbmRleFtpbmRleF1dO1xuICAgICAgICAgICAgdGhpcy5fYnlJbmRleC5zcGxpY2UocHJldkluZGV4ICsgMSk7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUocHJldkluZGV4LCBudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ieUtleSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBsaXN0Lm9ic2VydmUodGhpcyk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZUluZGV4O1xuIiwiaW1wb3J0IEtleUJ5IGZyb20gJy4va2V5X2J5JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVLZXlCeSBleHRlbmRzIEtleUJ5IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0LCBrZXlGbikge1xuICAgICAgICBzdXBlcihsaXN0LCBrZXlGbik7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25JbnZhbGlkYXRlID0gKHByZXYsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZSh0aGlzLl9rZXlCeVNvdXJjZUtleVtwcmV2XSwgdGhpcy5fa2V5QnlTb3VyY2VLZXlbbmV4dF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBsaXN0Lm9ic2VydmUodGhpcyk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZUtleUJ5O1xuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IE9ic2VydmFibGVDYWNoZSBmcm9tICcuL29ic2VydmFibGVfY2FjaGUnO1xuaW1wb3J0IE9ic2VydmFibGVJbmRleCBmcm9tICcuL29ic2VydmFibGVfaW5kZXgnO1xuaW1wb3J0IE9ic2VydmFibGVLZXlCeSBmcm9tICcuL29ic2VydmFibGVfa2V5X2J5JztcbjtcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlTGlzdCBleHRlbmRzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgc3VwZXIobGlzdCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJldmVyc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnJldmVyc2UodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1hcCA9IChtYXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5tYXAodGhpcywgbWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSAoZmlsdGVyRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmlsdGVyKHRoaXMsIGZpbHRlckZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdHRlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmxhdHRlbih0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdE1hcCA9IChmbGF0TWFwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmxhdE1hcCh0aGlzLCBmbGF0TWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWNoZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuY2FjaGUodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluZGV4ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5pbmRleCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua2V5QnkgPSAoa2V5Rm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3Qua2V5QnkodGhpcywga2V5Rm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy56aXAgPSAob3RoZXIsIHppcEZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnppcCh0aGlzLCBvdGhlciwgemlwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5za2lwID0gKGspID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3Quc2tpcCh0aGlzLCBrKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFrZSA9IChuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnRha2UodGhpcywgbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJhbmdlID0gKGssIG4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QucmFuZ2UodGhpcywgaywgbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjYW4gPSAoc2NhbkZuLCBtZW1vKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnNjYW4odGhpcywgc2NhbkZuLCBtZW1vKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0ICE9IG51bGwpXG4gICAgICAgICAgICB0aGlzLm9ic2VydmUgPSBsaXN0Lm9ic2VydmU7XG4gICAgfVxuICAgIHN0YXRpYyBpc09ic2VydmFibGVMaXN0KG9iaikge1xuICAgICAgICByZXR1cm4gTGlzdC5pc0xpc3Qob2JqKSAmJiAhIW9ialsnb2JzZXJ2ZSddO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlTGlzdCh7XG4gICAgICAgICAgICBoYXM6IGxpc3QuaGFzLFxuICAgICAgICAgICAgZ2V0OiBsaXN0LmdldCxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dCxcbiAgICAgICAgICAgIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJldmVyc2UobGlzdCkge1xuICAgICAgICB2YXIgeyBoYXMsIGdldCwgcHJldiwgbmV4dCB9ID0gTGlzdC5yZXZlcnNlKGxpc3QpO1xuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5vYnNlcnZlKHtcbiAgICAgICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShuZXh0LCBwcmV2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgbWFwKGxpc3QsIG1hcEZuKSB7XG4gICAgICAgIHZhciB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH0gPSBMaXN0Lm1hcChsaXN0LCBtYXBGbik7XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0LCBvYnNlcnZlOiBsaXN0Lm9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZpbHRlcihsaXN0LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgeyBoYXMsIGdldCwgcHJldiwgbmV4dCB9ID0gTGlzdC5maWx0ZXIobGlzdCwgZmlsdGVyRm4pO1xuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5vYnNlcnZlKHtcbiAgICAgICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBoYXMocCkgPyBwIDogcHJldihwKTtcbiAgICAgICAgICAgICAgICAgICAgbiA9IGhhcyhuKSA/IG4gOiBuZXh0KG4pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUocCwgbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQsIG9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZsYXR0ZW4obGlzdCkge1xuICAgICAgICB2YXIgY2FjaGU7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgb25JbnZhbGlkYXRlOiBmdW5jdGlvbiAocHJldiwgbmV4dCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICAgICAga2V5ID0gcHJldjtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGtleSA9IGNhY2hlLm5leHQoa2V5KSkgIT0gbnVsbCAmJiBrZXkgIT0gbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdWJzY3JpcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5ID0gbmV4dDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGtleSA9IGNhY2hlLnByZXYoa2V5KSkgIT0gbnVsbCAmJiBrZXkgIT0gcHJldikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdWJzY3JpcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjYWNoZSA9IE9ic2VydmFibGVMaXN0LmNhY2hlKE9ic2VydmFibGVMaXN0Lm1hcChsaXN0LCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uc1trZXldID0gdmFsdWUub2JzZXJ2ZSh7XG4gICAgICAgICAgICAgICAgb25JbnZhbGlkYXRlOiBmdW5jdGlvbiAocHJldiwgbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldktleSwgbmV4dEtleSwgcHJldlBhdGggPSBQYXRoLmFwcGVuZChrZXksIHByZXYpLCBuZXh0UGF0aCA9IFBhdGguYXBwZW5kKGtleSwgbmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2UGF0aCA9IFRyZWUucHJldihsaXN0LCBUcmVlLm5leHQobGlzdCwgcHJldlBhdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQYXRoID0gVHJlZS5uZXh0KGxpc3QsIFRyZWUucHJldihsaXN0LCBuZXh0UGF0aCkpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2S2V5ID0gUGF0aC5rZXkocHJldlBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0S2V5ID0gUGF0aC5rZXkobmV4dFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2S2V5LCBuZXh0S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgICAgY2FjaGUub2JzZXJ2ZSh7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZLZXkgPSBQYXRoLmtleShUcmVlLnByZXYobGlzdCwgW3ByZXZdKSksIG5leHRLZXkgPSBQYXRoLmtleShUcmVlLm5leHQobGlzdCwgW25leHRdKSk7XG4gICAgICAgICAgICAgICAgc3ViamVjdC5ub3RpZnkoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2S2V5LCBuZXh0S2V5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB7IGhhcywgZ2V0LCBuZXh0LCBwcmV2IH0gPSBMaXN0LmZsYXR0ZW4oY2FjaGUpO1xuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgbmV4dCwgcHJldiwgb2JzZXJ2ZTogc3ViamVjdC5vYnNlcnZlIH07XG4gICAgfVxuICAgIHN0YXRpYyBmbGF0TWFwKGxpc3QsIGZsYXRNYXBGbikge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuZmxhdHRlbihPYnNlcnZhYmxlTGlzdC5tYXAobGlzdCwgZmxhdE1hcEZuKSk7XG4gICAgfVxuICAgIHN0YXRpYyBjYWNoZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZUNhY2hlKGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgaW5kZXgobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVJbmRleChsaXN0KTtcbiAgICB9XG4gICAgc3RhdGljIGtleUJ5KGxpc3QsIGtleUZuKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZUtleUJ5KGxpc3QsIGtleUZuKTtcbiAgICB9XG4gICAgc3RhdGljIHppcChsaXN0LCBvdGhlciwgemlwRm4pIHtcbiAgICAgICAgbGlzdCA9IE9ic2VydmFibGVMaXN0LmluZGV4KGxpc3QpO1xuICAgICAgICBvdGhlciA9IE9ic2VydmFibGVMaXN0LmluZGV4KG90aGVyKTtcbiAgICAgICAgZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QuaGFzKGtleSkgJiYgb3RoZXIuaGFzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhrZXkpID8gemlwRm4obGlzdC5nZXQoa2V5KSwgb3RoZXIuZ2V0KGtleSkpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IGxpc3QucHJldihrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHByZXYgIT0gbnVsbCAmJiBwcmV2ID09IG90aGVyLnByZXYoa2V5KSA/IHByZXYgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IGxpc3QubmV4dChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIG5leHQgIT0gbnVsbCAmJiBuZXh0ID09IG90aGVyLm5leHQoa2V5KSA/IG5leHQgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKSwgb2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgc3ViamVjdC5ub3RpZnkoZnVuY3Rpb24gKF9vYnNlcnZlcikge1xuICAgICAgICAgICAgICAgICAgICBfb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHByZXYsIG5leHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsaXN0Lm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgICAgICBvdGhlci5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQsIG9ic2VydmU6IHN1YmplY3Qub2JzZXJ2ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgc2tpcChsaXN0LCBrKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgdGFrZShsaXN0LCBuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IDwgbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByYW5nZShsaXN0LCBrLCBuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGsgJiYga2V5IDwgbiArIGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgc2NhbihsaXN0LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIHsgaGFzLCBwcmV2LCBuZXh0IH0gPSBsaXN0LCBzY2FuTGlzdDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgdmFyIHByZXYgPSBzY2FuTGlzdC5wcmV2KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gc2NhbkZuKHByZXYgIT0gbnVsbCA/IHNjYW5MaXN0LmdldChwcmV2KSA6IG1lbW8sIGxpc3QuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgICAgIG9uSW52YWxpZGF0ZTogZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHByZXYsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNjYW5MaXN0ID0gT2JzZXJ2YWJsZUxpc3QuY2FjaGUoeyBoYXMsIGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSB9KTtcbiAgICAgICAgcmV0dXJuIHNjYW5MaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGVMaXN0O1xuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG47XG5leHBvcnQgdmFyIFBhdGg7XG4oZnVuY3Rpb24gKFBhdGgpIHtcbiAgICBmdW5jdGlvbiBrZXkocGF0aCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocGF0aCk7XG4gICAgfVxuICAgIFBhdGgua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2Uoa2V5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBQYXRoLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBoZWFkKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoWzBdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5oZWFkID0gaGVhZDtcbiAgICBmdW5jdGlvbiBnZXQocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGhbaW5kZXhdO1xuICAgIH1cbiAgICBQYXRoLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiB0YWlsKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IFtdIDogcGF0aC5zbGljZSgxLCBwYXRoLmxlbmd0aCk7XG4gICAgfVxuICAgIFBhdGgudGFpbCA9IHRhaWw7XG4gICAgZnVuY3Rpb24gYXBwZW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChhKS5jb25jYXQoYik7XG4gICAgfVxuICAgIFBhdGguYXBwZW5kID0gYXBwZW5kO1xufSkoUGF0aCB8fCAoUGF0aCA9IHt9KSk7XG5leHBvcnQgdmFyIFRyZWU7XG4oZnVuY3Rpb24gKFRyZWUpIHtcbiAgICBmdW5jdGlvbiBoYXMobGlzdCwgcGF0aCwgZGVwdGggPSBJbmZpbml0eSkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguaGVhZChwYXRoKSwgdGFpbCA9IFBhdGgudGFpbChwYXRoKTtcbiAgICAgICAgcmV0dXJuIGxpc3QuaGFzKGhlYWQpICYmICh0YWlsLmxlbmd0aCA9PSAwIHx8IGRlcHRoID09IDAgfHwgVHJlZS5oYXMobGlzdC5nZXQoaGVhZCksIHRhaWwsIGRlcHRoKSk7XG4gICAgfVxuICAgIFRyZWUuaGFzID0gaGFzO1xuICAgIGZ1bmN0aW9uIGdldChsaXN0LCBwYXRoLCBkZXB0aCA9IEluZmluaXR5KSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpO1xuICAgICAgICBpZiAoIWxpc3QuaGFzKGhlYWQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgdmFsdWUgPSBsaXN0LmdldChoZWFkKTtcbiAgICAgICAgaWYgKHRhaWwubGVuZ3RoID09IDAgfHwgZGVwdGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIFRyZWUuZ2V0KHZhbHVlLCB0YWlsLCBkZXB0aCk7XG4gICAgfVxuICAgIFRyZWUuZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHByZXYobGlzdCwgcGF0aCA9IFtdLCBkZXB0aCA9IEluZmluaXR5KSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpLCBrZXkgPSBoZWFkLCB2YWx1ZTtcbiAgICAgICAgaWYgKGhlYWQgIT0gbnVsbCAmJiAhbGlzdC5oYXMoaGVhZCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhbHVlID0gbGlzdC5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmICghTGlzdC5pc0xpc3QodmFsdWUpIHx8IGRlcHRoID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwgJiYga2V5ICE9IGhlYWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2UGF0aCA9IFRyZWUucHJldih2YWx1ZSwgdGFpbCwgZGVwdGggLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldlBhdGggIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBhdGguYXBwZW5kKGtleSwgcHJldlBhdGgpO1xuICAgICAgICAgICAgICAgIHRhaWwgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKGtleSA9IGxpc3QucHJldihrZXkpKSAhPSBudWxsKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KGxpc3QsIHBhdGggPSBbXSwgZGVwdGggPSBJbmZpbml0eSkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguaGVhZChwYXRoKSwgdGFpbCA9IFBhdGgudGFpbChwYXRoKSwga2V5ID0gaGVhZCwgdmFsdWU7XG4gICAgICAgIGlmIChoZWFkICE9IG51bGwgJiYgIWxpc3QuaGFzKGhlYWQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3QuZ2V0KGtleSk7XG4gICAgICAgICAgICBpZiAoIUxpc3QuaXNMaXN0KHZhbHVlKSB8fCBkZXB0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBudWxsICYmIGtleSAhPSBoZWFkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFBhdGggPSBUcmVlLm5leHQodmFsdWUsIHRhaWwsIGRlcHRoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRQYXRoICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXRoLmFwcGVuZChrZXksIG5leHRQYXRoKTtcbiAgICAgICAgICAgICAgICB0YWlsID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbCk7XG4gICAgfVxuICAgIFRyZWUubmV4dCA9IG5leHQ7XG59KShUcmVlIHx8IChUcmVlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFRyZWU7XG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IHsgTXV0YWJsZUxpc3QgfSBmcm9tICcuL211dGFibGVfbGlzdCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbml0IGV4dGVuZHMgTXV0YWJsZUxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tleSA9PSBrZXk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faW52YWxpZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNwbGljZSA9IChwcmV2LCBuZXh0LCAuLi52YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldChLZXkuY3JlYXRlKCksIHZhbHVlc1swXSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fa2V5O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faW52YWxpZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9ic2VydmUgPSAob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0Lm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlID0gKHByZXYsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2LCBuZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLnNwbGljZShudWxsLCBudWxsLCB2YWx1ZSk7XG4gICAgfVxufVxuIiwiLy8gQnVpbGQgdXBvbiB0aGUgSUxpc3Qgc3RhbmRhcmQgZnJvbSBTb25pY1xuLy8gaW1wb3J0IHtJTGlzdH0gZnJvbSAnLi4vLi4vc29uaWMvZGlzdC9saXN0LmQnO1xuLy8gaW1wb3J0IElkIGZyb20gJy4uLy4uL3NvbmljL2Rpc3Qva2V5LmQnO1xuLy8gaW1wb3J0IHtJTGVuc30gZnJvbSAnLi9sZW5zZXMnO1xuLy8gaW1wb3J0IF9GZXRjaGFibGUgZnJvbSAnLi9mZXRjaGFibGUnO1xuaW1wb3J0IF9SZWNvcmQgZnJvbSAnLi9yZWNvcmQnO1xuaW1wb3J0IF9PYnNlcnZhYmxlUmVjb3JkIGZyb20gJy4vb2JzZXJ2YWJsZV9yZWNvcmQnO1xuaW1wb3J0IF9NdXRhYmxlUmVjb3JkIGZyb20gJy4vbXV0YWJsZV9yZWNvcmQnO1xuaW1wb3J0IF9TaW1wbGVSZWNvcmQgZnJvbSAnLi9zaW1wbGVfcmVjb3JkJztcbmltcG9ydCBfQ29sbGVjdGlvbiBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgWEhSIGFzIF9YSFIgfSBmcm9tICcuL3hocic7XG4vLyBFeHBvcnQgU29uaWMgZm9yIGRldmVsb3BtZW50IHB1cnBvc2VzXG4vLyBpbXBvcnQgX1NvbmljICAgICAgICAgICAgICBmcm9tICcuLi9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9zb25pYyc7XG5mdW5jdGlvbiBLbnVja2xlcyhrZXksIHZhbHVlKSB7XG4gICAgLy8gaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikgcmV0dXJuIEtudWNrbGVzLnNldChrZXksIHZhbHVlKTtcbiAgICAvLyBlbHNlIHJldHVybiBLbnVja2xlcy5nZXQoa2V5KTtcbn1cbjtcbnZhciBLbnVja2xlcztcbihmdW5jdGlvbiAoS251Y2tsZXMpIHtcbiAgICBLbnVja2xlcy5SZWNvcmQgPSBfUmVjb3JkO1xuICAgIEtudWNrbGVzLk9ic2VydmFibGVSZWNvcmQgPSBfT2JzZXJ2YWJsZVJlY29yZDtcbiAgICBLbnVja2xlcy5NdXRhYmxlUmVjb3JkID0gX011dGFibGVSZWNvcmQ7XG4gICAgS251Y2tsZXMuU2ltcGxlUmVjb3JkID0gX1NpbXBsZVJlY29yZDtcbiAgICBLbnVja2xlcy5Db2xsZWN0aW9uID0gX0NvbGxlY3Rpb247XG4gICAgS251Y2tsZXMuWEhSID0gX1hIUjtcbn0pKEtudWNrbGVzIHx8IChLbnVja2xlcyA9IHt9KSk7XG5tb2R1bGUuZXhwb3J0cyA9IEtudWNrbGVzO1xuIl19
