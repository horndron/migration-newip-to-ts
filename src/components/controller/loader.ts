import { DataSource } from '../view/appView';
interface Options {
  [key: string]: string
}

interface GetRespParam {
  endpoint: string,
  options?: Options
}

export type Callback<T> = (data: T) => void;
class Loader {
  constructor(
    public baseLink: string,
    private options: Options,
  ) {}

  getResp<T>(
    { endpoint, options = {} }: GetRespParam,
    callback: Callback<T> = (): void => {
      console.error('No callback for GET response');
    },
  ): void {
    this.load('GET', endpoint, callback, options);  
  }

  errorHandler(res: Response) {
    if (!res.ok) {
      if (res.status === 401 || res.status === 404)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }
    return res;
  }

  makeUrl(options: Options, endpoint: string): string {
    const urlOptions: Options = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;

    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`;
    });

    return url.slice(0, -1);
  }

  load<DataSource>(method: string, endpoint: string, callback: Callback<DataSource>, options: Options = {}): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: DataSource): void => callback(data))
      .catch((err: string): void => console.error(err));
  }
}

export default Loader;
