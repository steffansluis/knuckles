import Key from '../node_modules/sonic/dist/key';
import { IObservableRecord, ObservableRecord } from './observable_record';
import { IMutableList, MutableList } from '../node_modules/sonic/dist/mutable_list';
export interface IMutableRecord<V> extends IObservableRecord<V> {
    set(key: Key, value: V): void;
    delete(key: Key): void;
}
export declare class MutableRecord<V> extends ObservableRecord<V> implements IMutableRecord<V> {
    constructor(record?: IMutableRecord<V>);
    set: (key: string | number, value: V) => void;
    delete: (key: string | number) => void;
    zoom: (key: string | number) => MutableList<V>;
    static create<V>(record: IObservableRecord<V>): ObservableRecord<V>;
    static zoom<V>(record: IMutableRecord<V>, key: Key): IMutableList<V>;
}
export default MutableRecord;
