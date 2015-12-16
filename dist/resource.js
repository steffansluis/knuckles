var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import State from 'sonicjs/dist/state';
import Cache from 'sonicjs/dist/cache';
import AsyncIterator from 'sonicjs/dist/async_iterator';
import { Store } from 'sonicjs/dist/store';
import { Observable, Subject } from 'sonicjs/dist/observable';
import XHR from './xhr';
export var Resource;
(function (Resource) {
    function create(urlRoot, keyFn = record => record['id'], headers) {
        var store, subject = Subject.create(), observable;
        observable = Observable.map(subject, (patch) => __awaiter(this, void 0, Promise, function* () {
            var slice = State.slice(store.state, patch.range);
            var deleted = patch.added ? State.omit(slice, State.keyBy(patch.added, keyFn)) : slice;
            yield AsyncIterator.forEach(State.keys(deleted), key => XHR.del(`${urlRoot}/${key}`).then(() => { }));
            if (!patch.added)
                return patch;
            var synced = State.map(patch.added, (value) => __awaiter(this, void 0, Promise, function* () {
                var key = yield keyFn(value), string = JSON.stringify(value);
                if (key != undefined)
                    return XHR.put(`${urlRoot}/${key}`, string, headers).then(JSON.parse);
                return XHR.post(urlRoot, string, headers).then(JSON.parse);
            }));
            var cached = State.cache(synced);
            var keyed = State.keyBy(cached, keyFn);
            yield AsyncIterator.forEach(State.entries(keyed), () => { });
            return { range: patch.range, added: keyed };
        }));
        return store = Store.create(createState(urlRoot, keyFn, headers), {
            onNext: subject.onNext,
            subscribe: observable.subscribe
        });
    }
    Resource.create = create;
    function createState(urlRoot, keyFn = record => record['id'], headers) {
        var cache = Cache.create();
        var { prev, next } = State.lazy(() => {
            return XHR.get(urlRoot, headers)
                .then(JSON.parse)
                .then(object => {
                return State.keyBy(State.fromObject(object), (value) => __awaiter(this, void 0, Promise, function* () {
                    var key = yield keyFn(value);
                    cache.get(key, value);
                    return key;
                }));
            });
        });
        function get(key) {
            return XHR.get(`${urlRoot}/${key}`, headers).then(JSON.parse);
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    Resource.createState = createState;
})(Resource || (Resource = {}));
export default Resource;
