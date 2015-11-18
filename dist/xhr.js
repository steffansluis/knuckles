export var XHR;
(function (XHR) {
    function fetch(url, options) {
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest(), { method, body } = options;
            xhr.onload = () => xhr.status >= 200 && xhr.status < 400 ? resolve(xhr) : reject(xhr);
            xhr.onerror = xhr.onabort = xhr.ontimeout = () => reject(xhr);
            xhr.open(method, url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(body);
        });
    }
    XHR.fetch = fetch;
    function get(url) {
        return fetch(url, { method: 'get' }).then(xhr => xhr.responseText);
    }
    XHR.get = get;
    function put(url, body) {
        return fetch(url, { method: 'put', body: body }).then(xhr => xhr.responseText);
    }
    XHR.put = put;
    function post(url, body) {
        return fetch(url, { method: 'post', body: body }).then(xhr => xhr.responseText);
    }
    XHR.post = post;
    function del(url) {
        return fetch(url, { method: 'delete' }).then(xhr => xhr.responseText);
    }
    XHR.del = del;
})(XHR || (XHR = {}));
export default XHR;
//# sourceMappingURL=xhr.js.map