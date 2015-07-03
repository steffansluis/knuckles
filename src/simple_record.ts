import Key from '../node_modules/sonic/dist/key';
import { IRecordObserver } from './observable_record';
import { MutableRecord } from './mutable_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';

export class SimpleRecord<V> extends MutableRecord<V> {

  protected _object:  {[key: string]: V};
  protected _subject: Subject<IRecordObserver>;

  constructor(object: {[key: string]: V}) {
    super();
    this._object = object;
    this._subject = new Subject<IRecordObserver>();
  }

  get = (key: Key): Promise<V> => {
    return new Promise((resolve, reject) => {
      key in this._object ? resolve(this._object[key]) : reject();
    });
  }

  observe = (observer: IRecordObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  set = (key: Key, value: V): Promise<Key> => {
    return new Promise((resolve, reject) => {
      this._object[key] = value;
      this._subject.notify(function(observer: IRecordObserver) {
        observer.onInvalidate(key);
      });

      resolve(key);
    });
  }

  delete = (key: Key): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      if(!(key in this._object)) reject();

      var value = this._object[key];
      delete this._object[key];
      this._subject.notify(function(observer: IRecordObserver) {
        observer.onInvalidate(key);
      });

      resolve();
    })
  }

}

export default SimpleRecord;
