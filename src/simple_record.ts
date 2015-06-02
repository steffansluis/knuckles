import Key from '../node_modules/sonic/dist/key';
import { IRecordObserver } from './observable_record';
import { MutableRecord } from './mutable_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';

export default class SimpleRecord<V> extends MutableRecord<V> {

  private _object:  {[key: string]: V};
  private _subject: Subject<IRecordObserver>;

  constructor(object: {[key: string]: V}) {
    super();
    this._object = object;
    this._subject = new Subject<IRecordObserver>();
  }

  has = (key: Key): boolean => {
    return key in this._object;
  }

  get = (key: Key): V => {
    return this._object[key];
  }

  observe = (observer: IRecordObserver): ISubscription => {
    return this._subject.observe(observer);
  }

  set = (key: Key, value: V): void => {
    this._object[key] = value;
    this._subject.notify(function(observer: IRecordObserver) {
      observer.onInvalidate(key);
    });
  }

  delete = (key: Key): void => {
    if(!(key in this._object)) return;

    delete this._object[key];
    this._subject.notify(function(observer: IRecordObserver) {
      observer.onInvalidate(key);
    });
  }

}
