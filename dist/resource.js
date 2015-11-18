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
import State from 'sonic/dist/state';
import Cache from 'sonic/dist/cache';
import AsyncIterator from 'sonic/dist/async_iterator';
import { Store } from 'sonic/dist/store';
import { Observable, Subject } from 'sonic/dist/observable';
import XHR from './xhr';
export var Resource;
(function (Resource) {
    function thunk(state) {
        return AsyncIterator.forEach(State.entries(state), () => { });
    }
    function create(urlRoot, keyProperty = 'id') {
        var store, subject = Subject.create(), observable;
        observable = Observable.map(subject, (patch) => __awaiter(this, void 0, Promise, function* () {
            var slice = State.slice(store.state, patch.range);
            var deleted = patch.added ? State.omit(store.state, slice) : slice;
            yield AsyncIterator.forEach(State.keys(deleted), key => { XHR.del(`${urlRoot}/${key}`); });
            if (!patch.added)
                return patch;
            var synced = State.map(patch.added, (value) => {
                var key = value[keyProperty], string = JSON.stringify(value);
                if (key == undefined)
                    return XHR.put(`${urlRoot}/${key}`, string).then(JSON.parse);
                return XHR.post(urlRoot, string).then(JSON.parse);
            });
            var cached = State.cache(synced);
            var keyed = State.keyBy(cached, value => value[keyProperty]);
            return thunk(keyed).then(() => ({ range: patch.range, added: keyed }));
        }));
        return store = Store.create(createState(urlRoot, keyProperty), {
            onNext: subject.onNext,
            subscribe: observable.subscribe
        });
    }
    Resource.create = create;
    function createState(urlRoot, keyProperty = 'id') {
        var cache = Cache.create();
        var { prev, next } = State.lazy(() => {
            return XHR.get(urlRoot)
                .then(JSON.parse)
                .then(array => {
                return State.keyBy(State.fromArray(array), value => {
                    var key = String(value[keyProperty]);
                    cache.get[key] = Promise.resolve(value);
                    return key;
                });
            });
        });
        function get(key) {
            return XHR.get(`${urlRoot}/${key}`).then(JSON.parse);
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    Resource.createState = createState;
})(Resource || (Resource = {}));
export default Resource;
//# sourceMappingURL=resource.js.map