import Key from '../node_modules/sonic/dist/key';
import { IRecordObserver } from './observable_record';
import { Record, IRecord } from './record';
import { IMutableRecord } from './mutable_record';
import { IMutableList } from '../node_modules/sonic/dist/mutable_list';
import { SimpleRecord } from './simple_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
import { XHR } from './xhr';

export class Collection<V> implements IMutableList<V>, IMutableRecord<V> {

  private _urlRoot: string;

  constructor(urlRoot: string) {
    this._urlRoot = urlRoot;


  }

  get = (id: Key): Promise<Resource<V>> => {
    return XHR.get(this._urlRoot + "/" + id)
              .then(xhr => xhr.response)
              .then(JSON.parse)
              .then((object: any) => new SimpleRecord(object));
  }


  prev = (id: Key): Promise<Key> => {
    return null;
  }

  next = (id: Key): Promise<Key> => {
    return null;
  }

  set = (id: Key, value: IRecord<V>>): Promise<void> => {
    return XHR.set(this._urlRoot + "/" + id, value)
      .then(xhr => xhr.response)
      .then(JSON.parse)
      .then((object: any) => new SimpleRecord(object));
  }



}

export default Collection;
