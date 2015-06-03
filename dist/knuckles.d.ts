import _ObservableRecord from './observable_record';
import _MutableRecord from './mutable_record';
import _SimpleRecord from './simple_record';
import _Knuckle from './knuckle';
import _RemoteRecord from './remote_record';
declare function Knuckles(key: string, value?: any): any;
declare module Knuckles {
    var Record: typeof _SimpleRecord;
    var ObservableRecord: typeof _ObservableRecord;
    var MutableRecord: typeof _MutableRecord;
    var SimpleRecord: typeof _SimpleRecord;
    var Knuckle: typeof _Knuckle;
    var RemoteRecord: typeof _RemoteRecord;
    var records: {
        [key: string]: _ObservableRecord<any>;
    };
}
export = Knuckles;
