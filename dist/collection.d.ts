import Key from '../node_modules/sonic/dist/key';
import { IListObserver, ListSubject } from '../node_modules/sonic/dist/observable_list';
import { MutableList } from '../node_modules/sonic/dist/mutable_list';
import { ISubscription } from '../node_modules/sonic/dist/observable';
export declare class Collection<T> extends MutableList<T> {
    protected _subject: ListSubject;
    protected _urlRoot: string;
    protected _byKey: {
        [key: string]: T;
    };
    protected _prev: {
        [key: string]: Key;
    };
    protected _next: {
        [key: string]: Key;
    };
    constructor(urlRoot: string);
    get(key: Key): Promise<T>;
    prev(key?: Key): Promise<Key>;
    next(key?: Key): Promise<Key>;
    set(key: Key, value: T): Promise<void>;
    splice(prev: Key, next: Key, ...values: T[]): Promise<void>;
    observe(observer: IListObserver): ISubscription;
}
export default Collection;
