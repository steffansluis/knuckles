(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Knuckles = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _node_modulesSonicDistSonic = require('../node_modules/sonic/dist/sonic');

var _node_modulesSonicDistSonic2 = _interopRequireDefault(_node_modulesSonicDistSonic);

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var _resource = require('./resource');

var _resource2 = _interopRequireDefault(_resource);

var Knuckles;
(function (Knuckles) {
    Knuckles.Sonic = _node_modulesSonicDistSonic2['default'];
    Knuckles.XHR = _xhr2['default'];
    Knuckles.Resource = _resource2['default'];
})(Knuckles || (Knuckles = {}));
module.exports = Knuckles;
exports['default'] = Knuckles;
module.exports = exports['default'];

},{"../node_modules/sonic/dist/sonic":14,"./resource":2,"./xhr":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () {
    function sliceIterator(arr, i) {
        var _arr = [];var _n = true;var _d = false;var _e = undefined;try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;_e = err;
        } finally {
            try {
                if (!_n && _i['return']) _i['return']();
            } finally {
                if (_d) throw _e;
            }
        }return _arr;
    }return function (arr, i) {
        if (Array.isArray(arr)) {
            return arr;
        } else if (Symbol.iterator in Object(arr)) {
            return sliceIterator(arr, i);
        } else {
            throw new TypeError('Invalid attempt to destructure non-iterable instance');
        }
    };
})();

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { 'default': obj };
}

var _sonicDistState = require('sonic/dist/state');

var _sonicDistState2 = _interopRequireDefault(_sonicDistState);

var _sonicDistCache = require('sonic/dist/cache');

var _sonicDistCache2 = _interopRequireDefault(_sonicDistCache);

var _sonicDistAsync_iterator = require('sonic/dist/async_iterator');

var _sonicDistAsync_iterator2 = _interopRequireDefault(_sonicDistAsync_iterator);

var _sonicDistList = require('sonic/dist/list');

var _sonicDistObservable = require('sonic/dist/observable');

var _sonicDistPromise_utils = require('sonic/dist/promise_utils');

var _sonicDistPromise_utils2 = _interopRequireDefault(_sonicDistPromise_utils);

var _xhr = require('./xhr');

var _xhr2 = _interopRequireDefault(_xhr);

var Resource;
exports.Resource = Resource;
(function (Resource) {
    function thunk(state) {
        return _sonicDistAsync_iterator2['default'].forEach(_sonicDistState2['default'].entries(state), function () {});
    }
    function create(urlRoot) {
        var keyProperty = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

        var list,
            subject = _sonicDistObservable.Subject.create(),
            observable = _sonicDistObservable.Observable.map(subject, function (patch) {
            return _sonicDistAsync_iterator2['default'].forEach(_sonicDistState2['default'].entries(list.state, patch.range), function (_ref) {
                var _ref2 = _slicedToArray(_ref, 2);

                var key = _ref2[0];
                var value = _ref2[1];
                _xhr2['default'].del(urlRoot + '/' + key);
            }).then(function () {
                if (patch.added == null) return Promise.resolve(patch);
                var synced = _sonicDistState2['default'].map(patch.added, function (value) {
                    var key = value[keyProperty],
                        string = JSON.stringify(value);
                    return (key != null ? _xhr2['default'].put(urlRoot + '/' + key, string) : _xhr2['default'].post(urlRoot, string)).then(JSON.parse);
                });
                var cached = _sonicDistState2['default'].cache(synced);
                var keyed = _sonicDistState2['default'].keyBy(cached, function (value) {
                    return value[keyProperty];
                });
                return thunk(keyed).then(function () {
                    return { range: patch.range, added: keyed };
                });
            });
        });
        list = _sonicDistList.List.create(createState(urlRoot, keyProperty), {
            onNext: subject.onNext,
            subscribe: observable.subscribe
        });
        return list;
    }
    Resource.create = create;
    function createState(urlRoot) {
        var keyProperty = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

        var cache = _sonicDistCache2['default'].create();
        var fetcher = _sonicDistPromise_utils2['default'].lazy(function (resolve) {
            var state = _xhr2['default'].get(urlRoot).then(JSON.parse).then(_sonicDistState2['default'].fromArray).then(function (state) {
                return _sonicDistState2['default'].keyBy(state, function (value) {
                    cache.get[value[keyProperty]] = Promise.resolve(value);
                    return value[keyProperty];
                });
            });
            resolve(state);
        });
        function get(key) {
            return _xhr2['default'].get(urlRoot + '/' + key).then(JSON.parse);
        }
        function prev(key) {
            return fetcher.then(function (state) {
                return state.prev(key);
            });
        }
        function next(key) {
            return fetcher.then(function (state) {
                return state.next(key);
            });
        }
        return _sonicDistCache2['default'].apply({ get: get, prev: prev, next: next }, cache);
    }
    Resource.createState = createState;
})(Resource || (exports.Resource = Resource = {}));
exports['default'] = Resource;

},{"./xhr":3,"sonic/dist/async_iterator":4,"sonic/dist/cache":5,"sonic/dist/list":9,"sonic/dist/observable":10,"sonic/dist/promise_utils":12,"sonic/dist/state":15}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
var XHR;
exports.XHR = XHR;
(function (XHR) {
    function fetch(url, options) {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();var method = options.method;
            var body = options.body;

            xhr.onload = function () {
                return xhr.status >= 200 && xhr.status < 400 ? resolve(xhr) : reject(xhr);
            };
            xhr.onerror = xhr.onabort = xhr.ontimeout = function () {
                return reject(xhr);
            };
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(body);
        });
    }
    XHR.fetch = fetch;
    function get(url) {
        return fetch(url, { method: 'get' }).then(function (xhr) {
            return xhr.responseText;
        });
    }
    XHR.get = get;
    function put(url, body) {
        return fetch(url, { method: 'put', body: body }).then(function (xhr) {
            return xhr.responseText;
        });
    }
    XHR.put = put;
    function post(url, body) {
        return fetch(url, { method: 'post', body: body }).then(function (xhr) {
            return xhr.responseText;
        });
    }
    XHR.post = post;
    function del(url) {
        return fetch(url, { method: 'delete' }).then(function (xhr) {
            return xhr.responseText;
        });
    }
    XHR.del = del;
})(XHR || (exports.XHR = XHR = {}));
exports['default'] = XHR;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key2 = require('./key');

var _key3 = _interopRequireDefault(_key2);

var AsyncIterator;
exports.AsyncIterator = AsyncIterator;
(function (AsyncIterator) {
    AsyncIterator.sentinel = { done: true };
    AsyncIterator.Empty = {
        next: function next() {
            return Promise.resolve(AsyncIterator.sentinel);
        }
    };
    function every(iterator, predicate) {
        function loop() {
            return iterator.next().then(function (result) {
                return result.done ? true : Promise.resolve(predicate(result.value)).then(function (satisfied) {
                    return satisfied ? loop() : false;
                });
            });
        }
        return loop();
    }
    AsyncIterator.every = every;
    function some(iterator, predicate) {
        return every(iterator, function (value) {
            return Promise.resolve(predicate(value)).then(function (result) {
                return !result;
            });
        }).then(function (result) {
            return !result;
        });
    }
    AsyncIterator.some = some;
    function forEach(iterator, fn) {
        return every(iterator, function (value) {
            return Promise.resolve(fn(value)).then(function () {
                return true;
            });
        }).then(function () {});
    }
    AsyncIterator.forEach = forEach;
    function reduce(iterator, fn, memo) {
        return forEach(iterator, function (value) {
            return Promise.resolve(fn(memo, value)).then(function (value) {
                memo = value;
            });
        }).then(function () {
            return memo;
        });
    }
    AsyncIterator.reduce = reduce;
    function find(iterator, predicate) {
        var result;
        return some(iterator, function (value) {
            return Promise.resolve(predicate(value)).then(function (satisfied) {
                return satisfied ? (result = value, true) : false;
            });
        }).then(function (satisfied) {
            return satisfied ? result : _key3['default'].NOT_FOUND;
        });
    }
    AsyncIterator.find = find;
    function indexOf(iterator, value) {
        var index = -1;
        return some(iterator, function (v) {
            return (index++, value == v);
        }).then(function (found) {
            return found ? index : _key3['default'].NOT_FOUND;
        });
    }
    AsyncIterator.indexOf = indexOf;
    function at(iterator, index) {
        return find(iterator, function () {
            return 0 === index--;
        });
    }
    AsyncIterator.at = at;
    function contains(iterator, value) {
        return some(iterator, function (v) {
            return v === value;
        });
    }
    AsyncIterator.contains = contains;
    function concat() {
        for (var _len = arguments.length, iterators = Array(_len), _key = 0; _key < _len; _key++) {
            iterators[_key] = arguments[_key];
        }

        return iterators.reduce(function (memo, value) {
            var iterated = false,
                queue = Promise.resolve(null);
            return {
                next: function next() {
                    return queue = queue.then(function () {}, function () {}).then(function () {
                        return iterated ? value.next() : memo.next().then(function (result) {
                            return result.done ? (iterated = true, value.next()) : result;
                        });
                    });
                }
            };
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function is(iterator, other) {
        var equals = arguments.length <= 2 || arguments[2] === undefined ? function (a, b) {
            return a === b;
        } : arguments[2];

        return AsyncIterator.every(iterator, function (value) {
            return other.next().then(function (result) {
                return !result.done && equals(result.value, value);
            });
        }).then(function (res) {
            return res ? other.next().then(function (result) {
                return result.done;
            }) : false;
        });
    }
    AsyncIterator.is = is;
    function fromArray(array) {
        var current = -1,
            queue = Promise.resolve(null);
        return {
            next: function next() {
                return queue = queue.then(function () {}, function () {}).then(function () {
                    return Promise.resolve(++current >= array.length ? AsyncIterator.sentinel : { done: false, value: array[current] });
                });
            }
        };
    }
    AsyncIterator.fromArray = fromArray;
    function fromObject(object) {
        return fromArray(Object.keys(object).map(function (key) {
            return [key, object[key]];
        }));
    }
    AsyncIterator.fromObject = fromObject;
    function toArray(iterator) {
        return reduce(iterator, function (memo, value) {
            return (memo.push(value), memo);
        }, []);
    }
    AsyncIterator.toArray = toArray;
    function toObject(iterator) {
        return reduce(iterator, function (memo, _ref) {
            var _ref2 = _slicedToArray(_ref, 2);

            var key = _ref2[0];
            var value = _ref2[1];
            return (memo[key] = value, memo);
        }, Object.create(null));
    }
    AsyncIterator.toObject = toObject;
})(AsyncIterator || (exports.AsyncIterator = AsyncIterator = {}));
exports['default'] = AsyncIterator;



},{"./key":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Cache;
exports.Cache = Cache;
(function (Cache) {
    function create() {
        return {
            get: Object.create(null),
            prev: Object.create(null),
            next: Object.create(null)
        };
    }
    Cache.create = create;
    function extend(cache) {
        return {
            get: Object.create(cache.get),
            prev: Object.create(cache.prev),
            next: Object.create(cache.next)
        };
    }
    Cache.extend = extend;
    function apply(state, cache) {
        function get(key) {
            return key in cache.get ? cache.get[key] : cache.get[key] = state.get(key);
        }
        function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            return key in cache.prev ? cache.prev[key] : cache.prev[key] = state.prev(key).then(function (prev) {
                cache.next[prev] = Promise.resolve(key);return prev;
            });
        }
        function next() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            return key in cache.next ? cache.next[key] : cache.next[key] = state.next(key).then(function (next) {
                cache.prev[next] = Promise.resolve(key);return next;
            });
        }
        return { get: get, prev: prev, next: next };
    }
    Cache.apply = apply;
})(Cache || (exports.Cache = Cache = {}));
exports['default'] = Cache;



},{"./key":7}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Entry;
exports.Entry = Entry;
(function (Entry) {
    function key(entry) {
        return entry && entry[0];
    }
    Entry.key = key;
    function value(entry) {
        return entry[1];
    }
    Entry.value = value;
    function is(entry, other) {
        return entry[0] === other[0] && entry[1] === other[1];
    }
    Entry.is = is;
})(Entry || (exports.Entry = Entry = {}));
exports["default"] = Entry;



},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _promise_utils = require('./promise_utils');

