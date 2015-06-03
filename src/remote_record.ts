import Key from '../node_modules/sonic/dist/key';
import {IRecord} from './record';
import { IRecordObserver } from './observable_record';
import SimpleRecord from './simple_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';

export class RemoteRecord<V> extends SimpleRecord<V> {
  protected _urlRoot: string;

  constructor(urlRoot: string) {
    this._urlRoot = urlRoot;
    super({});
  }

  _fetch(key: Key, value?: V): any {
    var url: string = this._urlRoot + "/" + key,
      p: any;

    var options: any = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "GET"
    };

    if (arguments.length == 2) options.method = value ? "PUT" : "DELETE";
    if (value != null) options.body = JSON.stringify(value);

    console.log(url, options)
    p = window["fetch"](url, options);

    return p.then(function(res: any) {return res.json()})
    //   .then( function(json: any) {
    //     super._set(key, json);
    // })

  }

  get(key: Key): V {
    var value: V,
    _set = super.set.bind(this);

    if (value = super.get(key)) return value;
    else this._fetch(key).then( function(json: any) {
      _set(key, json)
    })

    return null;
  }

  set(key: Key, value: V): void {
    var _set = super.set.bind(this);

    this._fetch(key, value).then( function() {
      _set(key, value)
    })

    return null;
  }

  delete(key: Key): void {
    this._fetch(key, null);

    this._subject.notify(function(observer: IRecordObserver) {
      observer.onInvalidate(key);
    });
  }

  //TODO: Observe sources and proxy events

}

export default RemoteRecord;
