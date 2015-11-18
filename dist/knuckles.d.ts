import _XHR from './xhr';
import _Resource from './resource';
declare module Knuckles {
    var XHR: typeof _XHR;
    var Resource: typeof _Resource;
}
export default Knuckles;
