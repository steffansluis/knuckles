import State from 'sonic/dist/state';
import { MutableStore } from 'sonic/dist/store';
export declare module Resource {
    type Record = {
        [key: string]: any;
    };
    function create<K>(urlRoot: string, keyFn?: (value: Record) => K | Promise<K>, headers?: {
        [key: string]: string;
    }): MutableStore<K, Record>;
    function createState<K>(urlRoot: string, keyFn?: (value: Record) => K | Promise<K>, headers?: {
        [key: string]: string;
    }): State<K, Record>;
}
export default Resource;
