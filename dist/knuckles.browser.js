(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Knuckles = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
;
var tokens = (function () {
    this.word = "([a-zA-Z\\$_][a-zA-Z0-9\\$_]*)";
    this.protocol = "^" + this.word + ":///?";
    this.port = [
        ":", {
            port: "([0-9]+)"
        }
    ];
    this.whitespace = ["\\s*"];
    this.server = [
        {
            server: "^(" + ("(" + this.word + "\\.)*" + this.word + ")")
        }, {
            port: this.port
        }
    ];
    this.path = "^((/(" + this.word + ")?)*)";
    this.url = [
        {
            protocol: this.protocol
        }, {
            server: this.server
        },
        {
            path: this.path
        }
    ];
    this.user = "^(" + this.word + ")\\@";
    this.gitUrl = [
        this.whitespace, {
            user: this.user
        }, {
            server: "(" + ("(" + this.word + "\\.)*") + this.word + "(\\.)" + this.word + ")"
        }, {
            repoPath: ":((" + this.word + "/)*(" + this.word + ".git))"
        }
    ];
    this.action = "^(install|remove)\\s*";
    // return [
    //   {
    //     action: this.action
    //   }, {
    //     location: {
    //       url: this.url,
    //       gitUrl: this.gitUrl
    //     }
    //   }
    // ];
    return [
        { url: this.url }
    ];
}).apply({});
function eatTokenString(tokenString) {
    return function (input) {
        var i, match, result, _ref;
        match = input.match(new RegExp(tokenString));
        if (match != null) {
            result = (_ref = match[1]) != null ? _ref : "";
            i = match[0].length - 1;
            input = input.slice(i + 1);
        }
        else {
            result = "";
        }
        return {
            result: result,
            input: input
        };
    };
}
;
function eatTokenArray(tokenArray) {
    return function (input) {
        var result, resultString;
        result = {};
        resultString = "";
        tokenArray.forEach(function (token) {
            var e, eater, res, _ref;
            eater = makeEat(token);
            try {
                _ref = eater(input), res = _ref.result, input = _ref.input;
            }
            catch (_error) {
                e = _error;
                throw e;
            }
            if (res && typeof res !== "string") {
                return Object.keys(res).forEach(function (key) {
                    if (res[key]) {
                        return result[key] = res[key];
                    }
                });
            }
            else if (res != null) {
                return resultString += res;
            }
        });
        if (!Object.keys(result).length) {
            result = resultString;
        }
        return {
            result: result,
            input: input
        };
    };
}
;
function eatTokenObject(tokenObject) {
    return function (input) {
        var e, eater, inputProxy, key, keys, res, resKey, result, _ref;
        keys = Object.keys(tokenObject);
        result = {};
        if (keys.length === 1) {
            key = keys[0];
            eater = makeEat(tokenObject[key]);
            try {
                _ref = eater(input), res = _ref.result, input = _ref.input;
                if (!res) {
                    throw new Error("Result is empty on " + input + " for " + key);
                }
            }
            catch (_error) {
                e = _error;
                if (tokenObject[key] instanceof Array) {
                    res = "";
                }
                else {
                    throw e;
                }
            }
        }
        else {
            res = {};
            inputProxy = input;
            keys.forEach(function (key) {
                var newInput, resKey, _ref1, _res;
                console.log("input", input);
                eater = makeEat(tokenObject[key]);
                try {
                    _ref1 = eater(inputProxy), _res = _ref1.result, newInput = _ref1.input;
                }
                catch (_error) { }
                if (!_res || newInput) {
                    return;
                }
                if (typeof _res === "string") {
                    return res[key] = _res;
                }
                else if (Object.keys(_res).length === 1) {
                    resKey = Object.keys(_res)[0];
                    if (resKey === key) {
                        return res[key] = _res[resKey];
                    }
                    else {
                        return res[key] = _res;
                    }
                }
                else {
                    return res[key] = _res;
                }
            });
            if (!Object.keys(res).length) {
                throw new Error("Result is empty on " + input + " for " + keys);
            }
            else {
                input = "";
            }
        }
        if (typeof res === "string") {
            result[key] = res;
        }
        else if (Object.keys(res).length === 1) {
            resKey = Object.keys(res)[0];
            if (resKey === key || !key) {
                result[resKey] = res[resKey];
            }
            else {
                result[key] = res;
            }
        }
        else if (key) {
            result[key] = res;
        }
        else {
            result = res;
        }
        return {
            result: result,
            input: input
        };
    };
}
;
function makeEater(token) {
    if (typeof token === "string") {
        return eatTokenString(token);
    }
    else if (token instanceof Array) {
        return eatTokenArray(token);
    }
    else if (token instanceof Object) {
        return eatTokenObject(token);
    }
    else {
        throw new Error("Unrecognized token: " + token);
    }
}
;
function makeEat(tokens) {
    var eatFn, eater;
    eater = makeEater(tokens);
    eatFn = function (input) {
        var e, key, msg, oldInput, res, result, resultString, value, _ref;
        if (!input) {
            msg = function (tokens) {
                if (typeof tokens === "string") {
                    return tokens;
                }
                else if (tokens instanceof Array) {
                    return tokens.map(function (token) {
                        return msg(token);
                    }).toString();
                }
                else {
                    return Object.keys(tokens).toString();
                }
            };
            throw new Error("Input is empty for " + (msg(tokens)));
        }
        result = {};
        resultString = "";
        oldInput = input;
        try {
            _ref = eater(input), res = _ref.result, input = _ref.input;
            if (typeof res === "string") {
                resultString += res;
            }
            else if (Object.keys(res).length === 1) {
                key = Object.keys(res)[0];
                result[key] = res[key];
            }
            else {
                for (key in res) {
                    value = res[key];
                    result[key] = value;
                }
            }
        }
        catch (_error) {
            e = _error;
            console.log(e.toString());
            throw e;
        }
        if (res && input === oldInput) {
            console.log("blah", res, input);
        }
        if (!Object.keys(result).length) {
            result = resultString;
        }
        return {
            result: result,
            input: input
        };
    };
    return eatFn;
}
;
exports.eat = makeEat(tokens);
exports.default = exports.eat;
// _ref = eat("install git@github.com:steffansluis/knuckles.git"), result = _ref.result, input = _ref.input;
//
// console.log("Remaining: ", input, " ---- Result: ", JSON.stringify(result));

},{}],2:[function(require,module,exports){
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

},{"./eat":1}]},{},[2])(2)
});