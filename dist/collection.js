import { ListSubject } from '../node_modules/sonic/dist/observable_list';
import { MutableList } from '../node_modules/sonic/dist/mutable_list';
export class Collection extends MutableList {
    constructor(urlRoot) {
        super();
        this._byKey = Object.create(null);
        this._prev = Object.create(null);
        this._next = Object.create(null);
        // MutableList.create(this);
        this._subject = new ListSubject;
        this._urlRoot = urlRoot;
    }
    get(key) {
        if (key in this._byKey)
            return Promise.resolve(this._byKey[key]);
        return Promise.reject(new Error);
    }
    prev(key = null) {
        if (key in this._prev)
            return Promise.resolve(this._prev[key]);
        return Promise.reject(new Error);
    }
    next(key = null) {
        if (key in this._next)
            return Promise.resolve(this._next[key]);
        return Promise.reject(new Error);
    }
    set(key, value) {
        this._byKey[key] = value;
        this._subject.onInvalidate(key);
        return Promise.resolve();
    }
    splice(prev, next, ...values) {
        return Promise.resolve(values).then((values) => {
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
    }
    ;
    observe(observer) {
        return this._subject.observe(observer);
    }
}
export default Collection;
