import Key from '../node_modules/sonic/dist/key';
import Unit from '../node_modules/sonic/dist/unit';
import { IObservableRecord, ObservableRecord } from './observable_record';
import { IMutableList, MutableList } from '../node_modules/sonic/dist/mutable_list';

//TODO: Do this somewhere else (Tails I think) and import the type
export interface ILens<A,B> {
  get(a: A): B;
  set(a: A, b: B): A;
}

export interface IMutableRecord<V> extends IObservableRecord<V> {
  set(key: Key, value: V): Promise<Key>;
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

  set(key: Key, value: V): Promise<Key> {
    throw new Error("Not implemented");
  }

  delete(key: Key): void {
    throw new Error("Not implemented");
  }

  zoom(key: Key): MutableList<V> {
    return MutableList.create(MutableRecord.zoom(this, key));
  }

  // compose<W>(lens: ILens<V,W>): MutableRecord<W> {
  //   return MutableRecord.create<W>(MutableRecord.compose<V,W>(this, lens));
  // }

  static create<V>(record: IMutableRecord<V>): MutableRecord<V> {
    return new MutableRecord(record);
  }

  static zoom<V>(record: IMutableRecord<V>, key: Key): MutableList<V> {
    var unit = ObservableRecord.zoom(record, key);

    function set(_key: Key, value: V): void {
      if(_key == key) record.set(key, value);
    }

    function splice(prev: Key, next: Key, ...values: V[]): void {
      if(values.length) record.set(key, values[0]);
      else record.delete(key);
    }

    return MutableList.create({
      has:     unit.has,
      get:     unit.get,
      prev:    unit.prev,
      next:    unit.next,
      observe: unit.observe,
      set:     set,
      splice:  splice
    });
  }

  // static compose<V,W>(record: IMutableRecord<V>, lens: ILens<V, W>): IMutableRecord<W> {
  //   function get(key: Key): Promise<W> {
  //     return record.get(key).then(lens.get);
  //   }
  //
  //   function set(key: Key, value: Promise<W>): Promise<Key> {
  //     return record.set(key, record.get(key).then( (a: V) => lens.set(a, value))
  //   }
  //
  //   return {
  //     has: record.has.bind(record),
  //     get: get,
  //     set: set,
  //     delete: record.delete.bind(record),
  //     observe: record.observe.bind(record)
  //   }
  // }
}

export default MutableRecord;
