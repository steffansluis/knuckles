import Key from '../node_modules/sonic/dist/key';
import SimpleRecord from './simple_record';
export declare class RemoteRecord<V> extends SimpleRecord<V> {
    protected _urlRoot: string;
    constructor(urlRoot: string);
    _fetch(key: Key, value?: V): any;
    get(key: Key): V;
    set(key: Key, value: V): void;
    delete(key: Key): void;
}
export default RemoteRecord;
