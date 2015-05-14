// Build upon the IList standard from Sonic
import {IList} from '../../sonic/dist/definitions/list.d';
import {Id} from '../../sonic/dist/definitions/id.d';

import {eat, Result} from './eat';

interface Promise {
  then: () => void;

}

// interface PathArray extends Array<Path> {};
// type Path = string | PathArray;
//
//
// function walk(obj: Object, path: Path): any[] {
//   var arr: any[] = [],
//     key: string;
//
//   for (key in path) {
//     obj = obj[key];
//     arr.push(obj);
//   }
//   return arr;
// }

function Knuckles(url: string): any {
  var result: Result;

  result = eat(url);
  if (result.input == "") {
    var protocol: string = result.result.url.protocol,
      server: string = result.result.url.server.server,
      port: string = result.result.url.server.port,
      path: string = result.result.url.path;

    var urlRoot: string = protocol + "://" + server + ":" + port

    var root = new Fetchable(urlRoot);
    var nodes = path.split('/');
    nodes.unshift(); // The first node is the empty space before the path

    var prev = root;
    var node: string;
    for (var i in nodes) {
      if (nodes[i] == "") continue;
      console.log("Getting: ", nodes[i])
      prev = prev.get(nodes[i]);
    }

    return root;

  }
  else {
    console.log("Something went wrong. Result: ", result);
    return null;
  }
};
export = Knuckles;


interface IFetchable {
  url: () => String;
}

class Fetchable implements IFetchable {
  // private _value: any;
  private _promise: Promise;
  private _urlPath: string[] = [];
  private _nodes: Object = {};

  constructor(urlString: string, urlPath?: string[]) {
    this._urlPath  = urlPath ? urlPath: this._urlPath;
    this._urlPath.push(urlString);
  }

  has(id: Id): boolean {
    var key = id.toString();
    return (key in this._nodes);
  }

  get(id: Id): Fetchable {
    var f:Fetchable,
      key = id.toString();
    if (this._nodes[key] != null) return this._nodes[key];

    f = new Fetchable(key, this._urlPath);
    this._nodes[key] = f;

    return f;
  }

  url() : String {
    return this._urlPath.join("/");
  };

  // has(): boolean {
  //   return false;
  // }
  //
  // get(): any {
  //
  // }
  //
  // prev(id: Id): Id {
  //   return null;
  // }
  //
  // next(id: Id): Id {
  //   return null;
  // }
}

function fetch( f: IFetchable): any {
  console.log(f.url());
  return null;
}

Knuckles['fetch'] = fetch;
// Knuckles.fetch
