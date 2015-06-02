import Key from '../node_modules/sonic/dist/key';
import Unit from '../node_modules/sonic/dist/unit';
import { IObservableRecord, ObservableRecord } from './observable_record';
import { IMutableList, MutableList } from '../node_modules/sonic/dist/mutable_list';

export interface IMutableRecord<V> extends IObservableRecord<V> {
  set(key: Key, value: V): void;
  delete(key: Key): void;
};

export class MutableRecord<V> extends ObservableRecord<V> implements IMutableRecord<V> {

  constructor(record?: IMutableRecord<V>) {
    super(record);
    if(record != null) {
      this.set = record.set;
      this.delete = record.delete;
    }
  }

  set = (key: Key, value: V): void => {
    throw new Error("Not implemented");
  }

  delete = (key: Key): void => {
    throw new Error("Not implemented");
  }

  zoom = (key: Key): MutableList<V> => {
    return MutableList.create(MutableRecord.zoom(this, key));
  }

  static create<V>(record: IObservableRecord<V>): ObservableRecord<V> {
    return new ObservableRecord(record);
  }

  static zoom<V>(record: IMutableRecord<V>, key: Key): IMutableList<V> {
    var unit = ObservableRecord.zoom(record, key);

    function set(_key: Key, value: V): void {
      if(_key == key) record.set(key, value);
    }

    function splice(prev: Key, next: Key, ...values: V[]): void {
      if(values.length) record.set(key, values[0]);
      else record.delete(key);
    }

    return {
      has:     unit.has,
      get:     unit.get,
      prev:    unit.prev,
      next:    unit.next,
      observe: unit.observe,
      set:     set,
      splice:  splice
    };
  }
}

export default MutableRecord;
