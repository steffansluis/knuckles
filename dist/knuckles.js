var eat_1 = require('./eat');
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
function Knuckles(url) {
    var result;
    result = eat_1.eat(url);
    if (result.input == "") {
        var protocol = result.result.url.protocol, server = result.result.url.server.server, port = result.result.url.server.port, path = result.result.url.path;
        var urlRoot = protocol + "://" + server + ":" + port;
        var root = new Fetchable(urlRoot);
        var nodes = path.split('/');
        nodes.unshift(); // The first node is the empty space before the path
        var prev = root;
        var node;
        for (var i in nodes) {
            if (nodes[i] == "")
                continue;
            console.log("Getting: ", nodes[i]);
            prev = prev.get(nodes[i]);
        }
        return root;
    }
    else {
        console.log("Something went wrong. Result: ", result);
        return null;
    }
}
;
var Fetchable = (function () {
    function Fetchable(urlString, urlPath) {
        this._urlPath = [];
        this._nodes = {};
        this._urlPath = urlPath ? urlPath : this._urlPath;
        this._urlPath.push(urlString);
    }
    Fetchable.prototype.has = function (id) {
        var key = id.toString();
        return (key in this._nodes);
    };
    Fetchable.prototype.get = function (id) {
        var f, key = id.toString();
        if (this._nodes[key] != null)
            return this._nodes[key];
        f = new Fetchable(key, this._urlPath);
        this._nodes[key] = f;
        return f;
    };
    Fetchable.prototype.url = function () {
        return this._urlPath.join("/");
    };
    ;
    return Fetchable;
})();
function fetch(f) {
    console.log(f.url());
    return null;
}
Knuckles['fetch'] = fetch;
module.exports = Knuckles;
// Knuckles.fetch