var _promise_utils2 = _interopRequireDefault(_promise_utils);

var Key;
(function (Key) {
    Key.NOT_FOUND_ERROR = new Error("No entry at the specified key");
    Key.NOT_FOUND = _promise_utils2["default"].lazy(function (resolve, reject) {
        return reject(Key.NOT_FOUND_ERROR);
    });
    Key.sentinel = null;
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

},{"./promise_utils":12}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _list = require('./list');

var _observable = require('./observable');

var Lens;
exports.Lens = Lens;
(function (Lens) {
    function compose(parent, lens) {
        var getSubject = _observable.Subject.create(),
            setSubject = _observable.Subject.create();
        _observable.Observable.map(parent.patches, function (patch) {
            if (patch.added) return { range: patch.range, added: _state2['default'].map(patch.added, lens.get) };
            return { range: patch.range };
        }).subscribe(getSubject);
        _observable.Observable.map(setSubject, function (patch) {
            if (patch.added) return { range: patch.range, added: _state2['default'].map(patch.added, lens.set) };
            return { range: patch.range };
        }).subscribe(parent.patches);
        return _list.List.create(_state2['default'].map(parent.state, lens.get), { subscribe: getSubject.subscribe, onNext: setSubject.onNext });
    }
    Lens.compose = compose;
})(Lens || (exports.Lens = Lens = {}));
exports['default'] = Lens;



},{"./list":9,"./observable":10,"./state":15}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _patch = require('./patch');

var _patch2 = _interopRequireDefault(_patch);

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _range = require('./range');

var _tree = require('./tree');

var _observable = require('./observable');

var _async_iterator = require('./async_iterator');

var _async_iterator2 = _interopRequireDefault(_async_iterator);

var List;
exports.List = List;
(function (List) {
    function map(parent, mapFn) {
        var state = _state2['default'].map(parent.state, mapFn),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return {
                range: patch.range,
                added: patch.added ? _state2['default'].map(patch.added, mapFn) : undefined
            };
        });
        return create(state, patches);
    }
    List.map = map;
    function filter(parent, filterFn) {
        var state = _state2['default'].filter(parent.state, filterFn),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return Promise.all([_async_iterator2['default'].findKey(_state2['default'].toIterator(_state2['default'].reverse(state), [_range.Position.reverse(patch.range[0]), { prev: null }]), filterFn).then(function (next) {
                return { next: next };
            }), _async_iterator2['default'].findKey(_state2['default'].toIterator(state, [patch.range[1], { prev: null }]), filterFn).then(function (prev) {
                return { prev: prev };
            })]).then(function (range) {
                return {
                    range: range,
                    added: patch.added ? _state2['default'].filter(patch.added, filterFn) : undefined
                };
            });
        });
        return create(state, patches, function (oldState, patches) {
            return state = _patch2['default'].apply(oldState, patches);
        });
    }
    List.filter = filter;
    function zoom(parent, key) {
        var parentState = parent.state,
            state = _state2['default'].zoom(parent.state, key),
            patches = _observable.Observable.map(_observable.Observable.filter(parent.patches, function (patch) {
            return _async_iterator2['default'].some(_state2['default'].toIterator(parentState, patch.range), function (value, k) {
                return k === key;
            }).then(function (res) {
                return patch.added ? _state2['default'].has(patch.added, key) : res;
            });
        }), function (patch) {
            parentState = parent.state;
            return {
                range: _range.Range.all,
                added: patch.added ? _state2['default'].zoom(patch.added, key) : undefined
            };
        });
        return create(state, patches);
    }
    List.zoom = zoom;
    function flatten(parent) {
        var patches_ = _observable.Subject.create();
        var parent_ = cache(map(parent, function (list, key) {
            _observable.Observable.map(list.patches, function (patch) {
                var from = patch.range[0],
                    to = patch.range[1];
                function mapPrevPosition(position) {
                    if (position.prev === _key2['default'].sentinel) return list.state.prev(_key2['default'].sentinel).then(function (next) {
                        return { next: _tree.Path.toKey([key, next]) };
                    });
                    return Promise.resolve({ prev: _tree.Path.toKey([key, position.prev]) });
                }
                function mapNextPosition(position) {
                    if (position.next === _key2['default'].sentinel) return list.state.next(_key2['default'].sentinel).then(function (prev) {
                        return { prev: _tree.Path.toKey([key, prev]) };
                    });
                    return Promise.resolve({ next: _tree.Path.toKey([key, position.next]) });
                }
                return Promise.all([_range.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), _range.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
                    return { range: range, added: patch.added ? patch.added : undefined };
                });
            }).subscribe(patches_);
            return list.state;
        }));
        _observable.Observable.map(parent.patches, function (patch) {
            var from = patch.range[0],
                to = patch.range[1];
            function mapPrevPosition(position) {
                return position.prev === _key2['default'].sentinel ? Promise.resolve({ prev: _key2['default'].sentinel }) : _tree.Tree.next(parent_.state, [position.prev]).then(_tree.Path.toKey).then(function (prev) {
                    return { prev: prev };
                });
            }
            function mapNextPosition(position) {
                return position.next === _key2['default'].sentinel ? Promise.resolve({ next: _key2['default'].sentinel }) : _tree.Tree.prev(parent_.state, [position.next]).then(_tree.Path.toKey).then(function (next) {
                    return { next: next };
                });
            }
            return Promise.all([_range.Position.isNextPosition(from) ? mapNextPosition(from) : mapPrevPosition(from), _range.Position.isNextPosition(to) ? mapNextPosition(to) : mapPrevPosition(to)]).then(function (range) {
                return { range: range, added: patch.added ? _state2['default'].flatten(_state2['default'].map(patch.added, function (list) {
                        return list.state;
                    })) : undefined };
            });
        }).subscribe(patches_);
        var state = _state2['default'].flatten(parent_.state);
        return create(state, patches_);
    }
    List.flatten = flatten;
    function cache(parent) {
        var state = _state2['default'].cache(parent.state),
            patches = _observable.Observable.map(parent.patches, function (patch) {
            return {
                range: patch.range,
                added: _state2['default'].cache(patch.added)
            };
        });
        return List.create(state, patches);
    }
    List.cache = cache;
    function create(state, patches) {
        var reducer = arguments.length <= 2 || arguments[2] === undefined ? _patch2['default'].apply : arguments[2];

        var list = { state: state, patches: patches };
        _observable.Observable.scan(patches, reducer, state).subscribe({
            onNext: function onNext(state) {
                list.state = state;
            }
        });
        return list;
    }
    List.create = create;
})(List || (exports.List = List = {}));
exports['default'] = List;



},{"./async_iterator":4,"./key":7,"./observable":10,"./patch":11,"./range":13,"./state":15,"./tree":16}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Disposable;
exports.Disposable = Disposable;
(function (Disposable) {
    function create(disposer) {
        var done = false;
        return {
            dispose: function dispose() {
                if (done) return;
                done = true;
                disposer();
            }
        };
    }
    Disposable.create = create;
})(Disposable || (exports.Disposable = Disposable = {}));
var Observable;
exports.Observable = Observable;
(function (Observable) {
    function map(observable, mapFn) {
        var subject = Subject.create();
        observable.subscribe({
            onNext: function onNext(value) {
                return Promise.resolve(mapFn(value)).then(subject.onNext);
            }
        });
        return { subscribe: subject.subscribe };
    }
    Observable.map = map;
    function filter(observable, filterFn) {
        var subject = Subject.create();
        observable.subscribe({
            onNext: function onNext(value) {
                return Promise.resolve(filterFn(value)).then(function (result) {
                    return result ? subject.onNext(value) : undefined;
                });
            }
        });
        return { subscribe: subject.subscribe };
    }
    Observable.filter = filter;
    function scan(observable, scanFn, memo) {
        var subject = Subject.create();
        observable.subscribe({
            onNext: function onNext(value) {
                return Promise.resolve(scanFn(memo, value)).then(function (value) {
                    memo = value;subject.onNext(value);
                });
            }
        });
        return { subscribe: subject.subscribe };
    }
    Observable.scan = scan;
})(Observable || (exports.Observable = Observable = {}));
var Subject;
exports.Subject = Subject;
(function (Subject) {
    function create() {
        var observers = Object.create(null);
        var current = Promise.resolve();
        function subscribe(observer) {
            var observerKey = _key2['default'].create();
            observers[observerKey] = observer;
            return Disposable.create(function () {
                return delete observers[observerKey];
            });
        }
        function onNext(value) {
            return current = current.then(function () {
                return Promise.all(Object.keys(observers).map(function (key) {
                    return observers[key].onNext(value);
                })).then(function () {});
            });
        }
        return { subscribe: subscribe, onNext: onNext };
    }
    Subject.create = create;
})(Subject || (exports.Subject = Subject = {}));



},{"./key":7}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

;
var Patch;
exports.Patch = Patch;
(function (Patch) {
    function apply(state, patch) {
        return _state2['default'].splice(state, patch.range, patch.added);
    }
    Patch.apply = apply;
})(Patch || (exports.Patch = Patch = {}));
exports['default'] = Patch;



},{"./state":15}],12:[function(require,module,exports){
// type Just<V> = [V];
// type Nothing<V> = Array<V> & { 0: void }
// type Maybe<V> = Just<V> | Nothing<V>;
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var PromiseUtils;
exports.PromiseUtils = PromiseUtils;
(function (PromiseUtils) {
    function lazy(executor) {
        var promise;
        function then(onfulfilled, onrejected) {
            if (promise) return promise.then(onfulfilled, onrejected);
            return (promise = new Promise(executor)).then(onfulfilled, onrejected);
        }
        return Promise.resolve({ then: then });
    }
    PromiseUtils.lazy = lazy;
})(PromiseUtils || (exports.PromiseUtils = PromiseUtils = {}));
exports["default"] = PromiseUtils;



},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var Range;
exports.Range = Range;
(function (Range) {
    Range.all = [{ next: _key2['default'].sentinel }, { prev: _key2['default'].sentinel }];
})(Range || (exports.Range = Range = {}));
var Position;
exports.Position = Position;
(function (Position) {
    function isPrevPosition(position) {
        return 'prev' in position;
    }
    Position.isPrevPosition = isPrevPosition;
    function isNextPosition(position) {
        return 'next' in position;
    }
    Position.isNextPosition = isNextPosition;
    function reverse(position) {
        return Position.isPrevPosition(position) ? { next: position.prev } : { prev: position.next };
    }
    Position.reverse = reverse;
})(Position || (exports.Position = Position = {}));
exports['default'] = Range;



},{"./key":7}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.Sonic = Sonic;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var _async_iterator = require('./async_iterator');

var _async_iterator2 = _interopRequireDefault(_async_iterator);

var _list = require('./list');

var _tree = require('./tree');

var _tree2 = _interopRequireDefault(_tree);

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _observable = require('./observable');

var _promise_utils = require('./promise_utils');

var _promise_utils2 = _interopRequireDefault(_promise_utils);

var _lens = require('./lens');

var _lens2 = _interopRequireDefault(_lens);

