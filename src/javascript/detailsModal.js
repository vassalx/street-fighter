import FightersView from './fightersView';

class DetailsModal {
    constructor() {
        this.toggleModal = this.toggleModal.bind(this);
        this.closeButton.addEventListener("click", this.toggleModal);
    }

    modal = document.querySelector(".modal");
    closeButton = this.modal.querySelector(".close-button");
    nameInp = this.modal.querySelector("#fname");
    healthInp = this.modal.querySelector("#fhealth");
    defenseInp = this.modal.querySelector("#fdefense");
    attackInp = this.modal.querySelector("#fattack");
    saveButton = this.modal.querySelector(".fighter-save");

    showDetails(details){
        this.details = details;
        this.nameInp.innerHTML = details.name;
        this.healthInp.value = details.health;
        this.defenseInp.value = details.defense;
        this.attackInp.value = details.attack;
        this.toggleModal();
    }

    saveDetails(){
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