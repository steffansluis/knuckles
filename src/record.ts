import Key from '../node_modules/sonic/dist/key';
import Unit from '../node_modules/sonic/dist/unit';
import { IList, List } from '../node_modules/sonic/dist/list';

export interface IRecord<V> {
  has(key: Key): boolean;
  get(key: Key): V;
}

export class Record<V> implements IRecord<V> {

  constructor(record?: IRecord<V>) {
    if(record != null) {
      this.get = record.get;
      this.has = record.has;
    }
  }

  has(key: Key): boolean {
    throw new Error("Not implemented");
  }

  get(key: Key): V {
    throw new Error("Not implemented");
  }

  zoom(key: Key): List<V> {
    return List.create(Record.zoom(this, key));
  }

  static create<V>(record: IRecord<V>): Record<V> {
    return new Record(record);
  }

  static zoom<V>(record: IRecord<V>, key: Key): IList<V> {
    var unit = new Unit<V>();
    if(record.has(key)) unit.set(key, record.get(key));

    return {
      has: unit.has,
      get: unit.get,
      prev: unit.prev,
      next: unit.next
    };
  }
}

export default Record;
