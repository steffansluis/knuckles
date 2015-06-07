import { IObservable } from '../node_modules/sonic/dist/observable';
import { IMutableRecord } from './mutable_record';
import { IRecordObserver } from './observable_record';
import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';

var ids = ["Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0"];

if (typeof XMLHttpRequest === "undefined") {
  for (var i = 0; i < ids.length; i++) {
    try {
      new ActiveXObject(ids[i]);
      window["XMLHttpRequest"] = function() {
        return new ActiveXObject(ids[i]);
      };
      break;
    } catch (e) {}
  }
}

export interface XHROptions {
  method?: string,
  body?: string
}

export module XHR {
  export var create = (url: string, options: XHROptions) => {
    var xhr = new XMLHttpRequest(),
      method: string,
      url: string;

    var {method} = options;

    xhr.onreadystatechange = function() {
      if (xhr.readyState == XMLHttpRequest.DONE) {

      }
    }

    xhr.open(method, url, true);
    xhr.send();
  }

  export var head = (url: string, options: XHROptions): void => {
    options.method = "HEAD";
    return XHR.create(url, options);
  }

  export var get = (url: string, options: XHROptions): void => {
    options.method = "GET";
    return XHR.create(url, options);
  }

  export var put = (url: string, options: XHROptions): void => {
    options.method = "PUT";
    return XHR.create(url, options);
  }

  export var post = (url: string, options: XHROptions): void => {
    options.method = "POST";
    return XHR.create(url, options);
  }

  export var delete;

}

XHR["delete"] = (url: string, options: XHROptions): void => {
  options.method = "DELETE";
  return XHR.create(url, options);
}

export type XHRRecord =  IMutableRecord<any>;
export module XHRRecord {
  var _subject = new Subject<IRecordObserver>();

  export var invalidate = (key: string): void => {
    _subject.notify(function(observer: IRecordObserver) {
      observer.onInvalidate(key);
    });
  }

  export var has = (key: string): boolean => {
    XHR.head(key, {});
    invalidate(key);

    return null;
  }

  export var get = <V>(key: string): V => {
    XHR.get(key, {});
    invalidate(key);

    return null;
  }

  export var set = <V>(key: string, value: V): void => {
    var xhr = XHR.put(key, {body: JSON.stringify(value)});
    invalidate(key);

    return null;
  }

  export var observe = (observer: IRecordObserver): ISubscription => {
    return _subject.observe(observer);
  }
}

XHRRecord["delete"] = (key: string): void => {
  var xhr = XHR["delete"](key);
  XHRRecord.invalidate(key);

  return null;
}

export default XHRRecord;
