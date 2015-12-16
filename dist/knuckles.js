import _Sonic from 'sonicjs/dist/sonic';
import _XHR from './xhr';
import _Resource from './resource';
var Knuckles;
(function (Knuckles) {
    Knuckles.Sonic = _Sonic;
    Knuckles.XHR = _XHR;
    Knuckles.Resource = _Resource;
})(Knuckles || (Knuckles = {}));
module.exports = Knuckles;
export default Knuckles;
