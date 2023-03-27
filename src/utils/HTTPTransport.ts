/* eslint-disable class-methods-use-this */
/* eslint-disable implicit-arrow-linebreak */
export enum Method {
  Get = 'Get',
  Post = 'Post',
  Put = 'Put',
  Patch = 'Patch',
  Delete = 'Delete',
}

type Options = {
  method: Method;
  data?: any;
};

type HTTPMethod<Response = void> = (
  path: string,
  data?: unknown,
) => Promise<Response>;

export default class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';

  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  public get: HTTPMethod = (path = '/') =>
    HTTPTransport.request(this.endpoint + path, { method: Method.Get });

  public post: HTTPMethod = (path: string, data?: unknown) =>
    HTTPTransport.request(this.endpoint + path, { method: Method.Post, data });

  public put: HTTPMethod = (path: string, data?: unknown) =>
    HTTPTransport.request(this.endpoint + path, { method: Method.Put, data });

  public patch: HTTPMethod = (path: string, data?: unknown) =>
    HTTPTransport.request(this.endpoint + path, { method: Method.Patch, data });

  public delete: HTTPMethod = (path: string, data?: unknown) =>
    HTTPTransport.request(this.endpoint + path, {
      method: Method.Delete,
      data,
    });

  private static request<Response>(
    url: string,
    options: Options = { method: Method.Get },
  ): Promise<Response> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = () => reject(new Error('Abort'));
      xhr.onerror = () => reject(new Error('Network error'));
      xhr.ontimeout = () => reject(new Error('Timeout'));

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Method.Get || !data) {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send();
      } else if (data instanceof FormData) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
