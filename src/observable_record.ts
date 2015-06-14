import Key from '../node_modules/sonic/dist/key';
import Unit from '../node_modules/sonic/dist/unit';
import { IRecord, Record } from './record';
import { IObservable, ISubscription } from '../node_modules/sonic/dist/observable';
import { IObservableList, ObservableList } from '../node_modules/sonic/dist/observable_list';
import { fromPromise } from '../node_modules/sonic/dist/factory';

export interface IRecordObserver {
    onInvalidate: (key: Key) => void;
}

export interface IObservableRecord<V> extends IRecord<V>, IObservable<IRecordObserver> {};

export class ObservableRecord<V> extends Record<V> implements IObservableRecord<V> {

  constructor(record?: IObservableRecord<V>) {
    super(record);
    if(record != null) this.observe = record.observe;
  }

  observe(observer: IRecordObserver): ISubscription {
    throw new Error("Not implemented");
  }

  zoom(key: Key): ObservableList<V> {
    return ObservableList.create(ObservableRecord.zoom(this, key));
  }

  static create<V>(record: IObservableRecord<V>): ObservableRecord<V> {
    return new ObservableRecord(record);
  }

  static zoom<V>(record: IObservableRecord<V>, key: Key): ObservableList<V> {
    var unit = new Unit<V>();
    record.get(key).then( (value: V) => unit.set(key, value));

    record.observe({
      onInvalidate: function(key) {
        record.get(key)
          .then( (value: V) => unit.set(key, value))
          .catch( () => unit.splice(null, null));
      }
    });

    return ObservableList.create(unit);
  }
}

export default ObservableRecord;
