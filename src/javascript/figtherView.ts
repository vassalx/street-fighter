import View from './view';
import Fighter from './fighter';

class FighterView extends View {
  constructor(fighter: Fighter, handleClick?: (event: Event, fighter: Fighter) => void) {
    super();

    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter: Fighter, handleClick?: (event: Event, fighter: Fighter) => void) {
    const { name, source } = fighter;
    const nameElement = this.createName(name);
    const imageElement = this.createImage(source);

    this.element = this.createElement({ tagName: 'div', className: 'fighter' });
    this.element.id = `f-${fighter._id}`;
    this.element.append(imageElement, nameElement);
    if (handleClick) {
      this.element.addEventListener('click', event => handleClick(event, fighter), false);
    }
  }

  createName(name: string) : HTMLElement {
    const nameElement: HTMLElement = this.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source: string) : HTMLElement{
    const attributes = { src: source };
    const imgElement = this.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

export default FighterView;