import   Key            from 'sonic/dist/key';
import   Patch          from 'sonic/dist/patch';
import   State          from 'sonic/dist/state';
import   Cache          from 'sonic/dist/cache';
import   AsyncIterator  from 'sonic/dist/async_iterator';
import { Store,
         MutableStore } from 'sonic/dist/store';
import   Lens           from 'sonic/dist/lens';
import { Range,
         Position }     from 'sonic/dist/range';
import { Observable,
         Subject }      from 'sonic/dist/observable';
import   PromiseUtils   from 'sonic/dist/promise_utils';
import   XHR            from './xhr';


export module Resource {
  export type Record = {[key: string]: any};

  export function create<K>(urlRoot: string, keyFn: (value: Record) => K | Promise<K> = record => record['id'], headers?: {[key: string]: string}): MutableStore<K, Record> {
    var store: MutableStore<K, Record>,
        subject = Subject.create<Patch<K, Record>>(),
        observable: Observable<Patch<K, Record>>;

    observable = Observable.map(subject, async (patch) => {
      var slice = State.slice(store.state, patch.range);
      var deleted = patch.added ? State.omit(slice, State.keyBy(patch.added, keyFn)) : slice;

      await AsyncIterator.forEach(State.keys(deleted), key => XHR.del(`${urlRoot}/${key}`).then(() => {}));
      if (!patch.added) return patch;

      var synced = State.map(patch.added, async (value: Record) => {
        var key = await keyFn(value),
            string = JSON.stringify(value);

        if (key != undefined) return XHR.put(`${urlRoot}/${key}`, string, headers).then(JSON.parse)
        return XHR.post(urlRoot, string, headers).then(JSON.parse);
      });

      var cached = State.cache(synced);
      var keyed = State.keyBy(cached, keyFn);

      await AsyncIterator.forEach(State.entries(keyed), () => {});
      return {range: patch.range, added: keyed};
    });

    return store = Store.create(createState(urlRoot, keyFn, headers), {
      onNext: subject.onNext,
      subscribe: observable.subscribe
    });
  }

  export function createState<K>(urlRoot: string, keyFn: (value: Record) => K | Promise<K> = record => record['id'], headers?: {[key: string]: string}): State<K, Record> {
    var cache = Cache.create<K, Record>();

    var {prev, next} = State.lazy(() => {
      return XHR.get(urlRoot, headers)
        .then(JSON.parse)
        .then(object => {
          return State.keyBy(State.fromObject<Record>(object), async (value) => {
            var key = await keyFn(value)
            cache.get(key, value);
            return key;
          });
        });
    });

    function get(key: K): Promise<Record> {
      return XHR.get(`${urlRoot}/${key}`, headers).then(JSON.parse);
    }

    return Cache.apply({get, prev, next}, cache);
  }
}

export default Resource;
