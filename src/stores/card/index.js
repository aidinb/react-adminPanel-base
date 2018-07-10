import {observable, action} from 'mobx';
import {fakedata} from '../../containers/Ecommerce/card/config';


class Store  {
    @observable cards;

    constructor() {
        this.cards = fakedata;
    }

    @action.bound addCard(card) {
        this.cards = [card, ...this.cards];

    }

    @action.bound editCard(editCard) {
        const cards = [];
        this.cards.forEach(card => {
            if (card.id !== editCard.id) {
                cards.push(card);
            } else {
                cards.push(editCard);
            }
        });
        this.cards = cards;
    }

    @action.bound deleteCard(deletedCard) {
        const cards = [];
        this.cards.forEach(card => {
            if (card.id !== deletedCard.id) {
                cards.push(card);
            }
        });
        this.cards = cards;
    }

    @action.bound restoreCards() {
        this.cards = fakedata;
    }
}
let singleton = new Store();
export default singleton;
