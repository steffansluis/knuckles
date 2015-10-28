import { Collection } from './collection';
import Key from '../node_modules/sonic/dist/key';
export declare class LSCollection<T> extends Collection<T> {
    constructor(urlRoot: string);
    protected _fetch(): Promise<void>;
    get(key: Key): Promise<T>;
    prev(key: Key): Promise<Key>;
    next(key: Key): Promise<Key>;
    set(key: Key, value: T): Promise<void>;
}
export default LSCollection;
