import _ObservableRecord from './observable_record';
import _MutableRecord from './mutable_record';
import _SimpleRecord from './simple_record';
declare function Knuckles(key: string, value?: any): any;
declare module Knuckles {
    function get<V>(key: string): V | any;
    function set<V>(key: string, value: V): string;
    var Record: typeof _SimpleRecord;
    var ObservableRecord: typeof _ObservableRecord;
    var MutableRecord: typeof _MutableRecord;
    var SimpleRecord: typeof _SimpleRecord;
}
export = Knuckles;
