import { NotFound } from 'sonic/dist/exceptions';
export var XHR;
(function (XHR) {
    function fetch(url, options) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest(), { method, body } = options;
            xhr.onload = () => xhr.status >= 200 && xhr.status < 400 ? resolve(xhr) : reject(xhr.status === 404 ? new NotFound : xhr);
            xhr.onerror = xhr.onabort = xhr.ontimeout = () => reject(xhr.status === 404 ? new NotFound : xhr);
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            if (options.headers)
                Object.keys(options.headers).forEach(key => {
                    xhr.setRequestHeader(key, options.headers[key]);
                });
            xhr.send(body);
        });
    }
    XHR.fetch = fetch;
    function get(url, headers) {
        return fetch(url, { method: 'get', headers: headers }).then(xhr => xhr.responseText);
    }
    XHR.get = get;
    function put(url, body, headers) {
        return fetch(url, { method: 'put', body: body, headers: headers }).then(xhr => xhr.responseText);
    }
    XHR.put = put;
    function post(url, body, headers) {
        return fetch(url, { method: 'post', body: body, headers: headers }).then(xhr => xhr.responseText);
    }
    XHR.post = post;
    function del(url, headers) {
        return fetch(url, { method: 'delete', headers: headers }).then(xhr => xhr.responseText);
    }
    XHR.del = del;
})(XHR || (XHR = {}));
export default XHR;
