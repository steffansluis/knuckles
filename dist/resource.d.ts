import State from 'sonic/dist/state';
import { MutableList } from 'sonic/dist/list';
export declare module Resource {
    function create<V>(urlRoot: string, keyProperty?: string): MutableList<V>;
    function createState<V>(urlRoot: string, keyProperty?: string): State<V>;
}
export default Resource;
