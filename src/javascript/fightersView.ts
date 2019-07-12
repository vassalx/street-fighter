import View from './view';
import FighterView from './figtherView';
import DetailsModal from './detailsModal';
import { fighterService } from './services/fightersService'
import Fighter from './fighter';

class FightersView extends View {
  handleClick: (event: Event) => void;
  modal: DetailsModal;

  constructor(fighters: Fighter[], handler?: (event: Event) => void) {
    super();
    if(handler){
      this.handleClick = handler.bind(this);
    }else{
      this.handleClick = this.handleFigtherClick.bind(this);
    }
    this.createFighters(fighters);
    this.modal = new DetailsModal();
    this.modal.saveButton.addEventListener("click", () => this.updateDetails(this.modal.saveDetails()));
  }

  fightersDetailsMap = new Map<number,any>();

  createFighters(fighters: Fighter[]) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }

  async handleFigtherClick(event: Event, fighter: Fighter) {
    let details: any;
    if (!this.fightersDetailsMap.has(fighter._id)) {
      details = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fighter._id, details);
    } else {
      details = this.fightersDetailsMap.get(fighter._id)
    }
    this.modal.showDetails(details);
  }

  updateDetails(figther: Fighter) {
    if (this.fightersDetailsMap.has(figther._id)) {
      this.fightersDetailsMap.set(figther._id, figther);
    }
  }

}

export default FightersView;