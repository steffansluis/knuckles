var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) { return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) { resolve(value); }); }
        function onfulfill(value) { try { step("next", value); } catch (e) { reject(e); } }
        function onreject(value) { try { step("throw", value); } catch (e) { reject(e); } }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};
import _Sonic from 'sonicjs/dist/sonic';
import _XHR from './xhr';
import _Resource from './resource';
import _LocalStorage from './local_storage';
var Knuckles;
(function (Knuckles) {
    Knuckles.Sonic = _Sonic;
    Knuckles.XHR = _XHR;
    Knuckles.Resource = _Resource;
    Knuckles.LocalStorage = _LocalStorage;
})(Knuckles || (Knuckles = {}));
module.exports = Knuckles;
export default Knuckles;
