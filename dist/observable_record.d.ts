import Key from '../node_modules/sonic/dist/key';
import { IRecord, Record } from './record';
import { IObservable, ISubscription } from '../node_modules/sonic/dist/observable';
import { IObservableList, ObservableList } from '../node_modules/sonic/dist/observable_list';
export interface IRecordObserver {
    onInvalidate: (key: Key) => void;
}
export interface IObservableRecord<V> extends IRecord<V>, IObservable<IRecordObserver> {
}
export declare class ObservableRecord<V> extends Record<V> implements IObservableRecord<V> {
    constructor(record?: IObservableRecord<V>);
    observe(observer: IRecordObserver): ISubscription;
    zoom(key: Key): ObservableList<V>;
    static create<V>(record: IObservableRecord<V>): ObservableRecord<V>;
    static zoom<V>(record: IObservableRecord<V>, key: Key): IObservableList<V>;
}
export default ObservableRecord;
