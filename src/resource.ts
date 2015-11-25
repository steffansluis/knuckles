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

  export function create<V>(urlRoot: string, keyProperty = 'id', headers?: {[key: string]: string}): MutableStore<V> {
    var store: MutableStore<V>,
        subject = Subject.create<Patch<V>>(),
        observable: Observable<Patch<V>>;

    observable = Observable.map(subject, async (patch) => {
      var slice = State.slice(store.state, patch.range);
      var deleted = patch.added ? State.omit(slice, State.keyBy(patch.added, (value: Record) => String(value[keyProperty]))) : slice;

      await AsyncIterator.forEach(State.keys(deleted), key => XHR.del(`${urlRoot}/${key}`).then(() => {}));
      if (!patch.added) return patch;

      var synced = State.map(patch.added, (value: Record) => {
        var key: Key = value[keyProperty],
            string = JSON.stringify(value);

        if (key != undefined) return XHR.put(`${urlRoot}/${key}`, string, headers).then(JSON.parse)
        return XHR.post(urlRoot, string, headers).then(JSON.parse);
      });

      var cached = State.cache(synced);
      var keyed = State.keyBy(cached, value => value[keyProperty]);

      await AsyncIterator.forEach(State.entries(keyed), () => {});
      return {range: patch.range, added: keyed};
    });

    return store = Store.create(createState(urlRoot, keyProperty, headers), {
      onNext: subject.onNext,
      subscribe: observable.subscribe
    });
  }

  export function createState<V>(urlRoot: string, keyProperty = 'id', headers?: {[key: string]: string}): State<V> {
    var cache = Cache.create();

    var {prev, next} = State.lazy(() => {
      return XHR.get(urlRoot, headers)
        .then(JSON.parse)
        .then(array => {
          return State.keyBy(State.fromArray<Record>(array), value => {
            var key = String(value[keyProperty]);
            cache.get[key] = Promise.resolve(value);
            return key;
          });
        });
    });

    function get(key: Key): Promise<V> {
      return XHR.get(`${urlRoot}/${key}`, headers).then(JSON.parse);
    }

    return Cache.apply({get, prev, next}, cache);
  }
}

export default Resource;
