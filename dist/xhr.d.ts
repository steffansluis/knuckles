export interface XHROptions {
    method?: string;
    body?: string;
}
export declare var XHR: {
    create: (key: string | number, options: any) => Promise<XMLHttpRequest>;
    head: (url: string) => Promise<XMLHttpRequest>;
    get: (url: string) => Promise<XMLHttpRequest>;
    put: (url: string, body: Object) => Promise<XMLHttpRequest>;
    post: (url: string, body: Object) => Promise<XMLHttpRequest>;
    delete: (url: string) => Promise<XMLHttpRequest>;
};
