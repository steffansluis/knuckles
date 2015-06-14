import { ObservableRecord } from './observable_record';
import { MutableList } from '../node_modules/sonic/dist/mutable_list';
;
export class MutableRecord extends ObservableRecord {
    constructor(record) {
        super(record);
        if (record != null) {
            this.set = record.set;
            this.delete = record.delete;
        }
    }
    set(key, value) {
        throw new Error("Not implemented");
    }
    delete(key) {
        throw new Error("Not implemented");
    }
    zoom(key) {
        return MutableList.create(MutableRecord.zoom(this, key));
    }
    // compose<W>(lens: ILens<V,W>): MutableRecord<W> {
    //   return MutableRecord.create<W>(MutableRecord.compose<V,W>(this, lens));
    // }
    static create(record) {
        return new MutableRecord(record);
    }
    static zoom(record, key) {
        var unit = ObservableRecord.zoom(record, key);
        function set(_key, value) {
            if (_key == key)
                record.set(key, value);
        }
        function splice(prev, next, ...values) {
            if (values.length)
                record.set(key, values[0]);
            else
                record.delete(key);
        }
        return MutableList.create({
            has: unit.has,
            get: unit.get,
            prev: unit.prev,
            next: unit.next,
            observe: unit.observe,
            set: set,
            splice: splice
        });
    }
}
export default MutableRecord;
