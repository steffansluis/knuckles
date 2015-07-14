import Key from '../node_modules/sonic/dist/key';
import { IListObserver, ListSubject } from '../node_modules/sonic/dist/observable_list';
import { MutableList } from '../node_modules/sonic/dist/mutable_list';
import { ISubscription } from '../node_modules/sonic/dist/observable';
export declare class Collection<T extends {
    [key: string]: any;
}> extends MutableList<T> {
    protected _urlRoot: string;
    protected _subject: ListSubject;
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
    protected _fetch(): Promise<void>;
    get: (key: string | number) => Promise<T>;
    prev: (key: string | number) => Promise<string | number>;
    next: (key: string | number) => Promise<string | number>;
    set: (key: string | number, value: T) => Promise<void>;
    splice: (prev: string | number, next: string | number, ...values: T[]) => Promise<void>;
    observe: (observer: IListObserver) => ISubscription;
}
export default Collection;
