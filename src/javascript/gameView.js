import View from './view';
import FighterView from './figtherView';

class GameView extends View {
    constructor(f1, f2) {
        super();
        this.createGame(f1, f2);
    }

    static timeout = 500;

    createGame(f1, f2) {
        const f1View = new FighterView(f1);
        const f2View = new FighterView(f2);

        this.element = this.createElement({ tagName: 'div', className: 'game' });

        let leftF = this.createElement({ tagName: 'div', className: 'left-fighter' });
        leftF.append(this.createHealthBar(f1));
        leftF.append(f1View.element);

        let rightF = this.createElement({ tagName: 'div', className: 'right-fighter' });
        rightF.append(this.createHealthBar(f2));
        rightF.append(f2View.element);

        this.element.append(leftF, rightF);

        document.getElementById("vs").style.visibility="visible";
        this.textToSpeach(`${f1.name} versus ${f2.name}. Fight!`, (event) => this.fight(f1,f2));
    }

    createHealthBar(fighter) {
        let health_bar = this.createElement({ tagName: 'div', className: 'health-bar' });
        health_bar.id = `h-${fighter._id}`;
        health_bar.append(this.createElement({ tagName: 'div', className: 'health' }));
        let health_value = this.createElement({ tagName: 'div', className: 'health-value' });
        health_value.innerHTML = fighter.health;
        health_bar.append(health_value);
        return health_bar;
    }

    fight(f1, f2) {
        if (f1.health <= 0) {
            this.showWinner(f2,f1);
            return;
        }
        f2 = this.hitSecondFighter(f1,f2);
        setTimeout(()  => this.fight(f2, f1), GameView.timeout);
    }

    hitSecondFighter(f1,f2){
        let damage = f1.getHitPower() - f2.getBlockPower();
        damage = (damage > 0) ? damage : 0;
        const oldHealth = f2.health;
        f2.health = (damage > f2.health) ? 0 : f2.health - damage;
        let health_bar_el = document.getElementById(`h-${f2._id}`);
        let health_el = health_bar_el.querySelector(".health");
        let value_el = health_bar_el.querySelector(".health-value");
        health_el.style.width = `${health_el.offsetWidth*f2.health/oldHealth}px`;
        value_el.innerHTML = Math.round(f2.health * 100) / 100;
        return f2;
    }

    showWinner(winner,loser){
        document.getElementById("vs").style.visibility="hidden";
        let winner_sign = this.createElement({tagName:'div',className:'winner'});
        const text = `${winner.name} WINS!`;
        winner_sign.innerHTML = text;
        document.getElementById(`f-${loser._id}`).classList.toggle("loser");
        this.element.append(winner_sign);
        this.textToSpeach(text);
    }

    textToSpeach(text,action){
        var msg = new SpeechSynthesisUtterance(text);
        if(action){
            msg.onend = action;
        }
        window.speechSynthesis.speak(msg);
    }
}

export default GameView;