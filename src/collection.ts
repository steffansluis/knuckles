import Key from '../node_modules/sonic/dist/key';
import { IRecordObserver } from './observable_record';
import { IMutableRecord } from './mutable_record';
import { MutableList } from '../node_modules/sonic/dist/mutable_list';
import { SimpleRecord } from './simple_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
import {XHR} from './xhr';

export class Collection<V extends {id: Key}> extends SimpleRecord<V> {
  protected _urlRoot: string;

  constructor(urlRoot: string, models: V[]) {
    super({});
    this._urlRoot = urlRoot;
  }

  has(key: Key): Promise<boolean> {
    return super.has(key).then( (has) => {
      return has || XHR.head(this._urlRoot + "/" + key)
        .then(() => true)
        .catch(() => false);
    });
  }

  get(key: Key): Promise<V> {
    return key in this._object ? super.get(key) : XHR.get(this._urlRoot + "/" + key)
      .then( ( res ) => {
        var value: V = JSON.parse(res.responseText);
        super.set(key, value);
        return value;
      })
  }

  set(key: Key, value: V): Promise<Key> {
    if (key in this._object) return XHR.put(this._urlRoot + "/" + key, value).then((res) => {
      return super.set(key, JSON.parse(res.responseText));
    })
    else return XHR.post(this._urlRoot, value).then((res) => {
      var value: V = JSON.parse(res.responseText);
      return super.set(value.id, value);
    })
  }

  observe(observer: IRecordObserver): ISubscription {
    return this._subject.observe(observer);
  }


  delete(key: Key): Promise<V> {
    return XHR.delete(this._urlRoot + "/" + key).then( (res) => super.delete(key) );
  }


}

export default Collection;