function Sonic(obj) {
    if (obj instanceof Array) return _list.List.create(_state2['default'].fromArray(obj), _observable.Subject.create());
    if (obj instanceof Object) return _list.List.create(_state2['default'].fromObject(obj), _observable.Subject.create());
}

var Sonic;
exports.Sonic = Sonic;
(function (Sonic) {
    Sonic.State = _state2['default'];
    Sonic.AsyncIterator = _async_iterator2['default'];
    Sonic.List = _list.List;
    Sonic.Tree = _tree2['default'];
    Sonic.Subject = _observable.Subject;
    Sonic.Cache = _cache2['default'];
    Sonic.PromiseUtils = _promise_utils2['default'];
    Sonic.Lens = _lens2['default'];
})(Sonic || (exports.Sonic = exports.Sonic = Sonic = {}));
;
module.exports = Sonic;
exports['default'] = Sonic;



},{"./async_iterator":4,"./cache":5,"./lens":8,"./list":9,"./observable":10,"./promise_utils":12,"./state":15,"./tree":16}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

var _entry = require('./entry');

var _entry2 = _interopRequireDefault(_entry);

var _range = require('./range');

var _cache = require('./cache');

var _cache2 = _interopRequireDefault(_cache);

var _async_iterator = require('./async_iterator');

var _async_iterator2 = _interopRequireDefault(_async_iterator);

var _tree = require('./tree');

var State;
exports.State = State;
(function (State) {
    State.Empty = {
        get: function get(key) {
            return _key2['default'].NOT_FOUND;
        },
        prev: function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];
            return key == _key2['default'].sentinel ? Promise.resolve(_key2['default'].sentinel) : _key2['default'].NOT_FOUND;
        },
        next: function next() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];
            return key == _key2['default'].sentinel ? Promise.resolve(_key2['default'].sentinel) : _key2['default'].NOT_FOUND;
        }
    };
    function extend(parent, _ref) {
        var get = _ref.get;
        var prev = _ref.prev;
        var next = _ref.next;

        var state = Object.create(parent);
        if (get) state.get = get;
        if (prev) state.prev = prev;
        if (next) state.next = next;
        return state;
    }
    State.extend = extend;
    function first(state) {
        return state.next().then(function (key) {
            return state.get(key);
        });
    }
    State.first = first;
    function last(state) {
        return state.prev().then(function (key) {
            return state.get(key);
        });
    }
    State.last = last;
    function has(state, key) {
        return state.get(key).then(function () {
            return true;
        }, function (reason) {
            return reason === _key2['default'].NOT_FOUND_ERROR ? false : Promise.reject(reason);
        });
    }
    State.has = has;
    function is(state, other) {
        var iterator = entries(state),
            otherIterator = entries(other);
        return _async_iterator2['default'].is(iterator, otherIterator, _entry2['default'].is);
    }
    State.is = is;
    function contains(state, value) {
        return _async_iterator2['default'].some(entries(state), function (_ref2) {
            var _ref22 = _slicedToArray(_ref2, 2);

            var k = _ref22[0];
            var v = _ref22[1];
            return v === value;
        });
    }
    State.contains = contains;
    function isEmpty(state) {
        return state.next().then(function (next) {
            return next === _key2['default'].sentinel;
        });
    }
    State.isEmpty = isEmpty;
    function slice(parent) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        return fromEntries(entries(parent, range));
    }
    State.slice = slice;
    function splice(parent, range, child) {
        var deleted = slice(parent, range),
            filtered = filter(parent, function (value, key) {
            return deleted.get(key).then(function () {
                return false;
            }, function () {
                return true;
            });
        });
        if (child == null) return filtered;
        var bridgedChild,
            bridgedParent,
            from = range[0],
            to = range[1];
        bridgedChild = extend(child, {
            prev: function prev(key) {
                return child.prev(key).then(function (prev) {
                    if (prev !== _key2['default'].sentinel) return Promise.resolve(prev);
                    return _range.Position.isNextPosition(from) ? Promise.resolve(from.next) : parent.prev(from.prev);
                });
            },
            next: function next(key) {
                return child.next(key).then(function (next) {
                    if (next !== _key2['default'].sentinel) return Promise.resolve(next);
                    return _range.Position.isPrevPosition(to) ? Promise.resolve(to.prev) : parent.next(to.next);
                });
            }
        });
        bridgedParent = extend(filtered, {
            prev: function prev(key) {
                return parent.prev(key).then(function (prev) {
                    if (_range.Position.isNextPosition(to) && prev === to.next) return bridgedChild.prev(_key2['default'].sentinel);
                    return has(deleted, prev).then(function (res) {
                        return res ? _key2['default'].NOT_FOUND : prev;
                    });
                });
            },
            next: function next(key) {
                return parent.next(key).then(function (next) {
                    if (_range.Position.isPrevPosition(from) && next === from.prev) return bridgedChild.next(_key2['default'].sentinel);
                    return has(deleted, next).then(function (res) {
                        return res ? _key2['default'].NOT_FOUND : next;
                    });
                });
            }
        });
        function get(key) {
            return has(child, key).then(function (res) {
                return res ? bridgedChild.get(key) : bridgedParent.get(key);
            });
        }
        function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            if (_range.Position.isPrevPosition(to) && key === to.prev) return bridgedChild.prev(_key2['default'].sentinel);
            return has(bridgedChild, key).then(function (res) {
                return res ? bridgedChild.prev(key) : bridgedParent.prev(key);
            });
        }
        function next() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            if (_range.Position.isNextPosition(from) && key === from.next) return bridgedChild.next(_key2['default'].sentinel);
            return has(bridgedChild, key).then(function (res) {
                return res ? bridgedChild.next(key) : bridgedParent.next(key);
            });
        }
        return { get: get, prev: prev, next: next };
    }
    State.splice = splice;
    function reverse(parent) {
        return extend(parent, {
            prev: parent.next,
            next: parent.prev
        });
    }
    State.reverse = reverse;
    function map(parent, mapFn) {
        return extend(parent, {
            get: function get(key) {
                return parent.get(key).then(function (value) {
                    return mapFn(value, key);
                });
            }
        });
    }
    State.map = map;
    function filter(parent, filterFn) {
        var cache = Object.create(null);
        function have(key) {
            return key in cache ? cache[key] : cache[key] = parent.get(key).then(function (value) {
                return filterFn(value, key);
            });
        }
        function get(key) {
            return have(key).then(function (res) {
                return res ? parent.get(key) : _key2['default'].NOT_FOUND;
            });
        }
        function prev(key) {
            return parent.prev(key).then(function (p) {
                return p === null ? null : have(p).then(function (res) {
                    return res ? p : prev(p);
                });
            });
        }
        function next(key) {
            return parent.next(key).then(function (n) {
                return n === null ? null : have(n).then(function (res) {
                    return res ? n : next(n);
                });
            });
        }
        return extend(parent, { get: get, prev: prev, next: next });
    }
    State.filter = filter;
    function zoom(parent, key) {
        var next = function next(k) {
            return k == null ? parent.get(key).then(function () {
                return key;
            }, function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? null : Promise.reject(reason);
            }) : key === k ? Promise.resolve(null) : _key2['default'].NOT_FOUND;
        };
        return extend(parent, {
            get: function get(k) {
                return k === key ? parent.get(key) : _key2['default'].NOT_FOUND;
            },
            prev: next,
            next: next
        });
    }
    State.zoom = zoom;
    function flatten(parent) {
        return extend(parent, {
            get: function get(key) {
                return _tree.Tree.get(parent, _tree.Path.fromKey(key));
            },
            prev: function prev(key) {
                return _tree.Tree.prev(parent, _tree.Path.fromKey(key)).then(_tree.Path.toKey);
            },
            next: function next(key) {
                return _tree.Tree.next(parent, _tree.Path.fromKey(key)).then(_tree.Path.toKey);
            }
        });
    }
    State.flatten = flatten;
    function cache(parent) {
        return _cache2['default'].apply(parent, _cache2['default'].create());
    }
    State.cache = cache;
    function keyBy(parent, keyFn) {
        var keyMap = cache(State.map(parent, keyFn));
        var reverseKeyMap = cache({
            get: function get(key) {
                return _async_iterator2['default'].find(entries(keyMap), function (_ref3) {
                    var _ref32 = _slicedToArray(_ref3, 2);

                    var k = _ref32[0];
                    var v = _ref32[1];
                    return v === key;
                }).then(_entry2['default'].key);
            },
            prev: function prev() {
                var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

                return Promise.resolve(key === _key2['default'].sentinel ? _key2['default'].sentinel : reverseKeyMap.get(key)).then(keyMap.prev).then(function (prev) {
                    return prev === _key2['default'].sentinel ? prev : keyMap.get(prev);
                });
            },
            next: function next() {
                var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

                return Promise.resolve(key === _key2['default'].sentinel ? _key2['default'].sentinel : reverseKeyMap.get(key)).then(keyMap.next).then(function (next) {
                    return next === _key2['default'].sentinel ? next : keyMap.get(next);
                });
            }
        });
        return extend(reverseKeyMap, { get: function get(key) {
                return reverseKeyMap.get(key).then(function (key) {
                    return key === _key2['default'].sentinel ? _key2['default'].NOT_FOUND : parent.get(key);
                });
            } });
    }
    State.keyBy = keyBy;
    function keys(parent) {
        return map(parent, function (value, key) {
            return key;
        });
    }
    State.keys = keys;
    function fromArray(values) {
        return fromEntries(_async_iterator2['default'].fromArray(values.map(function (value, key) {
            return [key, value];
        })));
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        return fromEntries(_async_iterator2['default'].fromObject(values));
    }
    State.fromObject = fromObject;
    function fromEntries(iterator) {
        var cache = _cache2['default'].create(),
            exhausted = false,
            currentKey = null,
            queue = Promise.resolve(null);
        var cachingIterator = {
            next: function next() {
                return iterator.next().then(function (_ref4) {
                    var done = _ref4.done;
                    var entry = _ref4.value;

                    if (done) {
                        exhausted = true;
                        cache.prev[_key2['default'].sentinel] = Promise.resolve(currentKey);
                        cache.next[currentKey] = Promise.resolve(_key2['default'].sentinel);
                        return _async_iterator2['default'].sentinel;
                    }
                    cache.prev[entry[0]] = Promise.resolve(currentKey);
                    cache.next[currentKey] = Promise.resolve(entry[0]);
                    cache.get[entry[0]] = Promise.resolve(entry[1]);
                    currentKey = entry[0];
                    return { done: done, value: entry };
                });
            }
        };
        function get(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return _async_iterator2['default'].find(cachingIterator, function (_ref5) {
                var _ref52 = _slicedToArray(_ref5, 2);

                var k = _ref52[0];
                var v = _ref52[1];
                return k === key;
            }).then(_entry2['default'].value);
        }
        function prev(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return _async_iterator2['default'].some(cachingIterator, function (_ref6) {
                var _ref62 = _slicedToArray(_ref6, 2);

                var k = _ref62[0];
                var v = _ref62[1];
                return k === key;
            }).then(function () {
                return key in cache.prev ? cache.prev[key] : _key2['default'].NOT_FOUND;
            });
        }
        function next(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            if (key === currentKey) return cachingIterator.next().then(function (result) {
                return result.done ? _key2['default'].sentinel : result.value[0];
            });
            return _async_iterator2['default'].find(cachingIterator, function (_ref7) {
                var _ref72 = _slicedToArray(_ref7, 2);

                var k = _ref72[0];
                var v = _ref72[1];
                return k === key;
            }).then(function () {
                return cachingIterator.next();
            }).then(function (result) {
                return result.done ? _key2['default'].sentinel : result.value[0];
            });
        }
        return _cache2['default'].apply({ get: get, prev: prev, next: next }, cache);
    }
    State.fromEntries = fromEntries;
    function entries(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        var current = _key2['default'].sentinel,
            done = false,
            from = range[0],
            to = range[1];
        return {
            next: function next() {
                function get(key) {
                    if (key === _key2['default'].sentinel) return (done = true, Promise.resolve(_async_iterator2['default'].sentinel));
                    return state.get(key).then(function (value) {
                        return (current = key, { done: false, value: [key, value] });
                    });
                }
                function iterate(key) {
                    return state.next(key).then(function (next) {
                        if (_range.Position.isPrevPosition(to) && to.prev === next) return get(_key2['default'].sentinel);
                        return get(next);
                    });
                }
                if (_range.Position.isPrevPosition(from) && _range.Position.isPrevPosition(to) && from.prev === to.prev) return get(_key2['default'].sentinel);
                if (_range.Position.isNextPosition(from) && _range.Position.isNextPosition(to) && from.next === to.next) return get(_key2['default'].sentinel);
                if (current === _key2['default'].sentinel) return _range.Position.isPrevPosition(from) ? get(from.prev) : iterate(from.next);
                if (_range.Position.isNextPosition(to) && to.next === current) return get(_key2['default'].sentinel);
                return iterate(current);
            }
        };
    }
    State.entries = entries;
})(State || (exports.State = State = {}));
exports['default'] = State;



},{"./async_iterator":4,"./cache":5,"./entry":6,"./key":7,"./range":13,"./tree":16}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _state = require('./state');

