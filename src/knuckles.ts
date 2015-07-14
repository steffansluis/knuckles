// Build upon the IList standard from Sonic

import _Sonic      from '../node_modules/sonic/dist/sonic';
import _XHR        from './xhr';
import _Collection from './collection';

function Knuckles(key: string, value?: any): any {
  // if (arguments.length == 2) return Knuckles.set(key, value);
  // else return Knuckles.get(key);

};

module Knuckles {
  // export var Sonic      = _Sonic;
  export var XHR        = _XHR;
  export var Collection = _Collection;
}

export default Knuckles;

// Results in an error if Knuckles doesn't comply with the ILens interface
declare var module: any;
module.exports = Knuckles;
