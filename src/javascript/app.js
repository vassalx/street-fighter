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
      App.fightersView = new FightersView(App.fighters);
      const fightersElement = App.fightersView.element;

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
    App.fightersMap = App.fightersView.fightersDetailsMap;
    App.rootElement.innerHTML="";
    App.chooseHandler = App.chooseFighterHandler.bind(this);
    App.fightersView = new FightersView(App.fighters,App.chooseHandler);
    const fightersElement = App.fightersView.element;
    let chooseFighters = document.createElement("h1");
    chooseFighters.innerHTML = "Choose Fighters";
    App.rootElement.appendChild(chooseFighters);
    App.rootElement.appendChild(fightersElement);
  }

  static async chooseFighterHandler(event, fighter){
    if(!App.fighter1){
      if(App.fightersMap.has(fighter._id)){
        App.fighter1 = App.fightersMap.get(fighter._id);
      }else{
        App.fighter1 = await fighterService.getFighterDetails(fighter._id);
      }
      document.getElementById(`f-${fighter._id}`).classList.add('fighter-1');
      return;
    }
    if(!App.fighter2){
      if(App.fightersMap.has(fighter._id)){
        App.fighter2 = App.fightersMap.get(fighter._id);
      }else{
        App.fighter2 = await fighterService.getFighterDetails(fighter._id);
      }
      document.getElementById(`f-${fighter._id}`).classList.add('fighter-2');
      setTimeout(() => {
        App.startFight(App.fighter1,App.fighter2)
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