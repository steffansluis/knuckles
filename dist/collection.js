import { SimpleRecord } from './simple_record';
import { XHR } from './xhr';
export class Collection extends SimpleRecord {
    constructor(urlRoot, models) {
        super({});
        this._urlRoot = urlRoot;
    }
    all() {
        return XHR.get(this._urlRoot).then((res) => {
            var arr = JSON.parse(res.responseText);
            arr.forEach((value) => {
                super.set(value.id, value);
            });
            return arr;
        });
    }
    has(key) {
        return super.has(key).then((has) => {
            return has || XHR.head(this._urlRoot + "/" + key)
                .then(() => true)
                .catch(() => false);
        });
    }
    get(key) {
        return key in this._object ? super.get(key) : XHR.get(this._urlRoot + "/" + key)
            .then((res) => {
            var value = JSON.parse(res.responseText);
            super.set(key, value);
            return value;
        });
    }
    set(key, value) {
        if (key in this._object)
            return XHR.put(this._urlRoot + "/" + key, value).then((res) => {
                return super.set(key, JSON.parse(res.responseText));
            });
        else
            return XHR.post(this._urlRoot, value).then((res) => {
                var value = JSON.parse(res.responseText);
                return super.set(value.id, value);
            });
    }
    observe(observer) {
        return this._subject.observe(observer);
    }
    delete(key) {
        return XHR.delete(this._urlRoot + "/" + key).then((res) => super.delete(key));
    }
}
export default Collection;
