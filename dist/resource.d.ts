import State from 'sonic/dist/state';
import { MutableStore } from 'sonic/dist/store';
export declare module Resource {
    type Record = {
        [key: string]: any;
    };
    function create<V>(urlRoot: string, keyProperty?: string, headers?: {
        [key: string]: string;
    }): MutableStore<V>;
    function createState<V>(urlRoot: string, keyProperty?: string, headers?: {
        [key: string]: string;
    }): State<V>;
}
export default Resource;
