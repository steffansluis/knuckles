// import { IObservable } from '../node_modules/sonic/dist/observable';
// import { IMutableRecord } from './mutable_record';
// import { IRecordObserver } from './observable_record';
// import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
// import Key from '../node_modules/sonic/dist/key';
//
// export interface XHROptions {
//   method?: string,
//   body?: string
// }
//
// export var XHR = {
//   create: (key: Key, options: any): Promise<XMLHttpRequest> => {
//
//     return new Promise((resolve, reject) => {
//       var xhr = new XMLHttpRequest(),
//           url = key.toString(),
//           { method, body } = options;
//
//       xhr.onload = function() {
//         if(xhr.status >= 200 && xhr.status < 400) {
//           resolve(xhr);
//         } else {
//           reject(xhr)
//         }
//       }
//
//       xhr.onerror = function() {
//         reject(xhr);
//       }
//
//       xhr.open(method, url, true);
//       xhr.setRequestHeader('Content-Type', 'application/json')
//       xhr.send(body);
//     });
//   },
//
//   head: (url: string): Promise<XMLHttpRequest> => {
//     return XHR.create(url, { method: "HEAD" });
//   },
//
//   get: (url: string): Promise<XMLHttpRequest> => {
//     return XHR.create(url, { method: "GET" });
//   },
//
//   put: (url: string, body: string): Promise<XMLHttpRequest> => {
//     return XHR.create(url, { method: "PUT", body: body });
//   },
//
//   post: (url: string, body: string): Promise<XMLHttpRequest> => {
//     return XHR.create(url, { method: "POST", body: body });
//   },
//
//   delete: (url: string): Promise<XMLHttpRequest> => {
//     return XHR.create(url, { method: "DELETE" });
//   }
// }
//
// // export class XHRRecord<V> implements IMutableRecord<V> {
// //   protected _subject: Subject<IRecordObserver>;
// //
// //   constructor() {
// //     this._subject = XHRRecord._subject;
// //   }
// //
// //   has(key: Key): boolean {
// //      return XHRRecord.has(key);
// //    }
// //
// //   get(key: Key): V {
// //      return <V>XHRRecord.get(key);
// //    }
// //
// //   set(key: Key, value: V): void {
// //      return XHRRecord.set(key, value);
// //    }
// //
// //   observe(observer: IRecordObserver): ISubscription {
// //      return XHRRecord.observe(observer);
// //    }
// //
// //   delete(key: Key): void {
// //      return XHRRecord.delete(key);
// //    }
// //
// //   static _subject = new Subject<IRecordObserver>();
// //
// //   static invalidate = (key: Key): void => {
// //     XHRRecord._subject.notify(function(observer: IRecordObserver) {
// //       observer.onInvalidate(key);
// //     });
// //   }
// //
// //   static has = (key: string): Promise<boolean> => {
// //     return XHR.head(key)
// //               .then(function() { return true; })
// //               .catch(function() { return false; });
// //   }
// //
// //   static get = <V>(key: string): Promise<V> => {
// //     return XHR.get(key)
// //               .then(function(xhr) { return JSON.parse(xhr.responseText); })
// //   }
// //
// //   // static set = <V>(key: string, value: V): Promise<V> => {
// //   //   return XHR.
// //   // }
// //
// //   static observe = (observer: IRecordObserver): ISubscription => {
// //     return XHRRecord._subject.observe(observer);
// //   }
// //
// //   static delete = (key: Key): void => {
// //     var xhr = XHR["delete"](key);
// //     XHRRecord.invalidate(key);
// //
// //     return null;
// //   }
// //
// // }
// //
// // export default XHRRecord;
