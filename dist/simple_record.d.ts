import { IRecordObserver } from './observable_record';
import { MutableRecord } from './mutable_record';
import { ISubscription } from '../node_modules/sonic/dist/observable';
export default class SimpleRecord<V> extends MutableRecord<V> {
    private _object;
    private _subject;
    constructor(object: {
        [key: string]: V;
    });
    has: (key: string | number) => boolean;
    get: (key: string | number) => V;
    observe: (observer: IRecordObserver) => ISubscription;
    set: (key: string | number, value: V) => void;
    delete: (key: string | number) => void;
}
