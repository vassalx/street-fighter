class Fighter {
    _id: number;
    name: string;
    health: number;
    attack: number;
    defense: number;
    source: string;
    
    constructor(fighter) {
        this._id = fighter._id;
        this.name = fighter.name;
        this.health = fighter.health;
        this.attack = fighter.attack;
        this.defense = fighter.defense;
        this.source = fighter.source;
    }

    getHitPower(): number{
        const criticalHitChance = Math.random() + 1;
        const power = this.attack * criticalHitChance;
        return power;
    }

    getBlockPower(): number{
        const dodgeChance = Math.random() + 1;
        const power = this.defense * dodgeChance;
        return power;
    }
}

export default Fighter;