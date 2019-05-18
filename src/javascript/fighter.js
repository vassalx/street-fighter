class Figther {
    constructor(figther) {
        this.name = figther.name;
        this.health = figther.health;
        this.attack = figther.attack;
        this.defense = figther.defense;
    }

    get name(){
        return this.name;
    }
    set name(value){
        this.name = value;
    }

    get health(){
        return this.health;
    }
    set health(value){
        this.health = value;
    }

    get attack(){
        return this.attack;
    }
    set attack(value){
        this.attack = value;
    }

    get defense(){
        return this.defense;
    }
    set defense(value){
        this.defense = value;
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