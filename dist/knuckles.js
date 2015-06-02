// Build upon the IList standard from Sonic
// import {IList} from '../../sonic/dist/list.d';
// import Id from '../../sonic/dist/key.d';
// import {ILens} from './lenses';
// import _Fetchable from './fetchable';
var observable_record_1 = require('./observable_record');
var mutable_record_1 = require('./mutable_record');
var simple_record_1 = require('./simple_record');
var knuckle_1 = require('./knuckle');
function Knuckles(key, value) {
    // if (arguments.length == 2) return Knuckles.set(key, value);
    // else return Knuckles.get(key);
}
;
var Knuckles;
(function (Knuckles) {
    // export function get<V>(key: string): V | any {
    //   return {key: 2, color: 'green'};
    // }
    //
    // export function set<V>(key: string, value: V): string {
    //   return null;
    // }
    Knuckles.Record = simple_record_1.default;
    Knuckles.ObservableRecord = observable_record_1.default;
    Knuckles.MutableRecord = mutable_record_1.default;
    Knuckles.SimpleRecord = simple_record_1.default;
    Knuckles.Knuckle = knuckle_1.default;
    // export var Fetchable = _Fetchable;
    Knuckles.records = {
        "localStorage": new Knuckles.SimpleRecord(localStorage).compose({
            get: function (str) { return JSON.parse(str); },
            set: function (str, obj) { return JSON.stringify(obj); }
        })
    };
})(Knuckles || (Knuckles = {}));
module.exports = Knuckles;
