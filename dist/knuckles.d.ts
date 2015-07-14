import _Collection from './collection';
declare function Knuckles(key: string, value?: any): any;
declare module Knuckles {
    var XHR: {
        create: (key: string | number, options: any) => Promise<XMLHttpRequest>;
        get: (url: string) => Promise<XMLHttpRequest>;
        put: (url: string, body: Object) => Promise<XMLHttpRequest>;
        post: (url: string, body: Object) => Promise<XMLHttpRequest>;
        delete: (url: string) => Promise<XMLHttpRequest>;
    };
    var Collection: typeof _Collection;
}
export default Knuckles;
