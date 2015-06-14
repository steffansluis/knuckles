// import Key from '../node_modules/sonic/dist/key';
// import {IRecord} from './record';
// import { IRecordObserver } from './observable_record';
// import { MutableRecord } from './mutable_record';
// import { ISubscription, Subject } from '../node_modules/sonic/dist/observable';
//
// export class Knuckle<V> extends MutableRecord<V> {
//   private _sources: IRecord<V>[];
//   protected _subject: Subject<IRecordObserver>;
//
//   constructor(...sources: IRecord<V>[]) {
//     super();
//     this._sources = sources;
//     this._subject = new Subject<IRecordObserver>();
//   }
//
//   addSource = (source: IRecord<V>): Knuckle<V> => {
//     this._sources.push(source);
//     return this;
//   }
//
//   has(key: Key): boolean {
//     return this._sources.reduce<any>((memo, source) => memo || source.has(key), false);
//   }
//
//   get(key: Key): V {
//     var value: V;
//     for (var i in this._sources) {
//       if (value = this._sources[i].get(key)) {
//         return value;
//       }
//     }
//     return null;
//   }
//
//   observe(observer: IRecordObserver): ISubscription {
//     return this._subject.observe(observer);
//   }
//
//   set(key: Key, value: V): void {
//     this._sources.forEach( function(source: IRecord<V>) {
//       if (source["set"] != null) source["set"](key, value);
//     });
//
//     this._subject.notify(function(observer: IRecordObserver) {
//       observer.onInvalidate(key);
//     });
//   }
//
//   delete(key: Key): void {
//     this._sources.forEach( function(source: IRecord<V>) {
//       if (source["delete"] != null) source["delete"](key);
//     });
//
//     this._subject.notify(function(observer: IRecordObserver) {
//       observer.onInvalidate(key);
//     });
//   }
//
//   //TODO: Observe sources and proxy events
//
// }
//
// export default Knuckle;
