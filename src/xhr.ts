import Key from 'sonic/dist/key';

export interface XHROptions {
  method?: string,
  body?: string
}

export module XHR {
  export function fetch(url: string, options: { method: any, body?: string }): Promise<XMLHttpRequest> {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest(),
          { method, body } = options;

      xhr.onload  = () => xhr.status >= 200 && xhr.status < 400 ? resolve(xhr) : reject(xhr);
      xhr.onerror = xhr.onabort = xhr.ontimeout = () => reject(xhr);

      xhr.open(method, url, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(body);
    });
  }

  export function get(url: string): Promise<string> {
    return fetch(url, { method: 'get' }).then(xhr => xhr.responseText);
  }

  export function put(url: string, body: string): Promise<string> {
    return fetch(url, { method: 'put', body: body }).then(xhr => xhr.responseText);
  }

  export function post(url: string, body: string): Promise<string> {
    return fetch(url, { method: 'post', body: body }).then(xhr => xhr.responseText);
  }

  export function del(url: string): Promise<string> {
    return fetch(url, { method: 'delete' }).then(xhr => xhr.responseText);
  }

}

export default XHR;
