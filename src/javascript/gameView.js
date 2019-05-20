import View from './view';
import FighterView from './figtherView';

class GameView extends View {
    constructor(f1, f2) {
        super();
        this.createGame(f1, f2);
    }

    static timeout = 1000;

    createGame(f1, f2) {
        const f1View = new FighterView(f1);
        const f2View = new FighterView(f2);

        this.element = this.createElement({ tagName: 'div', className: 'game' });

        let leftF = this.createElement({ tagName: 'div', className: 'left-fighter' });
        leftF.append(this.createHealthBar(f1.health));
        leftF.append(f1View.element);

        let rightF = this.createElement({ tagName: 'div', className: 'right-fighter' });
        rightF.append(this.createHealthBar(f2.health));
        rightF.append(f2View.element);

        this.element.append(leftF, rightF);

        setTimeout(() => GameView.fight(f1,f2), GameView.timeout);
    }

    createHealthBar(health) {
        let health_bar = this.createElement({ tagName: 'div', className: 'health-bar' });
        health_bar.append(this.createElement({ tagName: 'div', className: 'health' }));
        let health_value = this.createElement({ tagName: 'div', className: 'health-value' });
        health_value.innerHTML = health;
        health_bar.append(health_value);
        return health_bar;
    }

    static fight(f1, f2) {
        if (f2.health <= 0) {
            //TODO show winner
            console.log(f1.name + " WINS");
            return;
        }
        let damage = f1.getHitPower() - f2.getBlockPower();
        damage = (damage > 0) ? damage : 0;
        f2.health -= damage;
        //TODO show damage
        console.log(f1.name + " HITS " + f2.name + " - " + damage)
        setTimeout(()  => GameView.fight(f2, f1), GameView.timeout);
    }
}

export default GameView;