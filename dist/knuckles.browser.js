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
            receiver = _x3;desc = parent = getter = undefined;_again = false;if (object === null) object = Function.prototype;var desc = Object.getOwnPropertyDescriptor(object, property);if (desc === undefined) {
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

var _node_modulesSonicDistObservable_list = require('../node_modules/sonic/dist/observable_list');

var _node_modulesSonicDistMutable_list = require('../node_modules/sonic/dist/mutable_list');

var _xhr = require('./xhr');

var Collection = (function (_MutableList) {
    _inherits(Collection, _MutableList);

    function Collection(urlRoot) {
        var _this = this;

        _classCallCheck(this, Collection);

        _get(Object.getPrototypeOf(Collection.prototype), 'constructor', this).call(this);
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this.get = function (key) {
            if (_this._byKey[key]) return Promise.resolve(_this._byKey[key]);
            return _xhr.XHR.get(_this._urlRoot + '/' + key).then(function (xhr) {
                return xhr.responseText;
            }).then(JSON.parse).then(function (value) {
                return _this._byKey[value['id']] = value;
            });
        };
        this.prev = function (key) {
            if (_this._prev[key]) return Promise.resolve(_this._prev[key]);
            return _this._fetch().then(function () {
                return _this._prev[key];
            });
        };
        this.next = function (key) {
            if (_this._next[key]) return Promise.resolve(_this._next[key]);
            return _this._fetch().then(function () {
                return _this._next[key];
            });
        };
        this.set = function (key, value) {
            return _xhr.XHR.put(_this._urlRoot + '/' + key, value).then(function (xhr) {
                return xhr.responseText;
            }).then(JSON.parse).then(function (value) {
                return _this._subject.onInvalidate(value['id']);
            });
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            return Promise.all(values.map(function (value) {
                return _xhr.XHR.post(_this._urlRoot, value);
            })).then(function (results) {
                values = results.map(function (xhr) {
                    return JSON.parse(xhr.responseText);
                });
                values.forEach(function (value) {
                    var id = value['id'];
                    _this._byKey[id] = value;
                    _this._next[prev] = id;
                    _this._prev[id] = prev;
                    prev = id;
                });
                _this._next[prev] = values[0]['id'];
                _this._prev[next] = values[values.length - 1]['id'];
                _this._subject.onInvalidate([prev, next]);
            });
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this._subject = new _node_modulesSonicDistObservable_list.ListSubject();
        this._urlRoot = urlRoot;
    }

    _createClass(Collection, [{
        key: '_fetch',
        value: function _fetch() {
            var _this2 = this;

            return _xhr.XHR.get(this._urlRoot).then(function (xhr) {
                return xhr.responseText;
            }).then(JSON.parse).then(function (res) {
                var prev = null;
                res.forEach(function (value) {
                    var id = value['id'];
                    _this2._byKey[id] = value;
                    _this2._next[prev] = id;
                    _this2._prev[id] = prev;
                    prev = id;
                });
                _this2._next[prev] = null;
                _this2._prev['null'] = prev;
            });
        }
    }]);

    return Collection;
})(_node_modulesSonicDistMutable_list.MutableList);

exports.Collection = Collection;
exports['default'] = Collection;

},{"../node_modules/sonic/dist/mutable_list":9,"../node_modules/sonic/dist/observable_list":13,"./xhr":3}],2:[function(require,module,exports){
// Build upon the IList standard from Sonic
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _collection = require('./collection');

var _collection2 = _interopRequireDefault(_collection);

function Knuckles(key, value) {}
;
var Knuckles;
(function (Knuckles) {
    // export var Sonic      = _Sonic;
    Knuckles.XHR = _xhr2['default'];
    Knuckles.Collection = _collection2['default'];
})(Knuckles || (Knuckles = {}));
exports['default'] = Knuckles;

module.exports = Knuckles;
module.exports = exports['default'];

// if (arguments.length == 2) return Knuckles.set(key, value);
// else return Knuckles.get(key);

},{"./collection":1,"./xhr":3}],3:[function(require,module,exports){
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
exports.XHR = XHR;
exports['default'] = XHR;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function Cache(list) {
    var _this = this;

    _classCallCheck(this, Cache);

    this.get = function (key) {
        if (key in _this._byKey) return Promise.resolve(_this._byKey[key]);
        return _this._list.get(key).then(function (value) {
            return _this._byKey[key] = value;
        });
    };
    this.prev = function (key) {
        if (key in _this._prev) return Promise.resolve(_this._prev[key]);
        return _this._list.prev(key).then(function (prev) {
            _this._prev[key] = prev;
            _this._next[prev] = key;
            return prev;
        });
    };
    this.next = function () {
        var key = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

        if (key in _this._next) return Promise.resolve(_this._next[key]);
        return _this._list.next(key).then(function (next) {
            _this._next[key] = next;
            _this._prev[next] = key;
            return next;
        });
    };
    this._byKey = Object.create(null), this._next = Object.create(null), this._prev = Object.create(null);
    this._list = list;
};

exports.Cache = Cache;
exports["default"] = Cache;

},{}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _list = require('./list');

var Index = function Index(list) {
    var _this = this;

    _classCallCheck(this, Index);

    this._add = function (key, index) {
        _this._byIndex[index] = key;
    };
    this.get = function (index) {
        if (0 <= index && index < _this._byIndex.length) return _this._list.get(_this._byIndex[index]);
        return _list.List.find(_this, function (value, key) {
            return key === index;
        }, _this._byIndex.length - 1);
    };
    this.prev = function (index) {
        if (index != null && 0 <= index && index < _this._byIndex.length) return Promise.resolve(index - 1 < 0 ? null : index - 1);
        return _list.List.some(_this, function (value, key) {
            return key === index - 1;
        }, _this._byIndex.length - 1).then(function (found) {
            if (found) return index - 1;
            if (index == null) return _this._byIndex.length - 1;
            throw new Error();
        });
    };
    this.next = function (index) {
        var next = index == null ? 0 : index + 1;
        if (next < _this._byIndex.length) return Promise.resolve(next);
        return _list.List.some(_this._list, function (value, key) {
            _this._add(key, _this._byIndex.length);
            return next === _this._byIndex.length - 1;
        }, _this._byIndex[_this._byIndex.length - 1]).then(function (found) {
            if (found) return next;
            if (next === _this._byIndex.length) return null;
            throw new Error();
        });
    };
    this._byIndex = [];
    this._list = list;
};

exports.Index = Index;
exports['default'] = Index;

},{"./list":7}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _tree = require('./tree');

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var List = (function () {
    function List(list) {
        var _this = this;

        _classCallCheck(this, List);

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
        this.every = function (predicate) {
            return List.every(_this, predicate);
        };
        this.some = function (predicate) {
            return List.some(_this, predicate);
        };
        this.forEach = function (fn, range) {
            return List.forEach(_this, fn, range);
        };
        this.reduce = function (fn, memo, range) {
            return List.reduce(_this, fn, memo, range);
        };
        this.toArray = function (range) {
            return List.toArray(_this, range);
        };
        this.findKey = function (fn, range) {
            return List.findKey(_this, fn, range);
        };
        this.find = function (fn, range) {
            return List.find(_this, fn, range);
        };
        this.keyOf = function (value, range) {
            return List.keyOf(_this, value, range);
        };
        this.indexOf = function (value, range) {
            return List.indexOf(_this, value, range);
        };
        this.keyAt = function (index, range) {
            return List.keyAt(_this, index, range);
        };
        this.at = function (index, range) {
            return List.at(_this, index, range);
        };
        this.contains = function (value, range) {
            return List.contains(_this, value, range);
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
        this.group = function (groupFn) {
            return List.create(List.group(_this, groupFn)).map(List.create).cache();
        };
        this.index = function () {
            return List.create(List.index(_this));
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
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }

    _createClass(List, null, [{
        key: 'isList',
        value: function isList(obj) {
            return obj != null && !!obj['get'] && !!obj['prev'] && !!obj['next'];
        }
    }, {
        key: 'create',
        value: function create(list) {
            return new List({
                get: list.get,
                prev: list.prev,
                next: list.next
            });
        }
    }, {
        key: 'first',
        value: function first(list) {
            return list.next().then(list.get);
        }
    }, {
        key: 'last',
        value: function last(list) {
            return list.prev().then(list.get);
        }
    }, {
        key: 'every',
        value: function every(list, predicate, range) {
            return _range2['default'].last(list, range).then(function (last) {
                var loop = function loop(key) {
                    if (key == null) return Promise.resolve(true);
                    return list.get(key).then(function (value) {
                        return predicate(value, key);
                    }).then(function (res) {
                        return res === false ? false : key == last ? true : list.next(key).then(loop);
                    });
                };
                return _range2['default'].first(list, range).then(loop);
            });
        }
    }, {
        key: 'some',
        value: function some(list, predicate, range) {
            return _range2['default'].last(list, range).then(function (last) {
                var loop = function loop(key) {
                    if (key == null) return Promise.resolve(false);
                    return list.get(key).then(function (value) {
                        return predicate(value, key);
                    }).then(function (res) {
                        return res === true ? true : key == last ? false : list.next(key).then(loop);
                    });
                };
                return _range2['default'].first(list, range).then(loop);
            });
        }
    }, {
        key: 'forEach',
        value: function forEach(list, fn, range) {
            return List.every(list, function (value, key) {
                fn(value, key);return true;
            }, range).then(function () {});
        }
    }, {
        key: 'reduce',
        value: function reduce(list, fn, memo, range) {
            return List.forEach(list, function (value, key) {
                return memo = fn(memo, value, key);
            }, range).then(function () {
                return memo;
            });
        }
    }, {
        key: 'toArray',
        value: function toArray(list, range) {
            return List.reduce(list, function (memo, value) {
                return (memo.push(value), memo);
            }, [], range);
        }
    }, {
        key: 'findKey',
        value: function findKey(list, fn, range) {
            var key;
            return List.some(list, function (v, k) {
                return Promise.resolve(fn(v, k)).then(function (res) {
                    return res ? !!(key = k) || true : false;
                });
            }, range).then(function (found) {
                return found ? key : null;
            });
        }
    }, {
        key: 'find',
        value: function find(list, fn, range) {
            return List.findKey(list, fn, range).then(list.get);
        }
    }, {
        key: 'keyOf',
        value: function keyOf(list, value, range) {
            return List.findKey(list, function (v) {
                return v === value;
            }, range);
        }
    }, {
        key: 'indexOf',
        value: function indexOf(list, value, range) {
            var index = -1;
            return List.some(list, function (v, k) {
                return value == v ? !! index++ || true : false;
            }, range).then(function (found) {
                if (found) {
                    return index;
                } else {
                    throw new Error();
                }
            });
        }
    }, {
        key: 'keyAt',
        value: function keyAt(list, index, range) {
            return List.findKey(list, function () {
                return 0 === index--;
            });
        }
    }, {
        key: 'at',
        value: function at(list, index, range) {
            return List.keyAt(list, index, range).then(list.get);
        }
    }, {
        key: 'contains',
        value: function contains(list, value, range) {
            return List.some(list, function (v) {
                return v === value;
            }, range);
        }
    }, {
        key: 'reverse',
        value: function reverse(list) {
            var get = list.get;

            function prev(key) {
                return list.next(key);
            }
            function next(key) {
                return list.prev(key);
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'map',
        value: function map(list, mapFn) {
            var prev = list.prev;
            var next = list.next;

            function get(key) {
                return list.get(key).then(function (value) {
                    return mapFn(value, key);
                });
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            function get(key) {
                return list.get(key).then(function (value) {
                    if (filterFn(value)) return value;
                    throw new Error();
                });
            }
            function prev(key) {
                return List.findKey(List.reverse(list), filterFn, [key, null]);
            }
            function next(key) {
                return List.findKey(list, filterFn, [key, null]);
            }
            return { get: get, prev: prev, next: next };
        }
    }, {
        key: 'flatten',
        value: function flatten(list) {
            function get(key) {
                var path = _tree.Path.fromKey(key);
                return _tree.Tree.get(list, path, 1);
            }
            function prev(key) {
                var path = _tree.Path.fromKey(key);
                return _tree.Tree.prev(list, path, 1).then(_tree.Path.toKey);
            }
            function next(key) {
                var path = _tree.Path.fromKey(key);
                return _tree.Tree.next(list, path, 1).then(_tree.Path.toKey);
            }
            return { get: get, prev: prev, next: next };
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
        key: 'group',
        value: function group(list, groupFn) {
            var groups = Object.create(null);
            function get(groupKey) {
                return List.findKey(list, function (value, key) {
                    return groupFn(value, key) === groupKey;
                }).then(function () {
                    return groups[groupKey] = List.filter(list, function (value, key) {
                        return groupKey === groupFn(value, key);
                    });
                });
            }
            function prev(groupKey) {
                return List.findKey(List.reverse(list), function (value, key) {
                    var _groupKey = groupFn(value, key);
                    return _groupKey !== groupKey && !groups[_groupKey];
                }).then(function (key) {
                    return key == null ? null : list.get(key).then(function (value) {
                        return groupFn(value, key);
                    });
                });
            }
            function next(groupKey) {
                return List.findKey(list, function (value, key) {
                    var _groupKey = groupFn(value, key);
                    return _groupKey !== groupKey && !groups[_groupKey];
                }).then(function (key) {
                    return key == null ? null : list.get(key).then(function (value) {
                        return groupFn(value, key);
                    });
                });
            }
            return new _cache2['default']({ get: get, prev: prev, next: next });
        }
    }, {
        key: 'index',
        value: function index(list) {
            return new _index2['default'](list);
        }
    }, {
        key: 'zip',
        value: function zip(list, other, zipFn) {
            list = List.index(list);
            other = List.index(other);
            function get(key) {
                return list.get(key).then(function (v) {
                    return other.get(key).then(function (w) {
                        return zipFn(v, w);
                    });
                });
            }
            function prev(key) {
                return list.prev(key).then(function () {
                    return other.prev(key);
                });
            }
            function next(key) {
                return list.next(key).then(function () {
                    return other.next(key);
                });
            }
            return { get: get, prev: prev, next: next };
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
            var prev = list.prev;
            var next = list.next;var scanList;
            function get(key) {
                return scanList.prev(key).then(function (p) {
                    return p == null ? memo : scanList.get(p);
                }).then(function (memo) {
                    return list.get(key).then(function (value) {
                        return scanFn(memo, value);
                    });
                });
            }
            scanList = List.cache({ get: get, prev: prev, next: next });
            return scanList;
        }
    }]);

    return List;
})();

exports.List = List;
exports['default'] = List;

},{"./cache":4,"./index":5,"./range":14,"./tree":15}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _observable_cache = require('./observable_cache');

var _observable_cache2 = _interopRequireDefault(_observable_cache);

var MutableCache = (function (_ObservableCache) {
    _inherits(MutableCache, _ObservableCache);

    function MutableCache(list) {
        var _this = this;

        _classCallCheck(this, MutableCache);

        _get(Object.getPrototypeOf(MutableCache.prototype), 'constructor', this).call(this, list);
        this.set = function (key, value) {
            return _this._list.set(key, value);
        };
        this.splice = function (prev, next) {
            for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                values[_key - 2] = arguments[_key];
            }

            var _list;

            return (_list = _this._list).splice.apply(_list, [prev, next].concat(values));
        };
    }

    return MutableCache;
})(_observable_cache2['default']);

exports.MutableCache = MutableCache;
exports['default'] = MutableCache;

},{"./observable_cache":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _observable_list = require('./observable_list');

var _mutable_cache = require('./mutable_cache');

var _mutable_cache2 = _interopRequireDefault(_mutable_cache);

var MutableList = (function (_ObservableList) {
    _inherits(MutableList, _ObservableList);

    function MutableList(list) {
        var _this = this;

        _classCallCheck(this, MutableList);

        _get(Object.getPrototypeOf(MutableList.prototype), 'constructor', this).call(this, list);
        this.set = function (key, value) {
            throw new Error('Not implemented');
        };
        this.splice = function (prev, next) {
            throw new Error('Not implemented');
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
        this['delete'] = function (key) {
            return MutableList['delete'](_this, key);
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
        this.cache = function () {
            return MutableList.create(MutableList.cache(_this));
        };
        this.map = function (getFn, setFn) {
            return MutableList.create(MutableList.map(_this, getFn, setFn));
        };
        if (list != null) {
            this.set = list.set;
            this.splice = list.splice;
        }
    }

    _createClass(MutableList, null, [{
        key: 'isMutableList',
        value: function isMutableList(obj) {
            return _observable_list.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
        }
    }, {
        key: 'create',
        value: function create(list) {
            return new MutableList({
                get: list.get,
                prev: list.prev,
                next: list.next,
                observe: list.observe,
                set: list.set,
                splice: list.splice
            });
        }
    }, {
        key: 'addBefore',
        value: function addBefore(list, key, value) {
            return list.prev(key).then(function (prev) {
                return list.splice(prev, key, value);
            }).then(function () {
                return list.prev(key);
            });
        }
    }, {
        key: 'addAfter',
        value: function addAfter(list, key, value) {
            return list.next(key).then(function (next) {
                return list.splice(key, next, value);
            }).then(function () {
                return list.next(key);
            });
        }
    }, {
        key: 'push',
        value: function push(list, value) {
            return MutableList.addBefore(list, null, value);
        }
    }, {
        key: 'unshift',
        value: function unshift(list, value) {
            return MutableList.addAfter(list, null, value);
        }
    }, {
        key: 'delete',
        value: function _delete(list, key) {
            return list.get(key).then(function (value) {
                return Promise.all([list.prev(key), list.next(key)]).then(function (_ref) {
                    var _ref2 = _slicedToArray(_ref, 2);

                    var prev = _ref2[0];
                    var next = _ref2[1];
                    return list.splice(prev, next);
                }).then(function () {
                    return value;
                });
            });
        }
    }, {
        key: 'deleteBefore',
        value: function deleteBefore(list, key) {
            return list.prev(key).then(function (prev) {
                return MutableList['delete'](list, prev);
            });
        }
    }, {
        key: 'deleteAfter',
        value: function deleteAfter(list, key) {
            return list.next(key).then(function (next) {
                return MutableList['delete'](list, next);
            });
        }
    }, {
        key: 'pop',
        value: function pop(list) {
            return MutableList.deleteBefore(list, null);
        }
    }, {
        key: 'shift',
        value: function shift(list) {
            return MutableList.deleteAfter(list, null);
        }
    }, {
        key: 'remove',
        value: function remove(list, value) {
            return MutableList.keyOf(list, value).then(function (key) {
                MutableList['delete'](list, key);
            });
        }
    }, {
        key: 'cache',
        value: function cache(list) {
            return new _mutable_cache2['default'](list);
        }
    }, {
        key: 'map',
        value: function map(list, getFn, setFn) {
            var _ObservableList$map = _observable_list.ObservableList.map(list, getFn);

            var get = _ObservableList$map.get;
            var prev = _ObservableList$map.prev;
            var next = _ObservableList$map.next;
            var observe = _ObservableList$map.observe;

            function set(key, value) {
                return list.set(key, setFn(value, key));
            }
            function splice(prev, next) {
                for (var _len = arguments.length, values = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    values[_key - 2] = arguments[_key];
                }

                return list.splice.apply(list, [prev, next].concat(_toConsumableArray(values.map(setFn))));
            }
            return { get: get, prev: prev, next: next, observe: observe, set: set, splice: splice };
        }
    }]);

    return MutableList;
})(_observable_list.ObservableList);

exports.MutableList = MutableList;
exports['default'] = MutableList;

},{"./mutable_cache":8,"./observable_list":13}],10:[function(require,module,exports){
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

},{"./key":6}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _observable_list = require('./observable_list');

var ObservableCache = (function (_Cache) {
    _inherits(ObservableCache, _Cache);

    function ObservableCache(list) {
        var _this = this;

        _classCallCheck(this, ObservableCache);

        _get(Object.getPrototypeOf(ObservableCache.prototype), 'constructor', this).call(this, list);
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (range) {
            if (!Array.isArray(range)) {
                var prev = _this._prev[range],
                    next = _this._next[range];
                if (prev != null) {
                    delete _this._next[prev];
                    delete _this._prev[range];
                }
                if (next != null) {
                    delete _this._prev[next];
                    delete _this._next[range];
                }
                return _this._subject.onInvalidate(range);
            }

            var _range = _slicedToArray(range, 2);

            var prev = _range[0];
            var next = _range[1];var key;
            key = prev;
            while ((key = _this._next[key]) !== undefined) {
                delete _this._next[_this._prev[key]];
                delete _this._prev[key];
                if (key == next) break;
                delete _this._byKey[key];
            }
            key = next;
            while ((key = _this._prev[key]) !== undefined) {
                delete _this._prev[_this._next[key]];
                delete _this._next[key];
                if (key == prev) break;
                delete _this._byKey[key];
            }
            _this._subject.onInvalidate(range);
        };
        this._subject = new _observable_list.ListSubject();
        list.observe(this);
    }

    return ObservableCache;
})(_cache2['default']);

exports.ObservableCache = ObservableCache;
exports['default'] = ObservableCache;

},{"./cache":4,"./observable_list":13}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _index = require('./index');

var _index2 = _interopRequireDefault(_index);

var _observable_list = require('./observable_list');

var ObservableIndex = (function (_Index) {
    _inherits(ObservableIndex, _Index);

    function ObservableIndex(list) {
        var _this = this;

        _classCallCheck(this, ObservableIndex);

        _get(Object.getPrototypeOf(ObservableIndex.prototype), 'constructor', this).call(this, list);
        this._add = function (key, index) {
            _this._byIndex[index] = key;
            _this._byKey[key] = index;
        };
        this.observe = function (observer) {
            return _this._subject.observe(observer);
        };
        this.onInvalidate = function (range) {
            var index,
                length = _this._byIndex.length;
            var index = Array.isArray(range) ? _this._byKey[range[0]] : _this._byKey[range];
            while (index++ < length) delete _this._byKey[_this._byIndex[index]];
            _this._byIndex.splice(index);
            _this._subject.onInvalidate([index == 0 ? null : index - 1, null]);
        };
        this._byKey = Object.create(null);
        this._subject = new _observable_list.ListSubject();
        list.observe(this);
    }

    return ObservableIndex;
})(_index2['default']);

exports.ObservableIndex = ObservableIndex;
exports['default'] = ObservableIndex;

},{"./index":5,"./observable_list":13}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _range = require('./range');

var _range2 = _interopRequireDefault(_range);

var _list = require('./list');

var _tree = require('./tree');

var _observable = require('./observable');

var _observable_cache = require('./observable_cache');

var _observable_cache2 = _interopRequireDefault(_observable_cache);

var _observable_index = require('./observable_index');

var _observable_index2 = _interopRequireDefault(_observable_index);

var ListSubject = (function (_Subject) {
    _inherits(ListSubject, _Subject);

    function ListSubject() {
        var _this = this;

        _classCallCheck(this, ListSubject);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        _get(Object.getPrototypeOf(ListSubject.prototype), 'constructor', this).apply(this, args);
        this.onInvalidate = function (range) {
            _this.notify(function (observer) {
                observer.onInvalidate(range);
            });
        };
    }

    return ListSubject;
})(_observable.Subject);

exports.ListSubject = ListSubject;

;

var ObservableList = (function (_List) {
    _inherits(ObservableList, _List);

    function ObservableList(list) {
        var _this2 = this;

        _classCallCheck(this, ObservableList);

        _get(Object.getPrototypeOf(ObservableList.prototype), 'constructor', this).call(this, list);
        this.observe = function (observer) {
            throw new Error('Not implemented');
        };
        this.reverse = function () {
            return ObservableList.create(ObservableList.reverse(_this2));
        };
        this.map = function (mapFn) {
            return ObservableList.create(ObservableList.map(_this2, mapFn));
        };
        this.filter = function (filterFn) {
            return ObservableList.create(ObservableList.filter(_this2, filterFn));
        };
        this.flatten = function () {
            return ObservableList.create(ObservableList.flatten(_this2));
        };
        this.flatMap = function (flatMapFn) {
            return ObservableList.create(ObservableList.flatMap(_this2, flatMapFn));
        };
        this.cache = function () {
            return ObservableList.create(ObservableList.cache(_this2));
        };
        this.index = function () {
            return ObservableList.create(ObservableList.index(_this2));
        };
        this.zip = function (other, zipFn) {
            return ObservableList.create(ObservableList.zip(_this2, other, zipFn));
        };
        this.skip = function (k) {
            return ObservableList.create(ObservableList.skip(_this2, k));
        };
        this.take = function (n) {
            return ObservableList.create(ObservableList.take(_this2, n));
        };
        this.range = function (k, n) {
            return ObservableList.create(ObservableList.range(_this2, k, n));
        };
        this.scan = function (scanFn, memo) {
            return ObservableList.create(ObservableList.scan(_this2, scanFn, memo));
        };
        if (list != null) this.observe = list.observe;
    }

    _createClass(ObservableList, null, [{
        key: 'isObservableList',
        value: function isObservableList(obj) {
            return _list.List.isList(obj) && !!obj['observe'];
        }
    }, {
        key: 'create',
        value: function create(list) {
            return new ObservableList({
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

            var get = _List$reverse.get;
            var prev = _List$reverse.prev;
            var next = _List$reverse.next;

            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(range) {
                        observer.onInvalidate(range);
                    }
                });
            }
            return { get: get, prev: prev, next: next, observe: observe };
        }
    }, {
        key: 'map',
        value: function map(list, mapFn) {
            var _List$map = _list.List.map(list, mapFn);

            var get = _List$map.get;
            var prev = _List$map.prev;
            var next = _List$map.next;

            return { get: get, prev: prev, next: next, observe: list.observe };
        }
    }, {
        key: 'filter',
        value: function filter(list, filterFn) {
            var _List$filter = _list.List.filter(list, filterFn);

            var get = _List$filter.get;
            var prev = _List$filter.prev;
            var next = _List$filter.next;

            return { get: get, prev: prev, next: next, observe: list.observe };
        }
    }, {
        key: 'flatten',
        value: function flatten(list) {
            var flat = _list.List.flatten(list),
                subject = new ListSubject(),
                subscriptions = Object.create(null);
            var cache = new _observable_cache2['default']({
                get: list.get,
                prev: list.prev,
                next: list.next,
                observe: function observe(observer) {
                    return null;
                }
            });
            function createObserver(head) {
                var onInvalidate = function onInvalidate(range) {
                    if (!Array.isArray(range)) return subject.onInvalidate(_tree.Path.toKey([head, range]));else subject.onInvalidate([_tree.Path.toKey(range[0] != null ? [head, range[0]] : [head]), _tree.Path.toKey(range[1] != null ? [head, range[1]] : [head])]);
                };
                return { onInvalidate: onInvalidate };
            }
            function prev(key) {
                return flat.prev(key).then(function (prev) {
                    var path = _tree.Path.fromKey(prev),
                        head = _tree.Path.head(path);
                    if (head != null && !subscriptions[head]) {
                        list.get(head).then(function (list) {
                            return subscriptions[head] = list.observe(createObserver(head));
                        });
                    }
                    return prev;
                });
            }
            function next(key) {
                return flat.next(key).then(function (next) {
                    var path = _tree.Path.fromKey(next),
                        head = _tree.Path.head(path);
                    if (head != null && !subscriptions[head]) {
                        list.get(head).then(function (list) {
                            return subscriptions[head] = list.observe(createObserver(head));
                        });
                    }
                    return next;
                });
            }
            list.observe({
                onInvalidate: function onInvalidate(range) {
                    // Unsubscribe from all lists in the range
                    _list.List.forEach(cache, function (value, key) {
                        if (!subscriptions[key]) return;
                        subscriptions[key].unsubscribe();
                        delete subscriptions[key];
                    }, range);
                    if (!Array.isArray(range)) subject.onInvalidate(_tree.Path.toKey([range]));else subject.onInvalidate([_tree.Path.toKey([range[0]]), _tree.Path.toKey([range[1]])]);
                    cache.onInvalidate(range);
                }
            });
            return { get: flat.get, prev: prev, next: next, observe: subject.observe };
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
        key: 'zip',
        value: function zip(list, other, zipFn) {
            list = ObservableList.index(list);
            other = ObservableList.index(other);
            function get(key) {
                return list.get(key).then(function (v) {
                    return other.get(key).then(function (w) {
                        return zipFn(v, w);
                    });
                });
            }
            function prev(key) {
                return list.prev(key).then(function () {
                    return other.prev(key);
                });
            }
            function next(key) {
                return list.next(key).then(function () {
                    return other.next(key);
                });
            }
            var subject = new ListSubject();
            list.observe(subject);
            other.observe(subject);
            return { get: get, prev: prev, next: next, observe: subject.observe };
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
            var prev = list.prev;
            var next = list.next;var scanList;
            function get(key) {
                return scanList.prev(key).then(function (p) {
                    return p == null ? memo : scanList.get(p);
                }).then(function (memo) {
                    return list.get(key).then(function (value) {
                        return scanFn(memo, value);
                    });
                });
            }
            function observe(observer) {
                return list.observe({
                    onInvalidate: function onInvalidate(range) {
                        _range2['default'].prev(list, range).then(function (prev) {
                            return observer.onInvalidate([prev, null]);
                        });
                    }
                });
            }
            scanList = ObservableList.cache({ get: get, prev: prev, next: next, observe: observe });
            return scanList;
        }
    }]);

    return ObservableList;
})(_list.List);

exports.ObservableList = ObservableList;
exports['default'] = ObservableList;

},{"./list":7,"./observable":10,"./observable_cache":11,"./observable_index":12,"./range":14,"./tree":15}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Range;
exports.Range = Range;
(function (Range) {
    function prev(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return Promise.resolve(range[0]);else return list.prev(range);
    }
    Range.prev = prev;
    function next(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return Promise.resolve(range[1]);else return list.next(range);
    }
    Range.next = next;
    function first(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return list.next(range[0]);
        return Promise.resolve(range);
    }
    Range.first = first;
    function last(list) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? [null, null] : arguments[1];

        if (Array.isArray(range)) return list.prev(range[1]);
        return Promise.resolve(range);
    }
    Range.last = last;
})(Range || (exports.Range = Range = {}));
exports["default"] = Range;

},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _list = require('./list');

