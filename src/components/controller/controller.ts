import AppLoader from './appLoader';
import { Callback } from './loader';
import { DataView, DataSource } from '../view/appView';

class AppController extends AppLoader {
  getSources(callback: Callback<DataSource>): void {
    super.getResp(
      {
        endpoint: 'sources',
      },
      callback,
    );
  }

  getNews(e: Event, callback: Callback<DataView>): void {

    let target: HTMLElement = e.target as HTMLElement;
    const newsContainer: HTMLElement = e.currentTarget as HTMLElement;

    this.deleteActiveClass(newsContainer);

    while (target !== newsContainer && target !== null) {
      if (target.classList.contains('source__item')) {
        target.classList.add('active');
        const sourceId: string = target.getAttribute('data-source-id') as string;
        if (newsContainer.getAttribute('data-source') !== sourceId) {
          newsContainer.setAttribute('data-source', sourceId);
          super.getResp(
            {
              endpoint: 'everything',
              options: {
                sources: sourceId,
              },
            },
            callback,
          );
        }
        return;
      }
      target = target.parentNode as HTMLElement;
    }
  }
  deleteActiveClass(target: HTMLElement): void {
    const sourceItems = target.querySelectorAll('.source__item');
    sourceItems.forEach((item) => item.classList.remove('active'));
  }
}

export default AppController;
