import Key from '../node_modules/sonic/dist/key';
import { IObservableRecord, ObservableRecord } from './observable_record';
import { IMutableList, MutableList } from '../node_modules/sonic/dist/mutable_list';
export interface ILens<A, B> {
    get(a: A): B;
    set(a: A, b: B): A;
}
export interface IMutableRecord<V> extends IObservableRecord<V> {
    set(key: Key, value: V): void;
    delete(key: Key): void;
}
export declare class MutableRecord<V> extends ObservableRecord<V> implements IMutableRecord<V> {
    constructor(record?: IMutableRecord<V>);
    set(key: Key, value: V): void;
    delete(key: Key): void;
    zoom(key: Key): MutableList<V>;
    compose<W>(lens: ILens<V, W>): MutableRecord<W>;
    static create<V>(record: IMutableRecord<V>): MutableRecord<V>;
    static zoom<V>(record: IMutableRecord<V>, key: Key): IMutableList<V>;
    static compose<V, W>(record: IMutableRecord<V>, lens: ILens<V, W>): IMutableRecord<W>;
}
export default MutableRecord;
