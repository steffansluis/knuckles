import Key from '../node_modules/sonic/dist/key';
import { IRecord } from './record';
import { IRecordObserver } from './observable_record';
import { MutableRecord } from './mutable_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
export declare class Knuckle<V> extends MutableRecord<V> {
    private _sources;
    protected _subject: Subject<IRecordObserver>;
    constructor(...sources: IRecord<V>[]);
    addSource: (source: IRecord<V>) => Knuckle<V>;
    has(key: Key): boolean;
    get(key: Key): V;
    observe(observer: IRecordObserver): ISubscription;
    set(key: Key, value: V): void;
    delete(key: Key): void;
}
export default Knuckle;
