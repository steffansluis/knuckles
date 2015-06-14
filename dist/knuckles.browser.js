(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Knuckles = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

// import _Knuckle          from './knuckle';
// import _RemoteRecord     from './remote_record';
// import _XHRRecord        from './xhr';
function Knuckles(key, value) {}
;
var Knuckles;
(function (Knuckles) {
    Knuckles.Record = _record2['default'];
    Knuckles.ObservableRecord = _observable_record2['default'];
    Knuckles.MutableRecord = _mutable_record2['default'];
    Knuckles.SimpleRecord = _simple_record2['default'];
})(Knuckles || (Knuckles = {}));
module.exports = Knuckles;

// if (arguments.length == 2) return Knuckles.set(key, value);
// else return Knuckles.get(key);

},{"./mutable_record":2,"./observable_record":3,"./record":4,"./simple_record":5}],2:[function(require,module,exports){
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

},{"../node_modules/sonic/dist/mutable_list":14,"./observable_record":3}],3:[function(require,module,exports){
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
                onInvalidate: function onInvalidate(key) {
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

},{"../node_modules/sonic/dist/observable_list":19,"../node_modules/sonic/dist/unit":21,"./record":4}],4:[function(require,module,exports){
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

},{"../node_modules/sonic/dist/factory":9,"../node_modules/sonic/dist/list":13}],5:[function(require,module,exports){
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

},{"../node_modules/sonic/dist/observable":15,"./mutable_record":2}],6:[function(require,module,exports){
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

},{"./mutable_list":14,"./observable":15}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{"./array_list":6,"./list":13,"./mutable_list":14,"./observable_list":19,"./unit":21}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{"./async_list":7,"./cache":8,"./index":10,"./key_by":12,"./tree":20}],14:[function(require,module,exports){
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

},{"./observable_list":19}],15:[function(require,module,exports){
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

},{"./key":11}],16:[function(require,module,exports){
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

},{"./cache":8}],17:[function(require,module,exports){
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

},{"./index":10,"./observable":15}],18:[function(require,module,exports){
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

},{"./key_by":12,"./observable":15}],19:[function(require,module,exports){
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

},{"./list":13,"./observable":15,"./observable_cache":16,"./observable_index":17,"./observable_key_by":18,"./tree":20}],20:[function(require,module,exports){
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

},{"./list":13}],21:[function(require,module,exports){
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

},{"./key":11,"./mutable_list":14,"./observable":15}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvZGlzdC9rbnVja2xlcy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9kaXN0L211dGFibGVfcmVjb3JkLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL2Rpc3Qvb2JzZXJ2YWJsZV9yZWNvcmQuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvZGlzdC9yZWNvcmQuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvZGlzdC9zaW1wbGVfcmVjb3JkLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2FycmF5X2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvYXN5bmNfbGlzdC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9jYWNoZS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9mYWN0b3J5LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2luZGV4LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2tleS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9rZXlfYnkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvbGlzdC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9tdXRhYmxlX2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlX2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfaW5kZXguanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZV9rZXlfYnkuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZV9saXN0LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3RyZWUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvdW5pdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FDS0EsWUFBWSxDQUFDOztBQUViLFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFB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LE9BQU8sR0FBRyxVQUFDLFFBQVEsRUFBSztBQUN6QixtQkFBTyxNQUFLLFFBQVEsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUMsQ0FBQztBQUNGLFlBQUksQ0FBQyxXQUFXLEdBQUcsVUFBQyxJQUFJLEVBQUUsSUFBSSxFQUFLO0FBQy9CLGtCQUFLLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBVSxRQUFRLEVBQUU7QUFDckMsd0JBQVEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3JDLENBQUMsQ0FBQztTQUNOLENBQUM7QUFDRixZQUFJLENBQUMsUUFBUSxHQUFHLGdCQTFDZixPQUFPLEVBMENxQixDQUFDO0FBQzlCLFlBQUksU0FBUyxDQUFDLE1BQU0sRUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3RDOztjQTNDZ0IsSUFBSTs7V0FBSixJQUFJO2lCQURoQixXQUFXOztxQkFDQyxJQUFJIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIi8vIEJ1aWxkIHVwb24gdGhlIElMaXN0IHN0YW5kYXJkIGZyb20gU29uaWNcbi8vIGltcG9ydCB7SUxpc3R9IGZyb20gJy4uLy4uL3NvbmljL2Rpc3QvbGlzdC5kJztcbi8vIGltcG9ydCBJZCBmcm9tICcuLi8uLi9zb25pYy9kaXN0L2tleS5kJztcbi8vIGltcG9ydCB7SUxlbnN9IGZyb20gJy4vbGVuc2VzJztcbi8vIGltcG9ydCBfRmV0Y2hhYmxlIGZyb20gJy4vZmV0Y2hhYmxlJztcbmltcG9ydCBfUmVjb3JkIGZyb20gJy4vcmVjb3JkJztcbmltcG9ydCBfT2JzZXJ2YWJsZVJlY29yZCBmcm9tICcuL29ic2VydmFibGVfcmVjb3JkJztcbmltcG9ydCBfTXV0YWJsZVJlY29yZCBmcm9tICcuL211dGFibGVfcmVjb3JkJztcbmltcG9ydCBfU2ltcGxlUmVjb3JkIGZyb20gJy4vc2ltcGxlX3JlY29yZCc7XG4vLyBpbXBvcnQgX0tudWNrbGUgICAgICAgICAgZnJvbSAnLi9rbnVja2xlJztcbi8vIGltcG9ydCBfUmVtb3RlUmVjb3JkICAgICBmcm9tICcuL3JlbW90ZV9yZWNvcmQnO1xuLy8gaW1wb3J0IF9YSFJSZWNvcmQgICAgICAgIGZyb20gJy4veGhyJztcbmZ1bmN0aW9uIEtudWNrbGVzKGtleSwgdmFsdWUpIHtcbiAgICAvLyBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gS251Y2tsZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIC8vIGVsc2UgcmV0dXJuIEtudWNrbGVzLmdldChrZXkpO1xufVxuO1xudmFyIEtudWNrbGVzO1xuKGZ1bmN0aW9uIChLbnVja2xlcykge1xuICAgIEtudWNrbGVzLlJlY29yZCA9IF9SZWNvcmQ7XG4gICAgS251Y2tsZXMuT2JzZXJ2YWJsZVJlY29yZCA9IF9PYnNlcnZhYmxlUmVjb3JkO1xuICAgIEtudWNrbGVzLk11dGFibGVSZWNvcmQgPSBfTXV0YWJsZVJlY29yZDtcbiAgICBLbnVja2xlcy5TaW1wbGVSZWNvcmQgPSBfU2ltcGxlUmVjb3JkO1xufSkoS251Y2tsZXMgfHwgKEtudWNrbGVzID0ge30pKTtcbm1vZHVsZS5leHBvcnRzID0gS251Y2tsZXM7XG4iLCJpbXBvcnQgeyBPYnNlcnZhYmxlUmVjb3JkIH0gZnJvbSAnLi9vYnNlcnZhYmxlX3JlY29yZCc7XG5pbXBvcnQgeyBNdXRhYmxlTGlzdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L211dGFibGVfbGlzdCc7XG47XG5leHBvcnQgY2xhc3MgTXV0YWJsZVJlY29yZCBleHRlbmRzIE9ic2VydmFibGVSZWNvcmQge1xuICAgIGNvbnN0cnVjdG9yKHJlY29yZCkge1xuICAgICAgICBzdXBlcihyZWNvcmQpO1xuICAgICAgICBpZiAocmVjb3JkICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0ID0gcmVjb3JkLnNldDtcbiAgICAgICAgICAgIHRoaXMuZGVsZXRlID0gcmVjb3JkLmRlbGV0ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIGRlbGV0ZShrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICB6b29tKGtleSkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKE11dGFibGVSZWNvcmQuem9vbSh0aGlzLCBrZXkpKTtcbiAgICB9XG4gICAgLy8gY29tcG9zZTxXPihsZW5zOiBJTGVuczxWLFc+KTogTXV0YWJsZVJlY29yZDxXPiB7XG4gICAgLy8gICByZXR1cm4gTXV0YWJsZVJlY29yZC5jcmVhdGU8Vz4oTXV0YWJsZVJlY29yZC5jb21wb3NlPFYsVz4odGhpcywgbGVucykpO1xuICAgIC8vIH1cbiAgICBzdGF0aWMgY3JlYXRlKHJlY29yZCkge1xuICAgICAgICByZXR1cm4gbmV3IE11dGFibGVSZWNvcmQocmVjb3JkKTtcbiAgICB9XG4gICAgc3RhdGljIHpvb20ocmVjb3JkLCBrZXkpIHtcbiAgICAgICAgdmFyIHVuaXQgPSBPYnNlcnZhYmxlUmVjb3JkLnpvb20ocmVjb3JkLCBrZXkpO1xuICAgICAgICBmdW5jdGlvbiBzZXQoX2tleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChfa2V5ID09IGtleSlcbiAgICAgICAgICAgICAgICByZWNvcmQuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNwbGljZShwcmV2LCBuZXh0LCAuLi52YWx1ZXMpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZXMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJlY29yZC5zZXQoa2V5LCB2YWx1ZXNbMF0pO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIHJlY29yZC5kZWxldGUoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKHtcbiAgICAgICAgICAgIGhhczogdW5pdC5oYXMsXG4gICAgICAgICAgICBnZXQ6IHVuaXQuZ2V0LFxuICAgICAgICAgICAgcHJldjogdW5pdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogdW5pdC5uZXh0LFxuICAgICAgICAgICAgb2JzZXJ2ZTogdW5pdC5vYnNlcnZlLFxuICAgICAgICAgICAgc2V0OiBzZXQsXG4gICAgICAgICAgICBzcGxpY2U6IHNwbGljZVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBNdXRhYmxlUmVjb3JkO1xuIiwiaW1wb3J0IFVuaXQgZnJvbSAnLi4vbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvdW5pdCc7XG5pbXBvcnQgeyBSZWNvcmQgfSBmcm9tICcuL3JlY29yZCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlTGlzdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfbGlzdCc7XG47XG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZVJlY29yZCBleHRlbmRzIFJlY29yZCB7XG4gICAgY29uc3RydWN0b3IocmVjb3JkKSB7XG4gICAgICAgIHN1cGVyKHJlY29yZCk7XG4gICAgICAgIGlmIChyZWNvcmQgIT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSA9IHJlY29yZC5vYnNlcnZlO1xuICAgIH1cbiAgICBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICB9XG4gICAgem9vbShrZXkpIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlUmVjb3JkLnpvb20odGhpcywga2V5KSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUocmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZVJlY29yZChyZWNvcmQpO1xuICAgIH1cbiAgICBzdGF0aWMgem9vbShyZWNvcmQsIGtleSkge1xuICAgICAgICB2YXIgdW5pdCA9IG5ldyBVbml0KCk7XG4gICAgICAgIHJlY29yZC5nZXQoa2V5KS50aGVuKCh2YWx1ZSkgPT4gdW5pdC5zZXQoa2V5LCB2YWx1ZSkpO1xuICAgICAgICByZWNvcmQub2JzZXJ2ZSh7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgICAgICByZWNvcmQuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHZhbHVlKSA9PiB1bml0LnNldChrZXksIHZhbHVlKSlcbiAgICAgICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHVuaXQuc3BsaWNlKG51bGwsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUodW5pdCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZVJlY29yZDtcbiIsImltcG9ydCB7IExpc3QgfSBmcm9tICcuLi9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9saXN0JztcbmltcG9ydCB7IGZyb21Qcm9taXNlIH0gZnJvbSAnLi4vbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvZmFjdG9yeSc7XG5leHBvcnQgY2xhc3MgUmVjb3JkIHtcbiAgICBjb25zdHJ1Y3RvcihyZWNvcmQpIHtcbiAgICAgICAgaWYgKHJlY29yZCAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmdldCA9IHJlY29yZC5nZXQ7XG4gICAgICAgICAgICB0aGlzLmhhcyA9IHJlY29yZC5oYXM7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaGFzKGtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgfVxuICAgIGdldChrZXkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgIH1cbiAgICB6b29tKGtleSkge1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoUmVjb3JkLnpvb20odGhpcywga2V5KSk7XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUocmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVjb3JkKHJlY29yZCk7XG4gICAgfVxuICAgIHN0YXRpYyB6b29tKHJlY29yZCwga2V5KSB7XG4gICAgICAgIHZhciB1bml0ID0gZnJvbVByb21pc2UocmVjb3JkLmdldChrZXkpKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGhhczogdW5pdC5oYXMsXG4gICAgICAgICAgICBnZXQ6IHVuaXQuZ2V0LFxuICAgICAgICAgICAgcHJldjogdW5pdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogdW5pdC5uZXh0XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgUmVjb3JkO1xuIiwiaW1wb3J0IHsgTXV0YWJsZVJlY29yZCB9IGZyb20gJy4vbXV0YWJsZV9yZWNvcmQnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGUnO1xuZXhwb3J0IGNsYXNzIFNpbXBsZVJlY29yZCBleHRlbmRzIE11dGFibGVSZWNvcmQge1xuICAgIGNvbnN0cnVjdG9yKG9iamVjdCkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgIH1cbiAgICBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICByZXNvbHZlKGtleSBpbiB0aGlzLl9vYmplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAga2V5IGluIHRoaXMuX29iamVjdCA/IHJlc29sdmUodGhpcy5fb2JqZWN0W2tleV0pIDogcmVqZWN0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBvYnNlcnZlKG9ic2VydmVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0Lm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgIH1cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShrZXkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXNvbHZlKGtleSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBkZWxldGUoa2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIShrZXkgaW4gdGhpcy5fb2JqZWN0KSlcbiAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuX29iamVjdFtrZXldO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX29iamVjdFtrZXldO1xuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKGtleSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJlc29sdmUodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBTaW1wbGVSZWNvcmQ7XG4iLCJpbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCB7IE11dGFibGVMaXN0IH0gZnJvbSAnLi9tdXRhYmxlX2xpc3QnO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQXJyYXlMaXN0IGV4dGVuZHMgTXV0YWJsZUxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGFycmF5ID0gW10pIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oYXMgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ICE9IG51bGwgJiYgLTEgPCBrZXkgJiYga2V5IDwgdGhpcy5fYXJyYXkubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcnJheVtrZXldO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IG51bGwgJiYgdGhpcy5fYXJyYXkubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcnJheS5sZW5ndGggLSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FycmF5Lmxlbmd0aCA+IDAgJiYga2V5ICE9IG51bGwgJiYgdGhpcy5oYXMoa2V5KSAmJiB0aGlzLmhhcyhrZXkgLSAxKSlcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5IC0gMTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5ID09IG51bGwgJiYgdGhpcy5fYXJyYXkubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2FycmF5Lmxlbmd0aCA+IDAgJiYga2V5ICE9IG51bGwgJiYgdGhpcy5oYXMoa2V5KSAmJiB0aGlzLmhhcyhrZXkgKyAxKSlcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5ICsgMTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICB0aGlzLl9hcnJheVtrZXldID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNwbGljZSA9IChwcmV2LCBuZXh0LCAuLi52YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIGlmIChwcmV2ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcHJldiA9IC0xO1xuICAgICAgICAgICAgZWxzZSBpZiAoIXRoaXMuaGFzKHByZXYpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChuZXh0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgbmV4dCA9IHRoaXMuX2FycmF5Lmxlbmd0aDtcbiAgICAgICAgICAgIGVsc2UgaWYgKCF0aGlzLmhhcyhuZXh0KSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLl9hcnJheS5zcGxpY2UocHJldiArIDEsIG5leHQgLSAocHJldiArIDEpLCAuLi52YWx1ZXMpO1xuICAgICAgICAgICAgdGhpcy5faW52YWxpZGF0ZShwcmV2LCBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5faW52YWxpZGF0ZSA9IChwcmV2LCBuZXh0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzKHByZXYpKVxuICAgICAgICAgICAgICAgIHByZXYgPSBudWxsO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhcyhuZXh0KSlcbiAgICAgICAgICAgICAgICBuZXh0ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2LCBuZXh0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IFN1YmplY3QoKTtcbiAgICAgICAgdGhpcy5fYXJyYXkgPSBhcnJheTtcbiAgICB9XG59XG4iLCJleHBvcnQgY2xhc3MgQXN5bmNMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0LCBzY2hlZHVsZXIpIHtcbiAgICAgICAgdGhpcy5oYXMgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLl9saXN0LmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzb2x2ZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhcyhrZXkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKGhhcyA9PiBoYXMgPyByZXNvbHZlKHRoaXMuX2xpc3QuZ2V0KGtleSkpIDogcmVqZWN0KCkpXG4gICAgICAgICAgICAgICAgICAgIC5jYXRjaChyZWplY3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc2NoZWR1bGVyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2xpc3QucHJldihrZXkpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocHJldiA9PiBwcmV2ICE9IG51bGwgPyByZXNvbHZlKHByZXYpIDogcmVqZWN0KCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NjaGVkdWxlcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFByb21pc2UucmVzb2x2ZSh0aGlzLl9saXN0Lm5leHQoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gcmVzb2x2ZShwcmV2KSA6IHJlamVjdCgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbGlzdCA9IGxpc3Q7XG4gICAgICAgIHRoaXMuX3NjaGVkdWxlciA9IHNjaGVkdWxlciB8fCB3aW5kb3cuc2V0VGltZW91dDtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgQXN5bmNMaXN0KGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgbWFwKGxpc3QsIG1hcEZuKSB7XG4gICAgICAgIHZhciB7IGhhcywgcHJldiwgbmV4dCB9ID0gbGlzdDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KGtleSkudGhlbihtYXBGbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBBc3luY0xpc3QoeyBoYXMsIGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBBc3luY0xpc3Q7XG4iLCJleHBvcnQgY2xhc3MgQ2FjaGUge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgdGhpcy5oYXMgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIHRoaXMuX2J5S2V5IHx8IHRoaXMuX2xpc3QuaGFzKGtleSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9ieUtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnlLZXlba2V5XTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9saXN0LmhhcyhrZXkpKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ieUtleVtrZXldID0gdGhpcy5fbGlzdC5nZXQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9wcmV2KVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wcmV2W2tleV07XG4gICAgICAgICAgICB2YXIgcHJldktleSA9IHRoaXMuX2xpc3QucHJldihrZXkpO1xuICAgICAgICAgICAgaWYgKHByZXZLZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICBwcmV2S2V5ID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZba2V5XSA9IHByZXZLZXk7XG4gICAgICAgICAgICB0aGlzLl9uZXh0W3ByZXZLZXldID0ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIHByZXZLZXk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubmV4dCA9IChrZXkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX25leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX25leHRba2V5XTtcbiAgICAgICAgICAgIHZhciBuZXh0S2V5ID0gdGhpcy5fbGlzdC5uZXh0KGtleSk7XG4gICAgICAgICAgICBpZiAobmV4dEtleSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIG5leHRLZXkgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fbmV4dFtrZXldID0gbmV4dEtleTtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZbbmV4dEtleV0gPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dEtleTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fYnlLZXkgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgdGhpcy5fbmV4dCA9IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICB0aGlzLl9wcmV2ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fbGlzdCA9IGxpc3Q7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgQ2FjaGU7XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7IE9ic2VydmFibGVMaXN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlX2xpc3QnO1xuaW1wb3J0IHsgTXV0YWJsZUxpc3QgfSBmcm9tICcuL211dGFibGVfbGlzdCc7XG5pbXBvcnQgVW5pdCBmcm9tICcuL3VuaXQnO1xuaW1wb3J0IEFycmF5TGlzdCBmcm9tICcuL2FycmF5X2xpc3QnO1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZmFjdG9yeShvYmopIHtcbiAgICBpZiAoTXV0YWJsZUxpc3QuaXNNdXRhYmxlTGlzdChvYmopKVxuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuY3JlYXRlKG9iaik7XG4gICAgaWYgKE9ic2VydmFibGVMaXN0LmlzT2JzZXJ2YWJsZUxpc3Qob2JqKSlcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShvYmopO1xuICAgIGlmIChMaXN0LmlzTGlzdChvYmopKVxuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUob2JqKTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShvYmopKVxuICAgICAgICByZXR1cm4gbmV3IEFycmF5TGlzdChvYmopO1xuICAgIHJldHVybiBVbml0LmNyZWF0ZShvYmopO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qcm9taXNlKHByb21pc2UpIHtcbiAgICB2YXIgdW5pdCA9IG5ldyBVbml0KCk7XG4gICAgcHJvbWlzZS50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICB1bml0LnB1c2godmFsdWUpO1xuICAgIH0pO1xuICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUodW5pdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUl0ZXJhdG9yKGl0ZXJhdG9yKSB7XG4gICAgdmFyIGxpc3QgPSB7XG4gICAgICAgIGhhczogZnVuY3Rpb24gKGtleSkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICBwcmV2OiBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBudWxsOyB9LFxuICAgICAgICBuZXh0OiBmdW5jdGlvbiAoa2V5KSB7IHJldHVybiBudWxsOyB9XG4gICAgfTtcbiAgICByZXR1cm4gbGlzdDtcbn1cbiIsImV4cG9ydCBjbGFzcyBJbmRleCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICB0aGlzLmhhcyA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9ieUluZGV4Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBuZXh0LCBsYXN0ID0gdGhpcy5fYnlJbmRleC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGxhc3QgIT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5fbGlzdC5uZXh0KHRoaXMuX2J5SW5kZXhbbGFzdF0pO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ieUluZGV4WysrbGFzdF0gPSBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oYXMoaW5kZXgpID8gdGhpcy5fbGlzdC5nZXQodGhpcy5fYnlJbmRleFtpbmRleF0pIDogdW5kZWZpbmVkO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhcyhpbmRleCAtIDEpKVxuICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCAtIDE7XG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gbnVsbCAmJiB0aGlzLl9ieUluZGV4Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYnlJbmRleC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubmV4dCA9IChpbmRleCA9IC0xKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMoaW5kZXggKyAxKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaW5kZXggKyAxO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2J5SW5kZXggPSBbXTtcbiAgICAgICAgdGhpcy5fbGlzdCA9IGxpc3Q7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgSW5kZXg7XG4iLCJ2YXIgS2V5O1xuKGZ1bmN0aW9uIChLZXkpIHtcbiAgICB2YXIgdW5pcXVlS2V5ID0gMDtcbiAgICBmdW5jdGlvbiBrZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgS2V5LmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHJldHVybiB1bmlxdWVLZXkrKztcbiAgICB9XG4gICAgS2V5LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKEtleSB8fCAoS2V5ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEtleTtcbiIsImV4cG9ydCBjbGFzcyBLZXlCeSB7XG4gICAgY29uc3RydWN0b3IobGlzdCwga2V5Rm4pIHtcbiAgICAgICAgdGhpcy5oYXMgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX3NvdXJjZUtleUJ5S2V5KVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgdmFyIGxhc3QgPSBudWxsO1xuICAgICAgICAgICAgd2hpbGUgKChsYXN0ID0gdGhpcy5uZXh0KGxhc3QpKSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIGlmIChsYXN0ID09IGtleSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGFzKGtleSkgPyB0aGlzLl9saXN0LmdldCh0aGlzLl9zb3VyY2VLZXlCeUtleVtrZXldKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzKGtleSkgfHwga2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2tleUJ5U291cmNlS2V5W3RoaXMuX2xpc3QucHJldih0aGlzLl9zb3VyY2VLZXlCeUtleVtrZXldKV07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubmV4dCA9IChrZXkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICB2YXIgc291cmNlS2V5LCBzb3VyY2VOZXh0LCByZXM7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX3NvdXJjZUtleUJ5S2V5KVxuICAgICAgICAgICAgICAgIHNvdXJjZUtleSA9IHRoaXMuX3NvdXJjZUtleUJ5S2V5W2tleV07XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgc291cmNlS2V5ID0gbnVsbDtcbiAgICAgICAgICAgIHdoaWxlIChrZXkgIT0gbnVsbCAmJiAhKGtleSBpbiB0aGlzLl9zb3VyY2VLZXlCeUtleSkpIHtcbiAgICAgICAgICAgICAgICBzb3VyY2VLZXkgPSB0aGlzLl9saXN0Lm5leHQoc291cmNlS2V5KTtcbiAgICAgICAgICAgICAgICBpZiAoIShzb3VyY2VLZXkgaW4gdGhpcy5fa2V5QnlTb3VyY2VLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzb3VyY2VLZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICByZXMgPSB0aGlzLl9rZXlGbih0aGlzLl9saXN0LmdldChzb3VyY2VLZXkpLCBzb3VyY2VLZXkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9rZXlCeVNvdXJjZUtleVtzb3VyY2VLZXldID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9zb3VyY2VLZXlCeUtleVtyZXNdID0gc291cmNlS2V5O1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzID09IGtleSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNvdXJjZUtleSA9IHRoaXMuX2xpc3QubmV4dChzb3VyY2VLZXkpO1xuICAgICAgICAgICAgaWYgKHNvdXJjZUtleSA9PSBudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgcmVzID0gdGhpcy5fa2V5Rm4odGhpcy5fbGlzdC5nZXQoc291cmNlS2V5KSwgc291cmNlS2V5KTtcbiAgICAgICAgICAgIHRoaXMuX2tleUJ5U291cmNlS2V5W3NvdXJjZUtleV0gPSByZXM7XG4gICAgICAgICAgICB0aGlzLl9zb3VyY2VLZXlCeUtleVtyZXNdID0gc291cmNlS2V5O1xuICAgICAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fbGlzdCA9IGxpc3Q7XG4gICAgICAgIHRoaXMuX2tleUZuID0ga2V5Rm47XG4gICAgICAgIHRoaXMuX3NvdXJjZUtleUJ5S2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fa2V5QnlTb3VyY2VLZXkgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEtleUJ5O1xuIiwiaW1wb3J0IHsgVHJlZSwgUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgSW5kZXggZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgS2V5QnkgZnJvbSAnLi9rZXlfYnknO1xuaW1wb3J0IHsgQXN5bmNMaXN0IH0gZnJvbSAnLi9hc3luY19saXN0JztcbmV4cG9ydCBjbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHRoaXMuaGFzID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmlyc3QgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5maXJzdCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5sYXN0ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QubGFzdCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mb3JFYWNoID0gKGZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5mb3JFYWNoKHRoaXMsIGZuKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZWR1Y2UgPSAoZm4sIG1lbW8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LnJlZHVjZSh0aGlzLCBmbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9BcnJheSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LnRvQXJyYXkodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmluZEtleSA9IChmbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmluZEtleSh0aGlzLCBmbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmluZCA9IChmbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmluZCh0aGlzLCBmbik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMua2V5T2YgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmtleU9mKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbmRleE9mID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5pbmRleE9mKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5rZXlBdCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3Qua2V5QXQodGhpcywgaW5kZXgpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmF0ID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5hdCh0aGlzLCBpbmRleCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZXZlcnkgPSAocHJlZGljYXRlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5ldmVyeSh0aGlzLCBwcmVkaWNhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNvbWUgPSAocHJlZGljYXRlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5zb21lKHRoaXMsIHByZWRpY2F0ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udGFpbnMgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNvbnRhaW5zKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXZlcnNlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QucmV2ZXJzZSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubWFwID0gKG1hcEZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5tYXAodGhpcywgbWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSAoZmlsdGVyRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmZpbHRlcih0aGlzLCBmaWx0ZXJGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZsYXR0ZW4gPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5mbGF0dGVuKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mbGF0TWFwID0gKGZsYXRNYXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuZmxhdE1hcCh0aGlzLCBmbGF0TWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWNoZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmNhY2hlKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbmRleCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmluZGV4KHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5rZXlCeSA9IChrZXlGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3Qua2V5QnkodGhpcywga2V5Rm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy56aXAgPSAob3RoZXIsIHppcEZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC56aXAodGhpcywgb3RoZXIsIHppcEZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2tpcCA9IChrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5za2lwKHRoaXMsIGspKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50YWtlID0gKG4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LnRha2UodGhpcywgbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJhbmdlID0gKGssIG4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LnJhbmdlKHRoaXMsIGssIG4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2FuID0gKHNjYW5GbiwgbWVtbykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3Quc2Nhbih0aGlzLCBzY2FuRm4sIG1lbW8pKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGxpc3QgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5oYXMgPSBsaXN0LmhhcztcbiAgICAgICAgICAgIHRoaXMuZ2V0ID0gbGlzdC5nZXQ7XG4gICAgICAgICAgICB0aGlzLnByZXYgPSBsaXN0LnByZXY7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBsaXN0Lm5leHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgO1xuICAgIHN0YXRpYyBpc0xpc3Qob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiAhIW9ialsnaGFzJ10gJiYgISFvYmpbJ2dldCddICYmICEhb2JqWydwcmV2J10gJiYgISFvYmpbJ25leHQnXTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgTGlzdCh7XG4gICAgICAgICAgICBoYXM6IGxpc3QuaGFzLFxuICAgICAgICAgICAgZ2V0OiBsaXN0LmdldCxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGZpcnN0KGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KGxpc3QubmV4dCgpKTtcbiAgICB9XG4gICAgc3RhdGljIGxhc3QobGlzdCkge1xuICAgICAgICByZXR1cm4gbGlzdC5nZXQobGlzdC5wcmV2KCkpO1xuICAgIH1cbiAgICBzdGF0aWMgZm9yRWFjaChsaXN0LCBmbikge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKVxuICAgICAgICAgICAgZm4obGlzdC5nZXQoa2V5KSwga2V5KTtcbiAgICB9XG4gICAgc3RhdGljIHJlZHVjZShsaXN0LCBmbiwgbWVtbykge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKVxuICAgICAgICAgICAgbWVtbyA9IGZuKG1lbW8sIGxpc3QuZ2V0KGtleSksIGtleSk7XG4gICAgICAgIHJldHVybiBtZW1vO1xuICAgIH1cbiAgICBzdGF0aWMgdG9BcnJheShsaXN0KSB7XG4gICAgICAgIHZhciBrZXksIGluZGV4ID0gMCwgYXJyYXkgPSBbXTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGFycmF5W2luZGV4KytdID0gbGlzdC5nZXQoa2V5KTtcbiAgICAgICAgcmV0dXJuIGFycmF5O1xuICAgIH1cbiAgICBzdGF0aWMgZmluZEtleShsaXN0LCBmbikge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKGZuKGxpc3QuZ2V0KGtleSksIGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG4gICAgc3RhdGljIGZpbmQobGlzdCwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KExpc3QuZmluZEtleShsaXN0LCBmbikpO1xuICAgIH1cbiAgICBzdGF0aWMga2V5T2YobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIExpc3QuZmluZEtleShsaXN0LCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIGluZGV4T2YobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGtleSwgaSA9IDA7XG4gICAgICAgIHdoaWxlICgoa2V5ID0gbGlzdC5uZXh0KGtleSkpICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsaXN0LmdldChrZXkpID09PSB2YWx1ZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgIH1cbiAgICBzdGF0aWMga2V5QXQobGlzdCwgaW5kZXgpIHtcbiAgICAgICAgdmFyIGtleSwgaSA9IDA7XG4gICAgICAgIHdoaWxlICgoa2V5ID0gbGlzdC5uZXh0KGtleSkpICE9IG51bGwpXG4gICAgICAgICAgICBpZiAoaSsrID09IGluZGV4KVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzdGF0aWMgYXQobGlzdCwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KExpc3Qua2V5QXQobGlzdCwgaW5kZXgpKTtcbiAgICB9XG4gICAgc3RhdGljIGV2ZXJ5KGxpc3QsIHByZWRpY2F0ZSkge1xuICAgICAgICB2YXIga2V5O1xuICAgICAgICB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKVxuICAgICAgICAgICAgaWYgKCFwcmVkaWNhdGUobGlzdC5nZXQoa2V5KSwga2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgc29tZShsaXN0LCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgd2hpbGUgKChrZXkgPSBsaXN0Lm5leHQoa2V5KSkgIT0gbnVsbClcbiAgICAgICAgICAgIGlmIChwcmVkaWNhdGUobGlzdC5nZXQoa2V5KSwga2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBzdGF0aWMgY29udGFpbnMobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIExpc3Quc29tZShsaXN0LCB2ID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgc3RhdGljIHJldmVyc2UobGlzdCkge1xuICAgICAgICB2YXIgeyBoYXMsIGdldCB9ID0gbGlzdDtcbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm5leHQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QucHJldihrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIHN0YXRpYyBtYXAobGlzdCwgbWFwRm4pIHtcbiAgICAgICAgdmFyIHsgaGFzLCBwcmV2LCBuZXh0IH0gPSBsaXN0O1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGtleSkgPyBtYXBGbihsaXN0LmdldChrZXkpLCBrZXkpIDogdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIHN0YXRpYyBmaWx0ZXIobGlzdCwgZmlsdGVyRm4pIHtcbiAgICAgICAgZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QuaGFzKGtleSkgJiYgZmlsdGVyRm4obGlzdC5nZXQoa2V5KSwga2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoaGFzKGtleSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KGtleSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0ga2V5O1xuICAgICAgICAgICAgd2hpbGUgKChwcmV2ID0gbGlzdC5wcmV2KHByZXYpKSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIGlmIChoYXMocHJldikpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0ga2V5O1xuICAgICAgICAgICAgd2hpbGUgKChuZXh0ID0gbGlzdC5uZXh0KG5leHQpKSAhPSBudWxsKVxuICAgICAgICAgICAgICAgIGlmIChoYXMobmV4dCkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgc3RhdGljIGZsYXR0ZW4obGlzdCkge1xuICAgICAgICBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgICAgICB2YXIgcGF0aCA9IFBhdGguY3JlYXRlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gVHJlZS5oYXMobGlzdCwgcGF0aCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgdmFyIHBhdGggPSBQYXRoLmNyZWF0ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFRyZWUuZ2V0KGxpc3QsIHBhdGgsIDEpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICB2YXIgcGF0aCA9IFBhdGguY3JlYXRlKGtleSk7XG4gICAgICAgICAgICByZXR1cm4gUGF0aC5rZXkoVHJlZS5wcmV2KGxpc3QsIHBhdGgsIDEpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgdmFyIHBhdGggPSBQYXRoLmNyZWF0ZShrZXkpO1xuICAgICAgICAgICAgcmV0dXJuIFBhdGgua2V5KFRyZWUubmV4dChsaXN0LCBwYXRoLCAxKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgc3RhdGljIGZsYXRNYXAobGlzdCwgZmxhdE1hcEZuKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZsYXR0ZW4oTGlzdC5tYXAobGlzdCwgZmxhdE1hcEZuKSk7XG4gICAgfVxuICAgIHN0YXRpYyBjYWNoZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgQ2FjaGUobGlzdCk7XG4gICAgfVxuICAgIHN0YXRpYyBpbmRleChsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgSW5kZXgobGlzdCk7XG4gICAgfVxuICAgIHN0YXRpYyBrZXlCeShsaXN0LCBrZXlGbikge1xuICAgICAgICByZXR1cm4gbmV3IEtleUJ5KGxpc3QsIGtleUZuKTtcbiAgICB9XG4gICAgc3RhdGljIHppcChsaXN0LCBvdGhlciwgemlwRm4pIHtcbiAgICAgICAgbGlzdCA9IExpc3QuaW5kZXgobGlzdCk7XG4gICAgICAgIG90aGVyID0gTGlzdC5pbmRleChvdGhlcik7XG4gICAgICAgIGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmhhcyhrZXkpICYmIG90aGVyLmhhcyhrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXMoa2V5KSA/IHppcEZuKGxpc3QuZ2V0KGtleSksIG90aGVyLmdldChrZXkpKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgdmFyIHByZXYgPSBsaXN0LnByZXYoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBwcmV2ICE9IG51bGwgJiYgcHJldiA9PSBvdGhlci5wcmV2KGtleSkgPyBwcmV2IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBsaXN0Lm5leHQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBuZXh0ICE9IG51bGwgJiYgbmV4dCA9PSBvdGhlci5uZXh0KGtleSkgPyBuZXh0IDogbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgc2tpcChsaXN0LCBrKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZpbHRlcihMaXN0LmluZGV4KGxpc3QpLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSA+PSBrO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHRha2UobGlzdCwgbikge1xuICAgICAgICByZXR1cm4gTGlzdC5maWx0ZXIoTGlzdC5pbmRleChsaXN0KSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPCBuO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJhbmdlKGxpc3QsIGssIG4pIHtcbiAgICAgICAgcmV0dXJuIExpc3QuZmlsdGVyKExpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGsgJiYga2V5IDwgbiArIGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgc2NhbihsaXN0LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIHsgaGFzLCBwcmV2LCBuZXh0IH0gPSBsaXN0LCBzY2FuTGlzdDtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgdmFyIHByZXYgPSBzY2FuTGlzdC5wcmV2KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gc2NhbkZuKHByZXYgIT0gbnVsbCA/IHNjYW5MaXN0LmdldChwcmV2KSA6IG1lbW8sIGxpc3QuZ2V0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHNjYW5MaXN0ID0gTGlzdC5jYWNoZSh7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH0pO1xuICAgICAgICByZXR1cm4gc2Nhbkxpc3Q7XG4gICAgfVxuICAgIHN0YXRpYyBhc3luYyhsaXN0LCBzY2hlZHVsZXIpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBBc3luY0xpc3QobGlzdCk7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCB7IE9ic2VydmFibGVMaXN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlX2xpc3QnO1xuZXhwb3J0IGNsYXNzIE11dGFibGVMaXN0IGV4dGVuZHMgT2JzZXJ2YWJsZUxpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgc3VwZXIobGlzdCk7XG4gICAgICAgIHRoaXMuc2V0ID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zcGxpY2UgPSAocHJldiwgbmV4dCwgLi4udmFsdWVzKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkQmVmb3JlID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5hZGRCZWZvcmUodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWRkQWZ0ZXIgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmFkZEFmdGVyKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnB1c2ggPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5wdXNoKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy51bnNoaWZ0ID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QudW5zaGlmdCh0aGlzLCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZSh0aGlzLCBrZXkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlbGV0ZUJlZm9yZSA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGVCZWZvcmUodGhpcywga2V5KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGVBZnRlciA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5kZWxldGVBZnRlcih0aGlzLCBrZXkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBvcCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5wb3AodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2hpZnQgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3Quc2hpZnQodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVtb3ZlID0gKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QucmVtb3ZlKHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jb21wb3NlID0gKGxlbnMpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5jcmVhdGUoTXV0YWJsZUxpc3QuY29tcG9zZSh0aGlzLCBsZW5zKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0ID0gbGlzdC5zZXQ7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSA9IGxpc3Quc3BsaWNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpc011dGFibGVMaXN0KG9iaikge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuaXNPYnNlcnZhYmxlTGlzdChvYmopICYmICEhb2JqWydzZXQnXSAmJiAhIW9ialsnc3BsaWNlJ107XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IE11dGFibGVMaXN0KHtcbiAgICAgICAgICAgIGhhczogbGlzdC5oYXMsXG4gICAgICAgICAgICBnZXQ6IGxpc3QuZ2V0LFxuICAgICAgICAgICAgcHJldjogbGlzdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogbGlzdC5uZXh0LFxuICAgICAgICAgICAgb2JzZXJ2ZTogbGlzdC5vYnNlcnZlLFxuICAgICAgICAgICAgc2V0OiBsaXN0LnNldCxcbiAgICAgICAgICAgIHNwbGljZTogbGlzdC5zcGxpY2VcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBhZGRCZWZvcmUobGlzdCwga2V5LCB2YWx1ZSkge1xuICAgICAgICBsaXN0LnNwbGljZShsaXN0LnByZXYoa2V5KSwga2V5LCB2YWx1ZSk7XG4gICAgICAgIHJldHVybiBsaXN0LnByZXYoa2V5KTtcbiAgICB9XG4gICAgc3RhdGljIGFkZEFmdGVyKGxpc3QsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgbGlzdC5zcGxpY2Uoa2V5LCBsaXN0Lm5leHQoa2V5KSwgdmFsdWUpO1xuICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGtleSk7XG4gICAgfVxuICAgIHN0YXRpYyBwdXNoKGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5hZGRCZWZvcmUobGlzdCwgbnVsbCwgdmFsdWUpO1xuICAgIH1cbiAgICBzdGF0aWMgdW5zaGlmdChsaXN0LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuYWRkQWZ0ZXIobGlzdCwgbnVsbCwgdmFsdWUpO1xuICAgIH1cbiAgICBzdGF0aWMgZGVsZXRlKGxpc3QsIGtleSkge1xuICAgICAgICBpZiAoIWxpc3QuaGFzKGtleSkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB2YWx1ZSA9IGxpc3QuZ2V0KGtleSk7XG4gICAgICAgIGxpc3Quc3BsaWNlKGxpc3QucHJldihrZXkpLCBsaXN0Lm5leHQoa2V5KSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZUJlZm9yZShsaXN0LCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZShsaXN0LCBsaXN0LnByZXYoa2V5KSk7XG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGVBZnRlcihsaXN0LCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZShsaXN0LCBsaXN0Lm5leHQoa2V5KSk7XG4gICAgfVxuICAgIHN0YXRpYyBwb3AobGlzdCkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQmVmb3JlKGxpc3QsIG51bGwpO1xuICAgIH1cbiAgICBzdGF0aWMgc2hpZnQobGlzdCkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQWZ0ZXIobGlzdCwgbnVsbCk7XG4gICAgfVxuICAgIHN0YXRpYyByZW1vdmUobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGtleSA9IE11dGFibGVMaXN0LmtleU9mKGxpc3QsIHZhbHVlKTtcbiAgICAgICAgaWYgKGtleSA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICBkZWxldGUgKGxpc3QsIGtleSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBzdGF0aWMgY29tcG9zZShsaXN0LCBsZW5zKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsZW5zLmdldChsaXN0LmdldChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgbGlzdC5zZXQoa2V5LCBsZW5zLnNldChsaXN0LmdldChrZXkpLCB2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHNwbGljZShwcmV2LCBuZXh0LCAuLi52YWx1ZXMpIHtcbiAgICAgICAgICAgIGxpc3Quc3BsaWNlKHByZXYsIG5leHQsIC4uLnZhbHVlcy5tYXAoKHZhbCkgPT4gbGVucy5zZXQobnVsbCwgdmFsKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoYXM6IGxpc3QuaGFzLFxuICAgICAgICAgICAgZ2V0LFxuICAgICAgICAgICAgc2V0LFxuICAgICAgICAgICAgc3BsaWNlLFxuICAgICAgICAgICAgcHJldjogbGlzdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogbGlzdC5uZXh0LFxuICAgICAgICAgICAgb2JzZXJ2ZTogbGlzdC5vYnNlcnZlXG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTXV0YWJsZUxpc3Q7XG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCBjbGFzcyBTdWJqZWN0IHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJLZXkgPSBLZXkuY3JlYXRlKCk7XG4gICAgICAgICAgICB0aGlzLl9vYnNlcnZlcnNbb2JzZXJ2ZXJLZXldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHVuc3Vic2NyaWJlOiAoKSA9PiB7IGRlbGV0ZSB0aGlzLl9vYnNlcnZlcnNbb2JzZXJ2ZXJLZXldOyB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5vdGlmeSA9IChub3RpZmllcikgPT4ge1xuICAgICAgICAgICAgZm9yICh2YXIgb2JzZXJ2ZXJLZXkgaW4gdGhpcy5fb2JzZXJ2ZXJzKVxuICAgICAgICAgICAgICAgIG5vdGlmaWVyKHRoaXMuX29ic2VydmVyc1tvYnNlcnZlcktleV0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vYnNlcnZlcnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIH1cbn1cbiIsImltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlQ2FjaGUgZXh0ZW5kcyBDYWNoZSB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICBzdXBlcihsaXN0KTtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkludmFsaWRhdGUgPSAocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIGtleSA9IHByZXY7XG4gICAgICAgICAgICB3aGlsZSAoKGtleSA9IHRoaXMuX25leHRba2V5XSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9uZXh0W3RoaXMuX3ByZXZba2V5XV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX3ByZXZba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IG5leHQpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ieUtleVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKChrZXkgPSB0aGlzLl9wcmV2W2tleV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fcHJldlt0aGlzLl9uZXh0W2tleV1dO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9uZXh0W2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBwcmV2KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYnlLZXlba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbGlzdC5vYnNlcnZlKHRoaXMpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGVDYWNoZTtcbiIsImltcG9ydCBJbmRleCBmcm9tICcuL2luZGV4JztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVJbmRleCBleHRlbmRzIEluZGV4IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHN1cGVyKGxpc3QpO1xuICAgICAgICB0aGlzLmhhcyA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9ieUluZGV4Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBuZXh0LCBsYXN0ID0gdGhpcy5fYnlJbmRleC5sZW5ndGggLSAxO1xuICAgICAgICAgICAgd2hpbGUgKGxhc3QgIT0gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICBuZXh0ID0gdGhpcy5fbGlzdC5uZXh0KHRoaXMuX2J5SW5kZXhbbGFzdF0pO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9ieUluZGV4WysrbGFzdF0gPSBuZXh0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2J5S2V5W25leHRdID0gbGFzdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9ic2VydmUgPSAob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0Lm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uSW52YWxpZGF0ZSA9IChwcmV2LCBuZXh0KSA9PiB7XG4gICAgICAgICAgICB2YXIgcHJldkluZGV4ID0gdGhpcy5fYnlLZXlbcHJldl0sIGxlbmd0aCA9IHRoaXMuX2J5SW5kZXgubGVuZ3RoLCBpbmRleCA9IHByZXZJbmRleDtcbiAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKVxuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ieUtleVt0aGlzLl9ieUluZGV4W2luZGV4XV07XG4gICAgICAgICAgICB0aGlzLl9ieUluZGV4LnNwbGljZShwcmV2SW5kZXggKyAxKTtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwcmV2SW5kZXgsIG51bGwpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2J5S2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgIGxpc3Qub2JzZXJ2ZSh0aGlzKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYnNlcnZhYmxlSW5kZXg7XG4iLCJpbXBvcnQgS2V5QnkgZnJvbSAnLi9rZXlfYnknO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZUtleUJ5IGV4dGVuZHMgS2V5Qnkge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QsIGtleUZuKSB7XG4gICAgICAgIHN1cGVyKGxpc3QsIGtleUZuKTtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkludmFsaWRhdGUgPSAocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHRoaXMuX2tleUJ5U291cmNlS2V5W3ByZXZdLCB0aGlzLl9rZXlCeVNvdXJjZUtleVtuZXh0XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgIGxpc3Qub2JzZXJ2ZSh0aGlzKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYnNlcnZhYmxlS2V5Qnk7XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgT2JzZXJ2YWJsZUNhY2hlIGZyb20gJy4vb2JzZXJ2YWJsZV9jYWNoZSc7XG5pbXBvcnQgT2JzZXJ2YWJsZUluZGV4IGZyb20gJy4vb2JzZXJ2YWJsZV9pbmRleCc7XG5pbXBvcnQgT2JzZXJ2YWJsZUtleUJ5IGZyb20gJy4vb2JzZXJ2YWJsZV9rZXlfYnknO1xuO1xuZXhwb3J0IGNsYXNzIE9ic2VydmFibGVMaXN0IGV4dGVuZHMgTGlzdCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICBzdXBlcihsaXN0KTtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmV2ZXJzZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QucmV2ZXJzZSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubWFwID0gKG1hcEZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0Lm1hcCh0aGlzLCBtYXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbHRlciA9IChmaWx0ZXJGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5maWx0ZXIodGhpcywgZmlsdGVyRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mbGF0dGVuID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5mbGF0dGVuKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5mbGF0TWFwID0gKGZsYXRNYXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5mbGF0TWFwKHRoaXMsIGZsYXRNYXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNhY2hlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5jYWNoZSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5kZXggPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LmluZGV4KHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5rZXlCeSA9IChrZXlGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5rZXlCeSh0aGlzLCBrZXlGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnppcCA9IChvdGhlciwgemlwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuemlwKHRoaXMsIG90aGVyLCB6aXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNraXAgPSAoaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5za2lwKHRoaXMsIGspKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy50YWtlID0gKG4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QudGFrZSh0aGlzLCBuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmFuZ2UgPSAoaywgbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5yYW5nZSh0aGlzLCBrLCBuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NhbiA9IChzY2FuRm4sIG1lbW8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3Quc2Nhbih0aGlzLCBzY2FuRm4sIG1lbW8pKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGxpc3QgIT0gbnVsbClcbiAgICAgICAgICAgIHRoaXMub2JzZXJ2ZSA9IGxpc3Qub2JzZXJ2ZTtcbiAgICB9XG4gICAgc3RhdGljIGlzT2JzZXJ2YWJsZUxpc3Qob2JqKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmlzTGlzdChvYmopICYmICEhb2JqWydvYnNlcnZlJ107XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGVMaXN0KHtcbiAgICAgICAgICAgIGhhczogbGlzdC5oYXMsXG4gICAgICAgICAgICBnZXQ6IGxpc3QuZ2V0LFxuICAgICAgICAgICAgcHJldjogbGlzdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogbGlzdC5uZXh0LFxuICAgICAgICAgICAgb2JzZXJ2ZTogbGlzdC5vYnNlcnZlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgcmV2ZXJzZShsaXN0KSB7XG4gICAgICAgIHZhciB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH0gPSBMaXN0LnJldmVyc2UobGlzdCk7XG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgICAgIG9uSW52YWxpZGF0ZTogZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKG5leHQsIHByZXYpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0LCBvYnNlcnZlIH07XG4gICAgfVxuICAgIHN0YXRpYyBtYXAobGlzdCwgbWFwRm4pIHtcbiAgICAgICAgdmFyIHsgaGFzLCBnZXQsIHByZXYsIG5leHQgfSA9IExpc3QubWFwKGxpc3QsIG1hcEZuKTtcbiAgICAgICAgcmV0dXJuIHsgaGFzLCBnZXQsIHByZXYsIG5leHQsIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgZmlsdGVyKGxpc3QsIGZpbHRlckZuKSB7XG4gICAgICAgIHZhciB7IGhhcywgZ2V0LCBwcmV2LCBuZXh0IH0gPSBMaXN0LmZpbHRlcihsaXN0LCBmaWx0ZXJGbik7XG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgICAgIG9uSW52YWxpZGF0ZTogZnVuY3Rpb24gKHAsIG4pIHtcbiAgICAgICAgICAgICAgICAgICAgcCA9IGhhcyhwKSA/IHAgOiBwcmV2KHApO1xuICAgICAgICAgICAgICAgICAgICBuID0gaGFzKG4pID8gbiA6IG5leHQobik7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm9uSW52YWxpZGF0ZShwLCBuKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgZmxhdHRlbihsaXN0KSB7XG4gICAgICAgIHZhciBjYWNoZTtcbiAgICAgICAgdmFyIHN1YnNjcmlwdGlvbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB2YXIgc3ViamVjdCA9IG5ldyBTdWJqZWN0KCk7XG4gICAgICAgIGxpc3Qub2JzZXJ2ZSh7XG4gICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgICAgICBrZXkgPSBwcmV2O1xuICAgICAgICAgICAgICAgIHdoaWxlICgoa2V5ID0gY2FjaGUubmV4dChrZXkpKSAhPSBudWxsICYmIGtleSAhPSBuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN1YnNjcmlwdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBrZXkgPSBuZXh0O1xuICAgICAgICAgICAgICAgIHdoaWxlICgoa2V5ID0gY2FjaGUucHJldihrZXkpKSAhPSBudWxsICYmIGtleSAhPSBwcmV2KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdWJzY3JpcHRpb24gPSBzdWJzY3JpcHRpb25zW2tleV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN1YnNjcmlwdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGNhY2hlID0gT2JzZXJ2YWJsZUxpc3QuY2FjaGUoT2JzZXJ2YWJsZUxpc3QubWFwKGxpc3QsIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBzdWJzY3JpcHRpb25zW2tleV0gPSB2YWx1ZS5vYnNlcnZlKHtcbiAgICAgICAgICAgICAgICBvbkludmFsaWRhdGU6IGZ1bmN0aW9uIChwcmV2LCBuZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwcmV2S2V5LCBuZXh0S2V5LCBwcmV2UGF0aCA9IFBhdGguYXBwZW5kKGtleSwgcHJldiksIG5leHRQYXRoID0gUGF0aC5hcHBlbmQoa2V5LCBuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByZXYgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXZQYXRoID0gVHJlZS5wcmV2KGxpc3QsIFRyZWUubmV4dChsaXN0LCBwcmV2UGF0aCkpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dCA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dFBhdGggPSBUcmVlLm5leHQobGlzdCwgVHJlZS5wcmV2KGxpc3QsIG5leHRQYXRoKSk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZLZXkgPSBQYXRoLmtleShwcmV2UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIG5leHRLZXkgPSBQYXRoLmtleShuZXh0UGF0aCk7XG4gICAgICAgICAgICAgICAgICAgIHN1YmplY3Qubm90aWZ5KGZ1bmN0aW9uIChvYnNlcnZlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHByZXZLZXksIG5leHRLZXkpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfSkpO1xuICAgICAgICBjYWNoZS5vYnNlcnZlKHtcbiAgICAgICAgICAgIG9uSW52YWxpZGF0ZTogZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldktleSA9IFBhdGgua2V5KFRyZWUucHJldihsaXN0LCBbcHJldl0pKSwgbmV4dEtleSA9IFBhdGgua2V5KFRyZWUubmV4dChsaXN0LCBbbmV4dF0pKTtcbiAgICAgICAgICAgICAgICBzdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHByZXZLZXksIG5leHRLZXkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHsgaGFzLCBnZXQsIG5leHQsIHByZXYgfSA9IExpc3QuZmxhdHRlbihjYWNoZSk7XG4gICAgICAgIHJldHVybiB7IGhhcywgZ2V0LCBuZXh0LCBwcmV2LCBvYnNlcnZlOiBzdWJqZWN0Lm9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZsYXRNYXAobGlzdCwgZmxhdE1hcEZuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5mbGF0dGVuKE9ic2VydmFibGVMaXN0Lm1hcChsaXN0LCBmbGF0TWFwRm4pKTtcbiAgICB9XG4gICAgc3RhdGljIGNhY2hlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlQ2FjaGUobGlzdCk7XG4gICAgfVxuICAgIHN0YXRpYyBpbmRleChsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZUluZGV4KGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMga2V5QnkobGlzdCwga2V5Rm4pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlS2V5QnkobGlzdCwga2V5Rm4pO1xuICAgIH1cbiAgICBzdGF0aWMgemlwKGxpc3QsIG90aGVyLCB6aXBGbikge1xuICAgICAgICBsaXN0ID0gT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCk7XG4gICAgICAgIG90aGVyID0gT2JzZXJ2YWJsZUxpc3QuaW5kZXgob3RoZXIpO1xuICAgICAgICBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5oYXMoa2V5KSAmJiBvdGhlci5oYXMoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGtleSkgPyB6aXBGbihsaXN0LmdldChrZXkpLCBvdGhlci5nZXQoa2V5KSkgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gbGlzdC5wcmV2KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gcHJldiAhPSBudWxsICYmIHByZXYgPT0gb3RoZXIucHJldihrZXkpID8gcHJldiA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHZhciBuZXh0ID0gbGlzdC5uZXh0KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gbmV4dCAhPSBudWxsICYmIG5leHQgPT0gb3RoZXIubmV4dChrZXkpID8gbmV4dCA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgU3ViamVjdCgpLCBvYnNlcnZlciA9IHtcbiAgICAgICAgICAgIG9uSW52YWxpZGF0ZTogZnVuY3Rpb24gKHByZXYsIG5leHQpIHtcbiAgICAgICAgICAgICAgICBzdWJqZWN0Lm5vdGlmeShmdW5jdGlvbiAoX29ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIF9vYnNlcnZlci5vbkludmFsaWRhdGUocHJldiwgbmV4dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGxpc3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIG90aGVyLm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgICAgICByZXR1cm4geyBoYXMsIGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZTogc3ViamVjdC5vYnNlcnZlIH07XG4gICAgfVxuICAgIHN0YXRpYyBza2lwKGxpc3QsIGspIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmZpbHRlcihPYnNlcnZhYmxlTGlzdC5pbmRleChsaXN0KSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPj0gaztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyB0YWtlKGxpc3QsIG4pIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmZpbHRlcihPYnNlcnZhYmxlTGlzdC5pbmRleChsaXN0KSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPCBuO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJhbmdlKGxpc3QsIGssIG4pIHtcbiAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmZpbHRlcihPYnNlcnZhYmxlTGlzdC5pbmRleChsaXN0KSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPj0gayAmJiBrZXkgPCBuICsgaztcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBzY2FuKGxpc3QsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICB2YXIgeyBoYXMsIHByZXYsIG5leHQgfSA9IGxpc3QsIHNjYW5MaXN0O1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICB2YXIgcHJldiA9IHNjYW5MaXN0LnByZXYoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBzY2FuRm4ocHJldiAhPSBudWxsID8gc2Nhbkxpc3QuZ2V0KHByZXYpIDogbWVtbywgbGlzdC5nZXQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZShvYnNlcnZlcikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Qub2JzZXJ2ZSh7XG4gICAgICAgICAgICAgICAgb25JbnZhbGlkYXRlOiBmdW5jdGlvbiAocHJldiwgbmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5vbkludmFsaWRhdGUocHJldiwgbnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2Nhbkxpc3QgPSBPYnNlcnZhYmxlTGlzdC5jYWNoZSh7IGhhcywgZ2V0LCBwcmV2LCBuZXh0LCBvYnNlcnZlIH0pO1xuICAgICAgICByZXR1cm4gc2Nhbkxpc3Q7XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgT2JzZXJ2YWJsZUxpc3Q7XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcbjtcbmV4cG9ydCB2YXIgUGF0aDtcbihmdW5jdGlvbiAoUGF0aCkge1xuICAgIGZ1bmN0aW9uIGtleShwYXRoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGtleSkge1xuICAgICAgICByZXR1cm4ga2V5ID09IG51bGwgPyBudWxsIDogSlNPTi5wYXJzZShrZXkudG9TdHJpbmcoKSk7XG4gICAgfVxuICAgIFBhdGguY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGdldChwYXRoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcGF0aFtpbmRleF07XG4gICAgfVxuICAgIFBhdGguZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHRhaWwocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gW10gOiBwYXRoLnNsaWNlKDEsIHBhdGgubGVuZ3RoKTtcbiAgICB9XG4gICAgUGF0aC50YWlsID0gdGFpbDtcbiAgICBmdW5jdGlvbiBhcHBlbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KGEpLmNvbmNhdChiKTtcbiAgICB9XG4gICAgUGF0aC5hcHBlbmQgPSBhcHBlbmQ7XG59KShQYXRoIHx8IChQYXRoID0ge30pKTtcbmV4cG9ydCB2YXIgVHJlZTtcbihmdW5jdGlvbiAoVHJlZSkge1xuICAgIGZ1bmN0aW9uIGhhcyhsaXN0LCBwYXRoLCBkZXB0aCA9IEluZmluaXR5KSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpO1xuICAgICAgICByZXR1cm4gbGlzdC5oYXMoaGVhZCkgJiYgKHRhaWwubGVuZ3RoID09IDAgfHwgZGVwdGggPT0gMCB8fCBUcmVlLmhhcyhsaXN0LmdldChoZWFkKSwgdGFpbCwgZGVwdGgpKTtcbiAgICB9XG4gICAgVHJlZS5oYXMgPSBoYXM7XG4gICAgZnVuY3Rpb24gZ2V0KGxpc3QsIHBhdGgsIGRlcHRoID0gSW5maW5pdHkpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmhlYWQocGF0aCksIHRhaWwgPSBQYXRoLnRhaWwocGF0aCk7XG4gICAgICAgIGlmICghbGlzdC5oYXMoaGVhZCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB2YWx1ZSA9IGxpc3QuZ2V0KGhlYWQpO1xuICAgICAgICBpZiAodGFpbC5sZW5ndGggPT0gMCB8fCBkZXB0aCA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICByZXR1cm4gVHJlZS5nZXQodmFsdWUsIHRhaWwsIGRlcHRoKTtcbiAgICB9XG4gICAgVHJlZS5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gcHJldihsaXN0LCBwYXRoID0gW10sIGRlcHRoID0gSW5maW5pdHkpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmhlYWQocGF0aCksIHRhaWwgPSBQYXRoLnRhaWwocGF0aCksIGtleSA9IGhlYWQsIHZhbHVlO1xuICAgICAgICBpZiAoaGVhZCAhPSBudWxsICYmICFsaXN0LmhhcyhoZWFkKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgZG8ge1xuICAgICAgICAgICAgdmFsdWUgPSBsaXN0LmdldChrZXkpO1xuICAgICAgICAgICAgaWYgKCFMaXN0LmlzTGlzdCh2YWx1ZSkgfHwgZGVwdGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgIT0gbnVsbCAmJiBrZXkgIT0gaGVhZClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZQYXRoID0gVHJlZS5wcmV2KHZhbHVlLCB0YWlsLCBkZXB0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2UGF0aCAhPSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUGF0aC5hcHBlbmQoa2V5LCBwcmV2UGF0aCk7XG4gICAgICAgICAgICAgICAgdGFpbCA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IHdoaWxlICgoa2V5ID0gbGlzdC5wcmV2KGtleSkpICE9IG51bGwpO1xuICAgIH1cbiAgICBUcmVlLnByZXYgPSBwcmV2O1xuICAgIGZ1bmN0aW9uIG5leHQobGlzdCwgcGF0aCA9IFtdLCBkZXB0aCA9IEluZmluaXR5KSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpLCBrZXkgPSBoZWFkLCB2YWx1ZTtcbiAgICAgICAgaWYgKGhlYWQgIT0gbnVsbCAmJiAhbGlzdC5oYXMoaGVhZCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIHZhbHVlID0gbGlzdC5nZXQoa2V5KTtcbiAgICAgICAgICAgIGlmICghTGlzdC5pc0xpc3QodmFsdWUpIHx8IGRlcHRoID09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ICE9IG51bGwgJiYga2V5ICE9IGhlYWQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBuZXh0UGF0aCA9IFRyZWUubmV4dCh2YWx1ZSwgdGFpbCwgZGVwdGggLSAxKTtcbiAgICAgICAgICAgICAgICBpZiAobmV4dFBhdGggIT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFBhdGguYXBwZW5kKGtleSwgbmV4dFBhdGgpO1xuICAgICAgICAgICAgICAgIHRhaWwgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSB3aGlsZSAoKGtleSA9IGxpc3QubmV4dChrZXkpKSAhPSBudWxsKTtcbiAgICB9XG4gICAgVHJlZS5uZXh0ID0gbmV4dDtcbn0pKFRyZWUgfHwgKFRyZWUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgVHJlZTtcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgeyBNdXRhYmxlTGlzdCB9IGZyb20gJy4vbXV0YWJsZV9saXN0JztcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVuaXQgZXh0ZW5kcyBNdXRhYmxlTGlzdCB7XG4gICAgY29uc3RydWN0b3IodmFsdWUpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5oYXMgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fa2V5ID09IGtleTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fa2V5O1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubmV4dCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fa2V5O1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2V0ID0gKGtleSwgdmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2tleSA9IGtleTtcbiAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9pbnZhbGlkYXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3BsaWNlID0gKHByZXYsIG5leHQsIC4uLnZhbHVlcykgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbHVlcy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0KEtleS5jcmVhdGUoKSwgdmFsdWVzWzBdKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9rZXk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5fdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9pbnZhbGlkYXRlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2ludmFsaWRhdGUgPSAocHJldiwgbmV4dCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC5ub3RpZnkoZnVuY3Rpb24gKG9ic2VydmVyKSB7XG4gICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHByZXYsIG5leHQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBuZXcgU3ViamVjdCgpO1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aClcbiAgICAgICAgICAgIHRoaXMuc3BsaWNlKG51bGwsIG51bGwsIHZhbHVlKTtcbiAgICB9XG59XG4iXX0=
