import _Sonic from '../node_modules/sonic/dist/sonic';
import _XHR from './xhr';
import _Resource from './resource';
declare module Knuckles {
    var Sonic: typeof _Sonic;
    var XHR: typeof _XHR;
    var Resource: typeof _Resource;
}
export default Knuckles;
