import { List } from '../node_modules/sonic/dist/list';
import { fromPromise } from '../node_modules/sonic/dist/factory';
export class Record {
    constructor(record) {
        if (record != null) {
            this.get = record.get;
            this.has = record.has;
        }
    }
    has(key) {
        throw new Error("Not implemented");
    }
    get(key) {
        throw new Error("Not implemented");
    }
    zoom(key) {
        return List.create(Record.zoom(this, key));
    }
    static create(record) {
        return new Record(record);
    }
    static zoom(record, key) {
        var unit = fromPromise(record.get(key));
        return {
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next
        };
    }
}
export default Record;
