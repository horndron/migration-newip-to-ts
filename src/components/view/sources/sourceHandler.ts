
type Handler = (element: HTMLElement, event: string, parent: HTMLElement) => void;

export const sourceListToggle: Handler = (element: HTMLElement, event: string, parent: HTMLElement) => {
  element.addEventListener(event, () => {
    parent.classList.toggle('all');
  });
};
