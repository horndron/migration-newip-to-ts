import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: '995dbe406d884e36b4d6e28d9e4e7075', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
