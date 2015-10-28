import { Collection } from './collection';
export class LSCollection extends Collection {
    constructor(urlRoot) {
        super(urlRoot);
    }
    _fetch() {
        return Promise.resolve(Object.keys(localStorage).filter((key) => {
            return key.slice(0, this._urlRoot.length) == this._urlRoot;
        }).map(key => localStorage[key])).then((res) => {
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
            return Promise.resolve(localStorage[this._urlRoot + "/" + key]);
        });
    }
    prev(key) {
        return super.prev(key).then(null, () => {
            return this._fetch().then(() => this._prev[key]);
        });
    }
    next(key) {
        return super.next(key).then(null, () => {
            return this._fetch().then(() => this._next[key]);
        });
    }
    set(key, value) {
        return Promise.resolve(localStorage[key] = value)
            .then(value => super.set(key, value));
    }
}
export default LSCollection;
