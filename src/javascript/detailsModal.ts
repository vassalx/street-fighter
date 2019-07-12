import FightersView from './fightersView';

class DetailsModal {
    constructor() {
        this.toggleModal = this.toggleModal.bind(this);
        this.closeButton.addEventListener("click", this.toggleModal);
    }

    protected modal = document.querySelector(".modal");
    protected closeButton = this.modal.querySelector(".close-button");
    protected nameInp = this.modal.querySelector("#fname");
    protected healthInp: HTMLInputElement = this.modal.querySelector("#fhealth");
    protected defenseInp: HTMLInputElement = this.modal.querySelector("#fdefense");
    protected attackInp: HTMLInputElement = this.modal.querySelector("#fattack");
    public saveButton = this.modal.querySelector(".fighter-save");
    protected details: any;

    showDetails(details: any){
        this.details = details;
        this.nameInp.innerHTML = details.name;
        this.healthInp.value = details.health;
        this.defenseInp.value = details.defense;
        this.attackInp.value = details.attack;
        this.toggleModal();
    }

    saveDetails(): any{
        this.details.health = this.healthInp.value;
        this.details.defense = this.defenseInp.value;
        this.details.attack = this.attackInp.value;
        this.toggleModal();
        return this.details;
    }

    toggleModal() {
        this.modal.classList.toggle("show-modal");
    }
}

export default DetailsModal;