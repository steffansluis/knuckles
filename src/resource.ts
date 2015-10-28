import   Key           from 'sonic/dist/key';
import   Patch         from 'sonic/dist/patch';
import   State         from 'sonic/dist/state';
import   Cache         from 'sonic/dist/cache';
import   AsyncIterator from 'sonic/dist/async_iterator';
import { List,
         MutableList } from 'sonic/dist/list';
import   Lens          from 'sonic/dist/lens';
import { Range,
         Position }    from 'sonic/dist/range';
import { Observable,
         Subject }     from 'sonic/dist/observable';
import   PromiseUtils  from 'sonic/dist/promise_utils';
import   XHR           from './xhr';

export module Resource {

  function thunk<V>(state: State<V>): Promise<void> {
    return AsyncIterator.forEach(State.toIterator(state), () => {});
  }

  export function create<V>(urlRoot: string, keyProperty = 'id'): MutableList<V> {
    var subject = Subject.create<Patch<V>>(),
        observable = Observable.map(subject, patch => {

          var synced = State.map(patch.added, value => {
            var key = value[keyProperty],
                string = JSON.stringify(value);
            return (key != null ? XHR.put(`${urlRoot}/${key}`, string) : XHR.post(urlRoot, string)).then(JSON.parse);
          });

          var cached = State.cache(synced);
          var keyed = State.keyBy(cached, value => value[keyProperty]);

          return thunk(keyed).then(() => ({
            range: patch.range,
            added: keyed
          }));
        });

    return List.create(createState(urlRoot, keyProperty), {
      onNext: subject.onNext,
      subscribe: observable.subscribe
    });
  }

  export function createState<V>(urlRoot: string, keyProperty = 'id'): State<V> {
    var cache = Cache.create();

    var fetcher = PromiseUtils.lazy<State<V>>(resolve => {
      var state = XHR.get(urlRoot)
        .then(JSON.parse)
        .then(State.fromArray)
        .then(state => State.keyBy(state, value => {
          cache.get[value[keyProperty]] = Promise.resolve(value);
          return value[keyProperty];
        }));

      resolve(state);
    });

    function get(key: Key): Promise<V> {
      return XHR.get(`${urlRoot}/${key}`).then(JSON.parse)
    }

    function prev(key: Key): Promise<Key> {
      return fetcher.then(state => state.prev(key));
    }

    function next(key: Key): Promise<Key> {
      return fetcher.then(state => state.next(key));
    }

    return Cache.apply({get, prev, next}, cache);
  }
}

export default Resource;
