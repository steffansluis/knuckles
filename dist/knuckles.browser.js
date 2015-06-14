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
        key: 'has',
        value: function has(key) {
            var _this = this;

            return _get(Object.getPrototypeOf(Collection.prototype), 'has', this).call(this, key).then(function (has) {
                return has || _xhr.XHR.head(_this._urlRoot + '/' + key).then(function () {
                    return true;
                })['catch'](function () {
                    return false;
                });
            });
        }
    }, {
        key: 'get',
        value: function get(key) {
            var _this2 = this;

            return key in this._object ? _get(Object.getPrototypeOf(Collection.prototype), 'get', this).call(this, key) : _xhr.XHR.get(this._urlRoot + '/' + key).then(function (res) {
                var value = JSON.parse(res.responseText);
                _get(Object.getPrototypeOf(Collection.prototype), 'set', _this2).call(_this2, key, value);
                return value;
            });
        }
    }, {
        key: 'set',
        value: function set(key, value) {
            var _this3 = this;

            if (key in this._object) return _xhr.XHR.put(this._urlRoot + '/' + key, value).then(function (res) {
                return _get(Object.getPrototypeOf(Collection.prototype), 'set', _this3).call(_this3, key, JSON.parse(res.responseText));
            });else return _xhr.XHR.post(this._urlRoot, value).then(function (res) {
                var value = JSON.parse(res.responseText);
                return _get(Object.getPrototypeOf(Collection.prototype), 'set', _this3).call(_this3, value.id, value);
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
            var _this4 = this;

            return _xhr.XHR['delete'](this._urlRoot + '/' + key).then(function (res) {
                return _get(Object.getPrototypeOf(Collection.prototype), 'delete', _this4).call(_this4, key);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC9jb2xsZWN0aW9uLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL2Rpc3QvbXV0YWJsZV9yZWNvcmQuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC9vYnNlcnZhYmxlX3JlY29yZC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9kaXN0L3JlY29yZC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9kaXN0L3NpbXBsZV9yZWNvcmQuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC94aHIuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvYXJyYXlfbGlzdC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9hc3luY19saXN0LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2ZhY3RvcnkuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvaW5kZXguanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qva2V5LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2tleV9ieS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9saXN0LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L211dGFibGVfbGlzdC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfY2FjaGUuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZV9pbmRleC5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlX2tleV9ieS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlX2xpc3QuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvdHJlZS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC91bml0LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL2Rpc3Qva251Y2tsZXMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsZ0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxBQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxDQUFDLENBQUM7U0FBRTtLQUFFLEFBQUMsT0FBTyxVQUFVLFdBQVcsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFO0FBQUUsWUFBSSxVQUFVLEVBQUUsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQyxBQUFDLElBQUksV0FBVyxFQUFFLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxXQUFX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QWMsQ0FBQyxDQUFDOztBQUU3RCxJQUFJLFdBQVcsR0FBRyxPQUFPLENBaEJELGNBQWMsQ0FBQSxDQUFBOztBQWtCdEMsSUFBSSxZQUFZLEdBQUcsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUM7O0FBRXZELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FuQlUsT0FBTyxDQUFBLENBQUE7O0FBQ25DLFNBQVMsUUFBUSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFHN0I7QUFDRCxDQUFDO0FBQ0QsSUFBSSxRQUFRLENBQUM7QUFDYixDQUFDLFVBQVUsUUFBUSxFQUFFO0FBQ2pCLFlBQVEsQ0FBQyxNQUFNLEdBQUEsUUFBQSxDQUFBLFNBQUEsQ0FBVSxDQUFDO0FBQzFCLFlBQVEsQ0FBQyxnQkFBZ0IsR0FBQSxtQkFBQSxDQUFBLFNBQUEsQ0FBb0IsQ0FBQztBQUM5QyxZQUFRLENBQUMsYUFBYSxHQUFBLGdCQUFBLENBQUEsU0FBQSxDQUFpQixDQUFDO0FBQ3hDLFlBQVEsQ0FBQyxZQUFZLEdBQUEsZUFBQSxDQUFBLFNBQUEsQ0FBZ0IsQ0FBQztBQUN0QyxZQUFRLENBQUMsVUFBVSxHQUFBLFlBQUEsQ0FBQSxTQUFBLENBQWMsQ0FBQztBQUNsQyxZQUFRLENBQUMsR0FBRyxHQUFBLElBQUEsQ0FiUCxHQUFHLENBYVk7Q0FDdkIsQ0FBQSxDQUFFLFFBQVEsS0FBSyxRQUFRLEdBQUcsRUFBRSxDQUFBLENBQUUsQ0FBQztBQUNoQyxNQUFNLENBQUMsT0FBTyxHQUFHLFFBQVEsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBTaW1wbGVSZWNvcmQgfSBmcm9tICcuL3NpbXBsZV9yZWNvcmQnO1xuaW1wb3J0IHsgWEhSIH0gZnJvbSAnLi94aHInO1xuZXhwb3J0IGNsYXNzIENvbGxlY3Rpb24gZXh0ZW5kcyBTaW1wbGVSZWNvcmQge1xuICAgIGNvbnN0cnVjdG9yKHVybFJvb3QsIG1vZGVscykge1xuICAgICAgICBzdXBlcih7fSk7XG4gICAgICAgIHRoaXMuX3VybFJvb3QgPSB1cmxSb290O1xuICAgIH1cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiBzdXBlci5oYXMoa2V5KS50aGVuKChoYXMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBoYXMgfHwgWEhSLmhlYWQodGhpcy5fdXJsUm9vdCArIFwiL1wiICsga2V5KVxuICAgICAgICAgICAgICAgIC50aGVuKCgpID0+IHRydWUpXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IGZhbHNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSBpbiB0aGlzLl9vYmplY3QgPyBzdXBlci5nZXQoa2V5KSA6IFhIUi5nZXQodGhpcy5fdXJsUm9vdCArIFwiL1wiICsga2V5KVxuICAgICAgICAgICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShyZXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgIHN1cGVyLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmIChrZXkgaW4gdGhpcy5fb2JqZWN0KVxuICAgICAgICAgICAgcmV0dXJuIFhIUi5wdXQodGhpcy5fdXJsUm9vdCArIFwiL1wiICsga2V5LCB2YWx1ZSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN1cGVyLnNldChrZXksIEpTT04ucGFyc2UocmVzLnJlc3BvbnNlVGV4dCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBYSFIucG9zdCh0aGlzLl91cmxSb290LCB2YWx1ZSkudGhlbigocmVzKSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gSlNPTi5wYXJzZShyZXMucmVzcG9uc2VUZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VwZXIuc2V0KHZhbHVlLmlkLCB2YWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG4gICAgb2JzZXJ2ZShvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gWEhSLmRlbGV0ZSh0aGlzLl91cmxSb290ICsgXCIvXCIgKyBrZXkpLnRoZW4oKHJlcykgPT4gc3VwZXIuZGVsZXRlKGtleSkpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb247XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlUmVjb3JkIH0gZnJvbSAnLi9vYnNlcnZhYmxlX3JlY29yZCc7XG5pbXBvcnQgeyBNdXRhYmxlTGlzdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L211dGFibGVfbGlzdCc7XG47XG5leHBvcnQgY2xhc3MgTXV0YWJsZVJlY29yZCBleHRlbmRzIE9ic2VydmFibGVSZWNvcmQge1xuICAgIGNvbnN0cnVjdG9yKHJlY29yZCkge1xuICAgICAgICBzdXBlcihyZWNvcmQpO1xuICAgICAgICBpZiAocmVjb3JkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0ID0gcmVjb3JkLnNldDtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gcmVjb3JkLmRlbGV0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICB6b29tKGtleSkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKE11dGFibGVSZWNvcmQuem9vbSh0aGlzLCBrZXkpKTtcbiAgICB9XG4gICAgLy8gY29tcG9zZTxXPihsZW5zOiBJTGVuczxWLFc+KTogTXV0YWJsZVJlY29yZDxXPiB7XG4gICAgLy8gICByZXR1cm4gTXV0YWJsZVJlY29yZC5jcmVhdGU8Vz4oTXV0YWJsZVJlY29yZC5jb21wb3NlPFYsVz4odGhpcywgbGVucykpO1xuICAgIC8vIH1cbiAgICBzdGF0aWMgY3JlYXRlKHJlY29yZCkge1xuICAgICAgICByZXR1cm4gbmV3IE11dGFibGVSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgc3RhdGljIHpvb20ocmVjb3JkLCBrZXkpIHtcbiAgICAgICAgdmFyIHVuaXQgPSBPYnNlcnZhYmxlUmVjb3JkLnpvb20ocmVjb3JkLCBrZXkpO1xuICAgICAgICBmdW5jdGlvbiBzZXQoX2tleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChfa2V5ID09IGtleSlcbiAgICAgICAgICAgICAgICByZWNvcmQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNwbGljZShwcmV2LCBuZXh0LCAuLi52YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJlY29yZC5zZXQoa2V5LCB2YWx1ZXNbMF0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlY29yZC5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKHtcbiAgICAgICAgICAgIGhhczogdW5pdC5oYXMsXG4gICAgICAgICAgICBnZXQ6IHVuaXQuZ2V0LFxuICAgICAgICAgICAgcHJldjogdW5pdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogdW5pdC5uZXh0LFxuICAgICAgICAgICAgb2JzZXJ2ZTogdW5pdC5vYnNlcnZlLFxuICAgICAgICAgICAgc2V0OiBzZXQsXG4gICAgICAgICAgICBzcGxpY2U6IHNwbGljZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBNdXRhYmxlUmVjb3JkO1xuIiwiaW1wb3J0IFVuaXQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvdW5pdCc7XG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuL3JlY29yZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlTGlzdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfbGlzdCc7XG47XG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVJlY29yZCBleHRlbmRzIFJlY29yZCB7XG4gICAgY29uc3RydWN0b3IocmVjb3JkKSB7XG4gICAgICAgIHN1cGVyKHJlY29yZCk7XG4gICAgICAgIGlmIChyZWNvcmQgIT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSA9IHJlY29yZC5vYnNlcnZlO1xuICAgIH1cbiAgICBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgem9vbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlUmVjb3JkLnpvb20odGhpcywga2V5KSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUocmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBzdGF0aWMgem9vbShyZWNvcmQsIGtleSkge1xuICAgICAgICB2YXIgdW5pdCA9IG5ldyBVbml0KCk7XG4gICAgICAgIHJlY29yZC5nZXQoa2V5KS50aGVuKCh2YWx1ZSkgPT4gdW5pdC5zZXQoa2V5LCB2YWx1ZSkpO1xuICAgICAgICByZWNvcmQub2JzZXJ2ZSh7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGsgIT0ga2V5KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgcmVjb3JkLmdldChrZXkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKCh2YWx1ZSkgPT4gdW5pdC5zZXQoa2V5LCB2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB1bml0LnNwbGljZShudWxsLCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKHVuaXQpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGVSZWNvcmQ7XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvbGlzdCc7XG5pbXBvcnQgeyBmcm9tUHJvbWlzZSB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2ZhY3RvcnknO1xuZXhwb3J0IGNsYXNzIFJlY29yZCB7XG4gICAgY29uc3RydWN0b3IocmVjb3JkKSB7XG4gICAgICAgIGlmIChyZWNvcmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5nZXQgPSByZWNvcmQuZ2V0O1xuICAgICAgICAgICAgdGhpcy5oYXMgPSByZWNvcmQuaGFzO1xuICAgICAgICB9XG4gICAgfVxuICAgIGhhcyhrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgem9vbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKFJlY29yZC56b29tKHRoaXMsIGtleSkpO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKHJlY29yZCkge1xuICAgICAgICByZXR1cm4gbmV3IFJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBzdGF0aWMgem9vbShyZWNvcmQsIGtleSkge1xuICAgICAgICB2YXIgdW5pdCA9IGZyb21Qcm9taXNlKHJlY29yZC5nZXQoa2V5KSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXM6IHVuaXQuaGFzLFxuICAgICAgICAgICAgZ2V0OiB1bml0LmdldCxcbiAgICAgICAgICAgIHByZXY6IHVuaXQucHJldixcbiAgICAgICAgICAgIG5leHQ6IHVuaXQubmV4dFxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IFJlY29yZDtcbiIsImltcG9ydCB7IE11dGFibGVSZWNvcmQgfSBmcm9tICcuL211dGFibGVfcmVjb3JkJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlJztcbmV4cG9ydCBjbGFzcyBTaW1wbGVSZWNvcmQgZXh0ZW5kcyBNdXRhYmxlUmVjb3JkIHtcbiAgICBjb25zdHJ1Y3RvcihvYmplY3QpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5fb2JqZWN0ID0gb2JqZWN0O1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgcmVzb2x2ZShrZXkgaW4gdGhpcy5fb2JqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGtleSBpbiB0aGlzLl9vYmplY3QgPyByZXNvbHZlKHRoaXMuX29iamVjdFtrZXldKSA6IHJlamVjdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgb2JzZXJ2ZShvYnNlcnZlcikge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICB9XG4gICAgc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX29iamVjdFtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUoa2V5KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmVzb2x2ZShrZXkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZGVsZXRlKGtleSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYgKCEoa2V5IGluIHRoaXMuX29iamVjdCkpXG4gICAgICAgICAgICAgICAgcmVqZWN0KCk7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLl9vYmplY3Rba2V5XTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9vYmplY3Rba2V5XTtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXNvbHZlKHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgU2ltcGxlUmVjb3JkO1xuIiwiZXhwb3J0IHZhciBYSFIgPSB7XG4gICAgY3JlYXRlOiAoa2V5LCBvcHRpb25zKSA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHVybCA9IGtleS50b1N0cmluZygpLCB7IG1ldGhvZCwgYm9keSB9ID0gb3B0aW9ucztcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDApIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSh4aHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlamVjdCh4aHIpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgLy8geGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKVxuICAgICAgICAgICAgeGhyLnNlbmQoSlNPTi5zdHJpbmdpZnkoYm9keSkpO1xuICAgICAgICB9KTtcbiAgICB9LFxuICAgIGhlYWQ6ICh1cmwpID0+IHtcbiAgICAgICAgcmV0dXJuIFhIUi5jcmVhdGUodXJsLCB7IG1ldGhvZDogXCJIRUFEXCIgfSk7XG4gICAgfSxcbiAgICBnZXQ6ICh1cmwpID0+IHtcbiAgICAgICAgcmV0dXJuIFhIUi5jcmVhdGUodXJsLCB7IG1ldGhvZDogXCJHRVRcIiB9KTtcbiAgICB9LFxuICAgIHB1dDogKHVybCwgYm9keSkgPT4ge1xuICAgICAgICByZXR1cm4gWEhSLmNyZWF0ZSh1cmwsIHsgbWV0aG9kOiBcIlBVVFwiLCBib2R5OiBib2R5IH0pO1xuICAgIH0sXG4gICAgcG9zdDogKHVybCwgYm9keSkgPT4ge1xuICAgICAgICByZXR1cm4gWEhSLmNyZWF0ZSh1cmwsIHsgbWV0aG9kOiBcIlBPU1RcIiwgYm9keTogYm9keSB9KTtcbiAgICB9LFxuICAgIGRlbGV0ZTogKHVybCkgPT4ge1xuICAgICAgICByZXR1cm4gWEhSLmNyZWF0ZSh1cmwsIHsgbWV0aG9kOiBcIkRFTEVURVwiIH0pO1xuICAgIH1cbn07XG4vLyBleHBvcnQgY2xhc3MgWEhSUmVjb3JkPFY+IGltcGxlbWVudHMgSU11dGFibGVSZWNvcmQ8Vj4ge1xuLy8gICBwcm90ZWN0ZWQgX3N1YmplY3Q6IFN1YmplY3Q8SVJlY29yZE9ic2VydmVyPjtcbi8vXG4vLyAgIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgIHRoaXMuX3N1YmplY3QgPSBYSFJSZWNvcmQuX3N1YmplY3Q7XG4vLyAgIH1cbi8vXG4vLyAgIGhhcyhrZXk6IEtleSk6IGJvb2xlYW4ge1xuLy8gICAgICByZXR1cm4gWEhSUmVjb3JkLmhhcyhrZXkpO1xuLy8gICAgfVxuLy9cbi8vICAgZ2V0KGtleTogS2V5KTogViB7XG4vLyAgICAgIHJldHVybiA8Vj5YSFJSZWNvcmQuZ2V0KGtleSk7XG4vLyAgICB9XG4vL1xuLy8gICBzZXQoa2V5OiBLZXksIHZhbHVlOiBWKTogdm9pZCB7XG4vLyAgICAgIHJldHVybiBYSFJSZWNvcmQuc2V0KGtleSwgdmFsdWUpO1xuLy8gICAgfVxuLy9cbi8vICAgb2JzZXJ2ZShvYnNlcnZlcjogSVJlY29yZE9ic2VydmVyKTogSVN1YnNjcmlwdGlvbiB7XG4vLyAgICAgIHJldHVybiBYSFJSZWNvcmQub2JzZXJ2ZShvYnNlcnZlcik7XG4vLyAgICB9XG4vL1xuLy8gICBkZWxldGUoa2V5OiBLZXkpOiB2b2lkIHtcbi8vICAgICAgcmV0dXJuIFhIUlJlY29yZC5kZWxldGUoa2V5KTtcbi8vICAgIH1cbi8vXG4vLyAgIHN0YXRpYyBfc3ViamVjdCA9IG5ldyBTdWJqZWN0PElSZWNvcmRPYnNlcnZlcj4oKTtcbi8vXG4vLyAgIHN0YXRpYyBpbnZhbGlkYXRlID0gKGtleTogS2V5KTogdm9pZCA9PiB7XG4vLyAgICAgWEhSUmVjb3JkLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbihvYnNlcnZlcjogSVJlY29yZE9ic2VydmVyKSB7XG4vLyAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUoa2V5KTtcbi8vICAgICB9KTtcbi8vICAgfVxuLy9cbi8vICAgc3RhdGljIGhhcyA9IChrZXk6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuLy8gICAgIHJldHVybiBYSFIuaGVhZChrZXkpXG4vLyAgICAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSlcbi8vICAgICAgICAgICAgICAgLmNhdGNoKGZ1bmN0aW9uKCkgeyByZXR1cm4gZmFsc2U7IH0pO1xuLy8gICB9XG4vL1xuLy8gICBzdGF0aWMgZ2V0ID0gPFY+KGtleTogc3RyaW5nKTogUHJvbWlzZTxWPiA9PiB7XG4vLyAgICAgcmV0dXJuIFhIUi5nZXQoa2V5KVxuLy8gICAgICAgICAgICAgICAudGhlbihmdW5jdGlvbih4aHIpIHsgcmV0dXJuIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlVGV4dCk7IH0pXG4vLyAgIH1cbi8vXG4vLyAgIC8vIHN0YXRpYyBzZXQgPSA8Vj4oa2V5OiBzdHJpbmcsIHZhbHVlOiBWKTogUHJvbWlzZTxWPiA9PiB7XG4vLyAgIC8vICAgcmV0dXJuIFhIUi5cbi8vICAgLy8gfVxuLy9cbi8vICAgc3RhdGljIG9ic2VydmUgPSAob2JzZXJ2ZXI6IElSZWNvcmRPYnNlcnZlcik6IElTdWJzY3JpcHRpb24gPT4ge1xuLy8gICAgIHJldHVybiBYSFJSZWNvcmQuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4vLyAgIH1cbi8vXG4vLyAgIHN0YXRpYyBkZWxldGUgPSAoa2V5OiBLZXkpOiB2b2lkID0+IHtcbi8vICAgICB2YXIgeGhyID0gWEhSW1wiZGVsZXRlXCJdKGtleSk7XG4vLyAgICAgWEhSUmVjb3JkLmludmFsaWRhdGUoa2V5KTtcbi8vXG4vLyAgICAgcmV0dXJuIG51bGw7XG4vLyAgIH1cbi8vXG4vLyB9XG4vL1xuLy8gZXhwb3J0IGRlZmF1bHQgWEhSUmVjb3JkO1xuIiwiaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNdXRhYmxlTGlzdCB9IGZyb20gJy4vbXV0YWJsZV9saXN0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFycmF5TGlzdCBleHRlbmRzIE11dGFibGVMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihhcnJheSA9IFtdKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleSAhPSBudWxsICYmIC0xIDwga2V5ICYmIGtleSA8IHRoaXMuX2FycmF5Lmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXlba2V5XTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsICYmIHRoaXMuX2FycmF5Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJyYXkubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcnJheS5sZW5ndGggPiAwICYmIGtleSAhPSBudWxsICYmIHRoaXMuaGFzKGtleSkgJiYgdGhpcy5oYXMoa2V5IC0gMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSAtIDE7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5uZXh0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsICYmIHRoaXMuX2FycmF5Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIGlmICh0aGlzLl9hcnJheS5sZW5ndGggPiAwICYmIGtleSAhPSBudWxsICYmIHRoaXMuaGFzKGtleSkgJiYgdGhpcy5oYXMoa2V5ICsgMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleSArIDE7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgdGhpcy5fYXJyYXlba2V5XSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zcGxpY2UgPSAocHJldiwgbmV4dCwgLi4udmFsdWVzKSA9PiB7XG4gICAgICAgICAgICBpZiAocHJldiA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHByZXYgPSAtMTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmhhcyhwcmV2KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgIG5leHQgPSB0aGlzLl9hcnJheS5sZW5ndGg7XG4gICAgICAgICAgICBlbHNlIGlmICghdGhpcy5oYXMobmV4dCkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5fYXJyYXkuc3BsaWNlKHByZXYgKyAxLCBuZXh0IC0gKHByZXYgKyAxKSwgLi4udmFsdWVzKTtcbiAgICAgICAgICAgIHRoaXMuX2ludmFsaWRhdGUocHJldiwgbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGUgPSAocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhwcmV2KSlcbiAgICAgICAgICAgICAgICBwcmV2ID0gbnVsbDtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXMobmV4dCkpXG4gICAgICAgICAgICAgICAgbmV4dCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUocHJldiwgbmV4dCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgIHRoaXMuX2FycmF5ID0gYXJyYXk7XG4gICAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEFzeW5jTGlzdCB7XG4gICAgY29uc3RydWN0b3IobGlzdCwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5fbGlzdC5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc29sdmUpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXMoa2V5KVxuICAgICAgICAgICAgICAgICAgICAudGhlbihoYXMgPT4gaGFzID8gcmVzb2x2ZSh0aGlzLl9saXN0LmdldChrZXkpKSA6IHJlamVjdCgpKVxuICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLl9saXN0LnByZXYoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gcmVzb2x2ZShwcmV2KSA6IHJlamVjdCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5uZXh0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zY2hlZHVsZXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUodGhpcy5fbGlzdC5uZXh0KGtleSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHJlc29sdmUocHJldikgOiByZWplY3QoKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgICAgICB0aGlzLl9zY2hlZHVsZXIgPSBzY2hlZHVsZXIgfHwgd2luZG93LnNldFRpbWVvdXQ7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IEFzeW5jTGlzdChsaXN0KTtcbiAgICB9XG4gICAgc3RhdGljIG1hcChsaXN0LCBtYXBGbikge1xuICAgICAgICB2YXIgeyBoYXMsIHByZXYsIG5leHQgfSA9IGxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpLnRoZW4obWFwRm4pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNMaXN0KHsgaGFzLCBnZXQsIHByZXYsIG5leHQgfSk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQXN5bmNMaXN0O1xuIiwiZXhwb3J0IGNsYXNzIENhY2hlIHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiB0aGlzLl9ieUtleSB8fCB0aGlzLl9saXN0LmhhcyhrZXkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gdGhpcy5fYnlLZXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J5S2V5W2tleV07XG4gICAgICAgICAgICBpZiAodGhpcy5fbGlzdC5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnlLZXlba2V5XSA9IHRoaXMuX2xpc3QuZ2V0KGtleSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgaW4gdGhpcy5fcHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcHJldltrZXldO1xuICAgICAgICAgICAgdmFyIHByZXZLZXkgPSB0aGlzLl9saXN0LnByZXYoa2V5KTtcbiAgICAgICAgICAgIGlmIChwcmV2S2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcHJldktleSA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9wcmV2W2tleV0gPSBwcmV2S2V5O1xuICAgICAgICAgICAgdGhpcy5fbmV4dFtwcmV2S2V5XSA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiBwcmV2S2V5O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9uZXh0KVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9uZXh0W2tleV07XG4gICAgICAgICAgICB2YXIgbmV4dEtleSA9IHRoaXMuX2xpc3QubmV4dChrZXkpO1xuICAgICAgICAgICAgaWYgKG5leHRLZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBuZXh0S2V5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX25leHRba2V5XSA9IG5leHRLZXk7XG4gICAgICAgICAgICB0aGlzLl9wcmV2W25leHRLZXldID0ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIG5leHRLZXk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2J5S2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIHRoaXMuX25leHQgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgdGhpcy5fcHJldiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlTGlzdCB9IGZyb20gJy4vb2JzZXJ2YWJsZV9saXN0JztcbmltcG9ydCB7IE11dGFibGVMaXN0IH0gZnJvbSAnLi9tdXRhYmxlX2xpc3QnO1xuaW1wb3J0IFVuaXQgZnJvbSAnLi91bml0JztcbmltcG9ydCBBcnJheUxpc3QgZnJvbSAnLi9hcnJheV9saXN0JztcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGZhY3Rvcnkob2JqKSB7XG4gICAgaWYgKE11dGFibGVMaXN0LmlzTXV0YWJsZUxpc3Qob2JqKSlcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmNyZWF0ZShvYmopO1xuICAgIGlmIChPYnNlcnZhYmxlTGlzdC5pc09ic2VydmFibGVMaXN0KG9iaikpXG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUob2JqKTtcbiAgICBpZiAoTGlzdC5pc0xpc3Qob2JqKSlcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKG9iaik7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSlcbiAgICAgICAgcmV0dXJuIG5ldyBBcnJheUxpc3Qob2JqKTtcbiAgICByZXR1cm4gVW5pdC5jcmVhdGUob2JqKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUHJvbWlzZShwcm9taXNlKSB7XG4gICAgdmFyIHVuaXQgPSBuZXcgVW5pdCgpO1xuICAgIHByb21pc2UudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgdW5pdC5wdXNoKHZhbHVlKTtcbiAgICB9KTtcbiAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKHVuaXQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21JdGVyYXRvcihpdGVyYXRvcikge1xuICAgIHZhciBsaXN0ID0ge1xuICAgICAgICBoYXM6IGZ1bmN0aW9uIChrZXkpIHsgcmV0dXJuIG51bGw7IH0sXG4gICAgICAgIGdldDogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgcHJldjogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbnVsbDsgfVxuICAgIH07XG4gICAgcmV0dXJuIGxpc3Q7XG59XG4iLCJleHBvcnQgY2xhc3MgSW5kZXgge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgdGhpcy5oYXMgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgbmV4dCwgbGFzdCA9IHRoaXMuX2J5SW5kZXgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChsYXN0ICE9IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuX2xpc3QubmV4dCh0aGlzLl9ieUluZGV4W2xhc3RdKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnlJbmRleFsrK2xhc3RdID0gbmV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGluZGV4KSA/IHRoaXMuX2xpc3QuZ2V0KHRoaXMuX2J5SW5kZXhbaW5kZXhdKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMoaW5kZXggLSAxKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggLSAxO1xuICAgICAgICAgICAgaWYgKGluZGV4ID09IG51bGwgJiYgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2J5SW5kZXgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoaW5kZXggPSAtMSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKGluZGV4ICsgMSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGluZGV4ICsgMTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ieUluZGV4ID0gW107XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4O1xuIiwidmFyIEtleTtcbihmdW5jdGlvbiAoS2V5KSB7XG4gICAgdmFyIHVuaXF1ZUtleSA9IDA7XG4gICAgZnVuY3Rpb24ga2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEtleS5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gdW5pcXVlS2V5Kys7XG4gICAgfVxuICAgIEtleS5jcmVhdGUgPSBjcmVhdGU7XG59KShLZXkgfHwgKEtleSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLZXk7XG4iLCJleHBvcnQgY2xhc3MgS2V5Qnkge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QsIGtleUZuKSB7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9zb3VyY2VLZXlCeUtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBsYXN0ID0gbnVsbDtcbiAgICAgICAgICAgIHdoaWxlICgobGFzdCA9IHRoaXMubmV4dChsYXN0KSkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBpZiAobGFzdCA9PSBrZXkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhhcyhrZXkpID8gdGhpcy5fbGlzdC5nZXQodGhpcy5fc291cmNlS2V5QnlLZXlba2V5XSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhcyhrZXkpIHx8IGtleSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9rZXlCeVNvdXJjZUtleVt0aGlzLl9saXN0LnByZXYodGhpcy5fc291cmNlS2V5QnlLZXlba2V5XSldO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5ID0gbnVsbCkgPT4ge1xuICAgICAgICAgICAgdmFyIHNvdXJjZUtleSwgc291cmNlTmV4dCwgcmVzO1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9zb3VyY2VLZXlCeUtleSlcbiAgICAgICAgICAgICAgICBzb3VyY2VLZXkgPSB0aGlzLl9zb3VyY2VLZXlCeUtleVtrZXldO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHNvdXJjZUtleSA9IG51bGw7XG4gICAgICAgICAgICB3aGlsZSAoa2V5ICE9IG51bGwgJiYgIShrZXkgaW4gdGhpcy5fc291cmNlS2V5QnlLZXkpKSB7XG4gICAgICAgICAgICAgICAgc291cmNlS2V5ID0gdGhpcy5fbGlzdC5uZXh0KHNvdXJjZUtleSk7XG4gICAgICAgICAgICAgICAgaWYgKCEoc291cmNlS2V5IGluIHRoaXMuX2tleUJ5U291cmNlS2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc291cmNlS2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gdGhpcy5fa2V5Rm4odGhpcy5fbGlzdC5nZXQoc291cmNlS2V5KSwgc291cmNlS2V5KTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fa2V5QnlTb3VyY2VLZXlbc291cmNlS2V5XSA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fc291cmNlS2V5QnlLZXlbcmVzXSA9IHNvdXJjZUtleTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcyA9PSBrZXkpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzb3VyY2VLZXkgPSB0aGlzLl9saXN0Lm5leHQoc291cmNlS2V5KTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VLZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIHJlcyA9IHRoaXMuX2tleUZuKHRoaXMuX2xpc3QuZ2V0KHNvdXJjZUtleSksIHNvdXJjZUtleSk7XG4gICAgICAgICAgICB0aGlzLl9rZXlCeVNvdXJjZUtleVtzb3VyY2VLZXldID0gcmVzO1xuICAgICAgICAgICAgdGhpcy5fc291cmNlS2V5QnlLZXlbcmVzXSA9IHNvdXJjZUtleTtcbiAgICAgICAgICAgIHJldHVybiByZXM7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgICAgICB0aGlzLl9rZXlGbiA9IGtleUZuO1xuICAgICAgICB0aGlzLl9zb3VyY2VLZXlCeUtleSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2tleUJ5U291cmNlS2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBLZXlCeTtcbiIsImltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEluZGV4IGZyb20gJy4vaW5kZXgnO1xuaW1wb3J0IEtleUJ5IGZyb20gJy4va2V5X2J5JztcbmltcG9ydCB7IEFzeW5jTGlzdCB9IGZyb20gJy4vYXN5bmNfbGlzdCc7XG5leHBvcnQgY2xhc3MgTGlzdCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICB0aGlzLmhhcyA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5uZXh0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpcnN0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmlyc3QodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubGFzdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0Lmxhc3QodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZm9yRWFjaCA9IChmbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZm9yRWFjaCh0aGlzLCBmbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVkdWNlID0gKGZuLCBtZW1vKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5yZWR1Y2UodGhpcywgZm4pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRvQXJyYXkgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC50b0FycmF5KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbmRLZXkgPSAoZm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmZpbmRLZXkodGhpcywgZm4pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbmQgPSAoZm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmZpbmQodGhpcywgZm4pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmtleU9mID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5rZXlPZih0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5kZXhPZiA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuaW5kZXhPZih0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua2V5QXQgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmtleUF0KHRoaXMsIGluZGV4KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hdCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuYXQodGhpcywgaW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmV2ZXJ5ID0gKHByZWRpY2F0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZXZlcnkodGhpcywgcHJlZGljYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb21lID0gKHByZWRpY2F0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3Quc29tZSh0aGlzLCBwcmVkaWNhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNvbnRhaW5zID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jb250YWlucyh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmV2ZXJzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LnJldmVyc2UodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1hcCA9IChtYXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QubWFwKHRoaXMsIG1hcEZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlsdGVyID0gKGZpbHRlckZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5maWx0ZXIodGhpcywgZmlsdGVyRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mbGF0dGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuZmxhdHRlbih0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdE1hcCA9IChmbGF0TWFwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmZsYXRNYXAodGhpcywgZmxhdE1hcEZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY2FjaGUgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5jYWNoZSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5kZXggPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5pbmRleCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua2V5QnkgPSAoa2V5Rm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmtleUJ5KHRoaXMsIGtleUZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuemlwID0gKG90aGVyLCB6aXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuemlwKHRoaXMsIG90aGVyLCB6aXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNraXAgPSAoaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3Quc2tpcCh0aGlzLCBrKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFrZSA9IChuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC50YWtlKHRoaXMsIG4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yYW5nZSA9IChrLCBuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5yYW5nZSh0aGlzLCBrLCBuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NhbiA9IChzY2FuRm4sIG1lbW8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LnNjYW4odGhpcywgc2NhbkZuLCBtZW1vKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzID0gbGlzdC5oYXM7XG4gICAgICAgICAgICB0aGlzLmdldCA9IGxpc3QuZ2V0O1xuICAgICAgICAgICAgdGhpcy5wcmV2ID0gbGlzdC5wcmV2O1xuICAgICAgICAgICAgdGhpcy5uZXh0ID0gbGlzdC5uZXh0O1xuICAgICAgICB9XG4gICAgfVxuICAgIDtcbiAgICBzdGF0aWMgaXNMaXN0KG9iaikge1xuICAgICAgICByZXR1cm4gb2JqICE9IG51bGwgJiYgISFvYmpbJ2hhcyddICYmICEhb2JqWydnZXQnXSAmJiAhIW9ialsncHJldiddICYmICEhb2JqWyduZXh0J107XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IExpc3Qoe1xuICAgICAgICAgICAgaGFzOiBsaXN0LmhhcyxcbiAgICAgICAgICAgIGdldDogbGlzdC5nZXQsXG4gICAgICAgICAgICBwcmV2OiBsaXN0LnByZXYsXG4gICAgICAgICAgICBuZXh0OiBsaXN0Lm5leHRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBmaXJzdChsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0LmdldChsaXN0Lm5leHQoKSk7XG4gICAgfVxuICAgIHN0YXRpYyBsYXN0KGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KGxpc3QucHJldigpKTtcbiAgICB9XG4gICAgc3RhdGljIGZvckVhY2gobGlzdCwgZm4pIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGZuKGxpc3QuZ2V0KGtleSksIGtleSk7XG4gICAgfVxuICAgIHN0YXRpYyByZWR1Y2UobGlzdCwgZm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIG1lbW8gPSBmbihtZW1vLCBsaXN0LmdldChrZXkpLCBrZXkpO1xuICAgICAgICByZXR1cm4gbWVtbztcbiAgICB9XG4gICAgc3RhdGljIHRvQXJyYXkobGlzdCkge1xuICAgICAgICB2YXIga2V5LCBpbmRleCA9IDAsIGFycmF5ID0gW107XG4gICAgICAgIHdoaWxlICgoa2V5ID0gbGlzdC5uZXh0KGtleSkpICE9IG51bGwpXG4gICAgICAgICAgICBhcnJheVtpbmRleCsrXSA9IGxpc3QuZ2V0KGtleSk7XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9XG4gICAgc3RhdGljIGZpbmRLZXkobGlzdCwgZm4pIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGlmIChmbihsaXN0LmdldChrZXkpLCBrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgfVxuICAgIHN0YXRpYyBmaW5kKGxpc3QsIGZuKSB7XG4gICAgICAgIHJldHVybiBsaXN0LmdldChMaXN0LmZpbmRLZXkobGlzdCwgZm4pKTtcbiAgICB9XG4gICAgc3RhdGljIGtleU9mKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZpbmRLZXkobGlzdCwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIHN0YXRpYyBpbmRleE9mKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHZhciBrZXksIGkgPSAwO1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGlzdC5nZXQoa2V5KSA9PT0gdmFsdWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc3RhdGljIGtleUF0KGxpc3QsIGluZGV4KSB7XG4gICAgICAgIHZhciBrZXksIGkgPSAwO1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKGkrKyA9PSBpbmRleClcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3RhdGljIGF0KGxpc3QsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBsaXN0LmdldChMaXN0LmtleUF0KGxpc3QsIGluZGV4KSk7XG4gICAgfVxuICAgIHN0YXRpYyBldmVyeShsaXN0LCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGlmICghcHJlZGljYXRlKGxpc3QuZ2V0KGtleSksIGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIHNvbWUobGlzdCwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHdoaWxlICgoa2V5ID0gbGlzdC5uZXh0KGtleSkpICE9IG51bGwpXG4gICAgICAgICAgICBpZiAocHJlZGljYXRlKGxpc3QuZ2V0KGtleSksIGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgc3RhdGljIGNvbnRhaW5zKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LnNvbWUobGlzdCwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIHN0YXRpYyByZXZlcnNlKGxpc3QpIHtcbiAgICAgICAgdmFyIHsgaGFzLCBnZXQgfSA9IGxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LnByZXYoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgbWFwKGxpc3QsIG1hcEZuKSB7XG4gICAgICAgIHZhciB7IGhhcywgcHJldiwgbmV4dCB9ID0gbGlzdDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhrZXkpID8gbWFwRm4obGlzdC5nZXQoa2V5KSwga2V5KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgZmlsdGVyKGxpc3QsIGZpbHRlckZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmhhcyhrZXkpICYmIGZpbHRlckZuKGxpc3QuZ2V0KGtleSksIGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgaWYgKGhhcyhrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IGtleTtcbiAgICAgICAgICAgIHdoaWxlICgocHJldiA9IGxpc3QucHJldihwcmV2KSkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBpZiAoaGFzKHByZXYpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IGtleTtcbiAgICAgICAgICAgIHdoaWxlICgobmV4dCA9IGxpc3QubmV4dChuZXh0KSkgIT0gbnVsbClcbiAgICAgICAgICAgICAgICBpZiAoaGFzKG5leHQpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIHN0YXRpYyBmbGF0dGVuKGxpc3QpIHtcbiAgICAgICAgZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICAgICAgdmFyIHBhdGggPSBQYXRoLmNyZWF0ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFRyZWUuaGFzKGxpc3QsIHBhdGgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5jcmVhdGUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBUcmVlLmdldChsaXN0LCBwYXRoLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgdmFyIHBhdGggPSBQYXRoLmNyZWF0ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFBhdGgua2V5KFRyZWUucHJldihsaXN0LCBwYXRoLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5jcmVhdGUoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBQYXRoLmtleShUcmVlLm5leHQobGlzdCwgcGF0aCwgMSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIHN0YXRpYyBmbGF0TWFwKGxpc3QsIGZsYXRNYXBGbikge1xuICAgICAgICByZXR1cm4gTGlzdC5mbGF0dGVuKExpc3QubWFwKGxpc3QsIGZsYXRNYXBGbikpO1xuICAgIH1cbiAgICBzdGF0aWMgY2FjaGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IENhY2hlKGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgaW5kZXgobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IEluZGV4KGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMga2V5QnkobGlzdCwga2V5Rm4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBLZXlCeShsaXN0LCBrZXlGbik7XG4gICAgfVxuICAgIHN0YXRpYyB6aXAobGlzdCwgb3RoZXIsIHppcEZuKSB7XG4gICAgICAgIGxpc3QgPSBMaXN0LmluZGV4KGxpc3QpO1xuICAgICAgICBvdGhlciA9IExpc3QuaW5kZXgob3RoZXIpO1xuICAgICAgICBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5oYXMoa2V5KSAmJiBvdGhlci5oYXMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGtleSkgPyB6aXBGbihsaXN0LmdldChrZXkpLCBvdGhlci5nZXQoa2V5KSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gbGlzdC5wcmV2KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gcHJldiAhPSBudWxsICYmIHByZXYgPT0gb3RoZXIucHJldihrZXkpID8gcHJldiA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gbGlzdC5uZXh0KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dCAhPSBudWxsICYmIG5leHQgPT0gb3RoZXIubmV4dChrZXkpID8gbmV4dCA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgc3RhdGljIHNraXAobGlzdCwgaykge1xuICAgICAgICByZXR1cm4gTGlzdC5maWx0ZXIoTGlzdC5pbmRleChsaXN0KSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPj0gaztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyB0YWtlKGxpc3QsIG4pIHtcbiAgICAgICAgcmV0dXJuIExpc3QuZmlsdGVyKExpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IDwgbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByYW5nZShsaXN0LCBrLCBuKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZpbHRlcihMaXN0LmluZGV4KGxpc3QpLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSA+PSBrICYmIGtleSA8IG4gKyBrO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHNjYW4obGlzdCwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIHZhciB7IGhhcywgcHJldiwgbmV4dCB9ID0gbGlzdCwgc2Nhbkxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gc2Nhbkxpc3QucHJldihrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHNjYW5GbihwcmV2ICE9IG51bGwgPyBzY2FuTGlzdC5nZXQocHJldikgOiBtZW1vLCBsaXN0LmdldChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBzY2FuTGlzdCA9IExpc3QuY2FjaGUoeyBoYXMsIGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICAgICAgcmV0dXJuIHNjYW5MaXN0O1xuICAgIH1cbiAgICBzdGF0aWMgYXN5bmMobGlzdCwgc2NoZWR1bGVyKSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNMaXN0KGxpc3QpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlTGlzdCB9IGZyb20gJy4vb2JzZXJ2YWJsZV9saXN0JztcbmV4cG9ydCBjbGFzcyBNdXRhYmxlTGlzdCBleHRlbmRzIE9ic2VydmFibGVMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHN1cGVyKGxpc3QpO1xuICAgICAgICB0aGlzLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3BsaWNlID0gKHByZXYsIG5leHQsIC4uLnZhbHVlcykgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZEJlZm9yZSA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuYWRkQmVmb3JlKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmFkZEFmdGVyID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5hZGRBZnRlcih0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wdXNoID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QucHVzaCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudW5zaGlmdCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnVuc2hpZnQodGhpcywgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlbGV0ZSA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGUodGhpcywga2V5KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGVCZWZvcmUgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQmVmb3JlKHRoaXMsIGtleSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlQWZ0ZXIgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQWZ0ZXIodGhpcywga2V5KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wb3AgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QucG9wKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNoaWZ0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnNoaWZ0KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJlbW92ZSA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnJlbW92ZSh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29tcG9zZSA9IChsZW5zKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKE11dGFibGVMaXN0LmNvbXBvc2UodGhpcywgbGVucykpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAobGlzdCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNldCA9IGxpc3Quc2V0O1xuICAgICAgICAgICAgdGhpcy5zcGxpY2UgPSBsaXN0LnNwbGljZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMgaXNNdXRhYmxlTGlzdChvYmopIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmlzT2JzZXJ2YWJsZUxpc3Qob2JqKSAmJiAhIW9ialsnc2V0J10gJiYgISFvYmpbJ3NwbGljZSddO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNdXRhYmxlTGlzdCh7XG4gICAgICAgICAgICBoYXM6IGxpc3QuaGFzLFxuICAgICAgICAgICAgZ2V0OiBsaXN0LmdldCxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dCxcbiAgICAgICAgICAgIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZSxcbiAgICAgICAgICAgIHNldDogbGlzdC5zZXQsXG4gICAgICAgICAgICBzcGxpY2U6IGxpc3Quc3BsaWNlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkQmVmb3JlKGxpc3QsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGlzdC5zcGxpY2UobGlzdC5wcmV2KGtleSksIGtleSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gbGlzdC5wcmV2KGtleSk7XG4gICAgfVxuICAgIHN0YXRpYyBhZGRBZnRlcihsaXN0LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGxpc3Quc3BsaWNlKGtleSwgbGlzdC5uZXh0KGtleSksIHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGxpc3QubmV4dChrZXkpO1xuICAgIH1cbiAgICBzdGF0aWMgcHVzaChsaXN0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuYWRkQmVmb3JlKGxpc3QsIG51bGwsIHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIHVuc2hpZnQobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmFkZEFmdGVyKGxpc3QsIG51bGwsIHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZShsaXN0LCBrZXkpIHtcbiAgICAgICAgaWYgKCFsaXN0LmhhcyhrZXkpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgdmFsdWUgPSBsaXN0LmdldChrZXkpO1xuICAgICAgICBsaXN0LnNwbGljZShsaXN0LnByZXYoa2V5KSwgbGlzdC5uZXh0KGtleSkpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGVCZWZvcmUobGlzdCwga2V5KSB7XG4gICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGUobGlzdCwgbGlzdC5wcmV2KGtleSkpO1xuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlQWZ0ZXIobGlzdCwga2V5KSB7XG4gICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGUobGlzdCwgbGlzdC5uZXh0KGtleSkpO1xuICAgIH1cbiAgICBzdGF0aWMgcG9wKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZUJlZm9yZShsaXN0LCBudWxsKTtcbiAgICB9XG4gICAgc3RhdGljIHNoaWZ0KGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZUFmdGVyKGxpc3QsIG51bGwpO1xuICAgIH1cbiAgICBzdGF0aWMgcmVtb3ZlKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHZhciBrZXkgPSBNdXRhYmxlTGlzdC5rZXlPZihsaXN0LCB2YWx1ZSk7XG4gICAgICAgIGlmIChrZXkgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgZGVsZXRlIChsaXN0LCBrZXkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgc3RhdGljIGNvbXBvc2UobGlzdCwgbGVucykge1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGVucy5nZXQobGlzdC5nZXQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGxpc3Quc2V0KGtleSwgbGVucy5zZXQobGlzdC5nZXQoa2V5KSwgdmFsdWUpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzcGxpY2UocHJldiwgbmV4dCwgLi4udmFsdWVzKSB7XG4gICAgICAgICAgICBsaXN0LnNwbGljZShwcmV2LCBuZXh0LCAuLi52YWx1ZXMubWFwKCh2YWwpID0+IGxlbnMuc2V0KG51bGwsIHZhbCkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGFzOiBsaXN0LmhhcyxcbiAgICAgICAgICAgIGdldCxcbiAgICAgICAgICAgIHNldCxcbiAgICAgICAgICAgIHNwbGljZSxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dCxcbiAgICAgICAgICAgIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZVxuICAgICAgICB9O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE11dGFibGVMaXN0O1xuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgY2xhc3MgU3ViamVjdCB7XG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyS2V5ID0gS2V5LmNyZWF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSA9IG9ic2VydmVyO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB1bnN1YnNjcmliZTogKCkgPT4geyBkZWxldGUgdGhpcy5fb2JzZXJ2ZXJzW29ic2VydmVyS2V5XTsgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5ub3RpZnkgPSAobm90aWZpZXIpID0+IHtcbiAgICAgICAgICAgIGZvciAodmFyIG9ic2VydmVyS2V5IGluIHRoaXMuX29ic2VydmVycylcbiAgICAgICAgICAgICAgICBub3RpZmllcih0aGlzLl9vYnNlcnZlcnNbb2JzZXJ2ZXJLZXldKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZUNhY2hlIGV4dGVuZHMgQ2FjaGUge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgc3VwZXIobGlzdCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25JbnZhbGlkYXRlID0gKHByZXYsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICBrZXkgPSBwcmV2O1xuICAgICAgICAgICAgd2hpbGUgKChrZXkgPSB0aGlzLl9uZXh0W2tleV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbmV4dFt0aGlzLl9wcmV2W2tleV1dO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2W2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBuZXh0KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYnlLZXlba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdoaWxlICgoa2V5ID0gdGhpcy5fcHJldltrZXldKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByZXZbdGhpcy5fbmV4dFtrZXldXTtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbmV4dFtrZXldO1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gcHJldilcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2J5S2V5W2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxpc3Qub2JzZXJ2ZSh0aGlzKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYnNlcnZhYmxlQ2FjaGU7XG4iLCJpbXBvcnQgSW5kZXggZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlSW5kZXggZXh0ZW5kcyBJbmRleCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICBzdXBlcihsaXN0KTtcbiAgICAgICAgdGhpcy5oYXMgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgbmV4dCwgbGFzdCA9IHRoaXMuX2J5SW5kZXgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHdoaWxlIChsYXN0ICE9IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuX2xpc3QubmV4dCh0aGlzLl9ieUluZGV4W2xhc3RdKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fYnlJbmRleFsrK2xhc3RdID0gbmV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLl9ieUtleVtuZXh0XSA9IGxhc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkludmFsaWRhdGUgPSAocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgdmFyIHByZXZJbmRleCA9IHRoaXMuX2J5S2V5W3ByZXZdLCBsZW5ndGggPSB0aGlzLl9ieUluZGV4Lmxlbmd0aCwgaW5kZXggPSBwcmV2SW5kZXg7XG4gICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aClcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYnlLZXlbdGhpcy5fYnlJbmRleFtpbmRleF1dO1xuICAgICAgICAgICAgdGhpcy5fYnlJbmRleC5zcGxpY2UocHJldkluZGV4ICsgMSk7XG4gICAgICAgICAgICB0aGlzLl9zdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUocHJldkluZGV4LCBudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ieUtleSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBsaXN0Lm9ic2VydmUodGhpcyk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZUluZGV4O1xuIiwiaW1wb3J0IEtleUJ5IGZyb20gJy4va2V5X2J5JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVLZXlCeSBleHRlbmRzIEtleUJ5IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0LCBrZXlGbikge1xuICAgICAgICBzdXBlcihsaXN0LCBrZXlGbik7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25JbnZhbGlkYXRlID0gKHByZXYsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZSh0aGlzLl9rZXlCeVNvdXJjZUtleVtwcmV2XSwgdGhpcy5fa2V5QnlTb3VyY2VLZXlbbmV4dF0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBsaXN0Lm9ic2VydmUodGhpcyk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZUtleUJ5O1xuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IE9ic2VydmFibGVDYWNoZSBmcm9tICcuL29ic2VydmFibGVfY2FjaGUnO1xuaW1wb3J0IE9ic2VydmFibGVJbmRleCBmcm9tICcuL29ic2VydmFibGVfaW5kZXgnO1xuaW1wb3J0IE9ic2VydmFibGVLZXlCeSBmcm9tICcuL29ic2VydmFibGVfa2V5X2J5JztcbjtcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlTGlzdCBleHRlbmRzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgc3VwZXIobGlzdCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJldmVyc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnJldmVyc2UodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1hcCA9IChtYXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5tYXAodGhpcywgbWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSAoZmlsdGVyRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmlsdGVyKHRoaXMsIGZpbHRlckZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdHRlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmxhdHRlbih0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdE1hcCA9IChmbGF0TWFwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmxhdE1hcCh0aGlzLCBmbGF0TWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWNoZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuY2FjaGUodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluZGV4ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5pbmRleCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua2V5QnkgPSAoa2V5Rm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3Qua2V5QnkodGhpcywga2V5Rm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy56aXAgPSAob3RoZXIsIHppcEZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnppcCh0aGlzLCBvdGhlciwgemlwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5za2lwID0gKGspID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3Quc2tpcCh0aGlzLCBrKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFrZSA9IChuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnRha2UodGhpcywgbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJhbmdlID0gKGssIG4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QucmFuZ2UodGhpcywgaywgbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNjYW4gPSAoc2NhbkZuLCBtZW1vKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnNjYW4odGhpcywgc2NhbkZuLCBtZW1vKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0ICE9IG51bGwpXG4gICAgICAgICAgICB0aGlzLm9ic2VydmUgPSBsaXN0Lm9ic2VydmU7XG4gICAgfVxuICAgIHN0YXRpYyBpc09ic2VydmFibGVMaXN0KG9iaikge1xuICAgICAgICByZXR1cm4gTGlzdC5pc0xpc3Qob2JqKSAmJiAhIW9ialsnb2JzZXJ2ZSddO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlTGlzdCh7XG4gICAgICAgICAgICBoYXM6IGxpc3QuaGFzLFxuICAgICAgICAgICAgZ2V0OiBsaXN0LmdldCxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dCxcbiAgICAgICAgICAgIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJldmVyc2UobGlzdCkge1xuICAgICAgICB2YXIgeyBoYXMsIGdldCwgcHJldiwgbmV4dCB9ID0gTGlzdC5yZXZlcnNlKGxpc3QpO1xuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5vYnNlcnZlKHtcbiAgICAgICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShuZXh0LCBwcmV2KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgbWFwKGxpc3QsIG1hcEZuKSB7XG4gICAgICAgIHZhciB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH0gPSBMaXN0Lm1hcChsaXN0LCBtYXBGbik7XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0LCBvYnNlcnZlOiBsaXN0Lm9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZpbHRlcihsaXN0LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgeyBoYXMsIGdldCwgcHJldiwgbmV4dCB9ID0gTGlzdC5maWx0ZXIobGlzdCwgZmlsdGVyRm4pO1xuICAgICAgICBmdW5jdGlvbiBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5vYnNlcnZlKHtcbiAgICAgICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwLCBuKSB7XG4gICAgICAgICAgICAgICAgICAgIHAgPSBoYXMocCkgPyBwIDogcHJldihwKTtcbiAgICAgICAgICAgICAgICAgICAgbiA9IGhhcyhuKSA/IG4gOiBuZXh0KG4pO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUocCwgbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQsIG9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZsYXR0ZW4obGlzdCkge1xuICAgICAgICB2YXIgY2FjaGU7XG4gICAgICAgIHZhciBzdWJzY3JpcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgb25JbnZhbGlkYXRlOiBmdW5jdGlvbiAocHJldiwgbmV4dCkge1xuICAgICAgICAgICAgICAgIHZhciBrZXk7XG4gICAgICAgICAgICAgICAga2V5ID0gcHJldjtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGtleSA9IGNhY2hlLm5leHQoa2V5KSkgIT0gbnVsbCAmJiBrZXkgIT0gbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdWJzY3JpcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAga2V5ID0gbmV4dDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoKGtleSA9IGNhY2hlLnByZXYoa2V5KSkgIT0gbnVsbCAmJiBrZXkgIT0gcHJldikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3Vic2NyaXB0aW9uID0gc3Vic2NyaXB0aW9uc1trZXldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBzdWJzY3JpcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBjYWNoZSA9IE9ic2VydmFibGVMaXN0LmNhY2hlKE9ic2VydmFibGVMaXN0Lm1hcChsaXN0LCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgc3Vic2NyaXB0aW9uc1trZXldID0gdmFsdWUub2JzZXJ2ZSh7XG4gICAgICAgICAgICAgICAgb25JbnZhbGlkYXRlOiBmdW5jdGlvbiAocHJldiwgbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHJldktleSwgbmV4dEtleSwgcHJldlBhdGggPSBQYXRoLmFwcGVuZChrZXksIHByZXYpLCBuZXh0UGF0aCA9IFBhdGguYXBwZW5kKGtleSwgbmV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2UGF0aCA9IFRyZWUucHJldihsaXN0LCBUcmVlLm5leHQobGlzdCwgcHJldlBhdGgpKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHRQYXRoID0gVHJlZS5uZXh0KGxpc3QsIFRyZWUucHJldihsaXN0LCBuZXh0UGF0aCkpO1xuICAgICAgICAgICAgICAgICAgICBwcmV2S2V5ID0gUGF0aC5rZXkocHJldlBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0S2V5ID0gUGF0aC5rZXkobmV4dFBhdGgpO1xuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2S2V5LCBuZXh0S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0pKTtcbiAgICAgICAgY2FjaGUub2JzZXJ2ZSh7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZLZXkgPSBQYXRoLmtleShUcmVlLnByZXYobGlzdCwgW3ByZXZdKSksIG5leHRLZXkgPSBQYXRoLmtleShUcmVlLm5leHQobGlzdCwgW25leHRdKSk7XG4gICAgICAgICAgICAgICAgc3ViamVjdC5ub3RpZnkoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2S2V5LCBuZXh0S2V5KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB7IGhhcywgZ2V0LCBuZXh0LCBwcmV2IH0gPSBMaXN0LmZsYXR0ZW4oY2FjaGUpO1xuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgbmV4dCwgcHJldiwgb2JzZXJ2ZTogc3ViamVjdC5vYnNlcnZlIH07XG4gICAgfVxuICAgIHN0YXRpYyBmbGF0TWFwKGxpc3QsIGZsYXRNYXBGbikge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuZmxhdHRlbihPYnNlcnZhYmxlTGlzdC5tYXAobGlzdCwgZmxhdE1hcEZuKSk7XG4gICAgfVxuICAgIHN0YXRpYyBjYWNoZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZUNhY2hlKGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgaW5kZXgobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVJbmRleChsaXN0KTtcbiAgICB9XG4gICAgc3RhdGljIGtleUJ5KGxpc3QsIGtleUZuKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZUtleUJ5KGxpc3QsIGtleUZuKTtcbiAgICB9XG4gICAgc3RhdGljIHppcChsaXN0LCBvdGhlciwgemlwRm4pIHtcbiAgICAgICAgbGlzdCA9IE9ic2VydmFibGVMaXN0LmluZGV4KGxpc3QpO1xuICAgICAgICBvdGhlciA9IE9ic2VydmFibGVMaXN0LmluZGV4KG90aGVyKTtcbiAgICAgICAgZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QuaGFzKGtleSkgJiYgb3RoZXIuaGFzKGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhrZXkpID8gemlwRm4obGlzdC5nZXQoa2V5KSwgb3RoZXIuZ2V0KGtleSkpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IGxpc3QucHJldihrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIHByZXYgIT0gbnVsbCAmJiBwcmV2ID09IG90aGVyLnByZXYoa2V5KSA/IHByZXYgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICB2YXIgbmV4dCA9IGxpc3QubmV4dChrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIG5leHQgIT0gbnVsbCAmJiBuZXh0ID09IG90aGVyLm5leHQoa2V5KSA/IG5leHQgOiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdWJqZWN0ID0gbmV3IFN1YmplY3QoKSwgb2JzZXJ2ZXIgPSB7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgc3ViamVjdC5ub3RpZnkoZnVuY3Rpb24gKF9vYnNlcnZlcikge1xuICAgICAgICAgICAgICAgICAgICBfb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHByZXYsIG5leHQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBsaXN0Lm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgICAgICBvdGhlci5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQsIG9ic2VydmU6IHN1YmplY3Qub2JzZXJ2ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgc2tpcChsaXN0LCBrKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgdGFrZShsaXN0LCBuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IDwgbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByYW5nZShsaXN0LCBrLCBuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGsgJiYga2V5IDwgbiArIGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgc2NhbihsaXN0LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIHsgaGFzLCBwcmV2LCBuZXh0IH0gPSBsaXN0LCBzY2FuTGlzdDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgdmFyIHByZXYgPSBzY2FuTGlzdC5wcmV2KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gc2NhbkZuKHByZXYgIT0gbnVsbCA/IHNjYW5MaXN0LmdldChwcmV2KSA6IG1lbW8sIGxpc3QuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgICAgIG9uSW52YWxpZGF0ZTogZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHByZXYsIG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHNjYW5MaXN0ID0gT2JzZXJ2YWJsZUxpc3QuY2FjaGUoeyBoYXMsIGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSB9KTtcbiAgICAgICAgcmV0dXJuIHNjYW5MaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGVMaXN0O1xuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG47XG5leHBvcnQgdmFyIFBhdGg7XG4oZnVuY3Rpb24gKFBhdGgpIHtcbiAgICBmdW5jdGlvbiBrZXkocGF0aCkge1xuICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocGF0aCk7XG4gICAgfVxuICAgIFBhdGgua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2Uoa2V5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBQYXRoLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBoZWFkKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPyBwYXRoWzBdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5oZWFkID0gaGVhZDtcbiAgICBmdW5jdGlvbiBnZXQocGF0aCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGhbaW5kZXhdO1xuICAgIH1cbiAgICBQYXRoLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiB0YWlsKHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IFtdIDogcGF0aC5zbGljZSgxLCBwYXRoLmxlbmd0aCk7XG4gICAgfVxuICAgIFBhdGgudGFpbCA9IHRhaWw7XG4gICAgZnVuY3Rpb24gYXBwZW5kKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIFtdLmNvbmNhdChhKS5jb25jYXQoYik7XG4gICAgfVxuICAgIFBhdGguYXBwZW5kID0gYXBwZW5kO1xufSkoUGF0aCB8fCAoUGF0aCA9IHt9KSk7XG5leHBvcnQgdmFyIFRyZWU7XG4oZnVuY3Rpb24gKFRyZWUpIHtcbiAgICBmdW5jdGlvbiBoYXMobGlzdCwgcGF0aCwgZGVwdGggPSBJbmZpbml0eSkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguaGVhZChwYXRoKSwgdGFpbCA9IFBhdGgudGFpbChwYXRoKTtcbiAgICAgICAgcmV0dXJuIGxpc3QuaGFzKGhlYWQpICYmICh0YWlsLmxlbmd0aCA9PSAwIHx8IGRlcHRoID09IDAgfHwgVHJlZS5oYXMobGlzdC5nZXQoaGVhZCksIHRhaWwsIGRlcHRoKSk7XG4gICAgfVxuICAgIFRyZWUuaGFzID0gaGFzO1xuICAgIGZ1bmN0aW9uIGdldChsaXN0LCBwYXRoLCBkZXB0aCA9IEluZmluaXR5KSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpO1xuICAgICAgICBpZiAoIWxpc3QuaGFzKGhlYWQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgdmFsdWUgPSBsaXN0LmdldChoZWFkKTtcbiAgICAgICAgaWYgKHRhaWwubGVuZ3RoID09IDAgfHwgZGVwdGggPT0gMClcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIFRyZWUuZ2V0KHZhbHVlLCB0YWlsLCBkZXB0aCk7XG4gICAgfVxuICAgIFRyZWUuZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHByZXYobGlzdCwgcGF0aCA9IFtdLCBkZXB0aCA9IEluZmluaXR5KSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpLCBrZXkgPSBoZWFkLCB2YWx1ZTtcbiAgICAgICAgaWYgKGhlYWQgIT0gbnVsbCAmJiAhbGlzdC5oYXMoaGVhZCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhbHVlID0gbGlzdC5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmICghTGlzdC5pc0xpc3QodmFsdWUpIHx8IGRlcHRoID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwgJiYga2V5ICE9IGhlYWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2UGF0aCA9IFRyZWUucHJldih2YWx1ZSwgdGFpbCwgZGVwdGggLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldlBhdGggIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBhdGguYXBwZW5kKGtleSwgcHJldlBhdGgpO1xuICAgICAgICAgICAgICAgIHRhaWwgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKGtleSA9IGxpc3QucHJldihrZXkpKSAhPSBudWxsKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KGxpc3QsIHBhdGggPSBbXSwgZGVwdGggPSBJbmZpbml0eSkge1xuICAgICAgICB2YXIgaGVhZCA9IFBhdGguaGVhZChwYXRoKSwgdGFpbCA9IFBhdGgudGFpbChwYXRoKSwga2V5ID0gaGVhZCwgdmFsdWU7XG4gICAgICAgIGlmIChoZWFkICE9IG51bGwgJiYgIWxpc3QuaGFzKGhlYWQpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpc3QuZ2V0KGtleSk7XG4gICAgICAgICAgICBpZiAoIUxpc3QuaXNMaXN0KHZhbHVlKSB8fCBkZXB0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSAhPSBudWxsICYmIGtleSAhPSBoZWFkKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV4dFBhdGggPSBUcmVlLm5leHQodmFsdWUsIHRhaWwsIGRlcHRoIC0gMSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRQYXRoICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXRoLmFwcGVuZChrZXksIG5leHRQYXRoKTtcbiAgICAgICAgICAgICAgICB0YWlsID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbCk7XG4gICAgfVxuICAgIFRyZWUubmV4dCA9IG5leHQ7XG59KShUcmVlIHx8IChUcmVlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFRyZWU7XG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IHsgTXV0YWJsZUxpc3QgfSBmcm9tICcuL211dGFibGVfbGlzdCc7XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVbml0IGV4dGVuZHMgTXV0YWJsZUxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKHZhbHVlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tleSA9PSBrZXk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tleTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9rZXkgPSBrZXk7XG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faW52YWxpZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNwbGljZSA9IChwcmV2LCBuZXh0LCAuLi52YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldChLZXkuY3JlYXRlKCksIHZhbHVlc1swXSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fa2V5O1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ZhbHVlO1xuICAgICAgICAgICAgdGhpcy5faW52YWxpZGF0ZSgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9ic2VydmUgPSAob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0Lm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9pbnZhbGlkYXRlID0gKHByZXYsIG5leHQpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2LCBuZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGgpXG4gICAgICAgICAgICB0aGlzLnNwbGljZShudWxsLCBudWxsLCB2YWx1ZSk7XG4gICAgfVxufVxuIiwiLy8gQnVpbGQgdXBvbiB0aGUgSUxpc3Qgc3RhbmRhcmQgZnJvbSBTb25pY1xuLy8gaW1wb3J0IHtJTGlzdH0gZnJvbSAnLi4vLi4vc29uaWMvZGlzdC9saXN0LmQnO1xuLy8gaW1wb3J0IElkIGZyb20gJy4uLy4uL3NvbmljL2Rpc3Qva2V5LmQnO1xuLy8gaW1wb3J0IHtJTGVuc30gZnJvbSAnLi9sZW5zZXMnO1xuLy8gaW1wb3J0IF9GZXRjaGFibGUgZnJvbSAnLi9mZXRjaGFibGUnO1xuaW1wb3J0IF9SZWNvcmQgZnJvbSAnLi9yZWNvcmQnO1xuaW1wb3J0IF9PYnNlcnZhYmxlUmVjb3JkIGZyb20gJy4vb2JzZXJ2YWJsZV9yZWNvcmQnO1xuaW1wb3J0IF9NdXRhYmxlUmVjb3JkIGZyb20gJy4vbXV0YWJsZV9yZWNvcmQnO1xuaW1wb3J0IF9TaW1wbGVSZWNvcmQgZnJvbSAnLi9zaW1wbGVfcmVjb3JkJztcbmltcG9ydCBfQ29sbGVjdGlvbiBmcm9tICcuL2NvbGxlY3Rpb24nO1xuaW1wb3J0IHsgWEhSIGFzIF9YSFIgfSBmcm9tICcuL3hocic7XG5mdW5jdGlvbiBLbnVja2xlcyhrZXksIHZhbHVlKSB7XG4gICAgLy8gaWYgKGFyZ3VtZW50cy5sZW5ndGggPT0gMikgcmV0dXJuIEtudWNrbGVzLnNldChrZXksIHZhbHVlKTtcbiAgICAvLyBlbHNlIHJldHVybiBLbnVja2xlcy5nZXQoa2V5KTtcbn1cbjtcbnZhciBLbnVja2xlcztcbihmdW5jdGlvbiAoS251Y2tsZXMpIHtcbiAgICBLbnVja2xlcy5SZWNvcmQgPSBfUmVjb3JkO1xuICAgIEtudWNrbGVzLk9ic2VydmFibGVSZWNvcmQgPSBfT2JzZXJ2YWJsZVJlY29yZDtcbiAgICBLbnVja2xlcy5NdXRhYmxlUmVjb3JkID0gX011dGFibGVSZWNvcmQ7XG4gICAgS251Y2tsZXMuU2ltcGxlUmVjb3JkID0gX1NpbXBsZVJlY29yZDtcbiAgICBLbnVja2xlcy5Db2xsZWN0aW9uID0gX0NvbGxlY3Rpb247XG4gICAgS251Y2tsZXMuWEhSID0gX1hIUjtcbn0pKEtudWNrbGVzIHx8IChLbnVja2xlcyA9IHt9KSk7XG5tb2R1bGUuZXhwb3J0cyA9IEtudWNrbGVzO1xuIl19
