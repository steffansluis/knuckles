import Key from '../node_modules/sonic/dist/key';
import Unit from '../node_modules/sonic/dist/unit';
import { IRecord, Record } from './record';
import { IObservable, ISubscription } from '../node_modules/sonic/dist/observable';
import { IObservableList, ObservableList } from '../node_modules/sonic/dist/observable_list';

export interface IRecordObserver {
  onInvalidate: (key: Key) => void;
}

export interface IObservableRecord<V> extends IRecord<V>, IObservable<IRecordObserver> {};

export class ObservableRecord<V> extends Record<V> implements IObservableRecord<V> {

  constructor(record?: IObservableRecord<V>) {
    super(record);

    if(record != null) this.observe = record.observe;
  }

  observe = (observer: IRecordObserver): ISubscription => {
    throw new Error("Not implemented");
  }

  zoom = (key: Key): ObservableList<V> => {
    return ObservableList.create(ObservableRecord.zoom(this, key));
  }

  static create<V>(record: IObservableRecord<V>): ObservableRecord<V> {
    return new ObservableRecord(record);
  }

  static zoom<V>(record: IObservableRecord<V>, key: Key): IObservableList<V> {
    var unit = new Unit<V>();
    if(record.has(key)) unit.set(key, record.get(key));

    record.observe({
      onInvalidate: function(key) {
        if(record.has(key)) unit.set(key, record.get(key));
        else unit.splice(null, null);
      }
    });

    return {
      has: unit.has,
      get: unit.get,
      prev: unit.prev,
      next: unit.next,
      observe: unit.observe
    };
  }
}

export default ObservableRecord;
