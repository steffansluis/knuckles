import Key from '../node_modules/sonic/dist/key';
import { IList } from '../node_modules/sonic/dist/list.d';
import Resource from './resource';

function x(name: string): typeof Resource {
  function X<V>(name: string) {
    this.name = name;

    // toJSON = () => {
    //   return {x: 42};
    // }

  }

  var Y: any = X;
  Y.get = () => {}




  return <typeof Resource>Y;
}

class Y<V> extends x("model")<V> {

}
