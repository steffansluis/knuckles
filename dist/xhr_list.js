import State from '../node_modules/sonic/dist/state';
import Cache from '../node_modules/sonic/dist/cache';
import PromiseUtils from '../node_modules/sonic/dist/promise_utils';
import XHR from './xhr';
export var XHRList;
(function (XHRList) {
    function stateFromURL(urlRoot) {
        var cache = Cache.create();
        var fetched = PromiseUtils.lazy(resolve => {
            resolve(XHR.get(urlRoot)
                .then(JSON.parse)
                .then(State.fromArray)
                .then(state => {
                return State.map(State.keyBy(state, object => object['id']), (value, key) => key in cache ? value : cache.get[key] = Promise.resolve(value));
            }));
        });
        function get(key) {
            return XHR.get(`${urlRoot}/${key}`).then(JSON.parse);
        }
        function prev(key) {
            return fetched.then(state => state.prev(key));
        }
        function next(key) {
            return fetched.then(state => state.prev(key));
        }
        return Cache.apply({ get, prev, next }, cache);
    }
    XHRList.stateFromURL = stateFromURL;
})(XHRList || (XHRList = {}));
export default XHRList;
