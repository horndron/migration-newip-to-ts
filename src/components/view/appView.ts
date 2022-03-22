import { NewsArticle, News } from './news/news';
import { Source, Sources } from './sources/sources';
import { sourceListToggle } from './sources/sourceHandler';
export interface DataView {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
}
export interface DataSource {
  status: string;
  sources: Source[];
}
export class AppView {
  private news: News;

  private sources: Sources;

  constructor() {
    this.news = new News();
    this.sources = new Sources();
  }

  drawNews(data: DataView): void {
    const values = data?.articles || [];
    this.news.draw(values);
  } 

  drawSources(data: DataSource): void {
    const values = data?.sources || [];
    this.sources.draw(values);

    const firstSource = document.querySelector('.source__item') as HTMLElement;
    if (firstSource) firstSource.click();

    const sources = document.querySelector('.sources') as HTMLElement;
    const allSource = document.querySelector('.all-source') as HTMLElement;

    if (allSource && sources) sourceListToggle(allSource, 'click', sources);
  }
}

export default AppView;
