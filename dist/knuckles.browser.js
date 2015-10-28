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

},{"../node_modules/sonic/dist/sonic":13,"./resource":2,"./xhr":3}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

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
        return _sonicDistAsync_iterator2['default'].forEach(_sonicDistState2['default'].toIterator(state), function () {});
    }
    function create(urlRoot) {
        var keyProperty = arguments.length <= 1 || arguments[1] === undefined ? 'id' : arguments[1];

        var subject = _sonicDistObservable.Subject.create(),
            observable = _sonicDistObservable.Observable.map(subject, function (patch) {
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
                return {
                    range: patch.range,
                    added: keyed
                };
            });
        });
        return _sonicDistList.List.create(createState(urlRoot, keyProperty), {
            onNext: subject.onNext,
            subscribe: observable.subscribe
        });
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

},{"./xhr":3,"sonic/dist/async_iterator":4,"sonic/dist/cache":5,"sonic/dist/list":8,"sonic/dist/observable":9,"sonic/dist/promise_utils":11,"sonic/dist/state":14}],3:[function(require,module,exports){
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key2 = require('./key');

var _key3 = _interopRequireDefault(_key2);

var AsyncIterator;
exports.AsyncIterator = AsyncIterator;
(function (AsyncIterator) {
    AsyncIterator.Empty = {
        get: function get() {
            return _key3['default'].NOT_FOUND;
        },
        next: function next() {
            return Promise.resolve(_key3['default'].sentinel);
        }
    };
    function extend(iterator, partial) {
        iterator = Object.create(iterator);
        if ('get' in partial) iterator.get = partial.get;
        if ('next' in partial) iterator.next = partial.next;
        return iterator;
    }
    AsyncIterator.extend = extend;
    function every(iterator, predicate) {
        function loop() {
            return iterator.next().then(function (key) {
                return key == null || iterator.get().then(function (value) {
                    return predicate(value, key);
                }).then(function (result) {
                    return result ? loop() : false;
                });
            });
        }
        return loop();
    }
    AsyncIterator.every = every;
    function some(iterator, predicate) {
        return every(iterator, function (value, key) {
            return Promise.resolve(predicate(value, key)).then(function (result) {
                return !result;
            });
        }).then(function (result) {
            return !result;
        });
    }
    AsyncIterator.some = some;
    function forEach(iterator, fn) {
        return every(iterator, function (value, key) {
            return Promise.resolve(fn(value, key)).then(function () {
                return true;
            });
        }).then(function () {});
    }
    AsyncIterator.forEach = forEach;
    function reduce(iterator, fn, memo) {
        return forEach(iterator, function (value, key) {
            return Promise.resolve(fn(memo, value, key)).then(function (value) {
                memo = value;
            });
        }).then(function () {
            return memo;
        });
    }
    AsyncIterator.reduce = reduce;
    function findKey(iterator, predicate) {
        var key;
        return some(iterator, function (v, k) {
            return Promise.resolve(predicate(v, k)).then(function (res) {
                return res ? (key = k, true) : false;
            });
        }).then(function (found) {
            return found ? key : _key3['default'].sentinel;
        });
    }
    AsyncIterator.findKey = findKey;
    function find(iterator, predicate) {
        return findKey(iterator, predicate).then(iterator.get);
    }
    AsyncIterator.find = find;
    function keyOf(iterator, value) {
        return findKey(iterator, function (v) {
            return v === value;
        });
    }
    AsyncIterator.keyOf = keyOf;
    function indexOf(iterator, value) {
        var index = -1;
        return some(iterator, function (v, k) {
            return (index++, value == v);
        }).then(function (found) {
            return found ? index : _key3['default'].NOT_FOUND;
        });
    }
    AsyncIterator.indexOf = indexOf;
    function keyAt(iterator, index) {
        return findKey(iterator, function () {
            return 0 === index--;
        });
    }
    AsyncIterator.keyAt = keyAt;
    function at(iterator, index) {
        return keyAt(iterator, index).then(iterator.get);
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
            var iterated = false;
            return {
                get: function get() {
                    return iterated ? value.get() : memo.get();
                },
                next: function next() {
                    return iterated ? value.next() : memo.next().then(function (key) {
                        return key !== _key3['default'].sentinel ? key : (iterated = true, value.next());
                    });
                }
            };
        }, AsyncIterator.Empty);
    }
    AsyncIterator.concat = concat;
    function fromEntries(entries) {
        var current = -1;
        return {
            get: function get() {
                return current === -1 ? _key3['default'].NOT_FOUND : Promise.resolve(entries[current][1]);
            },
            next: function next() {
                return Promise.resolve(++current === entries.length ? _key3['default'].sentinel : entries[current][0]);
            }
        };
    }
    AsyncIterator.fromEntries = fromEntries;
    function fromArray(array) {
        return fromEntries(array.map(function (value, key) {
            return [key, value];
        }));
    }
    AsyncIterator.fromArray = fromArray;
    function fromObject(object) {
        return fromEntries(Object.keys(object).map(function (key) {
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
        return reduce(iterator, function (memo, value, key) {
            return (memo[key] = value, memo);
        }, Object.create(null));
    }
    AsyncIterator.toObject = toObject;
})(AsyncIterator || (exports.AsyncIterator = AsyncIterator = {}));
exports['default'] = AsyncIterator;

},{"./key":6}],5:[function(require,module,exports){
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

},{"./key":6}],6:[function(require,module,exports){
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

},{"./promise_utils":11}],7:[function(require,module,exports){
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

},{"./list":8,"./observable":9,"./state":14}],8:[function(require,module,exports){
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

},{"./async_iterator":4,"./key":6,"./observable":9,"./patch":10,"./range":12,"./state":14,"./tree":15}],9:[function(require,module,exports){
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

},{"./key":6}],10:[function(require,module,exports){
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

},{"./state":14}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{"./key":6}],13:[function(require,module,exports){
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

},{"./async_iterator":4,"./cache":5,"./lens":7,"./list":8,"./observable":9,"./promise_utils":11,"./state":14,"./tree":15}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _key = require('./key');

var _key2 = _interopRequireDefault(_key);

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
    function contains(state, value) {
        return _async_iterator2['default'].some(toIterator(state), function (v, k) {
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

        return fromIterator(toIterator(parent, range));
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
            return child.get(key)['catch'](function (reason) {
                return reason === _key2['default'].NOT_FOUND_ERROR ? bridgedParent.get(key) : Promise.reject(reason);
            });
        }
        function prev() {
            var key = arguments.length <= 0 || arguments[0] === undefined ? _key2['default'].sentinel : arguments[0];

            if (_range.Position.isPrevPosition(to) && key === to.prev) return bridgedParent.next(_key2['default'].sentinel);
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
        function get(key) {
            return parent.get(key).then(function (value) {
                return Promise.resolve(filterFn(value, key)).then(function (res) {
                    return res ? value : _key2['default'].NOT_FOUND;
                });
            });
        }
        function prev(key) {
            return parent.prev(key).then(function (p) {
                return p === null ? null : parent.get(p).then(function (value) {
                    return filterFn(value, p);
                }).then(function (result) {
                    return result ? p : prev(p);
                });
            });
        }
        function next(key) {
            return parent.next(key).then(function (n) {
                return n === null ? null : parent.get(n).then(function (value) {
                    return filterFn(value, n);
                }).then(function (result) {
                    return result ? n : next(n);
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
                return _async_iterator2['default'].keyOf(State.toIterator(keyMap), key);
            },
            prev: function prev(key) {
                return reverseKeyMap.get(key).then(keyMap.prev).then(function (prev) {
                    return prev === _key2['default'].sentinel ? prev : keyMap.get(prev);
                });
            },
            next: function next(key) {
                return reverseKeyMap.get(key).then(keyMap.next).then(function (next) {
                    return next === _key2['default'].sentinel ? next : keyMap.get(next);
                });
            }
        });
        return extend(reverseKeyMap, { get: function get(key) {
                return reverseKeyMap.get(key).then(parent.get);
            } });
    }
    State.keyBy = keyBy;
    function fromArray(values) {
        return {
            get: function get(key) {
                return key in values ? Promise.resolve(values[key]) : _key2['default'].NOT_FOUND;
            },
            prev: function prev(key) {
                var index = key == null ? values.length - 1 : key - 1;
                return Promise.resolve(index === -1 ? null : index);
            },
            next: function next(key) {
                var index = key == null ? 0 : key + 1;
                return Promise.resolve(index === values.length ? null : index);
            }
        };
    }
    State.fromArray = fromArray;
    function fromObject(values) {
        var keys = Object.keys(values),
            indexByKey = keys.reduce(function (memo, key, index) {
            memo[key] = index;
            return memo;
        }, Object.create(null));
        return {
            get: function get(key) {
                return key in values ? Promise.resolve(values[key]) : _key2['default'].NOT_FOUND;
            },
            prev: function prev(key) {
                if (key == null) return Promise.resolve(keys[keys.length - 1]);
                if (!(key in indexByKey)) return _key2['default'].NOT_FOUND;
                var index = indexByKey[key];
                if (index === 0) return Promise.resolve(null);
                return Promise.resolve(keys[index - 1]);
            },
            next: function next(key) {
                if (key == null) return Promise.resolve(keys[0]);
                if (!(key in indexByKey)) return _key2['default'].NOT_FOUND;
                var index = indexByKey[key];
                if (index === keys.length - 1) return Promise.resolve(null);
                return Promise.resolve(keys[index + 1]);
            }
        };
    }
    State.fromObject = fromObject;
    function fromIterator(iterator) {
        var cache = _cache2['default'].create(),
            exhausted = false,
            currentKey = null;
        var cachingIterator = _async_iterator2['default'].extend(iterator, {
            get: function get() {
                return cache.get[currentKey] = iterator.get();
            },
            next: function next() {
                return cache.next[currentKey] = iterator.next().then(function (key) {
                    cache.prev[key] = Promise.resolve(currentKey);
                    exhausted = key === null;
                    return currentKey = key;
                });
            }
        });
        function get(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            if (key === currentKey) return cachingIterator.get();
            return _async_iterator2['default'].find(cachingIterator, function (value, k) {
                return k === key;
            });
        }
        function prev(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            return _async_iterator2['default'].some(cachingIterator, function (value, k) {
                return k === key;
            }).then(function () {
                return cache.prev[key];
            });
        }
        function next(key) {
            if (exhausted) return _key2['default'].NOT_FOUND;
            if (key === currentKey) return cachingIterator.next();
            return _async_iterator2['default'].findKey(cachingIterator, function (value, k) {
                return k === key;
            }).then(function () {
                return cachingIterator.next();
            });
        }
        return _cache2['default'].apply({ get: get, prev: prev, next: next }, cache);
    }
    State.fromIterator = fromIterator;
    function toIterator(state) {
        var range = arguments.length <= 1 || arguments[1] === undefined ? _range.Range.all : arguments[1];

        var current = _key2['default'].sentinel;
        function get() {
            return state.get(current);
        }
        function next() {
            var from = range[0],
                to = range[1];
            function iterate(key) {
                return state.next(key).then(function (next) {
                    return _range.Position.isPrevPosition(to) && to.prev === next ? current = _key2['default'].sentinel : current = next;
                });
            }
            if (_range.Position.isPrevPosition(from) && _range.Position.isPrevPosition(to) && from.prev === to.prev) return Promise.resolve(_key2['default'].sentinel);
            if (_range.Position.isNextPosition(from) && _range.Position.isNextPosition(to) && from.next === to.next) return Promise.resolve(_key2['default'].sentinel);
            if (current === _key2['default'].sentinel) return _range.Position.isPrevPosition(from) ? Promise.resolve(current = from.prev) : iterate(from.next);
            if (_range.Position.isNextPosition(to) && to.next === current) return Promise.resolve(current = _key2['default'].sentinel);
            return iterate(current);
        }
        return { get: get, next: next };
    }
    State.toIterator = toIterator;
})(State || (exports.State = State = {}));
exports['default'] = State;

},{"./async_iterator":4,"./cache":5,"./key":6,"./range":12,"./tree":15}],15:[function(require,module,exports){
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

},{"./state":14}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvZGlzdC9rbnVja2xlcy5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9kaXN0L3Jlc291cmNlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL2Rpc3QveGhyLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2FzeW5jX2l0ZXJhdG9yLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2NhY2hlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2tleS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9sZW5zLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L2xpc3QuanMiLCIvaG9tZS9qb29zdC9Eb2N1bWVudHMvUHJvamVjdHMva251Y2tsZXMvbm9kZV9tb2R1bGVzL3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZS5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9wYXRjaC5qcyIsIi9ob21lL2pvb3N0L0RvY3VtZW50cy9Qcm9qZWN0cy9rbnVja2xlcy9ub2RlX21vZHVsZXMvc29uaWMvZGlzdC9wcm9taXNlX3V0aWxzLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3JhbmdlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3NvbmljLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3N0YXRlLmpzIiwiL2hvbWUvam9vc3QvRG9jdW1lbnRzL1Byb2plY3RzL2tudWNrbGVzL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3RyZWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7O0FBRWIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsWUFBWSxFQUFFO0FBQ3pDLFNBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQyxDQUFDOztBQUVILFNBQVMsc0JBQXNCLENBQUMsR0FBRyxFQUFFO0FBQUUsV0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLEdBQUcsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUM7Q0FBRTs7QUFFakcsSUFBSSwyQkFBMkIsR0FBRyxPQUFPLENBUnRCLGtDQUFrQyxDQUFBLENBQUE7O0FBVXJELElBQUksNEJBQTRCLEdBQUcsc0JBQXNCLENBQUMsMkJBQTJCLENBQUMsQ0FBQzs7QUFFdkYsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQVhELE9BQU8sQ0FBQSxDQUFBOztBQWF4QixJQUFJLEtBQUssR0FBRyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQzs7QUFFekMsSUFBSSxTQUFTLEdBQUcsT0FBTyxDQWRELFlBQVksQ0FBQSxDQUFBOztBQWdCbEMsSUFBSSxVQUFVLEdBQUcsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7O0FBZm5ELElBQUksUUFBUSxDQUFDO0FBQ2IsQ0FBQyxVQUFVLFFBQVEsRUFBRTtBQUNqQixZQUFRLENBQUMsS0FBSyxHQUFBLDRCQUFBLENB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LElBQUksRUFBRTtTQUFBLENBQUMsRUFBRSxVQUFBLEtBQUs7bUJBQUksS0FBSyxJQUFJLElBQUk7U0FBQSxDQUFDO1lBQUUsS0FBSyxHQUFHLG1CQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsVUFBQyxLQUFLLEVBQUUsR0FBRzttQkFBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUM7U0FBQSxDQUFDLENBQUM7QUFDck0sWUFBSSxJQUFJLElBQUksSUFBSSxFQUNaLE9BQU8sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFBLElBQUk7bUJBQUksSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUk7U0FBQSxDQUFDLENBQUM7QUFDNUUsZUFBTyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUNoQixJQUFJLENBQUMsVUFBQSxLQUFLO21CQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1NBQUEsQ0FBQyxDQUMvQixJQUFJLENBQUMsVUFBQSxJQUFJO21CQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxJQUFJO3VCQUFJLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJO2FBQUEsQ0FBQztTQUFBLENBQUMsQ0FBQztLQUN6SDtBQUNELFFBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0NBQ3BCLENBQUEsQ0FBRSxJQUFJLGFBekJJLElBQUksR0F5QkgsSUFBSSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7cUJBQ1QsSUFBSSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgX1NvbmljIGZyb20gJy4uL25vZGVfbW9kdWxlcy9zb25pYy9kaXN0L3NvbmljJztcbmltcG9ydCBfWEhSIGZyb20gJy4veGhyJztcbmltcG9ydCBfUmVzb3VyY2UgZnJvbSAnLi9yZXNvdXJjZSc7XG52YXIgS251Y2tsZXM7XG4oZnVuY3Rpb24gKEtudWNrbGVzKSB7XG4gICAgS251Y2tsZXMuU29uaWMgPSBfU29uaWM7XG4gICAgS251Y2tsZXMuWEhSID0gX1hIUjtcbiAgICBLbnVja2xlcy5SZXNvdXJjZSA9IF9SZXNvdXJjZTtcbn0pKEtudWNrbGVzIHx8IChLbnVja2xlcyA9IHt9KSk7XG5tb2R1bGUuZXhwb3J0cyA9IEtudWNrbGVzO1xuZXhwb3J0IGRlZmF1bHQgS251Y2tsZXM7XG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnc29uaWMvZGlzdC9zdGF0ZSc7XG5pbXBvcnQgQ2FjaGUgZnJvbSAnc29uaWMvZGlzdC9jYWNoZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICdzb25pYy9kaXN0L2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICdzb25pYy9kaXN0L2xpc3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJ3NvbmljL2Rpc3Qvb2JzZXJ2YWJsZSc7XG5pbXBvcnQgUHJvbWlzZVV0aWxzIGZyb20gJ3NvbmljL2Rpc3QvcHJvbWlzZV91dGlscyc7XG5pbXBvcnQgWEhSIGZyb20gJy4veGhyJztcbmV4cG9ydCB2YXIgUmVzb3VyY2U7XG4oZnVuY3Rpb24gKFJlc291cmNlKSB7XG4gICAgZnVuY3Rpb24gdGh1bmsoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3IuZm9yRWFjaChTdGF0ZS50b0l0ZXJhdG9yKHN0YXRlKSwgKCkgPT4geyB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlKHVybFJvb3QsIGtleVByb3BlcnR5ID0gJ2lkJykge1xuICAgICAgICB2YXIgc3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCksIG9ic2VydmFibGUgPSBPYnNlcnZhYmxlLm1hcChzdWJqZWN0LCBwYXRjaCA9PiB7XG4gICAgICAgICAgICB2YXIgc3luY2VkID0gU3RhdGUubWFwKHBhdGNoLmFkZGVkLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IHZhbHVlW2tleVByb3BlcnR5XSwgc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiAoa2V5ICE9IG51bGwgPyBYSFIucHV0KGAke3VybFJvb3R9LyR7a2V5fWAsIHN0cmluZykgOiBYSFIucG9zdCh1cmxSb290LCBzdHJpbmcpKS50aGVuKEpTT04ucGFyc2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgY2FjaGVkID0gU3RhdGUuY2FjaGUoc3luY2VkKTtcbiAgICAgICAgICAgIHZhciBrZXllZCA9IFN0YXRlLmtleUJ5KGNhY2hlZCwgdmFsdWUgPT4gdmFsdWVba2V5UHJvcGVydHldKTtcbiAgICAgICAgICAgIHJldHVybiB0aHVuayhrZXllZCkudGhlbigoKSA9PiAoe1xuICAgICAgICAgICAgICAgIHJhbmdlOiBwYXRjaC5yYW5nZSxcbiAgICAgICAgICAgICAgICBhZGRlZDoga2V5ZWRcbiAgICAgICAgICAgIH0pKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShjcmVhdGVTdGF0ZSh1cmxSb290LCBrZXlQcm9wZXJ0eSksIHtcbiAgICAgICAgICAgIG9uTmV4dDogc3ViamVjdC5vbk5leHQsXG4gICAgICAgICAgICBzdWJzY3JpYmU6IG9ic2VydmFibGUuc3Vic2NyaWJlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBSZXNvdXJjZS5jcmVhdGUgPSBjcmVhdGU7XG4gICAgZnVuY3Rpb24gY3JlYXRlU3RhdGUodXJsUm9vdCwga2V5UHJvcGVydHkgPSAnaWQnKSB7XG4gICAgICAgIHZhciBjYWNoZSA9IENhY2hlLmNyZWF0ZSgpO1xuICAgICAgICB2YXIgZmV0Y2hlciA9IFByb21pc2VVdGlscy5sYXp5KHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gWEhSLmdldCh1cmxSb290KVxuICAgICAgICAgICAgICAgIC50aGVuKEpTT04ucGFyc2UpXG4gICAgICAgICAgICAgICAgLnRoZW4oU3RhdGUuZnJvbUFycmF5KVxuICAgICAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IFN0YXRlLmtleUJ5KHN0YXRlLCB2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgY2FjaGUuZ2V0W3ZhbHVlW2tleVByb3BlcnR5XV0gPSBQcm9taXNlLnJlc29sdmUodmFsdWUpO1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZVtrZXlQcm9wZXJ0eV07XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICByZXNvbHZlKHN0YXRlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBYSFIuZ2V0KGAke3VybFJvb3R9LyR7a2V5fWApLnRoZW4oSlNPTi5wYXJzZSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBmZXRjaGVyLnRoZW4oc3RhdGUgPT4gc3RhdGUucHJldihrZXkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGZldGNoZXIudGhlbihzdGF0ZSA9PiBzdGF0ZS5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDYWNoZS5hcHBseSh7IGdldCwgcHJldiwgbmV4dCB9LCBjYWNoZSk7XG4gICAgfVxuICAgIFJlc291cmNlLmNyZWF0ZVN0YXRlID0gY3JlYXRlU3RhdGU7XG59KShSZXNvdXJjZSB8fCAoUmVzb3VyY2UgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUmVzb3VyY2U7XG4iLCJleHBvcnQgdmFyIFhIUjtcbihmdW5jdGlvbiAoWEhSKSB7XG4gICAgZnVuY3Rpb24gZmV0Y2godXJsLCBvcHRpb25zKSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksIHsgbWV0aG9kLCBib2R5IH0gPSBvcHRpb25zO1xuICAgICAgICAgICAgeGhyLm9ubG9hZCA9ICgpID0+IHhoci5zdGF0dXMgPj0gMjAwICYmIHhoci5zdGF0dXMgPCA0MDAgPyByZXNvbHZlKHhocikgOiByZWplY3QoeGhyKTtcbiAgICAgICAgICAgIHhoci5vbmVycm9yID0geGhyLm9uYWJvcnQgPSB4aHIub250aW1lb3V0ID0gKCkgPT4gcmVqZWN0KHhocik7XG4gICAgICAgICAgICB4aHIub3BlbihtZXRob2QsIHVybCwgdHJ1ZSk7XG4gICAgICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb24nKTtcbiAgICAgICAgICAgIHhoci5zZW5kKGJvZHkpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgWEhSLmZldGNoID0gZmV0Y2g7XG4gICAgZnVuY3Rpb24gZ2V0KHVybCkge1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7IG1ldGhvZDogJ2dldCcgfSkudGhlbih4aHIgPT4geGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgfVxuICAgIFhIUi5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gcHV0KHVybCwgYm9keSkge1xuICAgICAgICByZXR1cm4gZmV0Y2godXJsLCB7IG1ldGhvZDogJ3B1dCcsIGJvZHk6IGJvZHkgfSkudGhlbih4aHIgPT4geGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgfVxuICAgIFhIUi5wdXQgPSBwdXQ7XG4gICAgZnVuY3Rpb24gcG9zdCh1cmwsIGJvZHkpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwgeyBtZXRob2Q6ICdwb3N0JywgYm9keTogYm9keSB9KS50aGVuKHhociA9PiB4aHIucmVzcG9uc2VUZXh0KTtcbiAgICB9XG4gICAgWEhSLnBvc3QgPSBwb3N0O1xuICAgIGZ1bmN0aW9uIGRlbCh1cmwpIHtcbiAgICAgICAgcmV0dXJuIGZldGNoKHVybCwgeyBtZXRob2Q6ICdkZWxldGUnIH0pLnRoZW4oeGhyID0+IHhoci5yZXNwb25zZVRleHQpO1xuICAgIH1cbiAgICBYSFIuZGVsID0gZGVsO1xufSkoWEhSIHx8IChYSFIgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgWEhSO1xuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIEFzeW5jSXRlcmF0b3I7XG4oZnVuY3Rpb24gKEFzeW5jSXRlcmF0b3IpIHtcbiAgICBBc3luY0l0ZXJhdG9yLkVtcHR5ID0ge1xuICAgICAgICBnZXQ6ICgpID0+IEtleS5OT1RfRk9VTkQsXG4gICAgICAgIG5leHQ6ICgpID0+IFByb21pc2UucmVzb2x2ZShLZXkuc2VudGluZWwpXG4gICAgfTtcbiAgICBmdW5jdGlvbiBleHRlbmQoaXRlcmF0b3IsIHBhcnRpYWwpIHtcbiAgICAgICAgaXRlcmF0b3IgPSBPYmplY3QuY3JlYXRlKGl0ZXJhdG9yKTtcbiAgICAgICAgaWYgKCdnZXQnIGluIHBhcnRpYWwpXG4gICAgICAgICAgICBpdGVyYXRvci5nZXQgPSBwYXJ0aWFsLmdldDtcbiAgICAgICAgaWYgKCduZXh0JyBpbiBwYXJ0aWFsKVxuICAgICAgICAgICAgaXRlcmF0b3IubmV4dCA9IHBhcnRpYWwubmV4dDtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmV4dGVuZCA9IGV4dGVuZDtcbiAgICBmdW5jdGlvbiBldmVyeShpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIGZ1bmN0aW9uIGxvb3AoKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlcmF0b3IubmV4dCgpLnRoZW4oa2V5ID0+IGtleSA9PSBudWxsIHx8IGl0ZXJhdG9yLmdldCgpLnRoZW4odmFsdWUgPT4gcHJlZGljYXRlKHZhbHVlLCBrZXkpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQgPyBsb29wKCkgOiBmYWxzZSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsb29wKCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZXZlcnkgPSBldmVyeTtcbiAgICBmdW5jdGlvbiBzb21lKGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgcmV0dXJuIGV2ZXJ5KGl0ZXJhdG9yLCAodmFsdWUsIGtleSkgPT4gUHJvbWlzZS5yZXNvbHZlKHByZWRpY2F0ZSh2YWx1ZSwga2V5KSkudGhlbihyZXN1bHQgPT4gIXJlc3VsdCkpLnRoZW4ocmVzdWx0ID0+ICFyZXN1bHQpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnNvbWUgPSBzb21lO1xuICAgIGZ1bmN0aW9uIGZvckVhY2goaXRlcmF0b3IsIGZuKSB7XG4gICAgICAgIHJldHVybiBldmVyeShpdGVyYXRvciwgKHZhbHVlLCBrZXkpID0+IFByb21pc2UucmVzb2x2ZShmbih2YWx1ZSwga2V5KSkudGhlbigoKSA9PiB0cnVlKSkudGhlbigoKSA9PiB7IH0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmZvckVhY2ggPSBmb3JFYWNoO1xuICAgIGZ1bmN0aW9uIHJlZHVjZShpdGVyYXRvciwgZm4sIG1lbW8pIHtcbiAgICAgICAgcmV0dXJuIGZvckVhY2goaXRlcmF0b3IsICh2YWx1ZSwga2V5KSA9PiBQcm9taXNlLnJlc29sdmUoZm4obWVtbywgdmFsdWUsIGtleSkpLnRoZW4odmFsdWUgPT4geyBtZW1vID0gdmFsdWU7IH0pKS50aGVuKCgpID0+IG1lbW8pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnJlZHVjZSA9IHJlZHVjZTtcbiAgICBmdW5jdGlvbiBmaW5kS2V5KGl0ZXJhdG9yLCBwcmVkaWNhdGUpIHtcbiAgICAgICAgdmFyIGtleTtcbiAgICAgICAgcmV0dXJuIHNvbWUoaXRlcmF0b3IsICh2LCBrKSA9PiBQcm9taXNlLnJlc29sdmUocHJlZGljYXRlKHYsIGspKS50aGVuKHJlcyA9PiByZXMgPyAoa2V5ID0gaywgdHJ1ZSkgOiBmYWxzZSkpXG4gICAgICAgICAgICAudGhlbihmb3VuZCA9PiBmb3VuZCA/IGtleSA6IEtleS5zZW50aW5lbCk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZmluZEtleSA9IGZpbmRLZXk7XG4gICAgZnVuY3Rpb24gZmluZChpdGVyYXRvciwgcHJlZGljYXRlKSB7XG4gICAgICAgIHJldHVybiBmaW5kS2V5KGl0ZXJhdG9yLCBwcmVkaWNhdGUpLnRoZW4oaXRlcmF0b3IuZ2V0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5maW5kID0gZmluZDtcbiAgICBmdW5jdGlvbiBrZXlPZihpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRLZXkoaXRlcmF0b3IsIHYgPT4gdiA9PT0gdmFsdWUpO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmtleU9mID0ga2V5T2Y7XG4gICAgZnVuY3Rpb24gaW5kZXhPZihpdGVyYXRvciwgdmFsdWUpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgIHJldHVybiBzb21lKGl0ZXJhdG9yLCAodiwgaykgPT4gKGluZGV4KyssIHZhbHVlID09IHYpKS50aGVuKGZvdW5kID0+IGZvdW5kID8gaW5kZXggOiBLZXkuTk9UX0ZPVU5EKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5pbmRleE9mID0gaW5kZXhPZjtcbiAgICBmdW5jdGlvbiBrZXlBdChpdGVyYXRvciwgaW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRLZXkoaXRlcmF0b3IsICgpID0+IDAgPT09IGluZGV4LS0pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLmtleUF0ID0ga2V5QXQ7XG4gICAgZnVuY3Rpb24gYXQoaXRlcmF0b3IsIGluZGV4KSB7XG4gICAgICAgIHJldHVybiBrZXlBdChpdGVyYXRvciwgaW5kZXgpLnRoZW4oaXRlcmF0b3IuZ2V0KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5hdCA9IGF0O1xuICAgIGZ1bmN0aW9uIGNvbnRhaW5zKGl0ZXJhdG9yLCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gc29tZShpdGVyYXRvciwgdiA9PiB2ID09PSB2YWx1ZSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBjb25jYXQoLi4uaXRlcmF0b3JzKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvcnMucmVkdWNlKChtZW1vLCB2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdmFyIGl0ZXJhdGVkID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGdldDogKCkgPT4gaXRlcmF0ZWQgPyB2YWx1ZS5nZXQoKSA6IG1lbW8uZ2V0KCksXG4gICAgICAgICAgICAgICAgbmV4dDogKCkgPT4gaXRlcmF0ZWQgPyB2YWx1ZS5uZXh0KCkgOiBtZW1vLm5leHQoKS50aGVuKGtleSA9PiBrZXkgIT09IEtleS5zZW50aW5lbCA/IGtleSA6IChpdGVyYXRlZCA9IHRydWUsIHZhbHVlLm5leHQoKSkpXG4gICAgICAgICAgICB9O1xuICAgICAgICB9LCBBc3luY0l0ZXJhdG9yLkVtcHR5KTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci5jb25jYXQgPSBjb25jYXQ7XG4gICAgZnVuY3Rpb24gZnJvbUVudHJpZXMoZW50cmllcykge1xuICAgICAgICB2YXIgY3VycmVudCA9IC0xO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ2V0OiAoKSA9PiBjdXJyZW50ID09PSAtMSA/IEtleS5OT1RfRk9VTkQgOiBQcm9taXNlLnJlc29sdmUoZW50cmllc1tjdXJyZW50XVsxXSksXG4gICAgICAgICAgICBuZXh0OiAoKSA9PiBQcm9taXNlLnJlc29sdmUoKytjdXJyZW50ID09PSBlbnRyaWVzLmxlbmd0aCA/IEtleS5zZW50aW5lbCA6IGVudHJpZXNbY3VycmVudF1bMF0pXG4gICAgICAgIH07XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUVudHJpZXMgPSBmcm9tRW50cmllcztcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkoYXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGZyb21FbnRyaWVzKGFycmF5Lm1hcCgodmFsdWUsIGtleSkgPT4gW2tleSwgdmFsdWVdKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbUFycmF5ID0gZnJvbUFycmF5O1xuICAgIGZ1bmN0aW9uIGZyb21PYmplY3Qob2JqZWN0KSB7XG4gICAgICAgIHJldHVybiBmcm9tRW50cmllcyhPYmplY3Qua2V5cyhvYmplY3QpLm1hcChrZXkgPT4gW2tleSwgb2JqZWN0W2tleV1dKSk7XG4gICAgfVxuICAgIEFzeW5jSXRlcmF0b3IuZnJvbU9iamVjdCA9IGZyb21PYmplY3Q7XG4gICAgZnVuY3Rpb24gdG9BcnJheShpdGVyYXRvcikge1xuICAgICAgICByZXR1cm4gcmVkdWNlKGl0ZXJhdG9yLCAobWVtbywgdmFsdWUpID0+IChtZW1vLnB1c2godmFsdWUpLCBtZW1vKSwgW10pO1xuICAgIH1cbiAgICBBc3luY0l0ZXJhdG9yLnRvQXJyYXkgPSB0b0FycmF5O1xuICAgIGZ1bmN0aW9uIHRvT2JqZWN0KGl0ZXJhdG9yKSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UoaXRlcmF0b3IsIChtZW1vLCB2YWx1ZSwga2V5KSA9PiAobWVtb1trZXldID0gdmFsdWUsIG1lbW8pLCBPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAgICB9XG4gICAgQXN5bmNJdGVyYXRvci50b09iamVjdCA9IHRvT2JqZWN0O1xufSkoQXN5bmNJdGVyYXRvciB8fCAoQXN5bmNJdGVyYXRvciA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBBc3luY0l0ZXJhdG9yO1xuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIENhY2hlO1xuKGZ1bmN0aW9uIChDYWNoZSkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgICAgICAgIHByZXY6IE9iamVjdC5jcmVhdGUobnVsbCksXG4gICAgICAgICAgICBuZXh0OiBPYmplY3QuY3JlYXRlKG51bGwpXG4gICAgICAgIH07XG4gICAgfVxuICAgIENhY2hlLmNyZWF0ZSA9IGNyZWF0ZTtcbiAgICBmdW5jdGlvbiBleHRlbmQoY2FjaGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGdldDogT2JqZWN0LmNyZWF0ZShjYWNoZS5nZXQpLFxuICAgICAgICAgICAgcHJldjogT2JqZWN0LmNyZWF0ZShjYWNoZS5wcmV2KSxcbiAgICAgICAgICAgIG5leHQ6IE9iamVjdC5jcmVhdGUoY2FjaGUubmV4dClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgQ2FjaGUuZXh0ZW5kID0gZXh0ZW5kO1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBjYWNoZSkge1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLmdldCA/IGNhY2hlLmdldFtrZXldIDogY2FjaGUuZ2V0W2tleV0gPSBzdGF0ZS5nZXQoa2V5KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSA9IEtleS5zZW50aW5lbCkge1xuICAgICAgICAgICAgcmV0dXJuIGtleSBpbiBjYWNoZS5wcmV2ID8gY2FjaGUucHJldltrZXldIDogY2FjaGUucHJldltrZXldID0gc3RhdGUucHJldihrZXkpLnRoZW4ocHJldiA9PiB7IGNhY2hlLm5leHRbcHJldl0gPSBQcm9taXNlLnJlc29sdmUoa2V5KTsgcmV0dXJuIHByZXY7IH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICByZXR1cm4ga2V5IGluIGNhY2hlLm5leHQgPyBjYWNoZS5uZXh0W2tleV0gOiBjYWNoZS5uZXh0W2tleV0gPSBzdGF0ZS5uZXh0KGtleSkudGhlbihuZXh0ID0+IHsgY2FjaGUucHJldltuZXh0XSA9IFByb21pc2UucmVzb2x2ZShrZXkpOyByZXR1cm4gbmV4dDsgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBwcmV2LCBuZXh0IH07XG4gICAgfVxuICAgIENhY2hlLmFwcGx5ID0gYXBwbHk7XG59KShDYWNoZSB8fCAoQ2FjaGUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgQ2FjaGU7XG4iLCJpbXBvcnQgUHJvbWlzZVV0aWxzIGZyb20gJy4vcHJvbWlzZV91dGlscyc7XG52YXIgS2V5O1xuKGZ1bmN0aW9uIChLZXkpIHtcbiAgICBLZXkuTk9UX0ZPVU5EX0VSUk9SID0gbmV3IEVycm9yKFwiTm8gZW50cnkgYXQgdGhlIHNwZWNpZmllZCBrZXlcIik7XG4gICAgS2V5Lk5PVF9GT1VORCA9IFByb21pc2VVdGlscy5sYXp5KChyZXNvbHZlLCByZWplY3QpID0+IHJlamVjdChLZXkuTk9UX0ZPVU5EX0VSUk9SKSk7XG4gICAgS2V5LnNlbnRpbmVsID0gbnVsbDtcbiAgICB2YXIgdW5pcXVlS2V5ID0gMDtcbiAgICBmdW5jdGlvbiBrZXkoa2V5KSB7XG4gICAgICAgIHJldHVybiBrZXkudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgS2V5LmtleSA9IGtleTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoKSB7XG4gICAgICAgIHJldHVybiB1bmlxdWVLZXkrKztcbiAgICB9XG4gICAgS2V5LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKEtleSB8fCAoS2V5ID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IEtleTtcbiIsImltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IExpc3QgfSBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgU3ViamVjdCB9IGZyb20gJy4vb2JzZXJ2YWJsZSc7XG5leHBvcnQgdmFyIExlbnM7XG4oZnVuY3Rpb24gKExlbnMpIHtcbiAgICBmdW5jdGlvbiBjb21wb3NlKHBhcmVudCwgbGVucykge1xuICAgICAgICB2YXIgZ2V0U3ViamVjdCA9IFN1YmplY3QuY3JlYXRlKCksIHNldFN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgaWYgKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSwgYWRkZWQ6IFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGVucy5nZXQpIH07XG4gICAgICAgICAgICByZXR1cm4geyByYW5nZTogcGF0Y2gucmFuZ2UgfTtcbiAgICAgICAgfSkuc3Vic2NyaWJlKGdldFN1YmplY3QpO1xuICAgICAgICBPYnNlcnZhYmxlLm1hcChzZXRTdWJqZWN0LCBwYXRjaCA9PiB7XG4gICAgICAgICAgICBpZiAocGF0Y2guYWRkZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgcmFuZ2U6IHBhdGNoLnJhbmdlLCBhZGRlZDogU3RhdGUubWFwKHBhdGNoLmFkZGVkLCBsZW5zLnNldCkgfTtcbiAgICAgICAgICAgIHJldHVybiB7IHJhbmdlOiBwYXRjaC5yYW5nZSB9O1xuICAgICAgICB9KS5zdWJzY3JpYmUocGFyZW50LnBhdGNoZXMpO1xuICAgICAgICByZXR1cm4gTGlzdC5jcmVhdGUoU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbGVucy5nZXQpLCB7IHN1YnNjcmliZTogZ2V0U3ViamVjdC5zdWJzY3JpYmUsIG9uTmV4dDogc2V0U3ViamVjdC5vbk5leHQgfSk7XG4gICAgfVxuICAgIExlbnMuY29tcG9zZSA9IGNvbXBvc2U7XG59KShMZW5zIHx8IChMZW5zID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IExlbnM7XG4iLCJpbXBvcnQgS2V5IGZyb20gJy4va2V5JztcbmltcG9ydCBQYXRjaCBmcm9tICcuL3BhdGNoJztcbmltcG9ydCBTdGF0ZSBmcm9tICcuL3N0YXRlJztcbmltcG9ydCB7IFJhbmdlLCBQb3NpdGlvbiB9IGZyb20gJy4vcmFuZ2UnO1xuaW1wb3J0IHsgVHJlZSwgUGF0aCB9IGZyb20gJy4vdHJlZSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlLCBTdWJqZWN0IH0gZnJvbSAnLi9vYnNlcnZhYmxlJztcbmltcG9ydCBBc3luY0l0ZXJhdG9yIGZyb20gJy4vYXN5bmNfaXRlcmF0b3InO1xuZXhwb3J0IHZhciBMaXN0O1xuKGZ1bmN0aW9uIChMaXN0KSB7XG4gICAgZnVuY3Rpb24gbWFwKHBhcmVudCwgbWFwRm4pIHtcbiAgICAgICAgdmFyIHN0YXRlID0gU3RhdGUubWFwKHBhcmVudC5zdGF0ZSwgbWFwRm4pLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+ICh7XG4gICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5tYXAocGF0Y2guYWRkZWQsIG1hcEZuKSA6IHVuZGVmaW5lZFxuICAgICAgICB9KSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5maWx0ZXIocGFyZW50LnN0YXRlLCBmaWx0ZXJGbiksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICBBc3luY0l0ZXJhdG9yLmZpbmRLZXkoU3RhdGUudG9JdGVyYXRvcihTdGF0ZS5yZXZlcnNlKHN0YXRlKSwgW1Bvc2l0aW9uLnJldmVyc2UocGF0Y2gucmFuZ2VbMF0pLCB7IHByZXY6IG51bGwgfV0pLCBmaWx0ZXJGbikudGhlbihuZXh0ID0+ICh7IG5leHQgfSkpLFxuICAgICAgICAgICAgICAgIEFzeW5jSXRlcmF0b3IuZmluZEtleShTdGF0ZS50b0l0ZXJhdG9yKHN0YXRlLCBbcGF0Y2gucmFuZ2VbMV0sIHsgcHJldjogbnVsbCB9XSksIGZpbHRlckZuKS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSlcbiAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoe1xuICAgICAgICAgICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgICAgICAgICBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5maWx0ZXIocGF0Y2guYWRkZWQsIGZpbHRlckZuKSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZShzdGF0ZSwgcGF0Y2hlcywgKG9sZFN0YXRlLCBwYXRjaGVzKSA9PiBzdGF0ZSA9IFBhdGNoLmFwcGx5KG9sZFN0YXRlLCBwYXRjaGVzKSk7XG4gICAgfVxuICAgIExpc3QuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHpvb20ocGFyZW50LCBrZXkpIHtcbiAgICAgICAgdmFyIHBhcmVudFN0YXRlID0gcGFyZW50LnN0YXRlLCBzdGF0ZSA9IFN0YXRlLnpvb20ocGFyZW50LnN0YXRlLCBrZXkpLCBwYXRjaGVzID0gT2JzZXJ2YWJsZS5tYXAoT2JzZXJ2YWJsZS5maWx0ZXIocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLnNvbWUoU3RhdGUudG9JdGVyYXRvcihwYXJlbnRTdGF0ZSwgcGF0Y2gucmFuZ2UpLCAodmFsdWUsIGspID0+IGsgPT09IGtleSlcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcGF0Y2guYWRkZWQgPyBTdGF0ZS5oYXMocGF0Y2guYWRkZWQsIGtleSkgOiByZXMpO1xuICAgICAgICB9KSwgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcGFyZW50U3RhdGUgPSBwYXJlbnQuc3RhdGU7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHJhbmdlOiBSYW5nZS5hbGwsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IHBhdGNoLmFkZGVkID8gU3RhdGUuem9vbShwYXRjaC5hZGRlZCwga2V5KSA6IHVuZGVmaW5lZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMpO1xuICAgIH1cbiAgICBMaXN0Lnpvb20gPSB6b29tO1xuICAgIGZ1bmN0aW9uIGZsYXR0ZW4ocGFyZW50KSB7XG4gICAgICAgIHZhciBwYXRjaGVzXyA9IFN1YmplY3QuY3JlYXRlKCk7XG4gICAgICAgIHZhciBwYXJlbnRfID0gY2FjaGUobWFwKHBhcmVudCwgKChsaXN0LCBrZXkpID0+IHtcbiAgICAgICAgICAgIE9ic2VydmFibGUubWFwKGxpc3QucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gbWFwUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5wcmV2ID09PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZS5wcmV2KEtleS5zZW50aW5lbCkudGhlbihuZXh0ID0+ICh7IG5leHQ6IFBhdGgudG9LZXkoW2tleSwgbmV4dF0pIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh7IHByZXY6IFBhdGgudG9LZXkoW2tleSwgcG9zaXRpb24ucHJldl0pIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHBvc2l0aW9uLm5leHQgPT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBsaXN0LnN0YXRlLm5leHQoS2V5LnNlbnRpbmVsKS50aGVuKHByZXYgPT4gKHsgcHJldjogUGF0aC50b0tleShba2V5LCBwcmV2XSkgfSkpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogUGF0aC50b0tleShba2V5LCBwb3NpdGlvbi5uZXh0XSkgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgICAgICBQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgPyBtYXBOZXh0UG9zaXRpb24odG8pIDogbWFwUHJldlBvc2l0aW9uKHRvKVxuICAgICAgICAgICAgICAgIF0pLnRoZW4oKHJhbmdlKSA9PiAoeyByYW5nZTogcmFuZ2UsIGFkZGVkOiBwYXRjaC5hZGRlZCA/IHBhdGNoLmFkZGVkIDogdW5kZWZpbmVkIH0pKTtcbiAgICAgICAgICAgIH0pLnN1YnNjcmliZShwYXRjaGVzXyk7XG4gICAgICAgICAgICByZXR1cm4gbGlzdC5zdGF0ZTtcbiAgICAgICAgfSkpKTtcbiAgICAgICAgT2JzZXJ2YWJsZS5tYXAocGFyZW50LnBhdGNoZXMsIHBhdGNoID0+IHtcbiAgICAgICAgICAgIHZhciBmcm9tID0gcGF0Y2gucmFuZ2VbMF0sIHRvID0gcGF0Y2gucmFuZ2VbMV07XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBQcmV2UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ucHJldiA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgcHJldjogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5uZXh0KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5wcmV2XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKHByZXYgPT4gKHsgcHJldiB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmdW5jdGlvbiBtYXBOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcG9zaXRpb24ubmV4dCA9PT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKHsgbmV4dDogS2V5LnNlbnRpbmVsIH0pIDogVHJlZS5wcmV2KHBhcmVudF8uc3RhdGUsIFtwb3NpdGlvbi5uZXh0XSkudGhlbihQYXRoLnRvS2V5KS50aGVuKG5leHQgPT4gKHsgbmV4dCB9KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gbWFwTmV4dFBvc2l0aW9uKGZyb20pIDogbWFwUHJldlBvc2l0aW9uKGZyb20pLFxuICAgICAgICAgICAgICAgIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKHRvKSA/IG1hcE5leHRQb3NpdGlvbih0bykgOiBtYXBQcmV2UG9zaXRpb24odG8pXG4gICAgICAgICAgICBdKS50aGVuKChyYW5nZSkgPT4gKHsgcmFuZ2U6IHJhbmdlLCBhZGRlZDogcGF0Y2guYWRkZWQgPyBTdGF0ZS5mbGF0dGVuKFN0YXRlLm1hcChwYXRjaC5hZGRlZCwgbGlzdCA9PiBsaXN0LnN0YXRlKSkgOiB1bmRlZmluZWQgfSkpO1xuICAgICAgICB9KS5zdWJzY3JpYmUocGF0Y2hlc18pO1xuICAgICAgICB2YXIgc3RhdGUgPSBTdGF0ZS5mbGF0dGVuKHBhcmVudF8uc3RhdGUpO1xuICAgICAgICByZXR1cm4gY3JlYXRlKHN0YXRlLCBwYXRjaGVzXyk7XG4gICAgfVxuICAgIExpc3QuZmxhdHRlbiA9IGZsYXR0ZW47XG4gICAgZnVuY3Rpb24gY2FjaGUocGFyZW50KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IFN0YXRlLmNhY2hlKHBhcmVudC5zdGF0ZSksIHBhdGNoZXMgPSBPYnNlcnZhYmxlLm1hcChwYXJlbnQucGF0Y2hlcywgcGF0Y2ggPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICByYW5nZTogcGF0Y2gucmFuZ2UsXG4gICAgICAgICAgICAgICAgYWRkZWQ6IFN0YXRlLmNhY2hlKHBhdGNoLmFkZGVkKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBMaXN0LmNyZWF0ZShzdGF0ZSwgcGF0Y2hlcyk7XG4gICAgfVxuICAgIExpc3QuY2FjaGUgPSBjYWNoZTtcbiAgICBmdW5jdGlvbiBjcmVhdGUoc3RhdGUsIHBhdGNoZXMsIHJlZHVjZXIgPSBQYXRjaC5hcHBseSkge1xuICAgICAgICBjb25zdCBsaXN0ID0geyBzdGF0ZSwgcGF0Y2hlcyB9O1xuICAgICAgICBPYnNlcnZhYmxlLnNjYW4ocGF0Y2hlcywgcmVkdWNlciwgc3RhdGUpLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IChzdGF0ZSkgPT4geyBsaXN0LnN0YXRlID0gc3RhdGU7IH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBsaXN0O1xuICAgIH1cbiAgICBMaXN0LmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKExpc3QgfHwgKExpc3QgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgTGlzdDtcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuZXhwb3J0IHZhciBEaXNwb3NhYmxlO1xuKGZ1bmN0aW9uIChEaXNwb3NhYmxlKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlKGRpc3Bvc2VyKSB7XG4gICAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkaXNwb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGRvbmUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBkaXNwb3NlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBEaXNwb3NhYmxlLmNyZWF0ZSA9IGNyZWF0ZTtcbn0pKERpc3Bvc2FibGUgfHwgKERpc3Bvc2FibGUgPSB7fSkpO1xuZXhwb3J0IHZhciBPYnNlcnZhYmxlO1xuKGZ1bmN0aW9uIChPYnNlcnZhYmxlKSB7XG4gICAgZnVuY3Rpb24gbWFwKG9ic2VydmFibGUsIG1hcEZuKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShtYXBGbih2YWx1ZSkpLnRoZW4oc3ViamVjdC5vbk5leHQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUubWFwID0gbWFwO1xuICAgIGZ1bmN0aW9uIGZpbHRlcihvYnNlcnZhYmxlLCBmaWx0ZXJGbikge1xuICAgICAgICBjb25zdCBzdWJqZWN0ID0gU3ViamVjdC5jcmVhdGUoKTtcbiAgICAgICAgb2JzZXJ2YWJsZS5zdWJzY3JpYmUoe1xuICAgICAgICAgICAgb25OZXh0OiB2YWx1ZSA9PiBQcm9taXNlLnJlc29sdmUoZmlsdGVyRm4odmFsdWUpKS50aGVuKHJlc3VsdCA9PiByZXN1bHQgPyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSkgOiB1bmRlZmluZWQpXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuZmlsdGVyID0gZmlsdGVyO1xuICAgIGZ1bmN0aW9uIHNjYW4ob2JzZXJ2YWJsZSwgc2NhbkZuLCBtZW1vKSB7XG4gICAgICAgIGNvbnN0IHN1YmplY3QgPSBTdWJqZWN0LmNyZWF0ZSgpO1xuICAgICAgICBvYnNlcnZhYmxlLnN1YnNjcmliZSh7XG4gICAgICAgICAgICBvbk5leHQ6IHZhbHVlID0+IFByb21pc2UucmVzb2x2ZShzY2FuRm4obWVtbywgdmFsdWUpKS50aGVuKHZhbHVlID0+IHsgbWVtbyA9IHZhbHVlOyBzdWJqZWN0Lm9uTmV4dCh2YWx1ZSk7IH0pXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4geyBzdWJzY3JpYmU6IHN1YmplY3Quc3Vic2NyaWJlIH07XG4gICAgfVxuICAgIE9ic2VydmFibGUuc2NhbiA9IHNjYW47XG59KShPYnNlcnZhYmxlIHx8IChPYnNlcnZhYmxlID0ge30pKTtcbmV4cG9ydCB2YXIgU3ViamVjdDtcbihmdW5jdGlvbiAoU3ViamVjdCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJzID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgICAgICB2YXIgb2JzZXJ2ZXJLZXkgPSBLZXkuY3JlYXRlKCk7XG4gICAgICAgICAgICBvYnNlcnZlcnNbb2JzZXJ2ZXJLZXldID0gb2JzZXJ2ZXI7XG4gICAgICAgICAgICByZXR1cm4gRGlzcG9zYWJsZS5jcmVhdGUoKCkgPT4gZGVsZXRlIG9ic2VydmVyc1tvYnNlcnZlcktleV0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uTmV4dCh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQgPSBjdXJyZW50LnRoZW4oKCkgPT4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMob2JzZXJ2ZXJzKS5tYXAoa2V5ID0+IG9ic2VydmVyc1trZXldLm9uTmV4dCh2YWx1ZSkpKS50aGVuKCgpID0+IHsgfSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IHN1YnNjcmliZSwgb25OZXh0IH07XG4gICAgfVxuICAgIFN1YmplY3QuY3JlYXRlID0gY3JlYXRlO1xufSkoU3ViamVjdCB8fCAoU3ViamVjdCA9IHt9KSk7XG4iLCJpbXBvcnQgU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG47XG5leHBvcnQgdmFyIFBhdGNoO1xuKGZ1bmN0aW9uIChQYXRjaCkge1xuICAgIGZ1bmN0aW9uIGFwcGx5KHN0YXRlLCBwYXRjaCkge1xuICAgICAgICByZXR1cm4gU3RhdGUuc3BsaWNlKHN0YXRlLCBwYXRjaC5yYW5nZSwgcGF0Y2guYWRkZWQpO1xuICAgIH1cbiAgICBQYXRjaC5hcHBseSA9IGFwcGx5O1xufSkoUGF0Y2ggfHwgKFBhdGNoID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFBhdGNoO1xuIiwiLy8gdHlwZSBKdXN0PFY+ID0gW1ZdO1xuLy8gdHlwZSBOb3RoaW5nPFY+ID0gQXJyYXk8Vj4gJiB7IDA6IHZvaWQgfVxuLy8gdHlwZSBNYXliZTxWPiA9IEp1c3Q8Vj4gfCBOb3RoaW5nPFY+O1xuZXhwb3J0IHZhciBQcm9taXNlVXRpbHM7XG4oZnVuY3Rpb24gKFByb21pc2VVdGlscykge1xuICAgIGZ1bmN0aW9uIGxhenkoZXhlY3V0b3IpIHtcbiAgICAgICAgdmFyIHByb21pc2U7XG4gICAgICAgIGZ1bmN0aW9uIHRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpIHtcbiAgICAgICAgICAgIGlmIChwcm9taXNlKVxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9taXNlLnRoZW4ob25mdWxmaWxsZWQsIG9ucmVqZWN0ZWQpO1xuICAgICAgICAgICAgcmV0dXJuIChwcm9taXNlID0gbmV3IFByb21pc2UoZXhlY3V0b3IpKS50aGVuKG9uZnVsZmlsbGVkLCBvbnJlamVjdGVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHsgdGhlbiB9KTtcbiAgICB9XG4gICAgUHJvbWlzZVV0aWxzLmxhenkgPSBsYXp5O1xufSkoUHJvbWlzZVV0aWxzIHx8IChQcm9taXNlVXRpbHMgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgUHJvbWlzZVV0aWxzO1xuIiwiaW1wb3J0IEtleSBmcm9tICcuL2tleSc7XG5leHBvcnQgdmFyIFJhbmdlO1xuKGZ1bmN0aW9uIChSYW5nZSkge1xuICAgIFJhbmdlLmFsbCA9IFt7IG5leHQ6IEtleS5zZW50aW5lbCB9LCB7IHByZXY6IEtleS5zZW50aW5lbCB9XTtcbn0pKFJhbmdlIHx8IChSYW5nZSA9IHt9KSk7XG5leHBvcnQgdmFyIFBvc2l0aW9uO1xuKGZ1bmN0aW9uIChQb3NpdGlvbikge1xuICAgIGZ1bmN0aW9uIGlzUHJldlBvc2l0aW9uKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiAncHJldicgaW4gcG9zaXRpb247XG4gICAgfVxuICAgIFBvc2l0aW9uLmlzUHJldlBvc2l0aW9uID0gaXNQcmV2UG9zaXRpb247XG4gICAgZnVuY3Rpb24gaXNOZXh0UG9zaXRpb24ocG9zaXRpb24pIHtcbiAgICAgICAgcmV0dXJuICduZXh0JyBpbiBwb3NpdGlvbjtcbiAgICB9XG4gICAgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24gPSBpc05leHRQb3NpdGlvbjtcbiAgICBmdW5jdGlvbiByZXZlcnNlKHBvc2l0aW9uKSB7XG4gICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihwb3NpdGlvbikgPyB7IG5leHQ6IHBvc2l0aW9uLnByZXYgfSA6IHsgcHJldjogcG9zaXRpb24ubmV4dCB9O1xuICAgIH1cbiAgICBQb3NpdGlvbi5yZXZlcnNlID0gcmV2ZXJzZTtcbn0pKFBvc2l0aW9uIHx8IChQb3NpdGlvbiA9IHt9KSk7XG5leHBvcnQgZGVmYXVsdCBSYW5nZTtcbiIsImltcG9ydCBfU3RhdGUgZnJvbSAnLi9zdGF0ZSc7XG5pbXBvcnQgX0FzeW5jSXRlcmF0b3IgZnJvbSAnLi9hc3luY19pdGVyYXRvcic7XG5pbXBvcnQgeyBMaXN0IGFzIF9MaXN0IH0gZnJvbSAnLi9saXN0JztcbmltcG9ydCBfVHJlZSBmcm9tICcuL3RyZWUnO1xuaW1wb3J0IF9DYWNoZSBmcm9tICcuL2NhY2hlJztcbmltcG9ydCB7IFN1YmplY3QgYXMgX1N1YmplY3QgfSBmcm9tICcuL29ic2VydmFibGUnO1xuaW1wb3J0IF9Qcm9taXNlVXRpbHMgZnJvbSAnLi9wcm9taXNlX3V0aWxzJztcbmltcG9ydCBfTGVucyBmcm9tICcuL2xlbnMnO1xuZXhwb3J0IGZ1bmN0aW9uIFNvbmljKG9iaikge1xuICAgIGlmIChvYmogaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgcmV0dXJuIF9MaXN0LmNyZWF0ZShfU3RhdGUuZnJvbUFycmF5KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbiAgICBpZiAob2JqIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgICAgICByZXR1cm4gX0xpc3QuY3JlYXRlKF9TdGF0ZS5mcm9tT2JqZWN0KG9iaiksIF9TdWJqZWN0LmNyZWF0ZSgpKTtcbn1cbmV4cG9ydCB2YXIgU29uaWM7XG4oZnVuY3Rpb24gKFNvbmljKSB7XG4gICAgU29uaWMuU3RhdGUgPSBfU3RhdGU7XG4gICAgU29uaWMuQXN5bmNJdGVyYXRvciA9IF9Bc3luY0l0ZXJhdG9yO1xuICAgIFNvbmljLkxpc3QgPSBfTGlzdDtcbiAgICBTb25pYy5UcmVlID0gX1RyZWU7XG4gICAgU29uaWMuU3ViamVjdCA9IF9TdWJqZWN0O1xuICAgIFNvbmljLkNhY2hlID0gX0NhY2hlO1xuICAgIFNvbmljLlByb21pc2VVdGlscyA9IF9Qcm9taXNlVXRpbHM7XG4gICAgU29uaWMuTGVucyA9IF9MZW5zO1xufSkoU29uaWMgfHwgKFNvbmljID0ge30pKTtcbjtcbm1vZHVsZS5leHBvcnRzID0gU29uaWM7XG5leHBvcnQgZGVmYXVsdCBTb25pYztcbiIsImltcG9ydCBLZXkgZnJvbSAnLi9rZXknO1xuaW1wb3J0IHsgUG9zaXRpb24sIFJhbmdlIH0gZnJvbSAnLi9yYW5nZSc7XG5pbXBvcnQgQ2FjaGUgZnJvbSAnLi9jYWNoZSc7XG5pbXBvcnQgQXN5bmNJdGVyYXRvciBmcm9tICcuL2FzeW5jX2l0ZXJhdG9yJztcbmltcG9ydCB7IFRyZWUsIFBhdGggfSBmcm9tICcuL3RyZWUnO1xuZXhwb3J0IHZhciBTdGF0ZTtcbihmdW5jdGlvbiAoU3RhdGUpIHtcbiAgICBTdGF0ZS5FbXB0eSA9IHtcbiAgICAgICAgZ2V0OiAoa2V5KSA9PiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBwcmV2OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5ELFxuICAgICAgICBuZXh0OiAoa2V5ID0gS2V5LnNlbnRpbmVsKSA9PiBrZXkgPT0gS2V5LnNlbnRpbmVsID8gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCkgOiBLZXkuTk9UX0ZPVU5EXG4gICAgfTtcbiAgICBmdW5jdGlvbiBleHRlbmQocGFyZW50LCB7IGdldCwgcHJldiwgbmV4dCB9KSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IE9iamVjdC5jcmVhdGUocGFyZW50KTtcbiAgICAgICAgaWYgKGdldClcbiAgICAgICAgICAgIHN0YXRlLmdldCA9IGdldDtcbiAgICAgICAgaWYgKHByZXYpXG4gICAgICAgICAgICBzdGF0ZS5wcmV2ID0gcHJldjtcbiAgICAgICAgaWYgKG5leHQpXG4gICAgICAgICAgICBzdGF0ZS5uZXh0ID0gbmV4dDtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBTdGF0ZS5leHRlbmQgPSBleHRlbmQ7XG4gICAgZnVuY3Rpb24gZmlyc3Qoc3RhdGUpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLm5leHQoKS50aGVuKGtleSA9PiBzdGF0ZS5nZXQoa2V5KSk7XG4gICAgfVxuICAgIFN0YXRlLmZpcnN0ID0gZmlyc3Q7XG4gICAgZnVuY3Rpb24gbGFzdChzdGF0ZSkge1xuICAgICAgICByZXR1cm4gc3RhdGUucHJldigpLnRoZW4oa2V5ID0+IHN0YXRlLmdldChrZXkpKTtcbiAgICB9XG4gICAgU3RhdGUubGFzdCA9IGxhc3Q7XG4gICAgZnVuY3Rpb24gaGFzKHN0YXRlLCBrZXkpIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlLmdldChrZXkpLnRoZW4oKCkgPT4gdHJ1ZSwgcmVhc29uID0+IHJlYXNvbiA9PT0gS2V5Lk5PVF9GT1VORF9FUlJPUiA/IGZhbHNlIDogUHJvbWlzZS5yZWplY3QocmVhc29uKSk7XG4gICAgfVxuICAgIFN0YXRlLmhhcyA9IGhhcztcbiAgICBmdW5jdGlvbiBjb250YWlucyhzdGF0ZSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIEFzeW5jSXRlcmF0b3Iuc29tZSh0b0l0ZXJhdG9yKHN0YXRlKSwgKHYsIGspID0+IHYgPT09IHZhbHVlKTtcbiAgICB9XG4gICAgU3RhdGUuY29udGFpbnMgPSBjb250YWlucztcbiAgICBmdW5jdGlvbiBpc0VtcHR5KHN0YXRlKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZS5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCk7XG4gICAgfVxuICAgIFN0YXRlLmlzRW1wdHkgPSBpc0VtcHR5O1xuICAgIGZ1bmN0aW9uIHNsaWNlKHBhcmVudCwgcmFuZ2UgPSBSYW5nZS5hbGwpIHtcbiAgICAgICAgcmV0dXJuIGZyb21JdGVyYXRvcih0b0l0ZXJhdG9yKHBhcmVudCwgcmFuZ2UpKTtcbiAgICB9XG4gICAgU3RhdGUuc2xpY2UgPSBzbGljZTtcbiAgICBmdW5jdGlvbiBzcGxpY2UocGFyZW50LCByYW5nZSwgY2hpbGQpIHtcbiAgICAgICAgdmFyIGRlbGV0ZWQgPSBzbGljZShwYXJlbnQsIHJhbmdlKSwgZmlsdGVyZWQgPSBmaWx0ZXIocGFyZW50LCAodmFsdWUsIGtleSkgPT4gZGVsZXRlZC5nZXQoa2V5KS50aGVuKCgpID0+IGZhbHNlLCAoKSA9PiB0cnVlKSk7XG4gICAgICAgIGlmIChjaGlsZCA9PSBudWxsKVxuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgICAgICB2YXIgYnJpZGdlZENoaWxkLCBicmlkZ2VkUGFyZW50LCBmcm9tID0gcmFuZ2VbMF0sIHRvID0gcmFuZ2VbMV07XG4gICAgICAgIGJyaWRnZWRDaGlsZCA9IGV4dGVuZChjaGlsZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IGNoaWxkLnByZXYoa2V5KS50aGVuKHByZXYgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2ICE9PSBLZXkuc2VudGluZWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocHJldik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFBvc2l0aW9uLmlzTmV4dFBvc2l0aW9uKGZyb20pID8gUHJvbWlzZS5yZXNvbHZlKGZyb20ubmV4dCkgOiBwYXJlbnQucHJldihmcm9tLnByZXYpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gY2hpbGQubmV4dChrZXkpLnRoZW4obmV4dCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQgIT09IEtleS5zZW50aW5lbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXh0KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pID8gUHJvbWlzZS5yZXNvbHZlKHRvLnByZXYpIDogcGFyZW50Lm5leHQodG8ubmV4dCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgYnJpZGdlZFBhcmVudCA9IGV4dGVuZChmaWx0ZXJlZCwge1xuICAgICAgICAgICAgcHJldjoga2V5ID0+IHBhcmVudC5wcmV2KGtleSkudGhlbihwcmV2ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIHByZXYgPT09IHRvLm5leHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQucHJldihLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYXMoZGVsZXRlZCwgcHJldikudGhlbihyZXMgPT4gcmVzID8gS2V5Lk5PVF9GT1VORCA6IHByZXYpO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBuZXh0OiBrZXkgPT4gcGFyZW50Lm5leHQoa2V5KS50aGVuKG5leHQgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSAmJiBuZXh0ID09PSBmcm9tLnByZXYpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBicmlkZ2VkQ2hpbGQubmV4dChLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgICAgIHJldHVybiBoYXMoZGVsZXRlZCwgbmV4dCkudGhlbihyZXMgPT4gcmVzID8gS2V5Lk5PVF9GT1VORCA6IG5leHQpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG4gICAgICAgIGZ1bmN0aW9uIGdldChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBjaGlsZC5nZXQoa2V5KS5jYXRjaChyZWFzb24gPT4gcmVhc29uID09PSBLZXkuTk9UX0ZPVU5EX0VSUk9SID8gYnJpZGdlZFBhcmVudC5nZXQoa2V5KSA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIHByZXYoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGtleSA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gYnJpZGdlZFBhcmVudC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQucHJldihrZXkpIDogYnJpZGdlZFBhcmVudC5wcmV2KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoa2V5ID0gS2V5LnNlbnRpbmVsKSB7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYga2V5ID09PSBmcm9tLm5leHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGJyaWRnZWRDaGlsZC5uZXh0KEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICByZXR1cm4gaGFzKGJyaWRnZWRDaGlsZCwga2V5KS50aGVuKHJlcyA9PiByZXMgPyBicmlkZ2VkQ2hpbGQubmV4dChrZXkpIDogYnJpZGdlZFBhcmVudC5uZXh0KGtleSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGdldCwgcHJldiwgbmV4dCB9O1xuICAgIH1cbiAgICBTdGF0ZS5zcGxpY2UgPSBzcGxpY2U7XG4gICAgZnVuY3Rpb24gcmV2ZXJzZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIHByZXY6IHBhcmVudC5uZXh0LFxuICAgICAgICAgICAgbmV4dDogcGFyZW50LnByZXZcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLnJldmVyc2UgPSByZXZlcnNlO1xuICAgIGZ1bmN0aW9uIG1hcChwYXJlbnQsIG1hcEZuKSB7XG4gICAgICAgIHJldHVybiBleHRlbmQocGFyZW50LCB7XG4gICAgICAgICAgICBnZXQ6IGtleSA9PiBwYXJlbnQuZ2V0KGtleSkudGhlbih2YWx1ZSA9PiBtYXBGbih2YWx1ZSwga2V5KSlcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFN0YXRlLm1hcCA9IG1hcDtcbiAgICBmdW5jdGlvbiBmaWx0ZXIocGFyZW50LCBmaWx0ZXJGbikge1xuICAgICAgICBmdW5jdGlvbiBnZXQoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyZW50LmdldChrZXkpLnRoZW4odmFsdWUgPT4gUHJvbWlzZS5yZXNvbHZlKGZpbHRlckZuKHZhbHVlLCBrZXkpKS50aGVuKHJlcyA9PiByZXMgPyB2YWx1ZSA6IEtleS5OT1RfRk9VTkQpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBwcmV2KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5wcmV2KGtleSkudGhlbihwID0+IHAgPT09IG51bGwgPyBudWxsIDogcGFyZW50LmdldChwKS50aGVuKHZhbHVlID0+IGZpbHRlckZuKHZhbHVlLCBwKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gcCA6IHByZXYocCkpKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIHBhcmVudC5uZXh0KGtleSkudGhlbihuID0+IG4gPT09IG51bGwgPyBudWxsIDogcGFyZW50LmdldChuKS50aGVuKHZhbHVlID0+IGZpbHRlckZuKHZhbHVlLCBuKSkudGhlbihyZXN1bHQgPT4gcmVzdWx0ID8gbiA6IG5leHQobikpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwgeyBnZXQsIHByZXYsIG5leHQgfSk7XG4gICAgfVxuICAgIFN0YXRlLmZpbHRlciA9IGZpbHRlcjtcbiAgICBmdW5jdGlvbiB6b29tKHBhcmVudCwga2V5KSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSAoaykgPT4gayA9PSBudWxsID8gcGFyZW50LmdldChrZXkpLnRoZW4oKCkgPT4ga2V5LCByZWFzb24gPT4gcmVhc29uID09PSBLZXkuTk9UX0ZPVU5EX0VSUk9SID8gbnVsbCA6IFByb21pc2UucmVqZWN0KHJlYXNvbikpIDogKGtleSA9PT0gayA/IFByb21pc2UucmVzb2x2ZShudWxsKSA6IEtleS5OT1RfRk9VTkQpO1xuICAgICAgICByZXR1cm4gZXh0ZW5kKHBhcmVudCwge1xuICAgICAgICAgICAgZ2V0OiBrID0+IGsgPT09IGtleSA/IHBhcmVudC5nZXQoa2V5KSA6IEtleS5OT1RfRk9VTkQsXG4gICAgICAgICAgICBwcmV2OiBuZXh0LFxuICAgICAgICAgICAgbmV4dDogbmV4dFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgU3RhdGUuem9vbSA9IHpvb207XG4gICAgZnVuY3Rpb24gZmxhdHRlbihwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChwYXJlbnQsIHtcbiAgICAgICAgICAgIGdldDoga2V5ID0+IFRyZWUuZ2V0KHBhcmVudCwgUGF0aC5mcm9tS2V5KGtleSkpLFxuICAgICAgICAgICAgcHJldjoga2V5ID0+IFRyZWUucHJldihwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKS50aGVuKFBhdGgudG9LZXkpLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IFRyZWUubmV4dChwYXJlbnQsIFBhdGguZnJvbUtleShrZXkpKS50aGVuKFBhdGgudG9LZXkpXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBTdGF0ZS5mbGF0dGVuID0gZmxhdHRlbjtcbiAgICBmdW5jdGlvbiBjYWNoZShwYXJlbnQpIHtcbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHBhcmVudCwgQ2FjaGUuY3JlYXRlKCkpO1xuICAgIH1cbiAgICBTdGF0ZS5jYWNoZSA9IGNhY2hlO1xuICAgIGZ1bmN0aW9uIGtleUJ5KHBhcmVudCwga2V5Rm4pIHtcbiAgICAgICAgdmFyIGtleU1hcCA9IGNhY2hlKFN0YXRlLm1hcChwYXJlbnQsIGtleUZuKSk7XG4gICAgICAgIHZhciByZXZlcnNlS2V5TWFwID0gY2FjaGUoe1xuICAgICAgICAgICAgZ2V0OiBrZXkgPT4gQXN5bmNJdGVyYXRvci5rZXlPZihTdGF0ZS50b0l0ZXJhdG9yKGtleU1hcCksIGtleSksXG4gICAgICAgICAgICBwcmV2OiBrZXkgPT4gcmV2ZXJzZUtleU1hcC5nZXQoa2V5KS50aGVuKGtleU1hcC5wcmV2KS50aGVuKHByZXYgPT4gcHJldiA9PT0gS2V5LnNlbnRpbmVsID8gcHJldiA6IGtleU1hcC5nZXQocHJldikpLFxuICAgICAgICAgICAgbmV4dDoga2V5ID0+IHJldmVyc2VLZXlNYXAuZ2V0KGtleSkudGhlbihrZXlNYXAubmV4dCkudGhlbihuZXh0ID0+IG5leHQgPT09IEtleS5zZW50aW5lbCA/IG5leHQgOiBrZXlNYXAuZ2V0KG5leHQpKVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGV4dGVuZChyZXZlcnNlS2V5TWFwLCB7IGdldDoga2V5ID0+IHJldmVyc2VLZXlNYXAuZ2V0KGtleSkudGhlbihwYXJlbnQuZ2V0KSB9KTtcbiAgICB9XG4gICAgU3RhdGUua2V5QnkgPSBrZXlCeTtcbiAgICBmdW5jdGlvbiBmcm9tQXJyYXkodmFsdWVzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IChrZXkpID0+IGtleSBpbiB2YWx1ZXMgPyBQcm9taXNlLnJlc29sdmUodmFsdWVzW2tleV0pIDogS2V5Lk5PVF9GT1VORCxcbiAgICAgICAgICAgIHByZXY6IChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBrZXkgPT0gbnVsbCA/IHZhbHVlcy5sZW5ndGggLSAxIDoga2V5IC0gMTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGluZGV4ID09PSAtMSA/IG51bGwgOiBpbmRleCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dDogKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGtleSA9PSBudWxsID8gMCA6IGtleSArIDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShpbmRleCA9PT0gdmFsdWVzLmxlbmd0aCA/IG51bGwgOiBpbmRleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuICAgIFN0YXRlLmZyb21BcnJheSA9IGZyb21BcnJheTtcbiAgICBmdW5jdGlvbiBmcm9tT2JqZWN0KHZhbHVlcykge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlcyksIGluZGV4QnlLZXkgPSBrZXlzLnJlZHVjZSgobWVtbywga2V5LCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgbWVtb1trZXldID0gaW5kZXg7XG4gICAgICAgICAgICByZXR1cm4gbWVtbztcbiAgICAgICAgfSwgT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBnZXQ6IChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5IGluIHZhbHVlcyA/IFByb21pc2UucmVzb2x2ZSh2YWx1ZXNba2V5XSkgOiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByZXY6IChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5c1trZXlzLmxlbmd0aCAtIDFdKTtcbiAgICAgICAgICAgICAgICBpZiAoIShrZXkgaW4gaW5kZXhCeUtleSkpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBLZXkuTk9UX0ZPVU5EO1xuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGluZGV4QnlLZXlba2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXlzW2luZGV4IC0gMV0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHQ6IChrZXkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5ID09IG51bGwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoa2V5c1swXSk7XG4gICAgICAgICAgICAgICAgaWYgKCEoa2V5IGluIGluZGV4QnlLZXkpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBpbmRleEJ5S2V5W2tleV07XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ID09PSBrZXlzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShrZXlzW2luZGV4ICsgMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBTdGF0ZS5mcm9tT2JqZWN0ID0gZnJvbU9iamVjdDtcbiAgICBmdW5jdGlvbiBmcm9tSXRlcmF0b3IoaXRlcmF0b3IpIHtcbiAgICAgICAgdmFyIGNhY2hlID0gQ2FjaGUuY3JlYXRlKCksIGV4aGF1c3RlZCA9IGZhbHNlLCBjdXJyZW50S2V5ID0gbnVsbDtcbiAgICAgICAgdmFyIGNhY2hpbmdJdGVyYXRvciA9IEFzeW5jSXRlcmF0b3IuZXh0ZW5kKGl0ZXJhdG9yLCB7XG4gICAgICAgICAgICBnZXQ6ICgpID0+IGNhY2hlLmdldFtjdXJyZW50S2V5XSA9IGl0ZXJhdG9yLmdldCgpLFxuICAgICAgICAgICAgbmV4dDogKCkgPT4gY2FjaGUubmV4dFtjdXJyZW50S2V5XSA9IGl0ZXJhdG9yLm5leHQoKS50aGVuKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgY2FjaGUucHJldltrZXldID0gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnRLZXkpO1xuICAgICAgICAgICAgICAgIGV4aGF1c3RlZCA9IGtleSA9PT0gbnVsbDtcbiAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudEtleSA9IGtleTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gZ2V0KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IGN1cnJlbnRLZXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hpbmdJdGVyYXRvci5nZXQoKTtcbiAgICAgICAgICAgIHJldHVybiBBc3luY0l0ZXJhdG9yLmZpbmQoY2FjaGluZ0l0ZXJhdG9yLCAodmFsdWUsIGspID0+IGsgPT09IGtleSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gcHJldihrZXkpIHtcbiAgICAgICAgICAgIGlmIChleGhhdXN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIEtleS5OT1RfRk9VTkQ7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5zb21lKGNhY2hpbmdJdGVyYXRvciwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpLnRoZW4oKCkgPT4gY2FjaGUucHJldltrZXldKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBuZXh0KGtleSkge1xuICAgICAgICAgICAgaWYgKGV4aGF1c3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gS2V5Lk5PVF9GT1VORDtcbiAgICAgICAgICAgIGlmIChrZXkgPT09IGN1cnJlbnRLZXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhY2hpbmdJdGVyYXRvci5uZXh0KCk7XG4gICAgICAgICAgICByZXR1cm4gQXN5bmNJdGVyYXRvci5maW5kS2V5KGNhY2hpbmdJdGVyYXRvciwgKHZhbHVlLCBrKSA9PiBrID09PSBrZXkpLnRoZW4oKCkgPT4gY2FjaGluZ0l0ZXJhdG9yLm5leHQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENhY2hlLmFwcGx5KHsgZ2V0LCBwcmV2LCBuZXh0IH0sIGNhY2hlKTtcbiAgICB9XG4gICAgU3RhdGUuZnJvbUl0ZXJhdG9yID0gZnJvbUl0ZXJhdG9yO1xuICAgIGZ1bmN0aW9uIHRvSXRlcmF0b3Ioc3RhdGUsIHJhbmdlID0gUmFuZ2UuYWxsKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gS2V5LnNlbnRpbmVsO1xuICAgICAgICBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gc3RhdGUuZ2V0KGN1cnJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgICAgICB2YXIgZnJvbSA9IHJhbmdlWzBdLCB0byA9IHJhbmdlWzFdO1xuICAgICAgICAgICAgZnVuY3Rpb24gaXRlcmF0ZShrZXkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc3RhdGUubmV4dChrZXkpLnRoZW4obmV4dCA9PiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbih0bykgJiYgdG8ucHJldiA9PT0gbmV4dCA/IGN1cnJlbnQgPSBLZXkuc2VudGluZWwgOiBjdXJyZW50ID0gbmV4dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNQcmV2UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNQcmV2UG9zaXRpb24odG8pICYmIGZyb20ucHJldiA9PT0gdG8ucHJldilcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICBpZiAoUG9zaXRpb24uaXNOZXh0UG9zaXRpb24oZnJvbSkgJiYgUG9zaXRpb24uaXNOZXh0UG9zaXRpb24odG8pICYmIGZyb20ubmV4dCA9PT0gdG8ubmV4dClcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKEtleS5zZW50aW5lbCk7XG4gICAgICAgICAgICBpZiAoY3VycmVudCA9PT0gS2V5LnNlbnRpbmVsKVxuICAgICAgICAgICAgICAgIHJldHVybiBQb3NpdGlvbi5pc1ByZXZQb3NpdGlvbihmcm9tKSA/IFByb21pc2UucmVzb2x2ZShjdXJyZW50ID0gZnJvbS5wcmV2KSA6IGl0ZXJhdGUoZnJvbS5uZXh0KTtcbiAgICAgICAgICAgIGlmIChQb3NpdGlvbi5pc05leHRQb3NpdGlvbih0bykgJiYgdG8ubmV4dCA9PT0gY3VycmVudClcbiAgICAgICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGN1cnJlbnQgPSBLZXkuc2VudGluZWwpO1xuICAgICAgICAgICAgcmV0dXJuIGl0ZXJhdGUoY3VycmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgZ2V0LCBuZXh0IH07XG4gICAgfVxuICAgIFN0YXRlLnRvSXRlcmF0b3IgPSB0b0l0ZXJhdG9yO1xufSkoU3RhdGUgfHwgKFN0YXRlID0ge30pKTtcbmV4cG9ydCBkZWZhdWx0IFN0YXRlO1xuIiwiaW1wb3J0IFN0YXRlIGZyb20gJy4vc3RhdGUnO1xuZXhwb3J0IHZhciBQYXRoO1xuKGZ1bmN0aW9uIChQYXRoKSB7XG4gICAgZnVuY3Rpb24ga2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC5rZXkgPSBrZXk7XG4gICAgZnVuY3Rpb24gZnJvbUtleShrZXkpIHtcbiAgICAgICAgcmV0dXJuIGtleSA9PSBudWxsID8gbnVsbCA6IEpTT04ucGFyc2Uoa2V5LnRvU3RyaW5nKCkpO1xuICAgIH1cbiAgICBQYXRoLmZyb21LZXkgPSBmcm9tS2V5O1xuICAgIGZ1bmN0aW9uIHRvS2V5KHBhdGgpIHtcbiAgICAgICAgcmV0dXJuIHBhdGggPT0gbnVsbCA/IG51bGwgOiBKU09OLnN0cmluZ2lmeShwYXRoKTtcbiAgICB9XG4gICAgUGF0aC50b0tleSA9IHRvS2V5O1xuICAgIGZ1bmN0aW9uIGhlYWQocGF0aCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbMF0gOiBudWxsO1xuICAgIH1cbiAgICBQYXRoLmhlYWQgPSBoZWFkO1xuICAgIGZ1bmN0aW9uIGdldChwYXRoLCBpbmRleCkge1xuICAgICAgICByZXR1cm4gcGF0aCA/IHBhdGhbaW5kZXhdIDogbnVsbDtcbiAgICB9XG4gICAgUGF0aC5nZXQgPSBnZXQ7XG4gICAgZnVuY3Rpb24gdGFpbChwYXRoKSB7XG4gICAgICAgIHJldHVybiBwYXRoID09IG51bGwgPyBbXSA6IHBhdGguc2xpY2UoMSwgcGF0aC5sZW5ndGgpO1xuICAgIH1cbiAgICBQYXRoLnRhaWwgPSB0YWlsO1xuICAgIGZ1bmN0aW9uIGFwcGVuZChhLCBiKSB7XG4gICAgICAgIHJldHVybiBbXS5jb25jYXQoYSkuY29uY2F0KGIpO1xuICAgIH1cbiAgICBQYXRoLmFwcGVuZCA9IGFwcGVuZDtcbn0pKFBhdGggfHwgKFBhdGggPSB7fSkpO1xuZXhwb3J0IHZhciBUcmVlO1xuKGZ1bmN0aW9uIChUcmVlKSB7XG4gICAgZnVuY3Rpb24gZ2V0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZCkudGhlbihzdGF0ZSA9PiBzdGF0ZS5nZXQodGFpbCkpO1xuICAgIH1cbiAgICBUcmVlLmdldCA9IGdldDtcbiAgICBmdW5jdGlvbiBwcmV2KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBwcmV2cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUucHJldigpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKHByZXZzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5wcmV2KCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLnByZXYodGFpbCkpXG4gICAgICAgICAgICAudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IFtoZWFkLCBwcmV2XSA6IHBhdGhzLnByZXYoaGVhZCkudGhlbihwcmV2ID0+IHByZXYgIT0gbnVsbCA/IHBhdGhzLmdldChwcmV2KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5wcmV2ID0gcHJldjtcbiAgICBmdW5jdGlvbiBuZXh0KHRyZWUsIHBhdGgpIHtcbiAgICAgICAgdmFyIGhlYWQgPSBQYXRoLmdldChwYXRoLCAwKSwgdGFpbCA9IFBhdGguZ2V0KHBhdGgsIDEpLCBuZXh0cyA9IFN0YXRlLmZpbHRlcihTdGF0ZS5tYXAodHJlZSwgc3RhdGUgPT4gc3RhdGUubmV4dCgpKSwgZmlyc3QgPT4gZmlyc3QgIT0gbnVsbCksIHBhdGhzID0gU3RhdGUubWFwKG5leHRzLCAoZmlyc3QsIGtleSkgPT4gW2tleSwgZmlyc3RdKTtcbiAgICAgICAgaWYgKGhlYWQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBwYXRocy5uZXh0KCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpO1xuICAgICAgICByZXR1cm4gdHJlZS5nZXQoaGVhZClcbiAgICAgICAgICAgIC50aGVuKHN0YXRlID0+IHN0YXRlLm5leHQodGFpbCkpXG4gICAgICAgICAgICAudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IFtoZWFkLCBuZXh0XSA6IHBhdGhzLm5leHQoaGVhZCkudGhlbihuZXh0ID0+IG5leHQgIT0gbnVsbCA/IHBhdGhzLmdldChuZXh0KSA6IG51bGwpKTtcbiAgICB9XG4gICAgVHJlZS5uZXh0ID0gbmV4dDtcbn0pKFRyZWUgfHwgKFRyZWUgPSB7fSkpO1xuZXhwb3J0IGRlZmF1bHQgVHJlZTtcbiJdfQ==
