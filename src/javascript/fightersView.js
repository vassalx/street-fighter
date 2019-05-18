import View from './view';
import FighterView from './figtherView';
import DetailsModal from './detailsModal';
import { fighterService } from './services/fightersService'

class FightersView extends View {
  constructor(fighters) {
    super();

    this.handleClick = this.handleFighterClick.bind(this);
    this.createFighters(fighters);
    this.modal = new DetailsModal();
    this.modal.saveButton.addEventListener("click", () => this.updateDetails(this.modal.saveDetails()));
  }

  fightersDetailsMap = new Map();

  createFighters(fighters) {
    const fighterElements = fighters.map(fighter => {
      const fighterView = new FighterView(fighter, this.handleClick);
      return fighterView.element;
    });

    this.element = this.createElement({ tagName: 'div', className: 'fighters' });
    this.element.append(...fighterElements);
  }

  async handleFighterClick(event, fighter) {
    let details;
    if (!this.fightersDetailsMap.has(fighter._id)) {
      details = await fighterService.getFighterDetails(fighter._id);
      this.fightersDetailsMap.set(fighter._id, details);
    } else {
      details = this.fightersDetailsMap.get(fighter._id)
    }
    console.log(details);
    this.modal.showDetails(details);
    // allow to edit health and power in this modal
  }

  updateDetails(figther){
    if(this.fightersDetailsMap.has(figther._id)){
      this.fightersDetailsMap.set(figther._id,figther);
    }
  }
  
}

export default FightersView;