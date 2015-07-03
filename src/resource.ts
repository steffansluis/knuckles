import Key from '../node_modules/sonic/dist/key';
import IMutableRecord from './mutable_record';
import SimpleRecord from './simple_record';
import { XHR }      from './xhr';

export class Resource<V> extends SimpleRecord<V> {

  public url: string;

  constructor(url: string) {
    super({});
    this.url = url;
  }

  _fetch = (): Promise<Object> => {
    return XHR.get(this.url)
      .then(xhr => xhr.response)
      .then(JSON.parse)
      .then(res => this._object = res);
  }

  get = (key: Key): Promise<V> => {
    if (key in this._object) return Promise.resolve(this._object[key]);
    return this._fetch()
      .then((obj: Object) => obj[key]);
  }

  toJSON = (): Object => {
    return this._object;
  }
}

export default Resource;
