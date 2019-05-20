class Fighter {
    constructor(fighter) {
        this._id = fighter._id;
        this.name = fighter.name;
        this.health = fighter.health;
        this.attack = fighter.attack;
        this.defense = fighter.defense;
        this.source = fighter.source;
    }

    getHitPower(){
        const criticalHitChance = Math.random() + 1;
        let power = this.attack * criticalHitChance;
        return power;
    }

    getBlockPower(){
        const dodgeChance = Math.random() + 1;
        let power = this.defense * dodgeChance;
        return power;
    }
}

export default Fighter;