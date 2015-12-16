import _Sonic from 'sonicjs/dist/sonic';
import _XHR from './xhr';
declare module Knuckles {
    var Sonic: typeof _Sonic;
    var XHR: typeof _XHR;
    var Resource: any;
}
export default Knuckles;
