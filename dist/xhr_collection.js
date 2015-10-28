import { Collection } from './collection';
import { XHR } from './xhr';
export class XHRCollection extends Collection {
    constructor(urlRoot) {
        super(urlRoot);
    }
    _fetch() {
        return XHR.get(this._urlRoot)
            .then(xhr => xhr.responseText)
            .then(JSON.parse)
            .then((res) => {
            var prev = null;
            res.forEach((value) => {
                var id = value['id'];
                this._byKey[id] = value;
                this._next[prev] = id;
                this._prev[id] = prev;
                prev = id;
            });
            this._next[prev] = null;
            this._prev['null'] = prev;
        });
    }
    get(key) {
        return super.get(key).then(null, () => {
            return XHR.get(this._urlRoot + '/' + key)
                .then(xhr => xhr.responseText)
                .then(JSON.parse)
                .then(value => this._byKey[value["id"]] = value);
        });
    }
    prev(key = null) {
        return super.prev(key).then(null, () => {
            return this._fetch().then(() => this._prev[key]);
        });
    }
    next(key = null) {
        return super.next(key).then(null, () => {
            return this._fetch().then(() => this._next[key]);
        });
    }
    set(key, value) {
        return XHR.put(this._urlRoot + '/' + key, value)
            .then(xhr => xhr.responseText)
            .then(JSON.parse)
            .then((value) => super.set(key, value));
    }
    splice(prev, next, ...values) {
        return Promise.all(values.map((value) => XHR.post(this._urlRoot, value)))
            .then(results => {
            values = results.map(xhr => JSON.parse(xhr.responseText));
            super.splice(prev, next, ...values);
        });
    }
    ;
}
export default XHRCollection;
