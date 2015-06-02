(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Knuckles = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../node_modules/sonic/dist/observable":10,"./mutable_record":2}],2:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_record_1 = require('./observable_record');
var mutable_list_1 = require('../node_modules/sonic/dist/mutable_list');
;
var MutableRecord = (function (_super) {
    __extends(MutableRecord, _super);
    function MutableRecord(record) {
        _super.call(this, record);
        if (record != null) {
            this.set = record.set;
            this.delete = record.delete;
        }
    }
    MutableRecord.prototype.set = function (key, value) {
        throw new Error("Not implemented");
    };
    MutableRecord.prototype.delete = function (key) {
        throw new Error("Not implemented");
    };
    MutableRecord.prototype.zoom = function (key) {
        return mutable_list_1.MutableList.create(MutableRecord.zoom(this, key));
    };
    MutableRecord.prototype.compose = function (lens) {
        return MutableRecord.create(MutableRecord.compose(this, lens));
    };
    MutableRecord.create = function (record) {
        return new MutableRecord(record);
    };
    MutableRecord.zoom = function (record, key) {
        var unit = observable_record_1.ObservableRecord.zoom(record, key);
        function set(_key, value) {
            if (_key == key)
                record.set(key, value);
        }
        function splice(prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                record.set(key, values[0]);
            else
                record.delete(key);
        }
        return {
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next,
            observe: unit.observe,
            set: set,
            splice: splice
        };
    };
    MutableRecord.compose = function (record, lens) {
        function get(key) {
            return lens.get(record.get(key));
        }
        function set(key, value) {
            record.set(key, lens.set(record.get(key), value));
        }
        return {
            has: record.has.bind(record),
            get: get,
            set: set,
            delete: record.delete.bind(record),
            observe: record.observe.bind(record)
        };
    };
    return MutableRecord;
})(observable_record_1.ObservableRecord);
exports.MutableRecord = MutableRecord;
exports.default = MutableRecord;

},{"../node_modules/sonic/dist/mutable_list":9,"./observable_record":3}],3:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var unit_1 = require('../node_modules/sonic/dist/unit');
var record_1 = require('./record');
var observable_list_1 = require('../node_modules/sonic/dist/observable_list');
;
var ObservableRecord = (function (_super) {
    __extends(ObservableRecord, _super);
    function ObservableRecord(record) {
        _super.call(this, record);
        if (record != null)
            this.observe = record.observe;
    }
    ObservableRecord.prototype.observe = function (observer) {
        throw new Error("Not implemented");
    };
    ObservableRecord.prototype.zoom = function (key) {
        return observable_list_1.ObservableList.create(ObservableRecord.zoom(this, key));
    };
    ObservableRecord.create = function (record) {
        return new ObservableRecord(record);
    };
    ObservableRecord.zoom = function (record, key) {
        var unit = new unit_1.default();
        if (record.has(key))
            unit.set(key, record.get(key));
        record.observe({
            onInvalidate: function (key) {
                if (record.has(key))
                    unit.set(key, record.get(key));
                else
                    unit.splice(null, null);
            }
        });
        return {
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next,
            observe: unit.observe
        };
    };
    return ObservableRecord;
})(record_1.Record);
exports.ObservableRecord = ObservableRecord;
exports.default = ObservableRecord;

},{"../node_modules/sonic/dist/observable_list":12,"../node_modules/sonic/dist/unit":14,"./record":4}],4:[function(require,module,exports){
var unit_1 = require('../node_modules/sonic/dist/unit');
var list_1 = require('../node_modules/sonic/dist/list');
var Record = (function () {
    function Record(record) {
        if (record != null) {
            this.get = record.get;
            this.has = record.has;
        }
    }
    Record.prototype.has = function (key) {
        throw new Error("Not implemented");
    };
    Record.prototype.get = function (key) {
        throw new Error("Not implemented");
    };
    Record.prototype.zoom = function (key) {
        return list_1.List.create(Record.zoom(this, key));
    };
    Record.create = function (record) {
        return new Record(record);
    };
    Record.zoom = function (record, key) {
        var unit = new unit_1.default();
        if (record.has(key))
            unit.set(key, record.get(key));
        return {
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next
        };
    };
    return Record;
})();
exports.Record = Record;
exports.default = Record;

},{"../node_modules/sonic/dist/list":8,"../node_modules/sonic/dist/unit":14}],5:[function(require,module,exports){
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

},{"../node_modules/sonic/dist/observable":10,"./mutable_record":2}],6:[function(require,module,exports){
var Cache = (function () {
    function Cache(list) {
        this._byKey = Object.create(null),
            this._next = Object.create(null),
            this._prev = Object.create(null);
        this._list = list;
    }
    Cache.prototype.has = function (key) {
        return key in this._byKey || this._list.has(key);
    };
    Cache.prototype.get = function (key) {
        if (key in this._byKey)
            return this._byKey[key];
        if (this._list.has(key))
            return this._byKey[key] = this._list.get(key);
        return;
    };
    Cache.prototype.prev = function (key) {
        if (key in this._prev)
            return this._prev[key];
        var prevKey = this._list.prev(key);
        if (prevKey == null)
            prevKey = null;
        this._prev[key] = prevKey;
        this._next[prevKey] = key;
        return prevKey;
    };
    Cache.prototype.next = function (key) {
        if (key === void 0) { key = null; }
        if (key in this._next)
            return this._next[key];
        var nextKey = this._list.next(key);
        if (nextKey == null)
            nextKey = null;
        this._next[key] = nextKey;
        this._prev[nextKey] = key;
        return nextKey;
    };
    return Cache;
})();
exports.default = Cache;

},{}],7:[function(require,module,exports){
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
exports.default = Key;

},{}],8:[function(require,module,exports){
var tree_1 = require('./tree');
var cache_1 = require('./cache');
var List = (function () {
    function List(list) {
        var _this = this;
        this.has = function (key) {
            throw new Error("Not implemented");
        };
        this.get = function (key) {
            throw new Error("Not implemented");
        };
        this.prev = function (key) {
            throw new Error("Not implemented");
        };
        this.next = function (key) {
            throw new Error("Not implemented");
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
        if (list != null) {
            this.has = list.has;
            this.get = list.get;
            this.prev = list.prev;
            this.next = list.next;
        }
    }
    ;
    // index = (): List<V> => {
    //   return List.create(List.index(this));
    // }
    // 
    // zip = <W, U>(other: IList<W>, zipFn: (v: V, w: W) => U): List<U> => {
    //   return List.create(List.zip(this, other, zipFn));
    // }
    List.isList = function (obj) {
        return obj != null && !!obj['has'] && !!obj['get'] && !!obj['prev'] && !!obj['next'];
    };
    List.create = function (list) {
        return new List({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next
        });
    };
    List.first = function (list) {
        return list.get(list.next());
    };
    List.last = function (list) {
        return list.get(list.prev());
    };
    List.forEach = function (list, fn) {
        var key;
        while ((key = list.next(key)) != null)
            fn(list.get(key), key);
    };
    List.reduce = function (list, fn, memo) {
        var key;
        while ((key = list.next(key)) != null)
            memo = fn(memo, list.get(key), key);
        return memo;
    };
    List.toArray = function (list) {
        return List.reduce(list, function (memo, v) { memo.push(v); return memo; }, []);
    };
    List.findKey = function (list, fn) {
        var key;
        while ((key = list.next(key)) != null)
            if (fn(list.get(key), key))
                return key;
    };
    List.find = function (list, fn) {
        return list.get(List.findKey(list, fn));
    };
    List.keyOf = function (list, value) {
        return List.findKey(list, function (v) { return v === value; });
    };
    List.indexOf = function (list, value) {
        var key, i = 0;
        while ((key = list.next(key)) != null) {
            if (list.get(key) === value)
                return i;
            i++;
        }
    };
    List.keyAt = function (list, index) {
        var key, i = 0;
        while ((key = list.next(key)) != null)
            if (i++ == index)
                return key;
        return null;
    };
    List.at = function (list, index) {
        return list.get(List.keyAt(list, index));
    };
    List.every = function (list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (!predicate(list.get(key), key))
                return false;
        return true;
    };
    List.some = function (list, predicate) {
        var key;
        while ((key = list.next(key)) != null)
            if (predicate(list.get(key), key))
                return true;
        return false;
    };
    List.contains = function (list, value) {
        return List.some(list, function (v) { return v === value; });
    };
    List.reverse = function (list) {
        var has = list.has, get = list.get;
        function prev(key) {
            return list.next(key);
        }
        function next(key) {
            return list.prev(key);
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.map = function (list, mapFn) {
        var has = list.has, prev = list.prev, next = list.next;
        function get(key) {
            return has(key) ? mapFn(list.get(key), key) : undefined;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.filter = function (list, filterFn) {
        function has(key) {
            return list.has(key) && filterFn(list.get(key), key);
        }
        function get(key) {
            if (has(key))
                return list.get(key);
            return;
        }
        function prev(key) {
            var prev = key;
            while ((prev = list.prev(prev)) != null)
                if (has(prev))
                    return prev;
            return null;
        }
        function next(key) {
            var next = key;
            while ((next = list.next(next)) != null)
                if (has(next))
                    return next;
            return null;
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatten = function (list) {
        function has(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Tree.has(list, path, 1);
        }
        function get(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Tree.get(list, path, 1);
        }
        function prev(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Path.key(tree_1.Tree.prev(list, path, 1));
        }
        function next(key) {
            var path = tree_1.Path.create(key);
            return tree_1.Path.key(tree_1.Tree.next(list, path, 1));
        }
        return { has: has, get: get, prev: prev, next: next };
    };
    List.flatMap = function (list, flatMapFn) {
        return List.flatten(List.map(list, flatMapFn));
    };
    List.cache = function (list) {
        return new cache_1.default(list);
    };
    return List;
})();
exports.List = List;
exports.default = List;

},{"./cache":6,"./tree":13}],9:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var observable_list_1 = require('./observable_list');
var MutableList = (function (_super) {
    __extends(MutableList, _super);
    function MutableList(list) {
        var _this = this;
        _super.call(this, list);
        this.set = function (key, value) {
            throw new Error("Not implemented");
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
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
        this.delete = function (key) {
            return MutableList.delete(_this, key);
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
        if (list != null) {
            this.set = list.set;
            this.splice = list.splice;
        }
    }
    MutableList.isMutableList = function (obj) {
        return observable_list_1.ObservableList.isObservableList(obj) && !!obj['set'] && !!obj['splice'];
    };
    MutableList.create = function (list) {
        return new MutableList({
            has: list.has,
            get: list.get,
            prev: list.prev,
            next: list.next,
            observe: list.observe,
            set: list.set,
            splice: list.splice
        });
    };
    MutableList.addBefore = function (list, key, value) {
        list.splice(list.prev(key), key, value);
        return list.prev(key);
    };
    MutableList.addAfter = function (list, key, value) {
        list.splice(key, list.next(key), value);
        return list.next(key);
    };
    MutableList.push = function (list, value) {
        return MutableList.addBefore(list, null, value);
    };
    MutableList.unshift = function (list, value) {
        return MutableList.addAfter(list, null, value);
    };
    MutableList.delete = function (list, key) {
        if (!list.has(key))
            return;
        var value = list.get(key);
        list.splice(list.prev(key), list.next(key));
        return value;
    };
    MutableList.deleteBefore = function (list, key) {
        return MutableList.delete(list, list.prev(key));
    };
    MutableList.deleteAfter = function (list, key) {
        return MutableList.delete(list, list.next(key));
    };
    MutableList.pop = function (list) {
        return MutableList.deleteBefore(list, null);
    };
    MutableList.shift = function (list) {
        return MutableList.deleteAfter(list, null);
    };
    MutableList.remove = function (list, value) {
        var key = MutableList.keyOf(list, value);
        if (key == null)
            return false;
        delete (list, key);
        return true;
    };
    return MutableList;
})(observable_list_1.ObservableList);
exports.MutableList = MutableList;
exports.default = MutableList;

},{"./observable_list":12}],10:[function(require,module,exports){
var key_1 = require('./key');
var Subject = (function () {
    function Subject() {
        var _this = this;
        this.observe = function (observer) {
            var observerKey = key_1.default.create();
            _this._observers[observerKey] = observer;
            return {
                unsubscribe: function () { delete _this._observers[observerKey]; }
            };
        };
        this.notify = function (notifier) {
            for (var observerKey in _this._observers)
                notifier(_this._observers[observerKey]);
        };
        this._observers = Object.create(null);
    }
    return Subject;
})();
exports.Subject = Subject;

},{"./key":7}],11:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cache_1 = require('./cache');
var ObservableCache = (function (_super) {
    __extends(ObservableCache, _super);
    function ObservableCache(list) {
        var _this = this;
        _super.call(this, list);
        list.observe({
            onInvalidate: function (prev, next) {
                var key;
                key = prev;
                while ((key = _this._next[key]) !== undefined) {
                    delete _this._next[_this._prev[key]];
                    delete _this._prev[key];
                    if (key == next)
                        break;
                    delete _this._byKey[key];
                }
                while ((key = _this._prev[key]) !== undefined) {
                    delete _this._prev[_this._next[key]];
                    delete _this._next[key];
                    if (key == prev)
                        break;
                    delete _this._byKey[key];
                }
            }
        });
    }
    ObservableCache.prototype.observe = function (observer) {
        return this._list.observe(observer);
    };
    return ObservableCache;
})(cache_1.default);
exports.default = ObservableCache;

},{"./cache":6}],12:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var list_1 = require('./list');
var tree_1 = require('./tree');
var observable_1 = require('./observable');
var observable_cache_1 = require('./observable_cache');
;
var ObservableList = (function (_super) {
    __extends(ObservableList, _super);
    function ObservableList(list) {
        var _this = this;
        _super.call(this, list);
        this.observe = function (observer) {
            throw new Error("Not implemented");
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
        if (list != null)
            this.observe = list.observe;
    }
    ObservableList.isObservableList = function (obj) {
        return list_1.List.isList(obj) && !!obj['observe'];
    };
    ObservableList.create = function (list) {
        return new ObservableList({
            has: list.has.bind(list),
            get: list.get.bind(list),
            prev: list.prev.bind(list),
            next: list.next.bind(list),
            observe: list.observe.bind(list)
        });
    };
    ObservableList.reverse = function (list) {
        var _a = list_1.List.reverse(list), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe(observer);
        }
        return { has: has, get: get, prev: prev, next: next, observe: observe };
    };
    ObservableList.map = function (list, mapFn) {
        var _a = list_1.List.map(list, mapFn), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        return { has: has, get: get, prev: prev, next: next, observe: list.observe };
    };
    ObservableList.filter = function (list, filterFn) {
        var _a = list_1.List.filter(list, filterFn), has = _a.has, get = _a.get, prev = _a.prev, next = _a.next;
        function observe(observer) {
            return list.observe({
                onInvalidate: function (p, n) {
                    p = has(p) ? p : prev(p);
                    n = has(n) ? n : next(n);
                    observer.onInvalidate(p, n);
                }
            });
        }
        return { has: has, get: get, prev: prev, next: next, observe: observe };
    };
    ObservableList.flatten = function (list) {
        var cache;
        var subscriptions = Object.create(null);
        var subject = new observable_1.Subject();
        list.observe({
            onInvalidate: function (prev, next) {
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
                onInvalidate: function (prev, next) {
                    var prevKey, nextKey, prevPath = tree_1.Path.append(key, prev), nextPath = tree_1.Path.append(key, next);
                    if (prev == null)
                        prevPath = tree_1.Tree.prev(list, tree_1.Tree.next(list, prevPath));
                    if (next == null)
                        nextPath = tree_1.Tree.next(list, tree_1.Tree.prev(list, nextPath));
                    prevKey = tree_1.Path.key(prevPath);
                    nextKey = tree_1.Path.key(nextPath);
                    subject.notify(function (observer) {
                        observer.onInvalidate(prevKey, nextKey);
                    });
                }
            });
            return value;
        }));
        cache.observe({
            onInvalidate: function (prev, next) {
                var prevKey = tree_1.Path.key(tree_1.Tree.prev(list, [prev])), nextKey = tree_1.Path.key(tree_1.Tree.next(list, [next]));
                subject.notify(function (observer) {
                    observer.onInvalidate(prevKey, nextKey);
                });
            }
        });
        var _a = list_1.List.flatten(cache), has = _a.has, get = _a.get, next = _a.next, prev = _a.prev;
        return { has: has, get: get, next: next, prev: prev, observe: subject.observe };
    };
    ObservableList.flatMap = function (list, flatMapFn) {
        return ObservableList.flatten(ObservableList.map(list, flatMapFn));
    };
    ObservableList.cache = function (list) {
        return new observable_cache_1.default(list);
    };
    return ObservableList;
})(list_1.List);
exports.ObservableList = ObservableList;
exports.default = ObservableList;

},{"./list":8,"./observable":10,"./observable_cache":11,"./tree":13}],13:[function(require,module,exports){
var list_1 = require('./list');
;
var Path;
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
})(Path = exports.Path || (exports.Path = {}));
var Tree;
(function (Tree) {
    function has(list, path, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path);
        return list.has(head) && (tail.length == 0 || depth == 0 || Tree.has(list.get(head), tail, depth));
    }
    Tree.has = has;
    function get(list, path, depth) {
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path);
        if (!list.has(head))
            return;
        var value = list.get(head);
        if (tail.length == 0 || depth == 0)
            return value;
        return Tree.get(value, tail, depth);
    }
    Tree.get = get;
    function prev(list, path, depth) {
        if (path === void 0) { path = []; }
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path), key = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(key);
            if (!list_1.List.isList(value) || depth == 0) {
                if (key != null && key != head)
                    return [key];
            }
            else {
                var prevPath = Tree.prev(value, tail, depth - 1);
                if (prevPath != null)
                    return Path.append(key, prevPath);
                tail = [];
            }
        } while ((key = list.prev(key)) != null);
    }
    Tree.prev = prev;
    function next(list, path, depth) {
        if (path === void 0) { path = []; }
        if (depth === void 0) { depth = Infinity; }
        var head = Path.head(path), tail = Path.tail(path), key = head, value;
        if (head != null && !list.has(head))
            return;
        do {
            value = list.get(key);
            if (!list_1.List.isList(value) || depth == 0) {
                if (key != null && key != head)
                    return [key];
            }
            else {
                var nextPath = Tree.next(value, tail, depth - 1);
                if (nextPath != null)
                    return Path.append(key, nextPath);
                tail = [];
            }
        } while ((key = list.next(key)) != null);
    }
    Tree.next = next;
})(Tree = exports.Tree || (exports.Tree = {}));
exports.default = Tree;

},{"./list":8}],14:[function(require,module,exports){
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var key_1 = require('./key');
var observable_1 = require('./observable');
var mutable_list_1 = require('./mutable_list');
var Unit = (function (_super) {
    __extends(Unit, _super);
    function Unit(value) {
        var _this = this;
        _super.call(this);
        this.has = function (key) {
            return _this._key == key;
        };
        this.get = function (key) {
            if (_this.has(key))
                return _this._value;
        };
        this.prev = function (key) {
            if (key == null)
                return _this._key;
            return null;
        };
        this.next = function (key) {
            if (key == null)
                return _this._key;
            return null;
        };
        this.set = function (key, value) {
            _this._key = key;
            _this._value = value;
            _this._invalidate();
        };
        this.splice = function (prev, next) {
            var values = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                values[_i - 2] = arguments[_i];
            }
            if (values.length)
                return _this.set(key_1.default.create(), values[0]);
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
        this._subject = new observable_1.Subject();
        if (arguments.length)
            this.splice(null, null, value);
    }
    return Unit;
})(mutable_list_1.MutableList);
exports.default = Unit;

},{"./key":7,"./mutable_list":9,"./observable":10}],15:[function(require,module,exports){
// Build upon the IList standard from Sonic
// import {IList} from '../../sonic/dist/list.d';
// import Id from '../../sonic/dist/key.d';
// import {ILens} from './lenses';
// import _Fetchable from './fetchable';
var observable_record_1 = require('./observable_record');
var mutable_record_1 = require('./mutable_record');
var simple_record_1 = require('./simple_record');
var knuckle_1 = require('./knuckle');
function Knuckles(key, value) {
    // if (arguments.length == 2) return Knuckles.set(key, value);
    // else return Knuckles.get(key);
}
;
var Knuckles;
(function (Knuckles) {
    // export function get<V>(key: string): V | any {
    //   return {key: 2, color: 'green'};
    // }
    //
    // export function set<V>(key: string, value: V): string {
    //   return null;
    // }
    Knuckles.Record = simple_record_1.default;
    Knuckles.ObservableRecord = observable_record_1.default;
    Knuckles.MutableRecord = mutable_record_1.default;
    Knuckles.SimpleRecord = simple_record_1.default;
    Knuckles.Knuckle = knuckle_1.default;
    // export var Fetchable = _Fetchable;
    Knuckles.records = {
        "localStorage": new Knuckles.SimpleRecord(localStorage).compose({
            get: function (str) { return JSON.parse(str); },
            set: function (str, obj) { return JSON.stringify(obj); }
        })
    };
})(Knuckles || (Knuckles = {}));
module.exports = Knuckles;

},{"./knuckle":1,"./mutable_record":2,"./observable_record":3,"./simple_record":5}]},{},[15])(15)
});