import _Sonic    from 'sonicjs/dist/sonic';
import _XHR      from './xhr';
import _Resource from './resource';
import _LocalStorage from './local_storage';

module Knuckles {
  export var Sonic    = _Sonic;
  export var XHR      = _XHR;
  export var Resource = _Resource;
  export var LocalStorage = _LocalStorage;
}

declare var module: any;
module.exports = Knuckles;

export default Knuckles;
