import './news.css';

export interface NewsArticle {
  source: { id: string, name: string };
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export class News {
  draw(data: NewsArticle[]): void {
    const news = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment = document.createDocumentFragment();
    const newsItemTemp = document.querySelector('#newsItemTemp');

    news.forEach((item, idx) => {
      const newsClone = (newsItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLTemplateElement;

      const newsItem = newsClone.querySelector('.news__item');
      if (newsItem) {
        if (idx % 2) newsItem.classList.add('alt');
      }
      
      const newsMetaPhoto = newsClone.querySelector('.news__meta-photo');
      if (newsMetaPhoto) {
        (newsMetaPhoto as HTMLElement).style.backgroundImage = `url(${
          item.urlToImage !== 'null' ? item.urlToImage : 'images/no_image.jpg'
        })`;
      }

      const newsMetaAuthor = newsClone.querySelector('.news__meta-author');
      if (newsMetaAuthor) {
        newsMetaAuthor.textContent = item.author || item.source.name;
      }
      
      const newMetaDate = newsClone.querySelector('.news__meta-date');
      if (newMetaDate) {
        newMetaDate.textContent = item.publishedAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('-');
      }
      
      const newsDescriptionTitle = newsClone.querySelector('.news__description-title');
      if (newsDescriptionTitle) {
        newsDescriptionTitle.textContent = item.title;
      }

      const newsDescriptionSource = newsClone.querySelector('.news__description-source');
      if (newsDescriptionSource) {
        newsDescriptionSource.textContent = item.source.name;
      }

      const newsDescriptionContent = newsClone.querySelector('.news__description-content');
      if (newsDescriptionContent) {
        newsDescriptionContent.textContent = item.description;
      }

      const newsReadMore = newsClone.querySelector('.news__read-more a');
      if (newsReadMore) {
        newsReadMore.setAttribute('href', item.url);
      }

      fragment.append(newsClone);
    });

    const newsElement = document.querySelector('.news');
    if (newsElement) {
      newsElement.innerHTML = '';
      newsElement.appendChild(fragment);
    }
    
  }
}

export default News;
