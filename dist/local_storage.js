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
import Store from 'sonicjs/dist/store';
import Patch from 'sonicjs/dist/patch';
import Cache from 'sonicjs/dist/cache';
import { NotFound } from 'sonicjs/dist/exceptions';
var h = 0;
function uuid() {
    return Date.now() + '_' + h++;
}
export var LocalStorage;
(function (LocalStorage) {
    LocalStorage.NAMESPACE = 'knuckles';
    function cache(parent, uri) {
        const hashes = JSON.parse(localStorage.getItem(uri)) || [];
        const hash = uuid();
        const state = Cache.apply(hashes.map(createCache).reduce(Cache.apply, parent.state), createCache(hash));
        return Store.create(state, parent.dispatcher, (state, patch) => {
            const newState = Patch.apply(state, patch);
            const hash = uuid();
            const cache = createCache(hash);
            hashes.push(hash);
            localStorage.setItem(uri, JSON.stringify(hashes));
            return Cache.apply(newState, cache);
        });
    }
    LocalStorage.cache = cache;
    function createCache(hash) {
        function cacheFn(uri) {
            const c = JSON.parse(localStorage.getItem(uri)) || {};
            return (t, u) => __awaiter(this, void 0, Promise, function* () {
                const stringT = JSON.stringify(t);
                if (u === undefined) {
                    if (stringT in c)
                        return c[stringT];
                    throw new NotFound();
                }
                c[stringT] = yield u;
                localStorage.setItem(uri, JSON.stringify(c));
                return c[stringT];
            });
        }
        return {
            get: cacheFn(`${LocalStorage.NAMESPACE}/${hash}/get`),
            prev: cacheFn(`${LocalStorage.NAMESPACE}/${hash}/prev`),
            next: cacheFn(`${LocalStorage.NAMESPACE}/${hash}/next`)
        };
    }
    LocalStorage.createCache = createCache;
})(LocalStorage || (LocalStorage = {}));
export default LocalStorage;
