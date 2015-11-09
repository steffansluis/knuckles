import State from 'sonic/dist/state';
import Cache from 'sonic/dist/cache';
import AsyncIterator from 'sonic/dist/async_iterator';
import { List } from 'sonic/dist/list';
import { Observable, Subject } from 'sonic/dist/observable';
import PromiseUtils from 'sonic/dist/promise_utils';
import XHR from './xhr';
export var Resource;
(function (Resource) {
    function thunk(state) {
        return AsyncIterator.forEach(State.entries(state), () => { });
    }
    function create(urlRoot, keyProperty = 'id') {
        var list, subject = Subject.create(), observable = Observable.map(subject, patch => {
            return AsyncIterator.forEach(State.entries(list.state, patch.range), ([key, value]) => { XHR.del(`${urlRoot}/${key}`); }).then(() => {
                if (patch.added == null)
                    return Promise.resolve(patch);
                var synced = State.map(patch.added, value => {
                    var key = value[keyProperty], string = JSON.stringify(value);
                    return (key != null ? XHR.put(`${urlRoot}/${key}`, string) : XHR.post(urlRoot, string)).then(JSON.parse);
                });
                var cached = State.cache(synced);
                var keyed = State.keyBy(cached, value => value[keyProperty]);
                return thunk(keyed).then(() => ({ range: patch.range, added: keyed }));
            });
        });
        list = List.create(createState(urlRoot, keyProperty), {
            onNext: subject.onNext,
            subscribe: observable.subscribe
        });
        return list;
    }
    Resource.create = create;
    function createState(urlRoot, keyProperty = 'id') {
        var cache = Cache.create();
        var fetcher = PromiseUtils.lazy(resolve => {
            var state = XHR.get(urlRoot)
                .then(JSON.parse)
                .then(State.fromArray)
                .then(state => State.keyBy(state, value => {
                cache.get[value[keyProperty]] = Promise.resolve(value);
                return value[keyProperty];
            }));
            resolve(state);
        });
        function get(key) {
            return XHR.get(`${urlRoot}/${key}`).then(JSON.parse);
        }
        function prev(key) {
            return fetcher.then(state => state.prev(key));
        }
        function next(key) {
            return fetcher.then(state => state.next(key));
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    Resource.createState = createState;
})(Resource || (Resource = {}));
export default Resource;
