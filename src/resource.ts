import   Key            from 'sonicjs/dist/key';
import   Patch          from 'sonicjs/dist/patch';
import   State          from 'sonicjs/dist/state';
import   Cache          from 'sonicjs/dist/cache';
import   AsyncIterator  from 'sonicjs/dist/async_iterator';
import { Store,
         MutableStore } from 'sonicjs/dist/store';
import   Lens           from 'sonicjs/dist/lens';
import { Range,
         Position }     from 'sonicjs/dist/range';
import { Observable,
         Subject }      from 'sonicjs/dist/observable';
import   PromiseUtils   from 'sonicjs/dist/promise_utils';
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

  export function sub<K, V>(store: Store<K, V>, filterFn: (value: V, key: K) => boolean | Promise<boolean>, urlRoot: string, keyFn: (value: Record) => K | Promise<K> = record => record['id']): Store<K, V> {
    // return null;
    var filtered = Store.filter(FruitStore, filterFn);
    var subResource = create(urlRoot, keyFn);

    var { prev, next } = subResource.state;
    var { dispatcher, state: { get } } = filtered;

    var state = { get, prev, next };

    return { state, dispatcher };
  }

  var FruitStore = Resource.create('my.api/fruits');
  var BasketStore = Resource.create('my.api/baskets');

  var fruitsByBasket = Store.map(BasketStore, (basket, id) => {
    return sub(FruitStore, fruit => fruit['basket_id'] === id, `my.api/baskets/${id}/fruits`);
  });
}


export default Resource;
