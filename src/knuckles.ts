import _Sonic    from 'sonic/dist/sonic';
import _XHR      from './xhr';
import _Resource from './resource';

module Knuckles {
  export var Sonic    = _Sonic;
  export var XHR      = _XHR;
  export var Resource = _Resource;
}

declare var module: any;
module.exports = Knuckles;

export default Knuckles;
