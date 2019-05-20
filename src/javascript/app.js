import FightersView from './fightersView';
import GameView from './gameView';
import Fighter from './fighter';
import { fighterService } from './services/fightersService';

class App {
  constructor() {
    this.startApp();
  }

  static startButton = document.getElementById('start');
  static timeout = 1000;
  static rootElement = document.getElementById('root');
  static loadingElement = document.getElementById('loading-overlay');

  async startApp() {
    try {
      App.loadingElement.style.visibility = 'visible';
      
      App.fighters = await fighterService.getFighters();
      const fightersView = new FightersView(App.fighters);
      const fightersElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
      App.startButton.style.visibility = 'visible';
      App.startButton.addEventListener("click",App.handleStartClick);
    }
  }

  static async handleStartClick(){
    App.rootElement.innerHTML="";
    App.chooseHandler = App.chooseFighterHandler.bind(this);
    this.fightersView = new FightersView(App.fighters,App.chooseHandler);
    const fightersElement = this.fightersView.element;
    console.log(this.fightersView);
    let chooseFighters = document.createElement("h1");
    chooseFighters.innerHTML = "Choose Fighters";
    App.rootElement.appendChild(chooseFighters);
    App.rootElement.appendChild(fightersElement);
  }

  static async chooseFighterHandler(event, fighter){
    if(!this.fighter1){
      if(this.fightersView.fightersDetailsMap.has(fighter._id)){
        this.fighter1 = this.fightersView.fightersDetailsMap.get(fighter._id);
      }else{
        this.fighter1 = await fighterService.getFighterDetails(fighter._id);
      }
      document.getElementById(`f-${fighter._id}`).classList.add('fighter-1');
      return;
    }
    if(!this.fighter2){
      if(this.fightersView.fightersDetailsMap.has(fighter._id)){
        this.fighter2 = this.fightersView.fightersDetailsMap.get(fighter._id);
      }else{
        this.fighter2 = await fighterService.getFighterDetails(fighter._id);
      }
      document.getElementById(`f-${fighter._id}`).classList.add('fighter-2');
      setTimeout(() => {
        App.startFight(this.fighter1,this.fighter2)
      },App.timeout);
      return;
    }
  }

  static startFight(f1,f2){
    App.rootElement.innerHTML="";
    let gameView = new GameView(new Fighter(f1),new Fighter(f2));
    const gameElement = gameView.element;
    App.rootElement.appendChild(gameElement);
  }
}

export default App;