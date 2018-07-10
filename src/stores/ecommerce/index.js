import {observable, action} from 'mobx';
import clone from 'clone';
import fake from './fake';
import fakeinitdata from '../../containers/Ecommerce/cart/config';
var fakeData = fakeinitdata;

if (fakeinitdata.productQuantity.length === 0) {
    fakeData = fake;
}

class Store  {
    @observable view;
    @observable viewTopbarCart;
    @observable productQuantity;
    @observable products;

    constructor() {
        this.view = 'gridView';
        this.viewTopbarCart = false;
        this.productQuantity = fakeData.productQuantity;
        this.products = fakeData.products;
    }

    @action.bound changeView(view) {
        this.view = view;
    }

    @action.bound changeViewTopbarCart(viewTopbarCart) {
        this.viewTopbarCart = viewTopbarCart;
    }

    @action.bound changeProductQuantity(productQuantity) {
        localStorage.setItem(
            'cartProductQuantity',
            JSON.stringify(productQuantity)
        );
        this.productQuantity = productQuantity;
    }

    @action.bound addToCart(product) {
        const objectID = product.objectID;
        this.productQuantity.push({ objectID, quantity: 1 });
        this.products[objectID] = product;
        localStorage.setItem(
            'cartProductQuantity',
            JSON.stringify(this.productQuantity)
        );
        localStorage.setItem('cartProducts', JSON.stringify(this.products));
    }
}
let singleton = new Store();
export default singleton;
