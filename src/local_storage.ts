
import   State      from 'sonicjs/dist/state';
import   Store      from 'sonicjs/dist/store';
import { Observable,
         Subject }  from 'sonicjs/dist/observable';
import   Patch      from 'sonicjs/dist/patch';
import   Cache      from 'sonicjs/dist/cache';
import { NotFound } from 'sonicjs/dist/exceptions';

var h = 0;
function uuid() {
  return Date.now() + '_' + h++;
}

export module LocalStorage {
  export const NAMESPACE = 'knuckles';

  export function cache<K, V>(parent: Store<K, V>, uri: string): Store<K, V> {
    const hashes: string[] = JSON.parse(localStorage.getItem(uri)) || [];
    const hash = uuid();
    const state = Cache.apply(hashes.map(createCache).reduce(Cache.apply, parent.state), createCache(hash));

    return Store.create(state, parent.dispatcher, (state, patch) => {
      const newState = Patch.apply(state, patch);
      const hash = uuid();
      const cache = createCache(hash);

      hashes.push(hash);
      localStorage.setItem(uri, JSON.stringify(hashes));

      return Cache.apply(newState, cache);
    });
  }


  export function createCache<K, V>(hash: string): Cache<K, V> {
    function cacheFn<T, U>(uri: string): (t: T, u: U | Promise<U>) => Promise<U> {
      const c = JSON.parse(localStorage.getItem(uri)) || {};

      return async (t: T, u?: U | Promise<U>): Promise<U> => {
        const stringT = JSON.stringify(t);

        if (u === undefined) {
          if (stringT in c) return c[stringT];
          throw new NotFound();
        }

        c[stringT] = await u;
        localStorage.setItem(uri, JSON.stringify(c))
        return c[stringT];
      }
    }

    return {
      get:  cacheFn<K, V>(`${NAMESPACE}/${hash}/get`),
      prev: cacheFn<K, K>(`${NAMESPACE}/${hash}/prev`),
      next: cacheFn<K, K>(`${NAMESPACE}/${hash}/next`)
    }
  }
}

export default LocalStorage;
