// Build upon the IList standard from Sonic
// import {IList} from '../../sonic/dist/list.d';
// import Id from '../../sonic/dist/key.d';
// import {ILens} from './lenses';
// import _Fetchable from './fetchable';

import _Record           from './record';
import _ObservableRecord from './observable_record';
import _MutableRecord    from './mutable_record';
import _SimpleRecord     from './simple_record';

function Knuckles(key: string, value?: any): any {
  // if (arguments.length == 2) return Knuckles.set(key, value);
  // else return Knuckles.get(key);

};

module Knuckles {
  export function get<V>(key: string): V | any {
    return {key: 2, color: 'green'};
  }

  export function set<V>(key: string, value: V): string {
    return null;
  }

  export var Record           = _SimpleRecord;
  export var ObservableRecord = _ObservableRecord;
  export var MutableRecord    = _MutableRecord;
  export var SimpleRecord     = _SimpleRecord;
  // export var Fetchable = _Fetchable;

}

// Results in an error if Knuckles doesn't comply with the ILens interface
// export = <ILens<string, any>>Knuckles;
export = Knuckles;
