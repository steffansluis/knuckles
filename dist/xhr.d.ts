export interface XHROptions {
    method?: string;
    body?: string;
}
export declare module XHR {
    function fetch(url: string, options: {
        method: any;
        body?: string;
    }): Promise<XMLHttpRequest>;
    function get(url: string): Promise<string>;
    function put(url: string, body: string): Promise<string>;
    function post(url: string, body: string): Promise<string>;
    function del(url: string): Promise<string>;
}
export default XHR;
