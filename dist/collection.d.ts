import Key from '../node_modules/sonic/dist/key';
import { IRecordObserver } from './observable_record';
import { SimpleRecord } from './simple_record';
import { ISubscription } from '../node_modules/sonic/dist/observable';
export declare class Collection<V extends {
    id: Key;
}> extends SimpleRecord<V> {
    protected _urlRoot: string;
    constructor(urlRoot: string, models: V[]);
    has(key: Key): Promise<boolean>;
    get(key: Key): Promise<V>;
    set(key: Key, value: V): Promise<Key>;
    observe(observer: IRecordObserver): ISubscription;
    delete(key: Key): Promise<V>;
}
export default Collection;
