class View {
    public element: HTMLElement;
  
    createElement({ tagName, className = '', attributes = {} }): HTMLElement {
      const element = document.createElement(tagName);
      element.classList.add(className);
      Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
  
      return element;
    }
  }
  export default View;