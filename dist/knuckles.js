// Build upon the IList standard from Sonic
import _XHR from './xhr';
import _Collection from './collection';
function Knuckles(key, value) {
    // if (arguments.length == 2) return Knuckles.set(key, value);
    // else return Knuckles.get(key);
}
;
var Knuckles;
(function (Knuckles) {
    // export var Sonic      = _Sonic;
    Knuckles.XHR = _XHR;
    Knuckles.Collection = _Collection;
})(Knuckles || (Knuckles = {}));
export default Knuckles;
module.exports = Knuckles;
