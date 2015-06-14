import Unit from '../node_modules/sonic/dist/unit';
import { Record } from './record';
import { ObservableList } from '../node_modules/sonic/dist/observable_list';
;
export class ObservableRecord extends Record {
    constructor(record) {
        super(record);
        if (record != null)
            this.observe = record.observe;
    }
    observe(observer) {
        throw new Error("Not implemented");
    }
    zoom(key) {
        return ObservableList.create(ObservableRecord.zoom(this, key));
    }
    static create(record) {
        return new ObservableRecord(record);
    }
    static zoom(record, key) {
        var unit = new Unit();
        record.get(key).then((value) => unit.set(key, value));
        record.observe({
            onInvalidate: function (k) {
                if (k != key)
                    return;
                record.get(key)
                    .then((value) => unit.set(key, value))
                    .catch(() => unit.splice(null, null));
            }
        });
        return ObservableList.create(unit);
    }
}
export default ObservableRecord;
