import _XHR from './xhr';
import _Resource from './resource';
import _LocalStorage from './local_storage';
declare module Knuckles {
    var Sonic: any;
    var XHR: typeof _XHR;
    var Resource: typeof _Resource;
    var LocalStorage: typeof _LocalStorage;
}
export default Knuckles;
