export interface XHROptions {
    method?: string;
    body?: string;
}
export declare module XHR {
    function fetch(url: string, options: {
        method: any;
        body?: string;
        headers?: {
            [key: string]: string;
        };
    }): Promise<XMLHttpRequest>;
    function get(url: string, headers?: {
        [key: string]: string;
    }): Promise<string>;
    function put(url: string, body: string, headers?: {
        [key: string]: string;
    }): Promise<string>;
    function post(url: string, body: string, headers?: {
        [key: string]: string;
    }): Promise<string>;
    function del(url: string, headers?: {
        [key: string]: string;
    }): Promise<string>;
}
export default XHR;