;
;
var Path;
exports.Path = Path;
(function (Path) {
    function key(path) {
        return JSON.stringify(path);
    }
    Path.key = key;
    function fromKey(key) {
        return key == null ? null : JSON.parse(key.toString());
    }
    Path.fromKey = fromKey;
    function toKey(path) {
        return path == null ? null : JSON.stringify(path);
    }
    Path.toKey = toKey;
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
    function get(list, path) {
        var depth = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        return list.get(head).then(function (value) {
            if (tail.length == 0 || depth == 0) return value;
            return Tree.get(value, tail, depth);
        });
    }
    Tree.get = get;
    function prev(list) {
        var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        if ((head == null || !tail.length) && depth > 0) {
            return list.prev(head).then(function (key) {
                if (key == null) return null;
                return list.get(key).then(function (value) {
                    if (_list.List.isList(value)) return Tree.prev(value, null, depth - 1).then(function (prev) {
                        return prev == null ? null : Path.append(key, prev);
                    });
                    return [key];
                });
            });
        }
        if (tail.length && depth > 0) {
            return list.get(head).then(function (list) {
                return Tree.prev(list, tail, depth - 1);
            }).then(function (prev) {
                if (prev != null) return Path.append(head, prev);
                return list.prev(head).then(function (prev) {
                    return prev == null ? null : list.get(prev).then(function (list) {
                        return Tree.prev(list, null, depth - 1);
                    }).then(function (tail) {
                        return Path.append(prev, tail);
                    });
                });
            });
        }
        return list.prev(head).then(function (prev) {
            return prev != null ? [prev] : null;
        });
    }
    Tree.prev = prev;
    function next(list) {
        var path = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
        var depth = arguments.length <= 2 || arguments[2] === undefined ? Infinity : arguments[2];

        var head = Path.head(path),
            tail = Path.tail(path);
        if ((head == null || !tail.length) && depth > 0) {
            return list.next(head).then(function (key) {
                if (key == null) return null;
                return list.get(key).then(function (value) {
                    if (_list.List.isList(value)) return Tree.next(value, null, depth - 1).then(function (next) {
                        return next == null ? null : Path.append(key, next);
                    });
                    return [key];
                });
            });
        }
        if (tail.length && depth > 0) {
            return list.get(head).then(function (list) {
                return Tree.next(list, tail, depth - 1);
            }).then(function (next) {
                if (next != null) return Path.append(head, next);
                return list.next(head).then(function (next) {
                    return next == null ? null : list.get(next).then(function (list) {
                        return Tree.next(list, null, depth - 1);
                    }).then(function (tail) {
                        return Path.append(next, tail);
                    });
                });
            });
        }
        return list.next(head).then(function (next) {
            return next != null ? [next] : null;
        });
    }
    Tree.next = next;
    function set(list, path, value) {
        var head = path.slice(0, path.length - 1);
        var key = path[path.length - 1];
        return get(list, head).then(function (list) {
            return list.set(key, value);
        });
    }
    Tree.set = set;
    function splice(list, prev, next) {
        for (var _len = arguments.length, values = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            values[_key - 3] = arguments[_key];
        }

        var prevHead = prev.slice(0, prev.length - 1);
        var prevKey = prev[prev.length - 1];
        var nextHead = next.slice(0, next.length - 1);
        var nextKey = next[next.length - 1];
        return get(list, prevHead).then(function (list) {
            return list.splice.apply(list, [prevKey, nextKey].concat(values));
        });
    }
    Tree.splice = splice;
})(Tree || (exports.Tree = Tree = {}));
exports['default'] = Tree;

},{"./list":7}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC9jb2xsZWN0aW9uLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL2Rpc3Qva251Y2tsZXMuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvZGlzdC94aHIuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvY2FjaGUuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvaW5kZXguanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qva2V5LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2xpc3QuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3QvbXV0YWJsZV9jYWNoZS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9tdXRhYmxlX2xpc3QuanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZS5qcyIsIi9ob21lL3N0ZWZmYW4vRHJvcGJveC9QZXJzb25hbC9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9vYnNlcnZhYmxlX2NhY2hlLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfaW5kZXguanMiLCIvaG9tZS9zdGVmZmFuL0Ryb3Bib3gvUGVyc29uYWwvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZV9saXN0LmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3JhbmdlLmpzIiwiL2hvbWUvc3RlZmZhbi9Ecm9wYm94L1BlcnNvbmFsL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3RyZWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILElBQUksWUFBWSxHQUFHLENBQUMsWUFBWTtBQUFFLGFBQVMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRTtBQUFFLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQUUsZ0JBQUksVUFBVSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxBQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLFVBQVUsSUFBSSxLQUFLLENBQUMsQUFBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxBQUFDLElBQUksT0FBTyxJQUFJLFVBQVUsRUFBRSxVQUFVLENBQUMs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ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBMaXN0U3ViamVjdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L29ic2VydmFibGVfbGlzdCc7XG5pbXBvcnQgeyBNdXRhYmxlTGlzdCB9IGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L211dGFibGVfbGlzdCc7XG5pbXBvcnQgeyBYSFIgfSBmcm9tICcuL3hocic7XG5leHBvcnQgY2xhc3MgQ29sbGVjdGlvbiBleHRlbmRzIE11dGFibGVMaXN0IHtcbiAgICBjb25zdHJ1Y3Rvcih1cmxSb290KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuX2J5S2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdGhpcy5fcHJldiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX25leHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICB0aGlzLmdldCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9ieUtleVtrZXldKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fYnlLZXlba2V5XSk7XG4gICAgICAgICAgICByZXR1cm4gWEhSLmdldCh0aGlzLl91cmxSb290ICsgJy8nICsga2V5KVxuICAgICAgICAgICAgICAgIC50aGVuKHhociA9PiB4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgICAgIC50aGVuKEpTT04ucGFyc2UpXG4gICAgICAgICAgICAgICAgLnRoZW4odmFsdWUgPT4gdGhpcy5fYnlLZXlbdmFsdWVbXCJpZFwiXV0gPSB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHJldiA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9wcmV2W2tleV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9wcmV2W2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZldGNoKCkudGhlbigoKSA9PiB0aGlzLl9wcmV2W2tleV0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm5leHQgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5fbmV4dFtrZXldKVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUodGhpcy5fbmV4dFtrZXldKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mZXRjaCgpLnRoZW4oKCkgPT4gdGhpcy5fbmV4dFtrZXldKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFhIUi5wdXQodGhpcy5fdXJsUm9vdCArICcvJyArIGtleSwgdmFsdWUpXG4gICAgICAgICAgICAgICAgLnRoZW4oeGhyID0+IHhoci5yZXNwb25zZVRleHQpXG4gICAgICAgICAgICAgICAgLnRoZW4oSlNPTi5wYXJzZSlcbiAgICAgICAgICAgICAgICAudGhlbigodmFsdWUpID0+IHRoaXMuX3N1YmplY3Qub25JbnZhbGlkYXRlKHZhbHVlWydpZCddKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3BsaWNlID0gKHByZXYsIG5leHQsIC4uLnZhbHVlcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHZhbHVlcy5tYXAoKHZhbHVlKSA9PiBYSFIucG9zdCh0aGlzLl91cmxSb290LCB2YWx1ZSkpKVxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3VsdHMgPT4ge1xuICAgICAgICAgICAgICAgIHZhbHVlcyA9IHJlc3VsdHMubWFwKHhociA9PiBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpKTtcbiAgICAgICAgICAgICAgICB2YWx1ZXMuZm9yRWFjaCgodmFsdWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkID0gdmFsdWVbJ2lkJ107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2J5S2V5W2lkXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0W3ByZXZdID0gaWQ7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3ByZXZbaWRdID0gcHJldjtcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IGlkO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRbcHJldl0gPSB2YWx1ZXNbMF1bXCJpZFwiXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2W25leHRdID0gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXVtcImlkXCJdO1xuICAgICAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qub25JbnZhbGlkYXRlKFtwcmV2LCBuZXh0XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vYnNlcnZlID0gKG9ic2VydmVyKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vYnNlcnZlKG9ic2VydmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fc3ViamVjdCA9IG5ldyBMaXN0U3ViamVjdDtcbiAgICAgICAgdGhpcy5fdXJsUm9vdCA9IHVybFJvb3Q7XG4gICAgfVxuICAgIF9mZXRjaCgpIHtcbiAgICAgICAgcmV0dXJuIFhIUi5nZXQodGhpcy5fdXJsUm9vdClcbiAgICAgICAgICAgIC50aGVuKHhociA9PiB4aHIucmVzcG9uc2VUZXh0KVxuICAgICAgICAgICAgLnRoZW4oSlNPTi5wYXJzZSlcbiAgICAgICAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgICAgIHZhciBwcmV2ID0gbnVsbDtcbiAgICAgICAgICAgIHJlcy5mb3JFYWNoKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBpZCA9IHZhbHVlWydpZCddO1xuICAgICAgICAgICAgICAgIHRoaXMuX2J5S2V5W2lkXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX25leHRbcHJldl0gPSBpZDtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2W2lkXSA9IHByZXY7XG4gICAgICAgICAgICAgICAgcHJldiA9IGlkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9uZXh0W3ByZXZdID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZbJ251bGwnXSA9IHByZXY7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENvbGxlY3Rpb247XG4iLCIvLyBCdWlsZCB1cG9uIHRoZSBJTGlzdCBzdGFuZGFyZCBmcm9tIFNvbmljXG5pbXBvcnQgX1hIUiBmcm9tICcuL3hocic7XG5pbXBvcnQgX0NvbGxlY3Rpb24gZnJvbSAnLi9jb2xsZWN0aW9uJztcbmZ1bmN0aW9uIEtudWNrbGVzKGtleSwgdmFsdWUpIHtcbiAgICAvLyBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PSAyKSByZXR1cm4gS251Y2tsZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIC8vIGVsc2UgcmV0dXJuIEtudWNrbGVzLmdldChrZXkpO1xufVxuO1xudmFyIEtudWNrbGVzO1xuKGZ1bmN0aW9uIChLbnVja2xlcykge1xuICAgIC8vIGV4cG9ydCB2YXIgU29uaWMgICAgICA9IF9Tb25pYztcbiAgICBLbnVja2xlcy5YSFIgPSBfWEhSO1xuICAgIEtudWNrbGVzLkNvbGxlY3Rpb24gPSBfQ29sbGVjdGlvbjtcbn0pKEtudWNrbGVzIHx8IChLbnVja2xlcyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLbnVja2xlcztcbm1vZHVsZS5leHBvcnRzID0gS251Y2tsZXM7XG4iLCJleHBvcnQgdmFyIFhIUiA9IHtcbiAgICBjcmVhdGU6IChrZXksIG9wdGlvbnMpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgdXJsID0ga2V5LnRvU3RyaW5nKCksIHsgbWV0aG9kLCBib2R5IH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHhocik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoeGhyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KHhocik7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgeGhyLm9wZW4obWV0aG9kLCB1cmwsIHRydWUpO1xuICAgICAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICAvLyB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpXG4gICAgICAgICAgICB4aHIuc2VuZChKU09OLnN0cmluZ2lmeShib2R5KSk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgZ2V0OiAodXJsKSA9PiB7XG4gICAgICAgIHJldHVybiBYSFIuY3JlYXRlKHVybCwgeyBtZXRob2Q6IFwiR0VUXCIgfSk7XG4gICAgfSxcbiAgICBwdXQ6ICh1cmwsIGJvZHkpID0+IHtcbiAgICAgICAgcmV0dXJuIFhIUi5jcmVhdGUodXJsLCB7IG1ldGhvZDogXCJQVVRcIiwgYm9keTogYm9keSB9KTtcbiAgICB9LFxuICAgIHBvc3Q6ICh1cmwsIGJvZHkpID0+IHtcbiAgICAgICAgcmV0dXJuIFhIUi5jcmVhdGUodXJsLCB7IG1ldGhvZDogXCJQT1NUXCIsIGJvZHk6IGJvZHkgfSk7XG4gICAgfSxcbiAgICBkZWxldGU6ICh1cmwpID0+IHtcbiAgICAgICAgcmV0dXJuIFhIUi5jcmVhdGUodXJsLCB7IG1ldGhvZDogXCJERUxFVEVcIiB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGRlZmF1bHQgWEhSO1xuIiwiZXhwb3J0IGNsYXNzIENhY2hlIHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHRoaXMuZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKGtleSBpbiB0aGlzLl9ieUtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2J5S2V5W2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiB0aGlzLl9ieUtleVtrZXldID0gdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX3ByZXYpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9wcmV2W2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcHJldltrZXldID0gcHJldjtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZXh0W3ByZXZdID0ga2V5O1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubmV4dCA9IChrZXkgPSBudWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAoa2V5IGluIHRoaXMuX25leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9uZXh0W2tleV0pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmV4dFtrZXldID0gbmV4dDtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcmV2W25leHRdID0ga2V5O1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX2J5S2V5ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIHRoaXMuX25leHQgPSBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgdGhpcy5fcHJldiA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IENhY2hlO1xuIiwiaW1wb3J0IHsgTGlzdCB9IGZyb20gJy4vbGlzdCc7XG5leHBvcnQgY2xhc3MgSW5kZXgge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgdGhpcy5fYWRkID0gKGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2J5SW5kZXhbaW5kZXhdID0ga2V5O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgaWYgKDAgPD0gaW5kZXggJiYgaW5kZXggPCB0aGlzLl9ieUluZGV4Lmxlbmd0aClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5nZXQodGhpcy5fYnlJbmRleFtpbmRleF0pO1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmluZCh0aGlzLCAodmFsdWUsIGtleSkgPT4ga2V5ID09PSBpbmRleCwgdGhpcy5fYnlJbmRleC5sZW5ndGggLSAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5wcmV2ID0gKGluZGV4KSA9PiB7XG4gICAgICAgICAgICBpZiAoaW5kZXggIT0gbnVsbCAmJiAwIDw9IGluZGV4ICYmIGluZGV4IDwgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbmRleCAtIDEgPCAwID8gbnVsbCA6IGluZGV4IC0gMSk7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5zb21lKHRoaXMsICh2YWx1ZSwga2V5KSA9PiBrZXkgPT09IGluZGV4IC0gMSwgdGhpcy5fYnlJbmRleC5sZW5ndGggLSAxKS50aGVuKGZvdW5kID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZm91bmQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBpbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ieUluZGV4Lmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubmV4dCA9IChpbmRleCkgPT4ge1xuICAgICAgICAgICAgdmFyIG5leHQgPSBpbmRleCA9PSBudWxsID8gMCA6IGluZGV4ICsgMTtcbiAgICAgICAgICAgIGlmIChuZXh0IDwgdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXh0KTtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LnNvbWUodGhpcy5fbGlzdCwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGQoa2V5LCB0aGlzLl9ieUluZGV4Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQgPT09IHRoaXMuX2J5SW5kZXgubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIH0sIHRoaXMuX2J5SW5kZXhbdGhpcy5fYnlJbmRleC5sZW5ndGggLSAxXSkudGhlbihmb3VuZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGZvdW5kKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCA9PT0gdGhpcy5fYnlJbmRleC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ieUluZGV4ID0gW107XG4gICAgICAgIHRoaXMuX2xpc3QgPSBsaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IEluZGV4O1xuIiwidmFyIEtleTtcbihmdW5jdGlvbiAoS2V5KSB7XG4gICAgdmFyIHVuaXF1ZUtleSA9IDA7XG4gICAgZnVuY3Rpb24ga2V5KGtleSkge1xuICAgICAgICByZXR1cm4ga2V5LnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIEtleS5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4gdW5pcXVlS2V5Kys7XG4gICAgfVxuICAgIEtleS5jcmVhdGUgPSBjcmVhdGU7XG59KShLZXkgfHwgKEtleSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBLZXk7XG4iLCJpbXBvcnQgUmFuZ2UgZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcbmltcG9ydCBDYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCBJbmRleCBmcm9tICcuL2luZGV4JztcbmV4cG9ydCBjbGFzcyBMaXN0IHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHRoaXMuZ2V0ID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnByZXYgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJOb3QgaW1wbGVtZW50ZWRcIik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubmV4dCA9IChrZXkpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maXJzdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmZpcnN0KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmxhc3QgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5sYXN0KHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmV2ZXJ5ID0gKHByZWRpY2F0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZXZlcnkodGhpcywgcHJlZGljYXRlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zb21lID0gKHByZWRpY2F0ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3Quc29tZSh0aGlzLCBwcmVkaWNhdGUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZvckVhY2ggPSAoZm4sIHJhbmdlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5mb3JFYWNoKHRoaXMsIGZuLCByYW5nZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVkdWNlID0gKGZuLCBtZW1vLCByYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QucmVkdWNlKHRoaXMsIGZuLCBtZW1vLCByYW5nZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudG9BcnJheSA9IChyYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QudG9BcnJheSh0aGlzLCByYW5nZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmluZEtleSA9IChmbiwgcmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmZpbmRLZXkodGhpcywgZm4sIHJhbmdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maW5kID0gKGZuLCByYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmluZCh0aGlzLCBmbiwgcmFuZ2UpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmtleU9mID0gKHZhbHVlLCByYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3Qua2V5T2YodGhpcywgdmFsdWUsIHJhbmdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5pbmRleE9mID0gKHZhbHVlLCByYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuaW5kZXhPZih0aGlzLCB2YWx1ZSwgcmFuZ2UpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmtleUF0ID0gKGluZGV4LCByYW5nZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3Qua2V5QXQodGhpcywgaW5kZXgsIHJhbmdlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hdCA9IChpbmRleCwgcmFuZ2UpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmF0KHRoaXMsIGluZGV4LCByYW5nZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuY29udGFpbnMgPSAodmFsdWUsIHJhbmdlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jb250YWlucyh0aGlzLCB2YWx1ZSwgcmFuZ2UpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJldmVyc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5yZXZlcnNlKHRoaXMpKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5tYXAgPSAobWFwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0Lm1hcCh0aGlzLCBtYXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZpbHRlciA9IChmaWx0ZXJGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuZmlsdGVyKHRoaXMsIGZpbHRlckZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdHRlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LmZsYXR0ZW4odGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmZsYXRNYXAgPSAoZmxhdE1hcEZuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5mbGF0TWFwKHRoaXMsIGZsYXRNYXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNhY2hlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuY2FjaGUodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdyb3VwID0gKGdyb3VwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0Lmdyb3VwKHRoaXMsIGdyb3VwRm4pKS5tYXAoTGlzdC5jcmVhdGUpLmNhY2hlKCk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuaW5kZXggPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5pbmRleCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuemlwID0gKG90aGVyLCB6aXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3QuemlwKHRoaXMsIG90aGVyLCB6aXBGbikpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNraXAgPSAoaykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKExpc3Quc2tpcCh0aGlzLCBrKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMudGFrZSA9IChuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC50YWtlKHRoaXMsIG4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yYW5nZSA9IChrLCBuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoTGlzdC5yYW5nZSh0aGlzLCBrLCBuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2NhbiA9IChzY2FuRm4sIG1lbW8pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShMaXN0LnNjYW4odGhpcywgc2NhbkZuLCBtZW1vKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZ2V0ID0gbGlzdC5nZXQ7XG4gICAgICAgICAgICB0aGlzLnByZXYgPSBsaXN0LnByZXY7XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBsaXN0Lm5leHQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgO1xuICAgIHN0YXRpYyBpc0xpc3Qob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmogIT0gbnVsbCAmJiAhIW9ialsnZ2V0J10gJiYgISFvYmpbJ3ByZXYnXSAmJiAhIW9ialsnbmV4dCddO1xuICAgIH1cbiAgICBzdGF0aWMgY3JlYXRlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBMaXN0KHtcbiAgICAgICAgICAgIGdldDogbGlzdC5nZXQsXG4gICAgICAgICAgICBwcmV2OiBsaXN0LnByZXYsXG4gICAgICAgICAgICBuZXh0OiBsaXN0Lm5leHRcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBmaXJzdChsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0Lm5leHQoKS50aGVuKGxpc3QuZ2V0KTtcbiAgICB9XG4gICAgc3RhdGljIGxhc3QobGlzdCkge1xuICAgICAgICByZXR1cm4gbGlzdC5wcmV2KCkudGhlbihsaXN0LmdldCk7XG4gICAgfVxuICAgIHN0YXRpYyBldmVyeShsaXN0LCBwcmVkaWNhdGUsIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBSYW5nZS5sYXN0KGxpc3QsIHJhbmdlKS50aGVuKGxhc3QgPT4ge1xuICAgICAgICAgICAgdmFyIGxvb3AgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBudWxsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRydWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKHZhbHVlID0+IHByZWRpY2F0ZSh2YWx1ZSwga2V5KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcyA9PT0gZmFsc2UgPyBmYWxzZSA6IGtleSA9PSBsYXN0ID8gdHJ1ZSA6IGxpc3QubmV4dChrZXkpLnRoZW4obG9vcCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIFJhbmdlLmZpcnN0KGxpc3QsIHJhbmdlKS50aGVuKGxvb3ApO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHNvbWUobGlzdCwgcHJlZGljYXRlLCByYW5nZSkge1xuICAgICAgICByZXR1cm4gUmFuZ2UubGFzdChsaXN0LCByYW5nZSkudGhlbihsYXN0ID0+IHtcbiAgICAgICAgICAgIHZhciBsb29wID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChrZXkgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShmYWxzZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4odmFsdWUgPT4gcHJlZGljYXRlKHZhbHVlLCBrZXkpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzID09PSB0cnVlID8gdHJ1ZSA6IGtleSA9PSBsYXN0ID8gZmFsc2UgOiBsaXN0Lm5leHQoa2V5KS50aGVuKGxvb3ApO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBSYW5nZS5maXJzdChsaXN0LCByYW5nZSkudGhlbihsb29wKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBmb3JFYWNoKGxpc3QsIGZuLCByYW5nZSkge1xuICAgICAgICByZXR1cm4gTGlzdC5ldmVyeShsaXN0LCAodmFsdWUsIGtleSkgPT4geyBmbih2YWx1ZSwga2V5KTsgcmV0dXJuIHRydWU7IH0sIHJhbmdlKS50aGVuKCgpID0+IHsgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByZWR1Y2UobGlzdCwgZm4sIG1lbW8sIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZvckVhY2gobGlzdCwgKHZhbHVlLCBrZXkpID0+IG1lbW8gPSBmbihtZW1vLCB2YWx1ZSwga2V5KSwgcmFuZ2UpLnRoZW4oKCkgPT4gbWVtbyk7XG4gICAgfVxuICAgIHN0YXRpYyB0b0FycmF5KGxpc3QsIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LnJlZHVjZShsaXN0LCAobWVtbywgdmFsdWUpID0+IChtZW1vLnB1c2godmFsdWUpLCBtZW1vKSwgW10sIHJhbmdlKTtcbiAgICB9XG4gICAgc3RhdGljIGZpbmRLZXkobGlzdCwgZm4sIHJhbmdlKSB7XG4gICAgICAgIHZhciBrZXk7XG4gICAgICAgIHJldHVybiBMaXN0LnNvbWUobGlzdCwgKHYsIGspID0+IFByb21pc2UucmVzb2x2ZShmbih2LCBrKSkudGhlbihyZXMgPT4gcmVzID8gKCEhKGtleSA9IGspIHx8IHRydWUpIDogZmFsc2UpLCByYW5nZSkudGhlbihmb3VuZCA9PiBmb3VuZCA/IGtleSA6IG51bGwpO1xuICAgIH1cbiAgICBzdGF0aWMgZmluZChsaXN0LCBmbiwgcmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIExpc3QuZmluZEtleShsaXN0LCBmbiwgcmFuZ2UpLnRoZW4obGlzdC5nZXQpO1xuICAgIH1cbiAgICBzdGF0aWMga2V5T2YobGlzdCwgdmFsdWUsIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZpbmRLZXkobGlzdCwgdiA9PiB2ID09PSB2YWx1ZSwgcmFuZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgaW5kZXhPZihsaXN0LCB2YWx1ZSwgcmFuZ2UpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIHJldHVybiBMaXN0LnNvbWUobGlzdCwgKHYsIGspID0+IHZhbHVlID09IHYgPyAoISEoaW5kZXgrKykgfHwgdHJ1ZSkgOiBmYWxzZSwgcmFuZ2UpLnRoZW4oKGZvdW5kKSA9PiB7IGlmIChmb3VuZCkge1xuICAgICAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCk7XG4gICAgICAgIH0gfSk7XG4gICAgfVxuICAgIHN0YXRpYyBrZXlBdChsaXN0LCBpbmRleCwgcmFuZ2UpIHtcbiAgICAgICAgcmV0dXJuIExpc3QuZmluZEtleShsaXN0LCAoKSA9PiAwID09PSBpbmRleC0tKTtcbiAgICB9XG4gICAgc3RhdGljIGF0KGxpc3QsIGluZGV4LCByYW5nZSkge1xuICAgICAgICByZXR1cm4gTGlzdC5rZXlBdChsaXN0LCBpbmRleCwgcmFuZ2UpLnRoZW4obGlzdC5nZXQpO1xuICAgIH1cbiAgICBzdGF0aWMgY29udGFpbnMobGlzdCwgdmFsdWUsIHJhbmdlKSB7XG4gICAgICAgIHJldHVybiBMaXN0LnNvbWUobGlzdCwgdiA9PiB2ID09PSB2YWx1ZSwgcmFuZ2UpO1xuICAgIH1cbiAgICBzdGF0aWMgcmV2ZXJzZShsaXN0KSB7XG4gICAgICAgIHZhciB7IGdldCB9ID0gbGlzdDtcbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm5leHQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QucHJldihrZXkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgbWFwKGxpc3QsIG1hcEZuKSB7XG4gICAgICAgIHZhciB7IHByZXYsIG5leHQgfSA9IGxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpLnRoZW4odmFsdWUgPT4gbWFwRm4odmFsdWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgZmlsdGVyKGxpc3QsIGZpbHRlckZuKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJGbih2YWx1ZSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5maW5kS2V5KExpc3QucmV2ZXJzZShsaXN0KSwgZmlsdGVyRm4sIFtrZXksIG51bGxdKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmluZEtleShsaXN0LCBmaWx0ZXJGbiwgW2tleSwgbnVsbF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgZmxhdHRlbihsaXN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5mcm9tS2V5KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gVHJlZS5nZXQobGlzdCwgcGF0aCwgMSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5mcm9tS2V5KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gVHJlZS5wcmV2KGxpc3QsIHBhdGgsIDEpLnRoZW4oUGF0aC50b0tleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5mcm9tS2V5KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gVHJlZS5uZXh0KGxpc3QsIHBhdGgsIDEpLnRoZW4oUGF0aC50b0tleSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIHN0YXRpYyBmbGF0TWFwKGxpc3QsIGZsYXRNYXBGbikge1xuICAgICAgICByZXR1cm4gTGlzdC5mbGF0dGVuKExpc3QubWFwKGxpc3QsIGZsYXRNYXBGbikpO1xuICAgIH1cbiAgICBzdGF0aWMgY2FjaGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IENhY2hlKGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgZ3JvdXAobGlzdCwgZ3JvdXBGbikge1xuICAgICAgICB2YXIgZ3JvdXBzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGdyb3VwS2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5maW5kS2V5KGxpc3QsICh2YWx1ZSwga2V5KSA9PiBncm91cEZuKHZhbHVlLCBrZXkpID09PSBncm91cEtleSlcbiAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBncm91cHNbZ3JvdXBLZXldID0gTGlzdC5maWx0ZXIobGlzdCwgKHZhbHVlLCBrZXkpID0+IGdyb3VwS2V5ID09PSBncm91cEZuKHZhbHVlLCBrZXkpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihncm91cEtleSkge1xuICAgICAgICAgICAgcmV0dXJuIExpc3QuZmluZEtleShMaXN0LnJldmVyc2UobGlzdCksICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9ncm91cEtleSA9IGdyb3VwRm4odmFsdWUsIGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9ncm91cEtleSAhPT0gZ3JvdXBLZXkgJiYgIWdyb3Vwc1tfZ3JvdXBLZXldO1xuICAgICAgICAgICAgfSkudGhlbihrZXkgPT4ga2V5ID09IG51bGwgPyBudWxsIDogbGlzdC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IGdyb3VwRm4odmFsdWUsIGtleSkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGdyb3VwS2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gTGlzdC5maW5kS2V5KGxpc3QsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIF9ncm91cEtleSA9IGdyb3VwRm4odmFsdWUsIGtleSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9ncm91cEtleSAhPT0gZ3JvdXBLZXkgJiYgIWdyb3Vwc1tfZ3JvdXBLZXldO1xuICAgICAgICAgICAgfSkudGhlbihrZXkgPT4ga2V5ID09IG51bGwgPyBudWxsIDogbGlzdC5nZXQoa2V5KS50aGVuKHZhbHVlID0+IGdyb3VwRm4odmFsdWUsIGtleSkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IENhY2hlKHsgZ2V0LCBwcmV2LCBuZXh0IH0pO1xuICAgIH1cbiAgICBzdGF0aWMgaW5kZXgobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IEluZGV4KGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgemlwKGxpc3QsIG90aGVyLCB6aXBGbikge1xuICAgICAgICBsaXN0ID0gTGlzdC5pbmRleChsaXN0KTtcbiAgICAgICAgb3RoZXIgPSBMaXN0LmluZGV4KG90aGVyKTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3QuZ2V0KGtleSkudGhlbih2ID0+IG90aGVyLmdldChrZXkpLnRoZW4odyA9PiB6aXBGbih2LCB3KSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5wcmV2KGtleSkudGhlbigoKSA9PiBvdGhlci5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGtleSkudGhlbigoKSA9PiBvdGhlci5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBzdGF0aWMgc2tpcChsaXN0LCBrKSB7XG4gICAgICAgIHJldHVybiBMaXN0LmZpbHRlcihMaXN0LmluZGV4KGxpc3QpLCBmdW5jdGlvbiAodmFsdWUsIGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSA+PSBrO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHRha2UobGlzdCwgbikge1xuICAgICAgICByZXR1cm4gTGlzdC5maWx0ZXIoTGlzdC5pbmRleChsaXN0KSwgZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgPCBuO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJhbmdlKGxpc3QsIGssIG4pIHtcbiAgICAgICAgcmV0dXJuIExpc3QuZmlsdGVyKExpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGsgJiYga2V5IDwgbiArIGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgc2NhbihsaXN0LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIHsgcHJldiwgbmV4dCB9ID0gbGlzdCwgc2Nhbkxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2FuTGlzdC5wcmV2KGtleSkudGhlbihwID0+IHAgPT0gbnVsbCA/IG1lbW8gOiBzY2FuTGlzdC5nZXQocCkpLnRoZW4obWVtbyA9PiBsaXN0LmdldChrZXkpLnRoZW4odmFsdWUgPT4gc2NhbkZuKG1lbW8sIHZhbHVlKSkpO1xuICAgICAgICB9XG4gICAgICAgIHNjYW5MaXN0ID0gTGlzdC5jYWNoZSh7IGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICAgICAgcmV0dXJuIHNjYW5MaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG4iLCJpbXBvcnQgT2JzZXJ2YWJsZUNhY2hlIGZyb20gJy4vb2JzZXJ2YWJsZV9jYWNoZSc7XG5leHBvcnQgY2xhc3MgTXV0YWJsZUNhY2hlIGV4dGVuZHMgT2JzZXJ2YWJsZUNhY2hlIHtcbiAgICBjb25zdHJ1Y3RvcihsaXN0KSB7XG4gICAgICAgIHN1cGVyKGxpc3QpO1xuICAgICAgICB0aGlzLnNldCA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3BsaWNlID0gKHByZXYsIG5leHQsIC4uLnZhbHVlcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3Quc3BsaWNlKHByZXYsIG5leHQsIC4uLnZhbHVlcyk7XG4gICAgICAgIH07XG4gICAgfVxufVxuZXhwb3J0IGRlZmF1bHQgTXV0YWJsZUNhY2hlO1xuIiwiaW1wb3J0IHsgT2JzZXJ2YWJsZUxpc3QgfSBmcm9tICcuL29ic2VydmFibGVfbGlzdCc7XG5pbXBvcnQgTXV0YWJsZUNhY2hlIGZyb20gJy4vbXV0YWJsZV9jYWNoZSc7XG5leHBvcnQgY2xhc3MgTXV0YWJsZUxpc3QgZXh0ZW5kcyBPYnNlcnZhYmxlTGlzdCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICBzdXBlcihsaXN0KTtcbiAgICAgICAgdGhpcy5zZXQgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnNwbGljZSA9IChwcmV2LCBuZXh0LCAuLi52YWx1ZXMpID0+IHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIk5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRCZWZvcmUgPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmFkZEJlZm9yZSh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5hZGRBZnRlciA9IChrZXksIHZhbHVlKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuYWRkQWZ0ZXIodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucHVzaCA9ICh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnB1c2godGhpcywgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnVuc2hpZnQgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC51bnNoaWZ0KHRoaXMsIHZhbHVlKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5kZWxldGUgPSAoa2V5KSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlKHRoaXMsIGtleSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZGVsZXRlQmVmb3JlID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZUJlZm9yZSh0aGlzLCBrZXkpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmRlbGV0ZUFmdGVyID0gKGtleSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmRlbGV0ZUFmdGVyKHRoaXMsIGtleSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucG9wID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LnBvcCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zaGlmdCA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5zaGlmdCh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZW1vdmUgPSAodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5yZW1vdmUodGhpcywgdmFsdWUpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmNhY2hlID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmNyZWF0ZShNdXRhYmxlTGlzdC5jYWNoZSh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubWFwID0gKGdldEZuLCBzZXRGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmNyZWF0ZShNdXRhYmxlTGlzdC5tYXAodGhpcywgZ2V0Rm4sIHNldEZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChsaXN0ICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0ID0gbGlzdC5zZXQ7XG4gICAgICAgICAgICB0aGlzLnNwbGljZSA9IGxpc3Quc3BsaWNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHN0YXRpYyBpc011dGFibGVMaXN0KG9iaikge1xuICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuaXNPYnNlcnZhYmxlTGlzdChvYmopICYmICEhb2JqWydzZXQnXSAmJiAhIW9ialsnc3BsaWNlJ107XG4gICAgfVxuICAgIHN0YXRpYyBjcmVhdGUobGlzdCkge1xuICAgICAgICByZXR1cm4gbmV3IE11dGFibGVMaXN0KHtcbiAgICAgICAgICAgIGdldDogbGlzdC5nZXQsXG4gICAgICAgICAgICBwcmV2OiBsaXN0LnByZXYsXG4gICAgICAgICAgICBuZXh0OiBsaXN0Lm5leHQsXG4gICAgICAgICAgICBvYnNlcnZlOiBsaXN0Lm9ic2VydmUsXG4gICAgICAgICAgICBzZXQ6IGxpc3Quc2V0LFxuICAgICAgICAgICAgc3BsaWNlOiBsaXN0LnNwbGljZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIGFkZEJlZm9yZShsaXN0LCBrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBsaXN0LnByZXYoa2V5KS50aGVuKHByZXYgPT4gbGlzdC5zcGxpY2UocHJldiwga2V5LCB2YWx1ZSkpLnRoZW4oKCkgPT4gbGlzdC5wcmV2KGtleSkpO1xuICAgIH1cbiAgICBzdGF0aWMgYWRkQWZ0ZXIobGlzdCwga2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGtleSkudGhlbihuZXh0ID0+IGxpc3Quc3BsaWNlKGtleSwgbmV4dCwgdmFsdWUpKS50aGVuKCgpID0+IGxpc3QubmV4dChrZXkpKTtcbiAgICB9XG4gICAgc3RhdGljIHB1c2gobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmFkZEJlZm9yZShsaXN0LCBudWxsLCB2YWx1ZSk7XG4gICAgfVxuICAgIHN0YXRpYyB1bnNoaWZ0KGxpc3QsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBNdXRhYmxlTGlzdC5hZGRBZnRlcihsaXN0LCBudWxsLCB2YWx1ZSk7XG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGUobGlzdCwga2V5KSB7XG4gICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtsaXN0LnByZXYoa2V5KSwgbGlzdC5uZXh0KGtleSldKS50aGVuKChbcHJldiwgbmV4dF0pID0+IGxpc3Quc3BsaWNlKHByZXYsIG5leHQpKS50aGVuKCgpID0+IHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyBkZWxldGVCZWZvcmUobGlzdCwga2V5KSB7XG4gICAgICAgIHJldHVybiBsaXN0LnByZXYoa2V5KS50aGVuKHByZXYgPT4gTXV0YWJsZUxpc3QuZGVsZXRlKGxpc3QsIHByZXYpKTtcbiAgICB9XG4gICAgc3RhdGljIGRlbGV0ZUFmdGVyKGxpc3QsIGtleSkge1xuICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGtleSkudGhlbihuZXh0ID0+IE11dGFibGVMaXN0LmRlbGV0ZShsaXN0LCBuZXh0KSk7XG4gICAgfVxuICAgIHN0YXRpYyBwb3AobGlzdCkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQmVmb3JlKGxpc3QsIG51bGwpO1xuICAgIH1cbiAgICBzdGF0aWMgc2hpZnQobGlzdCkge1xuICAgICAgICByZXR1cm4gTXV0YWJsZUxpc3QuZGVsZXRlQWZ0ZXIobGlzdCwgbnVsbCk7XG4gICAgfVxuICAgIHN0YXRpYyByZW1vdmUobGlzdCwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIE11dGFibGVMaXN0LmtleU9mKGxpc3QsIHZhbHVlKS50aGVuKGtleSA9PiB7IE11dGFibGVMaXN0LmRlbGV0ZShsaXN0LCBrZXkpOyB9KTtcbiAgICB9XG4gICAgc3RhdGljIGNhY2hlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBNdXRhYmxlQ2FjaGUobGlzdCk7XG4gICAgfVxuICAgIHN0YXRpYyBtYXAobGlzdCwgZ2V0Rm4sIHNldEZuKSB7XG4gICAgICAgIHZhciB7IGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSB9ID0gT2JzZXJ2YWJsZUxpc3QubWFwKGxpc3QsIGdldEZuKTtcbiAgICAgICAgZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LnNldChrZXksIHNldEZuKHZhbHVlLCBrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBzcGxpY2UocHJldiwgbmV4dCwgLi4udmFsdWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5zcGxpY2UocHJldiwgbmV4dCwgLi4udmFsdWVzLm1hcChzZXRGbikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSwgc2V0LCBzcGxpY2UgfTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBNdXRhYmxlTGlzdDtcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IGNsYXNzIFN1YmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLm9ic2VydmUgPSAob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHZhciBvYnNlcnZlcktleSA9IEtleS5jcmVhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuX29ic2VydmVyc1tvYnNlcnZlcktleV0gPSBvYnNlcnZlcjtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdW5zdWJzY3JpYmU6ICgpID0+IHsgZGVsZXRlIHRoaXMuX29ic2VydmVyc1tvYnNlcnZlcktleV07IH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMubm90aWZ5ID0gKG5vdGlmaWVyKSA9PiB7XG4gICAgICAgICAgICBmb3IgKHZhciBvYnNlcnZlcktleSBpbiB0aGlzLl9vYnNlcnZlcnMpXG4gICAgICAgICAgICAgICAgbm90aWZpZXIodGhpcy5fb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX29ic2VydmVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgfVxufVxuIiwiaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IHsgTGlzdFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGVfbGlzdCc7XG5leHBvcnQgY2xhc3MgT2JzZXJ2YWJsZUNhY2hlIGV4dGVuZHMgQ2FjaGUge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgc3VwZXIobGlzdCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N1YmplY3Qub2JzZXJ2ZShvYnNlcnZlcik7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25JbnZhbGlkYXRlID0gKHJhbmdlKSA9PiB7XG4gICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkocmFuZ2UpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXYgPSB0aGlzLl9wcmV2W3JhbmdlXSwgbmV4dCA9IHRoaXMuX25leHRbcmFuZ2VdO1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX25leHRbcHJldl07XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2W3JhbmdlXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fcHJldltuZXh0XTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX25leHRbcmFuZ2VdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3ViamVjdC5vbkludmFsaWRhdGUocmFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIFtwcmV2LCBuZXh0XSA9IHJhbmdlLCBrZXk7XG4gICAgICAgICAgICBrZXkgPSBwcmV2O1xuICAgICAgICAgICAgd2hpbGUgKChrZXkgPSB0aGlzLl9uZXh0W2tleV0pICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fbmV4dFt0aGlzLl9wcmV2W2tleV1dO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2W2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSBuZXh0KVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5fYnlLZXlba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtleSA9IG5leHQ7XG4gICAgICAgICAgICB3aGlsZSAoKGtleSA9IHRoaXMuX3ByZXZba2V5XSkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9wcmV2W3RoaXMuX25leHRba2V5XV07XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX25leHRba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IHByZXYpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLl9ieUtleVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fc3ViamVjdC5vbkludmFsaWRhdGUocmFuZ2UpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9zdWJqZWN0ID0gbmV3IExpc3RTdWJqZWN0KCk7XG4gICAgICAgIGxpc3Qub2JzZXJ2ZSh0aGlzKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBPYnNlcnZhYmxlQ2FjaGU7XG4iLCJpbXBvcnQgSW5kZXggZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBMaXN0U3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZV9saXN0JztcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlSW5kZXggZXh0ZW5kcyBJbmRleCB7XG4gICAgY29uc3RydWN0b3IobGlzdCkge1xuICAgICAgICBzdXBlcihsaXN0KTtcbiAgICAgICAgdGhpcy5fYWRkID0gKGtleSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2J5SW5kZXhbaW5kZXhdID0ga2V5O1xuICAgICAgICAgICAgdGhpcy5fYnlLZXlba2V5XSA9IGluZGV4O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9ic2VydmUgPSAob2JzZXJ2ZXIpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdWJqZWN0Lm9ic2VydmUob2JzZXJ2ZXIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uSW52YWxpZGF0ZSA9IChyYW5nZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGluZGV4LCBsZW5ndGggPSB0aGlzLl9ieUluZGV4Lmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IEFycmF5LmlzQXJyYXkocmFuZ2UpID8gdGhpcy5fYnlLZXlbcmFuZ2VbMF1dIDogdGhpcy5fYnlLZXlbcmFuZ2VdO1xuICAgICAgICAgICAgd2hpbGUgKGluZGV4KysgPCBsZW5ndGgpXG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2J5S2V5W3RoaXMuX2J5SW5kZXhbaW5kZXhdXTtcbiAgICAgICAgICAgIHRoaXMuX2J5SW5kZXguc3BsaWNlKGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuX3N1YmplY3Qub25JbnZhbGlkYXRlKFtpbmRleCA9PSAwID8gbnVsbCA6IGluZGV4IC0gMSwgbnVsbF0pO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9ieUtleSA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHRoaXMuX3N1YmplY3QgPSBuZXcgTGlzdFN1YmplY3QoKTtcbiAgICAgICAgbGlzdC5vYnNlcnZlKHRoaXMpO1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGVJbmRleDtcbiIsImltcG9ydCBSYW5nZSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IHsgUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBPYnNlcnZhYmxlQ2FjaGUgZnJvbSAnLi9vYnNlcnZhYmxlX2NhY2hlJztcbmltcG9ydCBPYnNlcnZhYmxlSW5kZXggZnJvbSAnLi9vYnNlcnZhYmxlX2luZGV4JztcbmV4cG9ydCBjbGFzcyBMaXN0U3ViamVjdCBleHRlbmRzIFN1YmplY3Qge1xuICAgIGNvbnN0cnVjdG9yKC4uLmFyZ3MpIHtcbiAgICAgICAgc3VwZXIoLi4uYXJncyk7XG4gICAgICAgIHRoaXMub25JbnZhbGlkYXRlID0gKHJhbmdlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm5vdGlmeShvYnNlcnZlciA9PiB7IG9ic2VydmVyLm9uSW52YWxpZGF0ZShyYW5nZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cbn1cbjtcbmV4cG9ydCBjbGFzcyBPYnNlcnZhYmxlTGlzdCBleHRlbmRzIExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKGxpc3QpIHtcbiAgICAgICAgc3VwZXIobGlzdCk7XG4gICAgICAgIHRoaXMub2JzZXJ2ZSA9IChvYnNlcnZlcikgPT4ge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiTm90IGltcGxlbWVudGVkXCIpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnJldmVyc2UgPSAoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnJldmVyc2UodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1hcCA9IChtYXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5tYXAodGhpcywgbWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5maWx0ZXIgPSAoZmlsdGVyRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmlsdGVyKHRoaXMsIGZpbHRlckZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdHRlbiA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmxhdHRlbih0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZmxhdE1hcCA9IChmbGF0TWFwRm4pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuZmxhdE1hcCh0aGlzLCBmbGF0TWFwRm4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5jYWNoZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5jcmVhdGUoT2JzZXJ2YWJsZUxpc3QuY2FjaGUodGhpcykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLmluZGV4ID0gKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5pbmRleCh0aGlzKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuemlwID0gKG90aGVyLCB6aXBGbikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC56aXAodGhpcywgb3RoZXIsIHppcEZuKSk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc2tpcCA9IChrKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnNraXAodGhpcywgaykpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnRha2UgPSAobikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC50YWtlKHRoaXMsIG4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yYW5nZSA9IChrLCBuKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gT2JzZXJ2YWJsZUxpc3QuY3JlYXRlKE9ic2VydmFibGVMaXN0LnJhbmdlKHRoaXMsIGssIG4pKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zY2FuID0gKHNjYW5GbiwgbWVtbykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIE9ic2VydmFibGVMaXN0LmNyZWF0ZShPYnNlcnZhYmxlTGlzdC5zY2FuKHRoaXMsIHNjYW5GbiwgbWVtbykpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAobGlzdCAhPSBudWxsKVxuICAgICAgICAgICAgdGhpcy5vYnNlcnZlID0gbGlzdC5vYnNlcnZlO1xuICAgIH1cbiAgICBzdGF0aWMgaXNPYnNlcnZhYmxlTGlzdChvYmopIHtcbiAgICAgICAgcmV0dXJuIExpc3QuaXNMaXN0KG9iaikgJiYgISFvYmpbJ29ic2VydmUnXTtcbiAgICB9XG4gICAgc3RhdGljIGNyZWF0ZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZUxpc3Qoe1xuICAgICAgICAgICAgZ2V0OiBsaXN0LmdldCxcbiAgICAgICAgICAgIHByZXY6IGxpc3QucHJldixcbiAgICAgICAgICAgIG5leHQ6IGxpc3QubmV4dCxcbiAgICAgICAgICAgIG9ic2VydmU6IGxpc3Qub2JzZXJ2ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgc3RhdGljIHJldmVyc2UobGlzdCkge1xuICAgICAgICB2YXIgeyBnZXQsIHByZXYsIG5leHQgfSA9IExpc3QucmV2ZXJzZShsaXN0KTtcbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZShvYnNlcnZlcikge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Qub2JzZXJ2ZSh7XG4gICAgICAgICAgICAgICAgb25JbnZhbGlkYXRlOiBmdW5jdGlvbiAocmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIub25JbnZhbGlkYXRlKHJhbmdlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQsIG9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIG1hcChsaXN0LCBtYXBGbikge1xuICAgICAgICB2YXIgeyBnZXQsIHByZXYsIG5leHQgfSA9IExpc3QubWFwKGxpc3QsIG1hcEZuKTtcbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0LCBvYnNlcnZlOiBsaXN0Lm9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZpbHRlcihsaXN0LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgeyBnZXQsIHByZXYsIG5leHQgfSA9IExpc3QuZmlsdGVyKGxpc3QsIGZpbHRlckZuKTtcbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0LCBvYnNlcnZlOiBsaXN0Lm9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZsYXR0ZW4obGlzdCkge1xuICAgICAgICB2YXIgZmxhdCA9IExpc3QuZmxhdHRlbihsaXN0KSwgc3ViamVjdCA9IG5ldyBMaXN0U3ViamVjdCgpLCBzdWJzY3JpcHRpb25zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIGNhY2hlID0gbmV3IE9ic2VydmFibGVDYWNoZSh7XG4gICAgICAgICAgICBnZXQ6IGxpc3QuZ2V0LFxuICAgICAgICAgICAgcHJldjogbGlzdC5wcmV2LFxuICAgICAgICAgICAgbmV4dDogbGlzdC5uZXh0LFxuICAgICAgICAgICAgb2JzZXJ2ZTogKG9ic2VydmVyKSA9PiBudWxsXG4gICAgICAgIH0pO1xuICAgICAgICBmdW5jdGlvbiBjcmVhdGVPYnNlcnZlcihoZWFkKSB7XG4gICAgICAgICAgICB2YXIgb25JbnZhbGlkYXRlID0gKHJhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJhbmdlKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN1YmplY3Qub25JbnZhbGlkYXRlKFBhdGgudG9LZXkoW2hlYWQsIHJhbmdlXSkpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5vbkludmFsaWRhdGUoW1BhdGgudG9LZXkocmFuZ2VbMF0gIT0gbnVsbCA/IFtoZWFkLCByYW5nZVswXV0gOiBbaGVhZF0pLCBQYXRoLnRvS2V5KHJhbmdlWzFdICE9IG51bGwgPyBbaGVhZCwgcmFuZ2VbMV1dIDogW2hlYWRdKV0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB7IG9uSW52YWxpZGF0ZSB9O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmxhdC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0aCA9IFBhdGguZnJvbUtleShwcmV2KSwgaGVhZCA9IFBhdGguaGVhZChwYXRoKTtcbiAgICAgICAgICAgICAgICBpZiAoaGVhZCAhPSBudWxsICYmICFzdWJzY3JpcHRpb25zW2hlYWRdKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QuZ2V0KGhlYWQpLnRoZW4obGlzdCA9PiBzdWJzY3JpcHRpb25zW2hlYWRdID0gbGlzdC5vYnNlcnZlKGNyZWF0ZU9ic2VydmVyKGhlYWQpKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBmbGF0Lm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBwYXRoID0gUGF0aC5mcm9tS2V5KG5leHQpLCBoZWFkID0gUGF0aC5oZWFkKHBhdGgpO1xuICAgICAgICAgICAgICAgIGlmIChoZWFkICE9IG51bGwgJiYgIXN1YnNjcmlwdGlvbnNbaGVhZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5nZXQoaGVhZCkudGhlbihsaXN0ID0+IHN1YnNjcmlwdGlvbnNbaGVhZF0gPSBsaXN0Lm9ic2VydmUoY3JlYXRlT2JzZXJ2ZXIoaGVhZCkpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgb25JbnZhbGlkYXRlOiAocmFuZ2UpID0+IHtcbiAgICAgICAgICAgICAgICAvLyBVbnN1YnNjcmliZSBmcm9tIGFsbCBsaXN0cyBpbiB0aGUgcmFuZ2VcbiAgICAgICAgICAgICAgICBMaXN0LmZvckVhY2goY2FjaGUsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghc3Vic2NyaXB0aW9uc1trZXldKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBzdWJzY3JpcHRpb25zW2tleV0udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHN1YnNjcmlwdGlvbnNba2V5XTtcbiAgICAgICAgICAgICAgICB9LCByYW5nZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJhbmdlKSlcbiAgICAgICAgICAgICAgICAgICAgc3ViamVjdC5vbkludmFsaWRhdGUoUGF0aC50b0tleShbcmFuZ2VdKSk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzdWJqZWN0Lm9uSW52YWxpZGF0ZShbUGF0aC50b0tleShbcmFuZ2VbMF1dKSwgUGF0aC50b0tleShbcmFuZ2VbMV1dKV0pO1xuICAgICAgICAgICAgICAgIGNhY2hlLm9uSW52YWxpZGF0ZShyYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBnZXQ6IGZsYXQuZ2V0LCBwcmV2LCBuZXh0LCBvYnNlcnZlOiBzdWJqZWN0Lm9ic2VydmUgfTtcbiAgICB9XG4gICAgc3RhdGljIGZsYXRNYXAobGlzdCwgZmxhdE1hcEZuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5mbGF0dGVuKE9ic2VydmFibGVMaXN0Lm1hcChsaXN0LCBmbGF0TWFwRm4pKTtcbiAgICB9XG4gICAgc3RhdGljIGNhY2hlKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlQ2FjaGUobGlzdCk7XG4gICAgfVxuICAgIHN0YXRpYyBpbmRleChsaXN0KSB7XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZUluZGV4KGxpc3QpO1xuICAgIH1cbiAgICBzdGF0aWMgemlwKGxpc3QsIG90aGVyLCB6aXBGbikge1xuICAgICAgICBsaXN0ID0gT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCk7XG4gICAgICAgIG90aGVyID0gT2JzZXJ2YWJsZUxpc3QuaW5kZXgob3RoZXIpO1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5nZXQoa2V5KS50aGVuKHYgPT4gb3RoZXIuZ2V0KGtleSkudGhlbih3ID0+IHppcEZuKHYsIHcpKSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0LnByZXYoa2V5KS50aGVuKCgpID0+IG90aGVyLnByZXYoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm5leHQoa2V5KS50aGVuKCgpID0+IG90aGVyLm5leHQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN1YmplY3QgPSBuZXcgTGlzdFN1YmplY3QoKTtcbiAgICAgICAgbGlzdC5vYnNlcnZlKHN1YmplY3QpO1xuICAgICAgICBvdGhlci5vYnNlcnZlKHN1YmplY3QpO1xuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQsIG9ic2VydmU6IHN1YmplY3Qub2JzZXJ2ZSB9O1xuICAgIH1cbiAgICBzdGF0aWMgc2tpcChsaXN0LCBrKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgdGFrZShsaXN0LCBuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IDwgbjtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0YXRpYyByYW5nZShsaXN0LCBrLCBuKSB7XG4gICAgICAgIHJldHVybiBPYnNlcnZhYmxlTGlzdC5maWx0ZXIoT2JzZXJ2YWJsZUxpc3QuaW5kZXgobGlzdCksIGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5ID49IGsgJiYga2V5IDwgbiArIGs7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdGF0aWMgc2NhbihsaXN0LCBzY2FuRm4sIG1lbW8pIHtcbiAgICAgICAgdmFyIHsgcHJldiwgbmV4dCB9ID0gbGlzdCwgc2Nhbkxpc3Q7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBzY2FuTGlzdC5wcmV2KGtleSkudGhlbihwID0+IHAgPT0gbnVsbCA/IG1lbW8gOiBzY2FuTGlzdC5nZXQocCkpLnRoZW4obWVtbyA9PiBsaXN0LmdldChrZXkpLnRoZW4odmFsdWUgPT4gc2NhbkZuKG1lbW8sIHZhbHVlKSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm9ic2VydmUoe1xuICAgICAgICAgICAgICAgIG9uSW52YWxpZGF0ZTogKHJhbmdlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFJhbmdlLnByZXYobGlzdCwgcmFuZ2UpLnRoZW4ocHJldiA9PiBvYnNlcnZlci5vbkludmFsaWRhdGUoW3ByZXYsIG51bGxdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgc2Nhbkxpc3QgPSBPYnNlcnZhYmxlTGlzdC5jYWNoZSh7IGdldCwgcHJldiwgbmV4dCwgb2JzZXJ2ZSB9KTtcbiAgICAgICAgcmV0dXJuIHNjYW5MaXN0O1xuICAgIH1cbn1cbmV4cG9ydCBkZWZhdWx0IE9ic2VydmFibGVMaXN0O1xuIiwiZXhwb3J0IHZhciBSYW5nZTtcbihmdW5jdGlvbiAoUmFuZ2UpIHtcbiAgICBmdW5jdGlvbiBwcmV2KGxpc3QsIHJhbmdlID0gW251bGwsIG51bGxdKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhbmdlKSlcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmFuZ2VbMF0pO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICByZXR1cm4gbGlzdC5wcmV2KHJhbmdlKTtcbiAgICB9XG4gICAgUmFuZ2UucHJldiA9IHByZXY7XG4gICAgZnVuY3Rpb24gbmV4dChsaXN0LCByYW5nZSA9IFtudWxsLCBudWxsXSkge1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShyYW5nZSkpXG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJhbmdlWzFdKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgcmV0dXJuIGxpc3QubmV4dChyYW5nZSk7XG4gICAgfVxuICAgIFJhbmdlLm5leHQgPSBuZXh0O1xuICAgIGZ1bmN0aW9uIGZpcnN0KGxpc3QsIHJhbmdlID0gW251bGwsIG51bGxdKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhbmdlKSlcbiAgICAgICAgICAgIHJldHVybiBsaXN0Lm5leHQocmFuZ2VbMF0pO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJhbmdlKTtcbiAgICB9XG4gICAgUmFuZ2UuZmlyc3QgPSBmaXJzdDtcbiAgICBmdW5jdGlvbiBsYXN0KGxpc3QsIHJhbmdlID0gW251bGwsIG51bGxdKSB7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KHJhbmdlKSlcbiAgICAgICAgICAgIHJldHVybiBsaXN0LnByZXYocmFuZ2VbMV0pO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJhbmdlKTtcbiAgICB9XG4gICAgUmFuZ2UubGFzdCA9IGxhc3Q7XG59KShSYW5nZSB8fCAoUmFuZ2UgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUmFuZ2U7XG4iLCJpbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcbjtcbjtcbmV4cG9ydCB2YXIgUGF0aDtcbihmdW5jdGlvbiAoUGF0aCkge1xuICAgIGZ1bmN0aW9uIGtleShwYXRoKSB7XG4gICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gZnJvbUtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2Uoa2V5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBQYXRoLmZyb21LZXkgPSBmcm9tS2V5O1xuICAgIGZ1bmN0aW9uIHRvS2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC50b0tleSA9IHRvS2V5O1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGdldChwYXRoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcGF0aFtpbmRleF07XG4gICAgfVxuICAgIFBhdGguZ2V0ID0gZ2V0O1xuICAgIGZ1bmN0aW9uIHRhaWwocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA9PSBudWxsID8gW10gOiBwYXRoLnNsaWNlKDEsIHBhdGgubGVuZ3RoKTtcbiAgICB9XG4gICAgUGF0aC50YWlsID0gdGFpbDtcbiAgICBmdW5jdGlvbiBhcHBlbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gW10uY29uY2F0KGEpLmNvbmNhdChiKTtcbiAgICB9XG4gICAgUGF0aC5hcHBlbmQgPSBhcHBlbmQ7XG59KShQYXRoIHx8IChQYXRoID0ge30pKTtcbmV4cG9ydCB2YXIgVHJlZTtcbihmdW5jdGlvbiAoVHJlZSkge1xuICAgIGZ1bmN0aW9uIGdldChsaXN0LCBwYXRoLCBkZXB0aCA9IEluZmluaXR5KSB7XG4gICAgICAgIHZhciBoZWFkID0gUGF0aC5oZWFkKHBhdGgpLCB0YWlsID0gUGF0aC50YWlsKHBhdGgpO1xuICAgICAgICByZXR1cm4gbGlzdC5nZXQoaGVhZCkudGhlbih2YWx1ZSA9PiB7XG4gICAgICAgICAgICBpZiAodGFpbC5sZW5ndGggPT0gMCB8fCBkZXB0aCA9PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiBUcmVlLmdldCh2YWx1ZSwgdGFpbCwgZGVwdGgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgVHJlZS5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gcHJldihsaXN0LCBwYXRoID0gW10sIGRlcHRoID0gSW5maW5pdHkpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmhlYWQocGF0aCksIHRhaWwgPSBQYXRoLnRhaWwocGF0aCk7XG4gICAgICAgIGlmICgoaGVhZCA9PSBudWxsIHx8ICF0YWlsLmxlbmd0aCkgJiYgZGVwdGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5wcmV2KGhlYWQpLnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRyZWUucHJldih2YWx1ZSwgbnVsbCwgZGVwdGggLSAxKS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09IG51bGwgPyBudWxsIDogUGF0aC5hcHBlbmQoa2V5LCBwcmV2KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFpbC5sZW5ndGggJiYgZGVwdGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5nZXQoaGVhZClcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IFRyZWUucHJldihsaXN0LCB0YWlsLCBkZXB0aCAtIDEpKVxuICAgICAgICAgICAgICAgIC50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXRoLmFwcGVuZChoZWFkLCBwcmV2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5wcmV2KGhlYWQpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2ID09IG51bGwgPyBudWxsIDogbGlzdC5nZXQocHJldikudGhlbihsaXN0ID0+IFRyZWUucHJldihsaXN0LCBudWxsLCBkZXB0aCAtIDEpKS50aGVuKHRhaWwgPT4gUGF0aC5hcHBlbmQocHJldiwgdGFpbCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3QucHJldihoZWFkKS50aGVuKHByZXYgPT4gcHJldiAhPSBudWxsID8gW3ByZXZdIDogbnVsbCk7XG4gICAgfVxuICAgIFRyZWUucHJldiA9IHByZXY7XG4gICAgZnVuY3Rpb24gbmV4dChsaXN0LCBwYXRoID0gW10sIGRlcHRoID0gSW5maW5pdHkpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmhlYWQocGF0aCksIHRhaWwgPSBQYXRoLnRhaWwocGF0aCk7XG4gICAgICAgIGlmICgoaGVhZCA9PSBudWxsIHx8ICF0YWlsLmxlbmd0aCkgJiYgZGVwdGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGhlYWQpLnRoZW4oa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LmdldChrZXkpLnRoZW4odmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoTGlzdC5pc0xpc3QodmFsdWUpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFRyZWUubmV4dCh2YWx1ZSwgbnVsbCwgZGVwdGggLSAxKS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0ID09IG51bGwgPyBudWxsIDogUGF0aC5hcHBlbmQoa2V5LCBuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW2tleV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFpbC5sZW5ndGggJiYgZGVwdGggPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5nZXQoaGVhZClcbiAgICAgICAgICAgICAgICAudGhlbihsaXN0ID0+IFRyZWUubmV4dChsaXN0LCB0YWlsLCBkZXB0aCAtIDEpKVxuICAgICAgICAgICAgICAgIC50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuZXh0ICE9IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQYXRoLmFwcGVuZChoZWFkLCBuZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5uZXh0KGhlYWQpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXh0ID09IG51bGwgPyBudWxsIDogbGlzdC5nZXQobmV4dCkudGhlbihsaXN0ID0+IFRyZWUubmV4dChsaXN0LCBudWxsLCBkZXB0aCAtIDEpKS50aGVuKHRhaWwgPT4gUGF0aC5hcHBlbmQobmV4dCwgdGFpbCkpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3QubmV4dChoZWFkKS50aGVuKG5leHQgPT4gbmV4dCAhPSBudWxsID8gW25leHRdIDogbnVsbCk7XG4gICAgfVxuICAgIFRyZWUubmV4dCA9IG5leHQ7XG4gICAgZnVuY3Rpb24gc2V0KGxpc3QsIHBhdGgsIHZhbHVlKSB7XG4gICAgICAgIHZhciBoZWFkID0gcGF0aC5zbGljZSgwLCBwYXRoLmxlbmd0aCAtIDEpO1xuICAgICAgICB2YXIga2V5ID0gcGF0aFtwYXRoLmxlbmd0aCAtIDFdO1xuICAgICAgICByZXR1cm4gZ2V0KGxpc3QsIGhlYWQpLnRoZW4oKGxpc3QpID0+IGxpc3Quc2V0KGtleSwgdmFsdWUpKTtcbiAgICB9XG4gICAgVHJlZS5zZXQgPSBzZXQ7XG4gICAgZnVuY3Rpb24gc3BsaWNlKGxpc3QsIHByZXYsIG5leHQsIC4uLnZhbHVlcykge1xuICAgICAgICB2YXIgcHJldkhlYWQgPSBwcmV2LnNsaWNlKDAsIHByZXYubGVuZ3RoIC0gMSk7XG4gICAgICAgIHZhciBwcmV2S2V5ID0gcHJldltwcmV2Lmxlbmd0aCAtIDFdO1xuICAgICAgICB2YXIgbmV4dEhlYWQgPSBuZXh0LnNsaWNlKDAsIG5leHQubGVuZ3RoIC0gMSk7XG4gICAgICAgIHZhciBuZXh0S2V5ID0gbmV4dFtuZXh0Lmxlbmd0aCAtIDFdO1xuICAgICAgICByZXR1cm4gZ2V0KGxpc3QsIHByZXZIZWFkKVxuICAgICAgICAgICAgLnRoZW4oKGxpc3QpID0+IGxpc3Quc3BsaWNlKHByZXZLZXksIG5leHRLZXksIC4uLnZhbHVlcykpO1xuICAgIH1cbiAgICBUcmVlLnNwbGljZSA9IHNwbGljZTtcbn0pKFRyZWUgfHwgKFRyZWUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgVHJlZTtcbiJdfQ==
