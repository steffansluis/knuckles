import Key from '../node_modules/sonic/dist/key';
import { IRecordObserver } from './observable_record';
import { MutableRecord } from './mutable_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
export declare class SimpleRecord<V> extends MutableRecord<V> {
    protected _object: {
        [key: string]: V;
    };
    protected _subject: Subject<IRecordObserver>;
    constructor(object: {
        [key: string]: V;
    });
    has(key: Key): Promise<boolean>;
    get(key: Key): Promise<V>;
    observe(observer: IRecordObserver): ISubscription;
    set(key: Key, value: V): Promise<Key>;
    delete(key: Key): Promise<V>;
}
export default SimpleRecord;
