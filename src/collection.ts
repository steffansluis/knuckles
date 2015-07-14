import Key from '../node_modules/sonic/dist/key';
import { IRecordObserver } from './observable_record';
import { IListObserver, ListSubject } from '../node_modules/sonic/dist/observable_list';
import { MutableList } from '../node_modules/sonic/dist/mutable_list';
import { MutableCache } from '../node_modules/sonic/dist/mutable_cache';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
import { XHR } from './xhr';

export class Collection<T extends {[key: string]: any}> extends MutableList<T> {

  protected _urlRoot: string;
  protected _subject: ListSubject;

  protected _byKey: {[key: string]: T}   = Object.create(null);
  protected _prev:  {[key: string]: Key} = Object.create(null);
  protected _next:  {[key: string]: Key} = Object.create(null);

  constructor(urlRoot: string) {
    super();

    this._subject = new ListSubject;
    this._urlRoot = urlRoot;
  }

  protected _fetch(): Promise<void> {
    return XHR.get(this._urlRoot)
      .then(xhr => xhr.responseText)
      .then(JSON.parse)
      .then((res: T[]) => {
        var prev: Key = null;

        res.forEach((value: T) => {
          var id: Key = value['id'];
          this._byKey[id] = value;
          this._next[prev] = id;
          this._prev[id] = prev;
          prev = id;
        });

        this._next[prev] = null;
        this._prev['null'] = prev;
      });
  }

  get = (key: Key): Promise<T> => {
    if (this._byKey[key]) return Promise.resolve(this._byKey[key]);
    return XHR.get(this._urlRoot + '/' + key)
              .then(xhr => xhr.responseText)
              .then(JSON.parse)
              .then(value => this._byKey[value["id"]] = value);
  }

  prev = (key: Key): Promise<Key> => {
    if (this._prev[key]) return Promise.resolve(this._prev[key]);
    return this._fetch().then(() => this._prev[key]);
  }

  next = (key: Key): Promise<Key> => {
    if (this._next[key]) return Promise.resolve(this._next[key]);
    return this._fetch().then(() => this._next[key]);
  }

  set = (key: Key, value: T): Promise<void> => {
    return XHR.put(this._urlRoot + '/' + key, value)
              .then(xhr => xhr.responseText)
              .then(JSON.parse)
              .then((value: T) => this._subject.onInvalidate(value['id']));
  }

  splice = (prev: Key, next: Key, ...values: T[]): Promise<void> => {
    return Promise.all(values.map((value) => XHR.post(this._urlRoot, value)))
    .then(results => {
      values = results.map(xhr => JSON.parse(xhr.responseText));
      values.forEach((value: T) => {
        var id: Key = value['id'];
        this._byKey[id] = value;
        this._next[prev] = id;
        this._prev[id] = prev;
        prev = id;
      });

      this._next[prev] = values[0]["id"];
      this._prev[next] = values[values.length - 1]["id"];

      this._subject.onInvalidate([prev, next]);
    });
  };

  observe = (observer: IListObserver): ISubscription => {
    return this._subject.observe(observer);
  }

}

export default Collection;
