import './sources.css';

export interface Source {
  id: string;
  name: string;
  description: string;
  url: string;
  category: string;
  language: string;
  country: string;
}

export class Sources {
  draw(data: Source[]): void {
    const fragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp');

    if (sourceItemTemp) {
      data.forEach((item) => {
        const sourceClone = (sourceItemTemp as HTMLTemplateElement).content.cloneNode(true) as HTMLElement;
        const sourceItemName = sourceClone.querySelector('.source__item-name');
        const sourceItem = sourceClone.querySelector('.source__item');
  
        if (sourceItemName && sourceItem) {
          sourceItemName.textContent = item.name;
          sourceItem.setAttribute('data-source-id', item.id);
  
          fragment.append(sourceClone);
        }
        
      }); 
      
      const sources = document.querySelector('.sources');
      if (sources) sources.append(fragment);
      
    }
    
  }
}

export default Sources;
