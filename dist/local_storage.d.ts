import Store from 'sonicjs/dist/store';
import Cache from 'sonicjs/dist/cache';
export declare module LocalStorage {
    const NAMESPACE: string;
    function cache<K, V>(parent: Store<K, V>, uri: string): Store<K, V>;
    function createCache<K, V>(hash: string): Cache<K, V>;
}
export default LocalStorage;