var _state2 = _interopRequireDefault(_state);

var Path;
exports.Path = Path;
(function (Path) {
    function key(path) {
        return path == null ? null : JSON.stringify(path);
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
        return path ? path[index] : null;
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
    function get(tree, path) {
        var head = Path.get(path, 0),
            tail = Path.get(path, 1);
        return tree.get(head).then(function (state) {
            return state.get(tail);
        });
    }
    Tree.get = get;
    function prev(tree, path) {
        var head = Path.get(path, 0),
            tail = Path.get(path, 1),
            prevs = _state2['default'].filter(_state2['default'].map(tree, function (state) {
            return state.prev();
        }), function (first) {
            return first != null;
        }),
            paths = _state2['default'].map(prevs, function (first, key) {
            return [key, first];
        });
        if (head == null) return paths.prev().then(function (prev) {
            return prev != null ? paths.get(prev) : null;
        });
        return tree.get(head).then(function (state) {
            return state.prev(tail);
        }).then(function (prev) {
            return prev != null ? [head, prev] : paths.prev(head).then(function (prev) {
                return prev != null ? paths.get(prev) : null;
            });
        });
    }
    Tree.prev = prev;
    function next(tree, path) {
        var head = Path.get(path, 0),
            tail = Path.get(path, 1),
            nexts = _state2['default'].filter(_state2['default'].map(tree, function (state) {
            return state.next();
        }), function (first) {
            return first != null;
        }),
            paths = _state2['default'].map(nexts, function (first, key) {
            return [key, first];
        });
        if (head == null) return paths.next().then(function (next) {
            return next != null ? paths.get(next) : null;
        });
        return tree.get(head).then(function (state) {
            return state.next(tail);
        }).then(function (next) {
            return next != null ? [head, next] : paths.next(head).then(function (next) {
                return next != null ? paths.get(next) : null;
            });
        });
    }
    Tree.next = next;
})(Tree || (exports.Tree = Tree = {}));
exports['default'] = Tree;



},{"./state":15}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvZGlzdC9rbnVja2xlcy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9kaXN0L3Jlc291cmNlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL2Rpc3QveGhyLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2FzeW5jX2l0ZXJhdG9yLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2VudHJ5LmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2tleS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9sZW5zLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9wYXRjaC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9wcm9taXNlX3V0aWxzLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3JhbmdlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3NvbmljLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3N0YXRlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3RyZWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFakcsSUFBSSwyQkFBMkIsR0FBRyxPQUFPLENBUnRCLGtDQUFrQyxDQUFBLENBQUE7O0FBVXJELElBQUksNEJBQTRCLEdBQUcsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7QUFFdkYsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQVhELE9BQU8sQ0FBQSxDQUFBOztBQWF4QixJQUFJLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFekMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQWRELFlBQVksQ0FBQSxDQUFBOztBQWdCbEMsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBZm5E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RCxRQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztDQUNwQixDQUFBLENBQUUsSUFBSSxhQXpCSSxJQUFJLEdBeUJILElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO3FCQUNULElBQUkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IF9Tb25pYyBmcm9tICcuLi9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9zb25pYyc7XG5pbXBvcnQgX1hIUiBmcm9tICcuL3hocic7XG5pbXBvcnQgX1Jlc291cmNlIGZyb20gJy4vcmVzb3VyY2UnO1xudmFyIEtudWNrbGVzO1xuKGZ1bmN0aW9uIChLbnVja2xlcykge1xuICAgIEtudWNrbGVzLlNvbmljID0gX1NvbmljO1xuICAgIEtudWNrbGVzLlhIUiA9IF9YSFI7XG4gICAgS251Y2tsZXMuUmVzb3VyY2UgPSBfUmVzb3VyY2U7XG59KShLbnVja2xlcyB8fCAoS251Y2tsZXMgPSB7fSkpO1xubW9kdWxlLmV4cG9ydHMgPSBLbnVja2xlcztcbmV4cG9ydCBkZWZhdWx0IEtudWNrbGVzO1xuIiwiaW1wb3J0IFN0YXRlIGZyb20gJ3NvbmljL2Rpc3Qvc3RhdGUnO1xuaW1wb3J0IENhY2hlIGZyb20gJ3NvbmljL2Rpc3QvY2FjaGUnO1xuaW1wb3J0IEFzeW5jSXRlcmF0b3IgZnJvbSAnc29uaWMvZGlzdC9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnc29uaWMvZGlzdC9saXN0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdzb25pYy9kaXN0L29ic2VydmFibGUnO1xuaW1wb3J0IFByb21pc2VVdGlscyBmcm9tICdzb25pYy9kaXN0L3Byb21pc2VfdXRpbHMnO1xuaW1wb3J0IFhIUiBmcm9tICcuL3hocic7XG5leHBvcnQgdmFyIFJlc291cmNlO1xuKGZ1bmN0aW9uIChSZXNvdXJjZSkge1xuICAgIGZ1bmN0aW9uIHRodW5rKHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZvckVhY2goU3RhdGUuZW50cmllcyhzdGF0ZSksICgpID0+IHsgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZSh1cmxSb290LCBrZXlQcm9wZXJ0eSA9ICdpZCcpIHtcbiAgICAgICAgdmFyIGxpc3QsIHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpLCBvYnNlcnZhYmxlID0gT2JzZXJ2YWJsZS5tYXAoc3ViamVjdCwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZm9yRWFjaChTdGF0ZS5lbnRyaWVzKGxpc3Quc3RhdGUsIHBhdGNoLnJhbmdlKSwgKFtrZXksIHZhbHVlXSkgPT4geyBYSFIuZGVsKGAke3VybFJvb3R9LyR7a2V5fWApOyB9KS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQgPT0gbnVsbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwYXRjaCk7XG4gICAgICAgICAgICAgICAgdmFyIHN5bmNlZCA9IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgdmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gdmFsdWVba2V5UHJvcGVydHldLCBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoa2V5ICE9IG51bGwgPyBYSFIucHV0KGAke3VybFJvb3R9LyR7a2V5fWAsIHN0cmluZykgOiBYSFIucG9zdCh1cmxSb290LCBzdHJpbmcpKS50aGVuKEpTT04ucGFyc2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBjYWNoZWQgPSBTdGF0ZS5jYWNoZShzeW5jZWQpO1xuICAgICAgICAgICAgICAgIHZhciBrZXllZCA9IFN0YXRlLmtleUJ5KGNhY2hlZCwgdmFsdWUgPT4gdmFsdWVba2V5UHJvcGVydHldKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGh1bmsoa2V5ZWQpLnRoZW4oKCkgPT4gKHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDoga2V5ZWQgfSkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBsaXN0ID0gTGlzdC5jcmVhdGUoY3JlYXRlU3RhdGUodXJsUm9vdCwga2V5UHJvcGVydHkpLCB7XG4gICAgICAgICAgICBvbk5leHQ6IHN1YmplY3Qub25OZXh0LFxuICAgICAgICAgICAgc3Vic2NyaWJlOiBvYnNlcnZhYmxlLnN1YnNjcmliZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfVxuICAgIFJlc291cmNlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBjcmVhdGVTdGF0ZSh1cmxSb290LCBrZXlQcm9wZXJ0eSA9ICdpZCcpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gQ2FjaGUuY3JlYXRlKCk7XG4gICAgICAgIHZhciBmZXRjaGVyID0gUHJvbWlzZVV0aWxzLmxhenkocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSBYSFIuZ2V0KHVybFJvb3QpXG4gICAgICAgICAgICAgICAgLnRoZW4oSlNPTi5wYXJzZSlcbiAgICAgICAgICAgICAgICAudGhlbihTdGF0ZS5mcm9tQXJyYXkpXG4gICAgICAgICAgICAgICAgLnRoZW4oc3RhdGUgPT4gU3RhdGUua2V5Qnkoc3RhdGUsIHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICBjYWNoZS5nZXRbdmFsdWVba2V5UHJvcGVydHldXSA9IFByb21pc2UucmVzb2x2ZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlW2tleVByb3BlcnR5XTtcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgIHJlc29sdmUoc3RhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIFhIUi5nZXQoYCR7dXJsUm9vdH0vJHtrZXl9YCkudGhlbihKU09OLnBhcnNlKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoZXIudGhlbihzdGF0ZSA9PiBzdGF0ZS5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZmV0Y2hlci50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQoa2V5KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHsgZ2V0LCBwcmV2LCBuZXh0IH0sIGNhY2hlKTtcbiAgICB9XG4gICAgUmVzb3VyY2UuY3JlYXRlU3RhdGUgPSBjcmVhdGVTdGF0ZTtcbn0pKFJlc291cmNlIHx8IChSZXNvdXJjZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBSZXNvdXJjZTtcbiIsImV4cG9ydCB2YXIgWEhSO1xuKGZ1bmN0aW9uIChYSFIpIHtcbiAgICBmdW5jdGlvbiBmZXRjaCh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKSwgeyBtZXRob2QsIGJvZHkgfSA9IG9wdGlvbnM7XG4gICAgICAgICAgICB4aHIub25sb2FkID0gKCkgPT4geGhyLnN0YXR1cyA+PSAyMDAgJiYgeGhyLnN0YXR1cyA8IDQwMCA/IHJlc29sdmUoeGhyKSA6IHJlamVjdCh4aHIpO1xuICAgICAgICAgICAgeGhyLm9uZXJyb3IgPSB4aHIub25hYm9ydCA9IHhoci5vbnRpbWVvdXQgPSAoKSA9PiByZWplY3QoeGhyKTtcbiAgICAgICAgICAgIHhoci5vcGVuKG1ldGhvZCwgdXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgeGhyLnNlbmQoYm9keSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBYSFIuZmV0Y2ggPSBmZXRjaDtcbiAgICBmdW5jdGlvbiBnZXQodXJsKSB7XG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHsgbWV0aG9kOiAnZ2V0JyB9KS50aGVuKHhociA9PiB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICB9XG4gICAgWEhSLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiBwdXQodXJsLCBib2R5KSB7XG4gICAgICAgIHJldHVybiBmZXRjaCh1cmwsIHsgbWV0aG9kOiAncHV0JywgYm9keTogYm9keSB9KS50aGVuKHhociA9PiB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICB9XG4gICAgWEhSLnB1dCA9IHB1dDtcbiAgICBmdW5jdGlvbiBwb3N0KHVybCwgYm9keSkge1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7IG1ldGhvZDogJ3Bvc3QnLCBib2R5OiBib2R5IH0pLnRoZW4oeGhyID0+IHhoci5yZXNwb25zZVRleHQpO1xuICAgIH1cbiAgICBYSFIucG9zdCA9IHBvc3Q7XG4gICAgZnVuY3Rpb24gZGVsKHVybCkge1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7IG1ldGhvZDogJ2RlbGV0ZScgfSkudGhlbih4aHIgPT4geGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgfVxuICAgIFhIUi5kZWwgPSBkZWw7XG59KShYSFIgfHwgKFhIUiA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBYSFI7XG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQXN5bmNJdGVyYXRvcjtcbihmdW5jdGlvbiAoQXN5bmNJdGVyYXRvcikge1xuICAgIEFzeW5jSXRlcmF0b3Iuc2VudGluZWwgPSB7IGRvbmU6IHRydWUgfTtcbiAgICBBc3luY0l0ZXJhdG9yLkVtcHR5ID0ge1xuICAgICAgICBuZXh0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoQXN5bmNJdGVyYXRvci5zZW50aW5lbClcbiAgICB9O1xuICAgIGZ1bmN0aW9uIGV2ZXJ5KGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgZnVuY3Rpb24gbG9vcCgpIHtcbiAgICAgICAgICAgIHJldHVybiBpdGVyYXRvci5uZXh0KCkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUgPyB0cnVlIDogUHJvbWlzZS5yZXNvbHZlKHByZWRpY2F0ZShyZXN1bHQudmFsdWUpKS50aGVuKHNhdGlzZmllZCA9PiBzYXRpc2ZpZWQgPyBsb29wKCkgOiBmYWxzZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb29wKCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZXZlcnkgPSBldmVyeTtcbiAgICBmdW5jdGlvbiBzb21lKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIGV2ZXJ5KGl0ZXJhdG9yLCB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHZhbHVlKSkudGhlbihyZXN1bHQgPT4gIXJlc3VsdCkpLnRoZW4ocmVzdWx0ID0+ICFyZXN1bHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNvbWUgPSBzb21lO1xuICAgIGZ1bmN0aW9uIGZvckVhY2goaXRlcmF0b3IsIGZuKSB7XG4gICAgICAgIHJldHVybiBldmVyeShpdGVyYXRvciwgKHZhbHVlKSA9PiBQcm9taXNlLnJlc29sdmUoZm4odmFsdWUpKS50aGVuKCgpID0+IHRydWUpKS50aGVuKCgpID0+IHsgfSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZm9yRWFjaCA9IGZvckVhY2g7XG4gICAgZnVuY3Rpb24gcmVkdWNlKGl0ZXJhdG9yLCBmbiwgbWVtbykge1xuICAgICAgICByZXR1cm4gZm9yRWFjaChpdGVyYXRvciwgKHZhbHVlKSA9PiBQcm9taXNlLnJlc29sdmUoZm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyB9KSkudGhlbigoKSA9PiBtZW1vKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5yZWR1Y2UgPSByZWR1Y2U7XG4gICAgZnVuY3Rpb24gZmluZChpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHZhbHVlKSkudGhlbihzYXRpc2ZpZWQgPT4gc2F0aXNmaWVkID8gKHJlc3VsdCA9IHZhbHVlLCB0cnVlKSA6IGZhbHNlKSkudGhlbihzYXRpc2ZpZWQgPT4gc2F0aXNmaWVkID8gcmVzdWx0IDogS2V5Lk5PVF9GT1VORCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmluZCA9IGZpbmQ7XG4gICAgZnVuY3Rpb24gaW5kZXhPZihpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCB2ID0+IChpbmRleCsrLCB2YWx1ZSA9PSB2KSkudGhlbihmb3VuZCA9PiBmb3VuZCA/IGluZGV4IDogS2V5Lk5PVF9GT1VORCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaW5kZXhPZiA9IGluZGV4T2Y7XG4gICAgZnVuY3Rpb24gYXQoaXRlcmF0b3IsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBmaW5kKGl0ZXJhdG9yLCAoKSA9PiAwID09PSBpbmRleC0tKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5hdCA9IGF0O1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBjb25jYXQoLi4uaXRlcmF0b3JzKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvcnMucmVkdWNlKChtZW1vLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdGVkID0gZmFsc2UsIHF1ZXVlID0gUHJvbWlzZS5yZXNvbHZlKG51bGwpO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4geyB9LCAoKSA9PiB7IH0pLnRoZW4oKCkgPT4gaXRlcmF0ZWQgPyB2YWx1ZS5uZXh0KCkgOiBtZW1vLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSA/IChpdGVyYXRlZCA9IHRydWUsIHZhbHVlLm5leHQoKSkgOiByZXN1bHQpKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSwgQXN5bmNJdGVyYXRvci5FbXB0eSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY29uY2F0ID0gY29uY2F0O1xuICAgIGZ1bmN0aW9uIGlzKGl0ZXJhdG9yLCBvdGhlciwgZXF1YWxzID0gKGEsIGIpID0+IGEgPT09IGIpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZXZlcnkoaXRlcmF0b3IsIHZhbHVlID0+IHtcbiAgICAgICAgICAgIHJldHVybiBvdGhlci5uZXh0KCkudGhlbihyZXN1bHQgPT4gIXJlc3VsdC5kb25lICYmIGVxdWFscyhyZXN1bHQudmFsdWUsIHZhbHVlKSk7XG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHJlcyA/IG90aGVyLm5leHQoKS50aGVuKHJlc3VsdCA9PiByZXN1bHQuZG9uZSkgOiBmYWxzZSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuaXMgPSBpcztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSAtMSwgcXVldWUgPSBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBxdWV1ZSA9IHF1ZXVlLnRoZW4oKCkgPT4geyB9LCAoKSA9PiB7IH0pLnRoZW4oKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCsrY3VycmVudCA+PSBhcnJheS5sZW5ndGggPyBBc3luY0l0ZXJhdG9yLnNlbnRpbmVsIDogeyBkb25lOiBmYWxzZSwgdmFsdWU6IGFycmF5W2N1cnJlbnRdIH0pKVxuICAgICAgICB9O1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KG9iamVjdCkge1xuICAgICAgICByZXR1cm4gZnJvbUFycmF5KE9iamVjdC5rZXlzKG9iamVjdCkubWFwKGtleSA9PiBba2V5LCBvYmplY3Rba2V5XV0pKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiB0b0FycmF5KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCB2YWx1ZSkgPT4gKG1lbW8ucHVzaCh2YWx1ZSksIG1lbW8pLCBbXSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9BcnJheSA9IHRvQXJyYXk7XG4gICAgZnVuY3Rpb24gdG9PYmplY3QoaXRlcmF0b3IpIHtcbiAgICAgICAgcmV0dXJuIHJlZHVjZShpdGVyYXRvciwgKG1lbW8sIFtrZXksIHZhbHVlXSkgPT4gKG1lbW9ba2V5XSA9IHZhbHVlLCBtZW1vKSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IudG9PYmplY3QgPSB0b09iamVjdDtcbn0pKEFzeW5jSXRlcmF0b3IgfHwgKEFzeW5jSXRlcmF0b3IgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQXN5bmNJdGVyYXRvcjtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXN5bmNfaXRlcmF0b3IuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgQ2FjaGU7XG4oZnVuY3Rpb24gKENhY2hlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKG51bGwpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUobnVsbClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuY3JlYXRlID0gY3JlYXRlO1xuICAgIGZ1bmN0aW9uIGV4dGVuZChjYWNoZSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiBPYmplY3QuY3JlYXRlKGNhY2hlLmdldCksXG4gICAgICAgICAgICBwcmV2OiBPYmplY3QuY3JlYXRlKGNhY2hlLnByZXYpLFxuICAgICAgICAgICAgbmV4dDogT2JqZWN0LmNyZWF0ZShjYWNoZS5uZXh0KVxuICAgICAgICB9O1xuICAgIH1cbiAgICBDYWNoZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gYXBwbHkoc3RhdGUsIGNhY2hlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUuZ2V0ID8gY2FjaGUuZ2V0W2tleV0gOiBjYWNoZS5nZXRba2V5XSA9IHN0YXRlLmdldChrZXkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLnByZXYgPyBjYWNoZS5wcmV2W2tleV0gOiBjYWNoZS5wcmV2W2tleV0gPSBzdGF0ZS5wcmV2KGtleSkudGhlbihwcmV2ID0+IHsgY2FjaGUubmV4dFtwcmV2XSA9IFByb21pc2UucmVzb2x2ZShrZXkpOyByZXR1cm4gcHJldjsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkgPSBLZXkuc2VudGluZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBrZXkgaW4gY2FjaGUubmV4dCA/IGNhY2hlLm5leHRba2V5XSA6IGNhY2hlLm5leHRba2V5XSA9IHN0YXRlLm5leHQoa2V5KS50aGVuKG5leHQgPT4geyBjYWNoZS5wcmV2W25leHRdID0gUHJvbWlzZS5yZXNvbHZlKGtleSk7IHJldHVybiBuZXh0OyB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBnZXQsIHByZXYsIG5leHQgfTtcbiAgICB9XG4gICAgQ2FjaGUuYXBwbHkgPSBhcHBseTtcbn0pKENhY2hlIHx8IChDYWNoZSA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBDYWNoZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y2FjaGUuanMubWFwXG4iLCJleHBvcnQgdmFyIEVudHJ5O1xuKGZ1bmN0aW9uIChFbnRyeSkge1xuICAgIGZ1bmN0aW9uIGtleShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnkgJiYgZW50cnlbMF07XG4gICAgfVxuICAgIEVudHJ5LmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiB2YWx1ZShlbnRyeSkge1xuICAgICAgICByZXR1cm4gZW50cnlbMV07XG4gICAgfVxuICAgIEVudHJ5LnZhbHVlID0gdmFsdWU7XG4gICAgZnVuY3Rpb24gaXMoZW50cnksIG90aGVyKSB7XG4gICAgICAgIHJldHVybiBlbnRyeVswXSA9PT0gb3RoZXJbMF0gJiYgZW50cnlbMV0gPT09IG90aGVyWzFdO1xuICAgIH1cbiAgICBFbnRyeS5pcyA9IGlzO1xufSkoRW50cnkgfHwgKEVudHJ5ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEVudHJ5O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1lbnRyeS5qcy5tYXBcbiIsImltcG9ydCBQcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbnZhciBLZXk7XG4oZnVuY3Rpb24gKEtleSkge1xuICAgIEtleS5OT1RfRk9VTkRfRVJST1IgPSBuZXcgRXJyb3IoXCJObyBlbnRyeSBhdCB0aGUgc3BlY2lmaWVkIGtleVwiKTtcbiAgICBLZXkuTk9UX0ZPVU5EID0gUHJvbWlzZVV0aWxzLmxhenkoKHJlc29sdmUsIHJlamVjdCkgPT4gcmVqZWN0KEtleS5OT1RfRk9VTkRfRVJST1IpKTtcbiAgICBLZXkuc2VudGluZWwgPSBudWxsO1xuICAgIHZhciB1bmlxdWVLZXkgPSAwO1xuICAgIGZ1bmN0aW9uIGtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleS50b1N0cmluZygpO1xuICAgIH1cbiAgICBLZXkua2V5ID0ga2V5O1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHVuaXF1ZUtleSsrO1xuICAgIH1cbiAgICBLZXkuY3JlYXRlID0gY3JlYXRlO1xufSkoS2V5IHx8IChLZXkgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgS2V5O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1rZXkuanMubWFwXG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCB7IE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuZXhwb3J0IHZhciBMZW5zO1xuKGZ1bmN0aW9uIChMZW5zKSB7XG4gICAgZnVuY3Rpb24gY29tcG9zZShwYXJlbnQsIGxlbnMpIHtcbiAgICAgICAgdmFyIGdldFN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpLCBzZXRTdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIGlmIChwYXRjaC5hZGRlZClcbiAgICAgICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UsIGFkZGVkOiBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxlbnMuZ2V0KSB9O1xuICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlIH07XG4gICAgICAgIH0pLnN1YnNjcmliZShnZXRTdWJqZWN0KTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAoc2V0U3ViamVjdCwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSwgYWRkZWQ6IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGVucy5zZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhcmVudC5wYXRjaGVzKTtcbiAgICAgICAgcmV0dXJuIExpc3QuY3JlYXRlKFN0YXRlLm1hcChwYXJlbnQuc3RhdGUsIGxlbnMuZ2V0KSwgeyBzdWJzY3JpYmU6IGdldFN1YmplY3Quc3Vic2NyaWJlLCBvbk5leHQ6IHNldFN1YmplY3Qub25OZXh0IH0pO1xuICAgIH1cbiAgICBMZW5zLmNvbXBvc2UgPSBjb21wb3NlO1xufSkoTGVucyB8fCAoTGVucyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBMZW5zO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1sZW5zLmpzLm1hcFxuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5pbXBvcnQgUGF0Y2ggZnJvbSAnLi9wYXRjaCc7XG5pbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgeyBSYW5nZSwgUG9zaXRpb24gfSBmcm9tICcuL3JhbmdlJztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmV4cG9ydCB2YXIgTGlzdDtcbihmdW5jdGlvbiAoTGlzdCkge1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLm1hcChwYXJlbnQuc3RhdGUsIG1hcEZuKSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiAoe1xuICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxuICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBtYXBGbikgOiB1bmRlZmluZWRcbiAgICAgICAgfSkpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC5tYXAgPSBtYXA7XG4gICAgZnVuY3Rpb24gZmlsdGVyKHBhcmVudCwgZmlsdGVyRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZmlsdGVyKHBhcmVudC5zdGF0ZSwgZmlsdGVyRm4pLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgQXN5bmNJdGVyYXRvci5maW5kS2V5KFN0YXRlLnRvSXRlcmF0b3IoU3RhdGUucmV2ZXJzZShzdGF0ZSksIFtQb3NpdGlvbi5yZXZlcnNlKHBhdGNoLnJhbmdlWzBdKSwgeyBwcmV2OiBudWxsIH1dKSwgZmlsdGVyRm4pLnRoZW4obmV4dCA9PiAoeyBuZXh0IH0pKSxcbiAgICAgICAgICAgICAgICBBc3luY0l0ZXJhdG9yLmZpbmRLZXkoU3RhdGUudG9JdGVyYXRvcihzdGF0ZSwgW3BhdGNoLnJhbmdlWzFdLCB7IHByZXY6IG51bGwgfV0pLCBmaWx0ZXJGbikudGhlbihwcmV2ID0+ICh7IHByZXYgfSkpXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHtcbiAgICAgICAgICAgICAgICByYW5nZTogcmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmlsdGVyKHBhdGNoLmFkZGVkLCBmaWx0ZXJGbikgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIChvbGRTdGF0ZSwgcGF0Y2hlcykgPT4gc3RhdGUgPSBQYXRjaC5hcHBseShvbGRTdGF0ZSwgcGF0Y2hlcykpO1xuICAgIH1cbiAgICBMaXN0LmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiB6b29tKHBhcmVudCwga2V5KSB7XG4gICAgICAgIHZhciBwYXJlbnRTdGF0ZSA9IHBhcmVudC5zdGF0ZSwgc3RhdGUgPSBTdGF0ZS56b29tKHBhcmVudC5zdGF0ZSwga2V5KSwgcGF0Y2hlcyA9IE9ic2VydmFibGUubWFwKE9ic2VydmFibGUuZmlsdGVyKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKFN0YXRlLnRvSXRlcmF0b3IocGFyZW50U3RhdGUsIHBhdGNoLnJhbmdlKSwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHBhdGNoLmFkZGVkID8gU3RhdGUuaGFzKHBhdGNoLmFkZGVkLCBrZXkpIDogcmVzKTtcbiAgICAgICAgfSksIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogUmFuZ2UuYWxsLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBwYXRjaC5hZGRlZCA/IFN0YXRlLnpvb20ocGF0Y2guYWRkZWQsIGtleSkgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzKTtcbiAgICB9XG4gICAgTGlzdC56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICB2YXIgcGF0Y2hlc18gPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICB2YXIgcGFyZW50XyA9IGNhY2hlKG1hcChwYXJlbnQsICgobGlzdCwga2V5KSA9PiB7XG4gICAgICAgICAgICBPYnNlcnZhYmxlLm1hcChsaXN0LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIG1hcFByZXZQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGxpc3Quc3RhdGUucHJldihLZXkuc2VudGluZWwpLnRoZW4obmV4dCA9PiAoeyBuZXh0OiBQYXRoLnRvS2V5KFtrZXksIG5leHRdKSB9KSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyBwcmV2OiBQYXRoLnRvS2V5KFtrZXksIHBvc2l0aW9uLnByZXZdKSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5uZXh0ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5uZXh0KEtleS5zZW50aW5lbCkudGhlbihwcmV2ID0+ICh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcHJldl0pIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgcG9zaXRpb24ubmV4dF0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICAgICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pID8gbWFwTmV4dFBvc2l0aW9uKHRvKSA6IG1hcFByZXZQb3NpdGlvbih0bylcbiAgICAgICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBwYXRjaC5hZGRlZCA6IHVuZGVmaW5lZCB9KSk7XG4gICAgICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Quc3RhdGU7XG4gICAgICAgIH0pKSk7XG4gICAgICAgIE9ic2VydmFibGUubWFwKHBhcmVudC5wYXRjaGVzLCBwYXRjaCA9PiB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IHBhdGNoLnJhbmdlWzBdLCB0byA9IHBhdGNoLnJhbmdlWzFdO1xuICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLnByZXYgPT09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZSh7IHByZXY6IEtleS5zZW50aW5lbCB9KSA6IFRyZWUubmV4dChwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ucHJldl0pLnRoZW4oUGF0aC50b0tleSkudGhlbihwcmV2ID0+ICh7IHByZXYgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gbWFwTmV4dFBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBvc2l0aW9uLm5leHQgPT09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZSh7IG5leHQ6IEtleS5zZW50aW5lbCB9KSA6IFRyZWUucHJldihwYXJlbnRfLnN0YXRlLCBbcG9zaXRpb24ubmV4dF0pLnRoZW4oUGF0aC50b0tleSkudGhlbihuZXh0ID0+ICh7IG5leHQgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbihmcm9tKSA/IG1hcE5leHRQb3NpdGlvbihmcm9tKSA6IG1hcFByZXZQb3NpdGlvbihmcm9tKSxcbiAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgXSkudGhlbigocmFuZ2UpID0+ICh7IHJhbmdlOiByYW5nZSwgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuZmxhdHRlbihTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIGxpc3QgPT4gbGlzdC5zdGF0ZSkpIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKHBhdGNoZXNfKTtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUuZmxhdHRlbihwYXJlbnRfLnN0YXRlKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlc18pO1xuICAgIH1cbiAgICBMaXN0LmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5jYWNoZShwYXJlbnQuc3RhdGUpLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgcmFuZ2U6IHBhdGNoLnJhbmdlLFxuICAgICAgICAgICAgICAgIGFkZGVkOiBTdGF0ZS5jYWNoZShwYXRjaC5hZGRlZClcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0LmNhY2hlID0gY2FjaGU7XG4gICAgZnVuY3Rpb24gY3JlYXRlKHN0YXRlLCBwYXRjaGVzLCByZWR1Y2VyID0gUGF0Y2guYXBwbHkpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IHsgc3RhdGUsIHBhdGNoZXMgfTtcbiAgICAgICAgT2JzZXJ2YWJsZS5zY2FuKHBhdGNoZXMsIHJlZHVjZXIsIHN0YXRlKS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiAoc3RhdGUpID0+IHsgbGlzdC5zdGF0ZSA9IHN0YXRlOyB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9XG4gICAgTGlzdC5jcmVhdGUgPSBjcmVhdGU7XG59KShMaXN0IHx8IChMaXN0ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExpc3Q7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpc3QuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgRGlzcG9zYWJsZTtcbihmdW5jdGlvbiAoRGlzcG9zYWJsZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZShkaXNwb3Nlcikge1xuICAgICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZGlzcG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChkb25lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgZGlzcG9zZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgRGlzcG9zYWJsZS5jcmVhdGUgPSBjcmVhdGU7XG59KShEaXNwb3NhYmxlIHx8IChEaXNwb3NhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgT2JzZXJ2YWJsZTtcbihmdW5jdGlvbiAoT2JzZXJ2YWJsZSkge1xuICAgIGZ1bmN0aW9uIG1hcChvYnNlcnZhYmxlLCBtYXBGbikge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUobWFwRm4odmFsdWUpKS50aGVuKHN1YmplY3Qub25OZXh0KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIob2JzZXJ2YWJsZSwgZmlsdGVyRm4pIHtcbiAgICAgICAgY29uc3Qgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIG9ic2VydmFibGUuc3Vic2NyaWJlKHtcbiAgICAgICAgICAgIG9uTmV4dDogdmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKGZpbHRlckZuKHZhbHVlKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gc3ViamVjdC5vbk5leHQodmFsdWUpIDogdW5kZWZpbmVkKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiBzY2FuKG9ic2VydmFibGUsIHNjYW5GbiwgbWVtbykge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoc2NhbkZuKG1lbW8sIHZhbHVlKSkudGhlbih2YWx1ZSA9PiB7IG1lbW8gPSB2YWx1ZTsgc3ViamVjdC5vbk5leHQodmFsdWUpOyB9KVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHsgc3Vic2NyaWJlOiBzdWJqZWN0LnN1YnNjcmliZSB9O1xuICAgIH1cbiAgICBPYnNlcnZhYmxlLnNjYW4gPSBzY2FuO1xufSkoT2JzZXJ2YWJsZSB8fCAoT2JzZXJ2YWJsZSA9IHt9KSk7XG5leHBvcnQgdmFyIFN1YmplY3Q7XG4oZnVuY3Rpb24gKFN1YmplY3QpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIGNvbnN0IG9ic2VydmVycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgICAgIHZhciBjdXJyZW50ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIGZ1bmN0aW9uIHN1YnNjcmliZShvYnNlcnZlcikge1xuICAgICAgICAgICAgdmFyIG9ic2VydmVyS2V5ID0gS2V5LmNyZWF0ZSgpO1xuICAgICAgICAgICAgb2JzZXJ2ZXJzW29ic2VydmVyS2V5XSA9IG9ic2VydmVyO1xuICAgICAgICAgICAgcmV0dXJuIERpc3Bvc2FibGUuY3JlYXRlKCgpID0+IGRlbGV0ZSBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvbk5leHQodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50ID0gY3VycmVudC50aGVuKCgpID0+IFByb21pc2UuYWxsKE9iamVjdC5rZXlzKG9ic2VydmVycykubWFwKGtleSA9PiBvYnNlcnZlcnNba2V5XS5vbk5leHQodmFsdWUpKSkudGhlbigoKSA9PiB7IH0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmUsIG9uTmV4dCB9O1xuICAgIH1cbiAgICBTdWJqZWN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKFN1YmplY3QgfHwgKFN1YmplY3QgPSB7fSkpO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1vYnNlcnZhYmxlLmpzLm1hcFxuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuO1xuZXhwb3J0IHZhciBQYXRjaDtcbihmdW5jdGlvbiAoUGF0Y2gpIHtcbiAgICBmdW5jdGlvbiBhcHBseShzdGF0ZSwgcGF0Y2gpIHtcbiAgICAgICAgcmV0dXJuIFN0YXRlLnNwbGljZShzdGF0ZSwgcGF0Y2gucmFuZ2UsIHBhdGNoLmFkZGVkKTtcbiAgICB9XG4gICAgUGF0Y2guYXBwbHkgPSBhcHBseTtcbn0pKFBhdGNoIHx8IChQYXRjaCA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQYXRjaDtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cGF0Y2guanMubWFwXG4iLCIvLyB0eXBlIEp1c3Q8Vj4gPSBbVl07XG4vLyB0eXBlIE5vdGhpbmc8Vj4gPSBBcnJheTxWPiAmIHsgMDogdm9pZCB9XG4vLyB0eXBlIE1heWJlPFY+ID0gSnVzdDxWPiB8IE5vdGhpbmc8Vj47XG5leHBvcnQgdmFyIFByb21pc2VVdGlscztcbihmdW5jdGlvbiAoUHJvbWlzZVV0aWxzKSB7XG4gICAgZnVuY3Rpb24gbGF6eShleGVjdXRvcikge1xuICAgICAgICB2YXIgcHJvbWlzZTtcbiAgICAgICAgZnVuY3Rpb24gdGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCkge1xuICAgICAgICAgICAgaWYgKHByb21pc2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb21pc2UudGhlbihvbmZ1bGZpbGxlZCwgb25yZWplY3RlZCk7XG4gICAgICAgICAgICByZXR1cm4gKHByb21pc2UgPSBuZXcgUHJvbWlzZShleGVjdXRvcikpLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoeyB0aGVuIH0pO1xuICAgIH1cbiAgICBQcm9taXNlVXRpbHMubGF6eSA9IGxhenk7XG59KShQcm9taXNlVXRpbHMgfHwgKFByb21pc2VVdGlscyA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBQcm9taXNlVXRpbHM7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXByb21pc2VfdXRpbHMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmV4cG9ydCB2YXIgUmFuZ2U7XG4oZnVuY3Rpb24gKFJhbmdlKSB7XG4gICAgUmFuZ2UuYWxsID0gW3sgbmV4dDogS2V5LnNlbnRpbmVsIH0sIHsgcHJldjogS2V5LnNlbnRpbmVsIH1dO1xufSkoUmFuZ2UgfHwgKFJhbmdlID0ge30pKTtcbmV4cG9ydCB2YXIgUG9zaXRpb247XG4oZnVuY3Rpb24gKFBvc2l0aW9uKSB7XG4gICAgZnVuY3Rpb24gaXNQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICdwcmV2JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24gPSBpc1ByZXZQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiBpc05leHRQb3NpdGlvbihwb3NpdGlvbikge1xuICAgICAgICByZXR1cm4gJ25leHQnIGluIHBvc2l0aW9uO1xuICAgIH1cbiAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbiA9IGlzTmV4dFBvc2l0aW9uO1xuICAgIGZ1bmN0aW9uIHJldmVyc2UocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSA/IHsgbmV4dDogcG9zaXRpb24ucHJldiB9IDogeyBwcmV2OiBwb3NpdGlvbi5uZXh0IH07XG4gICAgfVxuICAgIFBvc2l0aW9uLnJldmVyc2UgPSByZXZlcnNlO1xufSkoUG9zaXRpb24gfHwgKFBvc2l0aW9uID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFJhbmdlO1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1yYW5nZS5qcy5tYXBcbiIsImltcG9ydCBfU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgX0FzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXN0IGFzIF9MaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCBfVHJlZSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IF9DYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IFN1YmplY3QgYXMgX1N1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IF9Qcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbmltcG9ydCBfTGVucyBmcm9tICcuL2xlbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIFNvbmljKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9MaXN0LmNyZWF0ZShfU3RhdGUuZnJvbUFycmF5KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tT2JqZWN0KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbn1cbmV4cG9ydCB2YXIgU29uaWM7XG4oZnVuY3Rpb24gKFNvbmljKSB7XG4gICAgU29uaWMuU3RhdGUgPSBfU3RhdGU7XG4gICAgU29uaWMuQXN5bmNJdGVyYXRvciA9IF9Bc3luY0l0ZXJhdG9yO1xuICAgIFNvbmljLkxpc3QgPSBfTGlzdDtcbiAgICBTb25pYy5UcmVlID0gX1RyZWU7XG4gICAgU29uaWMuU3ViamVjdCA9IF9TdWJqZWN0O1xuICAgIFNvbmljLkNhY2hlID0gX0NhY2hlO1xuICAgIFNvbmljLlByb21pc2VVdGlscyA9IF9Qcm9taXNlVXRpbHM7XG4gICAgU29uaWMuTGVucyA9IF9MZW5zO1xufSkoU29uaWMgfHwgKFNvbmljID0ge30pKTtcbjtcbm1vZHVsZS5leHBvcnRzID0gU29uaWM7XG5leHBvcnQgZGVmYXVsdCBTb25pYztcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c29uaWMuanMubWFwXG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBFbnRyeSBmcm9tICcuL2VudHJ5JztcbmltcG9ydCB7IFBvc2l0aW9uLCBSYW5nZSB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IENhY2hlIGZyb20gJy4vY2FjaGUnO1xuaW1wb3J0IEFzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBUcmVlLCBQYXRoIH0gZnJvbSAnLi90cmVlJztcbmV4cG9ydCB2YXIgU3RhdGU7XG4oZnVuY3Rpb24gKFN0YXRlKSB7XG4gICAgU3RhdGUuRW1wdHkgPSB7XG4gICAgICAgIGdldDogKGtleSkgPT4gS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgcHJldjogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ga2V5ID09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgbmV4dDogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ga2V5ID09IEtleS5zZW50aW5lbCA/IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpIDogS2V5Lk5PVF9GT1VORFxuICAgIH07XG4gICAgZnVuY3Rpb24gZXh0ZW5kKHBhcmVudCwgeyBnZXQsIHByZXYsIG5leHQgfSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudCk7XG4gICAgICAgIGlmIChnZXQpXG4gICAgICAgICAgICBzdGF0ZS5nZXQgPSBnZXQ7XG4gICAgICAgIGlmIChwcmV2KVxuICAgICAgICAgICAgc3RhdGUucHJldiA9IHByZXY7XG4gICAgICAgIGlmIChuZXh0KVxuICAgICAgICAgICAgc3RhdGUubmV4dCA9IG5leHQ7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgU3RhdGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGZpcnN0KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihrZXkgPT4gc3RhdGUuZ2V0KGtleSkpO1xuICAgIH1cbiAgICBTdGF0ZS5maXJzdCA9IGZpcnN0O1xuICAgIGZ1bmN0aW9uIGxhc3Qoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLnByZXYoKS50aGVuKGtleSA9PiBzdGF0ZS5nZXQoa2V5KSk7XG4gICAgfVxuICAgIFN0YXRlLmxhc3QgPSBsYXN0O1xuICAgIGZ1bmN0aW9uIGhhcyhzdGF0ZSwga2V5KSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5nZXQoa2V5KS50aGVuKCgpID0+IHRydWUsIHJlYXNvbiA9PiByZWFzb24gPT09IEtleS5OT1RfRk9VTkRfRVJST1IgPyBmYWxzZSA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpO1xuICAgIH1cbiAgICBTdGF0ZS5oYXMgPSBoYXM7XG4gICAgZnVuY3Rpb24gaXMoc3RhdGUsIG90aGVyKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGVudHJpZXMoc3RhdGUpLCBvdGhlckl0ZXJhdG9yID0gZW50cmllcyhvdGhlcik7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmlzKGl0ZXJhdG9yLCBvdGhlckl0ZXJhdG9yLCBFbnRyeS5pcyk7XG4gICAgfVxuICAgIFN0YXRlLmlzID0gaXM7XG4gICAgZnVuY3Rpb24gY29udGFpbnMoc3RhdGUsIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNvbWUoZW50cmllcyhzdGF0ZSksIChbaywgdl0pID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBpc0VtcHR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCk7XG4gICAgfVxuICAgIFN0YXRlLmlzRW1wdHkgPSBpc0VtcHR5O1xuICAgIGZ1bmN0aW9uIHNsaWNlKHBhcmVudCwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGVudHJpZXMocGFyZW50LCByYW5nZSkpO1xuICAgIH1cbiAgICBTdGF0ZS5zbGljZSA9IHNsaWNlO1xuICAgIGZ1bmN0aW9uIHNwbGljZShwYXJlbnQsIHJhbmdlLCBjaGlsZCkge1xuICAgICAgICB2YXIgZGVsZXRlZCA9IHNsaWNlKHBhcmVudCwgcmFuZ2UpLCBmaWx0ZXJlZCA9IGZpbHRlcihwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBkZWxldGVkLmdldChrZXkpLnRoZW4oKCkgPT4gZmFsc2UsICgpID0+IHRydWUpKTtcbiAgICAgICAgaWYgKGNoaWxkID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQ7XG4gICAgICAgIHZhciBicmlkZ2VkQ2hpbGQsIGJyaWRnZWRQYXJlbnQsIGZyb20gPSByYW5nZVswXSwgdG8gPSByYW5nZVsxXTtcbiAgICAgICAgYnJpZGdlZENoaWxkID0gZXh0ZW5kKGNoaWxkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gY2hpbGQucHJldihrZXkpLnRoZW4ocHJldiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHByZXYgIT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShwcmV2KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgPyBQcm9taXNlLnJlc29sdmUoZnJvbS5uZXh0KSA6IHBhcmVudC5wcmV2KGZyb20ucHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBjaGlsZC5uZXh0KGtleSkudGhlbihuZXh0ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAobmV4dCAhPT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5leHQpO1xuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgPyBQcm9taXNlLnJlc29sdmUodG8ucHJldikgOiBwYXJlbnQubmV4dCh0by5uZXh0KTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuICAgICAgICBicmlkZ2VkUGFyZW50ID0gZXh0ZW5kKGZpbHRlcmVkLCB7XG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gcGFyZW50LnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgcHJldiA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBwcmV2KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogcHJldik7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIG5leHQ6IGtleSA9PiBwYXJlbnQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKGZyb20pICYmIG5leHQgPT09IGZyb20ucHJldilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGhhcyhkZWxldGVkLCBuZXh0KS50aGVuKHJlcyA9PiByZXMgPyBLZXkuTk9UX0ZPVU5EIDogbmV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGhhcyhjaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQuZ2V0KGtleSkgOiBicmlkZ2VkUGFyZW50LmdldChrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uKHRvKSAmJiBrZXkgPT09IHRvLnByZXYpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5wcmV2KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQucHJldihrZXkpIDogYnJpZGdlZFBhcmVudC5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYga2V5ID09PSBmcm9tLm5leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQubmV4dChrZXkpIDogYnJpZGdlZFBhcmVudC5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5zcGxpY2UgPSBzcGxpY2U7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIHByZXY6IHBhcmVudC5uZXh0LFxuICAgICAgICAgICAgbmV4dDogcGFyZW50LnByZXZcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLnJldmVyc2UgPSByZXZlcnNlO1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBtYXBGbih2YWx1ZSwga2V5KSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBmdW5jdGlvbiBoYXZlKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZSA/IGNhY2hlW2tleV0gOiBjYWNoZVtrZXldID0gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gZmlsdGVyRm4odmFsdWUsIGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBoYXZlKGtleSkudGhlbihyZXMgPT4gcmVzID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJlbnQucHJldihrZXkpLnRoZW4ocCA9PiBwID09PSBudWxsID8gbnVsbCA6IGhhdmUocCkudGhlbihyZXMgPT4gcmVzID8gcCA6IHByZXYocCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0KGtleSkudGhlbihuID0+IG4gPT09IG51bGwgPyBudWxsIDogaGF2ZShuKS50aGVuKHJlcyA9PiByZXMgPyBuIDogbmV4dChuKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KTtcbiAgICB9XG4gICAgU3RhdGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IChrKSA9PiBrID09IG51bGwgPyBwYXJlbnQuZ2V0KGtleSkudGhlbigoKSA9PiBrZXksIHJlYXNvbiA9PiByZWFzb24gPT09IEtleS5OT1RfRk9VTkRfRVJST1IgPyBudWxsIDogUHJvbWlzZS5yZWplY3QocmVhc29uKSkgOiAoa2V5ID09PSBrID8gUHJvbWlzZS5yZXNvbHZlKG51bGwpIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGsgPT4gayA9PT0ga2V5ID8gcGFyZW50LmdldChrZXkpIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgICAgIHByZXY6IG5leHQsXG4gICAgICAgICAgICBuZXh0OiBuZXh0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS56b29tID0gem9vbTtcbiAgICBmdW5jdGlvbiBmbGF0dGVuKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gVHJlZS5nZXQocGFyZW50LCBQYXRoLmZyb21LZXkoa2V5KSksXG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gVHJlZS5wcmV2KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLnRoZW4oUGF0aC50b0tleSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gVHJlZS5uZXh0KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLnRoZW4oUGF0aC50b0tleSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLmZsYXR0ZW4gPSBmbGF0dGVuO1xuICAgIGZ1bmN0aW9uIGNhY2hlKHBhcmVudCkge1xuICAgICAgICByZXR1cm4gQ2FjaGUuYXBwbHkocGFyZW50LCBDYWNoZS5jcmVhdGUoKSk7XG4gICAgfVxuICAgIFN0YXRlLmNhY2hlID0gY2FjaGU7XG4gICAgZnVuY3Rpb24ga2V5QnkocGFyZW50LCBrZXlGbikge1xuICAgICAgICB2YXIga2V5TWFwID0gY2FjaGUoU3RhdGUubWFwKHBhcmVudCwga2V5Rm4pKTtcbiAgICAgICAgdmFyIHJldmVyc2VLZXlNYXAgPSBjYWNoZSh7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBBc3luY0l0ZXJhdG9yLmZpbmQoZW50cmllcyhrZXlNYXApLCAoW2ssIHZdKSA9PiB2ID09PSBrZXkpLnRoZW4oRW50cnkua2V5KSxcbiAgICAgICAgICAgIHByZXY6IChrZXkgPSBLZXkuc2VudGluZWwpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGtleSA9PT0gS2V5LnNlbnRpbmVsID8gS2V5LnNlbnRpbmVsIDogcmV2ZXJzZUtleU1hcC5nZXQoa2V5KSlcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oa2V5TWFwLnByZXYpLnRoZW4ocHJldiA9PiBwcmV2ID09PSBLZXkuc2VudGluZWwgPyBwcmV2IDoga2V5TWFwLmdldChwcmV2KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogKGtleSA9IEtleS5zZW50aW5lbCkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5ID09PSBLZXkuc2VudGluZWwgPyBLZXkuc2VudGluZWwgOiByZXZlcnNlS2V5TWFwLmdldChrZXkpKVxuICAgICAgICAgICAgICAgICAgICAudGhlbihrZXlNYXAubmV4dCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCA/IG5leHQgOiBrZXlNYXAuZ2V0KG5leHQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBleHRlbmQocmV2ZXJzZUtleU1hcCwgeyBnZXQ6IGtleSA9PiByZXZlcnNlS2V5TWFwLmdldChrZXkpLnRoZW4oa2V5ID0+IGtleSA9PT0gS2V5LnNlbnRpbmVsID8gS2V5Lk5PVF9GT1VORCA6IHBhcmVudC5nZXQoa2V5KSkgfSk7XG4gICAgfVxuICAgIFN0YXRlLmtleUJ5ID0ga2V5Qnk7XG4gICAgZnVuY3Rpb24ga2V5cyhwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIG1hcChwYXJlbnQsICh2YWx1ZSwga2V5KSA9PiBrZXkpO1xuICAgIH1cbiAgICBTdGF0ZS5rZXlzID0ga2V5cztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhBc3luY0l0ZXJhdG9yLmZyb21BcnJheSh2YWx1ZXMubWFwKCh2YWx1ZSwga2V5KSA9PiBba2V5LCB2YWx1ZV0pKSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xuICAgICAgICByZXR1cm4gZnJvbUVudHJpZXMoQXN5bmNJdGVyYXRvci5mcm9tT2JqZWN0KHZhbHVlcykpO1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiBmcm9tRW50cmllcyhpdGVyYXRvcikge1xuICAgICAgICB2YXIgY2FjaGUgPSBDYWNoZS5jcmVhdGUoKSwgZXhoYXVzdGVkID0gZmFsc2UsIGN1cnJlbnRLZXkgPSBudWxsLCBxdWV1ZSA9IFByb21pc2UucmVzb2x2ZShudWxsKTtcbiAgICAgICAgdmFyIGNhY2hpbmdJdGVyYXRvciA9IHtcbiAgICAgICAgICAgIG5leHQ6ICgpID0+IGl0ZXJhdG9yLm5leHQoKS50aGVuKCh7IGRvbmUsIHZhbHVlOiBlbnRyeSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgZXhoYXVzdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgY2FjaGUucHJldltLZXkuc2VudGluZWxdID0gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgICAgICAgICBjYWNoZS5uZXh0W2N1cnJlbnRLZXldID0gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNlbnRpbmVsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWNoZS5wcmV2W2VudHJ5WzBdXSA9IFByb21pc2UucmVzb2x2ZShjdXJyZW50S2V5KTtcbiAgICAgICAgICAgICAgICBjYWNoZS5uZXh0W2N1cnJlbnRLZXldID0gUHJvbWlzZS5yZXNvbHZlKGVudHJ5WzBdKTtcbiAgICAgICAgICAgICAgICBjYWNoZS5nZXRbZW50cnlbMF1dID0gUHJvbWlzZS5yZXNvbHZlKGVudHJ5WzFdKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50S2V5ID0gZW50cnlbMF07XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgZG9uZSwgdmFsdWU6IGVudHJ5IH07XG4gICAgICAgICAgICB9KVxuICAgICAgICB9O1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICBpZiAoZXhoYXVzdGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZmluZChjYWNoaW5nSXRlcmF0b3IsIChbaywgdl0pID0+IGsgPT09IGtleSkudGhlbihFbnRyeS52YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKGNhY2hpbmdJdGVyYXRvciwgKFtrLCB2XSkgPT4gayA9PT0ga2V5KS50aGVuKCgpID0+IGtleSBpbiBjYWNoZS5wcmV2ID8gY2FjaGUucHJldltrZXldIDogS2V5Lk5PVF9GT1VORCk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gbmV4dChrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICBpZiAoa2V5ID09PSBjdXJyZW50S2V5KVxuICAgICAgICAgICAgICAgIHJldHVybiBjYWNoaW5nSXRlcmF0b3IubmV4dCgpLnRoZW4ocmVzdWx0ID0+IHJlc3VsdC5kb25lID8gS2V5LnNlbnRpbmVsIDogcmVzdWx0LnZhbHVlWzBdKTtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCAoW2ssIHZdKSA9PiBrID09PSBrZXkpLnRoZW4oKCkgPT4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0LmRvbmUgPyBLZXkuc2VudGluZWwgOiByZXN1bHQudmFsdWVbMF0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDYWNoZS5hcHBseSh7IGdldCwgcHJldiwgbmV4dCB9LCBjYWNoZSk7XG4gICAgfVxuICAgIFN0YXRlLmZyb21FbnRyaWVzID0gZnJvbUVudHJpZXM7XG4gICAgZnVuY3Rpb24gZW50cmllcyhzdGF0ZSwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBLZXkuc2VudGluZWwsIGRvbmUgPSBmYWxzZSwgZnJvbSA9IHJhbmdlWzBdLCB0byA9IHJhbmdlWzFdO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmV4dDogKCkgPT4ge1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGtleSA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkb25lID0gdHJ1ZSwgUHJvbWlzZS5yZXNvbHZlKEFzeW5jSXRlcmF0b3Iuc2VudGluZWwpKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHN0YXRlLmdldChrZXkpLnRoZW4odmFsdWUgPT4gKGN1cnJlbnQgPSBrZXksIHsgZG9uZTogZmFsc2UsIHZhbHVlOiBba2V5LCB2YWx1ZV0gfSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBpdGVyYXRlKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIHRvLnByZXYgPT09IG5leHQpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChuZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSAmJiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgZnJvbS5wcmV2ID09PSB0by5wcmV2KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZ2V0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICAgICAgaWYgKFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pICYmIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSAmJiBmcm9tLm5leHQgPT09IHRvLm5leHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgPyBnZXQoZnJvbS5wcmV2KSA6IGl0ZXJhdGUoZnJvbS5uZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHRvLm5leHQgPT09IGN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBnZXQoS2V5LnNlbnRpbmVsKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlcmF0ZShjdXJyZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG4gICAgU3RhdGUuZW50cmllcyA9IGVudHJpZXM7XG59KShTdGF0ZSB8fCAoU3RhdGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgU3RhdGU7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN0YXRlLmpzLm1hcFxuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IHZhciBQYXRoO1xuKGZ1bmN0aW9uIChQYXRoKSB7XG4gICAgZnVuY3Rpb24ga2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gZnJvbUtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2Uoa2V5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBQYXRoLmZyb21LZXkgPSBmcm9tS2V5O1xuICAgIGZ1bmN0aW9uIHRvS2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC50b0tleSA9IHRvS2V5O1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGdldChwYXRoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbaW5kZXhdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gdGFpbChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBbXSA6IHBhdGguc2xpY2UoMSwgcGF0aC5sZW5ndGgpO1xuICAgIH1cbiAgICBQYXRoLnRhaWwgPSB0YWlsO1xuICAgIGZ1bmN0aW9uIGFwcGVuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoYSkuY29uY2F0KGIpO1xuICAgIH1cbiAgICBQYXRoLmFwcGVuZCA9IGFwcGVuZDtcbn0pKFBhdGggfHwgKFBhdGggPSB7fSkpO1xuZXhwb3J0IHZhciBUcmVlO1xuKGZ1bmN0aW9uIChUcmVlKSB7XG4gICAgZnVuY3Rpb24gZ2V0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZCkudGhlbihzdGF0ZSA9PiBzdGF0ZS5nZXQodGFpbCkpO1xuICAgIH1cbiAgICBUcmVlLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiBwcmV2KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBwcmV2cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUucHJldigpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKHByZXZzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5wcmV2KCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLnByZXYodGFpbCkpXG4gICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBuZXh0cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUubmV4dCgpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKG5leHRzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQodGFpbCkpXG4gICAgICAgICAgICAudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IFtoZWFkLCBuZXh0XSA6IHBhdGhzLm5leHQoaGVhZCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5uZXh0ID0gbmV4dDtcbn0pKFRyZWUgfHwgKFRyZWUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgVHJlZTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dHJlZS5qcy5tYXBcbiJdfQ==
