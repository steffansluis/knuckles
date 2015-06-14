import { MutableRecord } from './mutable_record';
import { Subject } from '../node_modules/sonic/dist/observable';
export class SimpleRecord extends MutableRecord {
    constructor(object) {
        super();
        this._object = object;
        this._subject = new Subject();
    }
    has(key) {
        return new Promise((resolve, reject) => {
            resolve(key in this._object);
        });
    }
    get(key) {
        return new Promise((resolve, reject) => {
            key in this._object ? resolve(this._object[key]) : reject();
        });
    }
    observe(observer) {
        return this._subject.observe(observer);
    }
    set(key, value) {
        return new Promise((resolve, reject) => {
            this._object[key] = value;
            this._subject.notify(function (observer) {
                observer.onInvalidate(key);
            });
            resolve(key);
        });
    }
    delete(key) {
        return new Promise((resolve, reject) => {
            if (!(key in this._object))
                reject();
            var value = this._object[key];
            delete this._object[key];
            this._subject.notify(function (observer) {
                observer.onInvalidate(key);
            });
            resolve(value);
        });
    }
}
export default SimpleRecord;
