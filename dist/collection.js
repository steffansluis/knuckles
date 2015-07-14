import { ListSubject } from '../node_modules/sonic/dist/observable_list';
import { MutableList } from '../node_modules/sonic/dist/mutable_list';
import { XHR } from './xhr';
export class Collection extends MutableList {
    constructor(urlRoot) {
        super();
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        this.get = (key) => {
            if (this._byKey[key])
                return Promise.resolve(this._byKey[key]);
            return XHR.get(this._urlRoot + '/' + key)
                .then(xhr => xhr.responseText)
                .then(JSON.parse)
                .then(value => this._byKey[value["id"]] = value);
        };
        this.prev = (key) => {
            if (this._prev[key])
                return Promise.resolve(this._prev[key]);
            return this._fetch().then(() => this._prev[key]);
        };
        this.next = (key) => {
            if (this._next[key])
                return Promise.resolve(this._next[key]);
            return this._fetch().then(() => this._next[key]);
        };
        this.set = (key, value) => {
            return XHR.put(this._urlRoot + '/' + key, value)
                .then(xhr => xhr.responseText)
                .then(JSON.parse)
                .then((value) => this._subject.onInvalidate(value['id']));
        };
        this.splice = (prev, next, ...values) => {
            return Promise.all(values.map((value) => XHR.post(this._urlRoot, value)))
                .then(results => {
                values = results.map(xhr => JSON.parse(xhr.responseText));
                values.forEach((value) => {
                    var id = value['id'];
                    this._byKey[id] = value;
                    this._next[prev] = id;
                    this._prev[id] = prev;
                    prev = id;
                });
                this._next[prev] = values[0]["id"];
                this._prev[next] = values[values.length - 1]["id"];
                this._subject.onInvalidate([prev, next]);
            });
        };
        this.observe = (observer) => {
            return this._subject.observe(observer);
        };
        this._subject = new ListSubject;
        this._urlRoot = urlRoot;
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
}
export default Collection;
