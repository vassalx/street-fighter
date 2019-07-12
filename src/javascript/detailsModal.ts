import FightersView from './fightersView';

class DetailsModal {
    constructor() {
        this.toggleModal = this.toggleModal.bind(this);
        this.closeButton.addEventListener("click", this.toggleModal);
    }

    modal = document.querySelector(".modal");
    closeButton = this.modal.querySelector(".close-button");
    nameInp = this.modal.querySelector("#fname");
    healthInp: HTMLInputElement = this.modal.querySelector("#fhealth");
    defenseInp: HTMLInputElement = this.modal.querySelector("#fdefense");
    attackInp: HTMLInputElement = this.modal.querySelector("#fattack");
    saveButton = this.modal.querySelector(".fighter-save");
    details: any;

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