export interface Result {
  input: string;
  result: any;
}

export interface Eater {
  (input: string): Result;
}

export type Token = string | Object | TokenArray;
export interface TokenArray extends Array<Token> {};


var tokens: Token = (function() {
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
    {url: this.url}
  ];
}).apply({});

function eatTokenString(tokenString: string): Eater {
  return function(input: string): Result {
    var i: number,
      match: RegExpMatchArray,
      result: string,
      _ref: any;

    match = input.match(new RegExp(tokenString));

    if (match != null) {
      result = (_ref = match[1]) != null ? _ref : "";
      i = match[0].length - 1;
      input = input.slice(i + 1);
    } else {
      result = "";
    }
    return {
      result: result,
      input: input
    };
  };
};

function eatTokenArray(tokenArray: TokenArray): Eater {
  return function(input: string) {
    var result: Object, resultString: string;
    result = {};
    resultString = "";

    tokenArray.forEach(function(token) {
      var e: Error,
        eater: Eater,
        res: Result,
        _ref: Result;

      eater = makeEat(token);

      try {
        _ref = eater(input), res = _ref.result, input = _ref.input;
      } catch (_error) {
        e = _error;
        throw e;
      }
      if (res && typeof res !== "string") {
        return Object.keys(res).forEach(function(key) {
          if (res[key]) {
            return result[key] = res[key];
          }
        });
      } else if (res != null) {
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
};

function eatTokenObject(tokenObject: Object): Eater {
  return function(input) {
    var e: Error,
    eater: Eater,
    inputProxy: string,
    key: string,
    keys: string[],
    res: any,
    resKey: string,
    result: Object,
    _ref: Result;

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
      } catch (_error) {
        e = _error;
        if (tokenObject[key] instanceof Array) {
          res = "";
        } else {
          throw e;
        }
      }
    } else {
      res = {};
      inputProxy = input;
      keys.forEach(function(key) {
        var newInput: string,
        resKey: string,
        _ref1: Result,
        _res: Result;
        console.log("input", input);
        eater = makeEat(tokenObject[key]);
        try {
          _ref1 = eater(inputProxy), _res = _ref1.result, newInput = _ref1.input;
        } catch (_error) {}
        if (!_res || newInput) {
          return;
        }
        if (typeof _res === "string") {
          return res[key] = _res;
        } else if (Object.keys(_res).length === 1) {
          resKey = Object.keys(_res)[0];
          if (resKey === key) {
            return res[key] = _res[resKey];
          } else {
            return res[key] = _res;
          }
        } else {
          return res[key] = _res;
        }
      });
      if (!Object.keys(res).length) {
        throw new Error("Result is empty on " + input + " for " + keys);
      } else {
        input = "";
      }
    }
    if (typeof res === "string") {
      result[key] = res;
    } else if (Object.keys(res).length === 1) {
      resKey = Object.keys(res)[0];
      if (resKey === key || !key) {
        result[resKey] = res[resKey];
      } else {
        result[key] = res;
      }
    } else if (key) {
      result[key] = res;
    } else {
      result = res;
    }
    return {
      result: result,
      input: input
    };
  };
};

function makeEater(token: Token): Eater {
  if (typeof token === "string") {
    return eatTokenString(token);
  } else if (token instanceof Array) {
    return eatTokenArray(token);
  } else if (token instanceof Object) {
    return eatTokenObject(token);
  } else {
    throw new Error("Unrecognized token: " + token);
  }
};

function makeEat(tokens: Token): Eater {
  var eatFn: Eater, eater: Eater;

  eater = makeEater(tokens);
  eatFn = function(input) {
    var e: Error,
      key: string,
      msg: ((tokens: Token)=>string),
      oldInput: string,
      res: any,
      result: Object,
      resultString: string,
      value: any,
      _ref: Result;

    if (!input) {
      msg = function(tokens: Token): string {
        if (typeof tokens === "string") {
          return tokens;
        } else if (tokens instanceof Array) {
          return tokens.map(function(token) {
            return msg(token);
          }).toString();
        } else {
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
      } else if (Object.keys(res).length === 1) {
        key = Object.keys(res)[0];
        result[key] = res[key];
      } else {
        for (key in res) {
          value = res[key];
          result[key] = value;
        }
      }
    } catch (_error) {
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
};

export var eat = makeEat(tokens);
export default eat;

// _ref = eat("install git@github.com:steffansluis/knuckles.git"), result = _ref.result, input = _ref.input;
//
// console.log("Remaining: ", input, " ---- Result: ", JSON.stringify(result));
